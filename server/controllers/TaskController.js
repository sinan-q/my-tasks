const DataStore = require('nedb-promises')
const tasks = DataStore.create('Tasks.db')




const get = async ( req, res) => {
    try {
        const { parent = null, limit = 10} = req.body
        let allTasks = await tasks.find({ user: req.user.id })
        let parentTasks = allTasks.filter(task => task.parent === parent)
        const recusrion = (child, level = 0) => {
            if(level===limit) return child
            child.map((task) =>{
                const childs = allTasks.filter(alltask => alltask.parent === task._id)

                if (childs && childs.length!=0) {
                    task.childs = recusrion(childs, level + 1)
                } 
                return task
            })
            return child
        }
        recusrion(parentTasks)
        return res.status(200).json({
            data: parentTasks
        })
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}
const add = async ( req, res) => {
    try {
        const { name, parent = null, exptime = null, status = 0} = req.body
        
        if (!name) return res.status(422).json({ message: "Please fill in all fields"})
     
        if (await tasks.findOne({ name, parent})) return res.status(409).json({message: "task already exists"})
        const task = {
            name,
            parent,
            user: req.user.id,
            created: Date.now(),
            exptime,
            status
        }
        await tasks.insert(task)
    
        return res.status(201).json({ message: "Task added", task: task})
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

const remove = async ( req, res) => {
    try {
        const { id } = req.body
        let allTasks = await tasks.find({ user: req.user.id })

        if (!id) return res.status(422).json({ message: "Invalid Entry"})
        const recursion = async (id) => {
            const childs = await tasks.find({parent: id})
            if (childs && childs.length>0) 
                childs.map((item) => {
                    recursion(item._id)
                }) 
            await tasks.deleteOne({_id: id})
            return
        }
        await recursion(id)
        return res.status(200).json({
            message: "Deleted Task" 
        })
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

module.exports = { get, add, remove }
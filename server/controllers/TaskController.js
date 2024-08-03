const DataStore = require('nedb-promises')
const tasks = DataStore.create('Tasks.db')




const get = async ( req, res) => {
    try {
        const tasks = await tasks.find({ user: req.user.id})

        return res.status(200).json({
            data: tasks? tasks.length : "Empty Array" 
        })
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}
const add = async ( req, res) => {
    try {
        const { name, parent = null, exptime = null, status = false} = req.body
        
        if (!name) return res.status(422).json({ message: "Please fill in all fields"})
     
        if (await tasks.findOne({ name, parent})) return res.status(409).json({message: "task already exists"})
        await tasks.insert({
            name,
            parent,
            user: req.user.id,
            created: Date.now(),
            exptime,
            status
        })
    
        return res.status(201).json({ message: "Task added"})
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

module.exports = { get, add }
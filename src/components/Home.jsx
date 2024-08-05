import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogout from '../hooks/useLogout'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from "react-simple-toasts";
import { MdOutlineDone, MdClose, MdDeleteForever, MdKeyboardArrowDown, MdKeyboardArrowUp, MdAdd } from "react-icons/md";


const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const axiosPrivate = useAxiosPrivate();
    const [tasks, setTasks] = useState([])

    const signOut = async () => {
        await logout();
        navigate('/auth/login');
    }
    const getTasks = async (parent = null) => {
        try {
            const response = await axiosPrivate.post('/task/get', JSON.stringify({parent}))
            return response.data.data

            //toast(response.data.message)

        } catch (err) {
            console.error(err);
        }   
    }
    
    const addTask = async (name, parent, exptime = null, status = 0) => {
        try {
            if (!name && name==="") throw toast("Invalid Entry")
            const response = await axiosPrivate.post('/task',JSON.stringify({ name, parent, exptime, status }));
            return response.data
        } catch (err) {
            throw (err.response?.data?.message || err.message)
  
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await axiosPrivate.post('/task/remove',JSON.stringify({ id }));
            toast(response.data.message)
            return response.status === 200
        } catch (err) {
            toast(err.response?.data?.message || err.message)
            return false
        }
    }


    useEffect(() => {
        getTasks().then((tasks) => setTasks( tasks ))
        
    }, [])

    
        

    return (
        <div className=" w-full    ">
            <div className="mt-1 fixed right-4   ">
                <button className=" border p-2 m-auto text-center w-full hover:bg-red-400 hover:text-white "onClick={signOut}>Sign Out</button>
            </div>
            <div className='text-3xl text-center mb-8'>Tasks</div>
                { tasks && tasks.map(task => {
                    return <TaskCard 
                        key={task._id}  
                        task={task}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        getTasks={getTasks}
                    />
                })}
            
            <TaskAddCard
                parent={null}
                addTask={addTask}
                deleteTask={deleteTask}
            />
            
        </div>
    )
}

const TaskCard = ({task, addTask, deleteTask, getTasks}) => {
    const [deleted,setDeleted] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const setToggl = () => {
        if (!toggle && !task.childs) {
            setLoading(true)
            getTasks(task._id).then((result) => {
                task.childs = result
                setLoading(false)
                setToggle(true)
            })
        } else {
            setToggle(prev => !prev)

        }
    }

    const onClick = () => {
        deleteTask(task._id).then((result) => {
            result && setDeleted(true)
        })
    }
  return ( !deleted &&
  <div className=" even:bg-slate-50">
    <div className="w-full border p-2 flex justify-between  items-center  hover:border-black">
        <div className="left flex items-center">
            <button className="p-2 border text-white hover:text-black me-2"><MdOutlineDone /></button>
            <div>{task.name}</div>
            <div>{task.exptime}</div>
        </div>
        <div className="flex">
            <button onClick={onClick} 
                className="p-2 border hover:bg-red-400">
                <MdDeleteForever />
            </button>
            <button onClick={() => setToggl()} className="p-2 border">
                {toggle?<MdKeyboardArrowUp />:<MdKeyboardArrowDown /> }
            </button>
        </div>
        
    </div>
    { toggle && !loading && <div className="ms-4  me-1">
        {task.childs && task.childs.map((task) => 
            <TaskCard
                key={task._id}
                task={task}
                addTask={addTask}
                deleteTask={deleteTask}
                getTasks={getTasks}
            />
        )}
        <TaskAddCard
            task={task}
            addTask={addTask} 
            deleteTask={deleteTask} 
            getTasks={getTasks}

        />

        </div>}
  </div>
    
  )
}


const TaskAddCard = ({task, addTask, deleteTask, getTasks}) => {
    const [name, setName] = useState("");
    const [exptime, setExptime] = useState("");

    const [added, setAdded] = useState(null)

    const onClick = () => {
        addTask(name, task._id)
            .then((res) => {
                //toast(res.message)
                toast(res.task._id)
                console.log(JSON.stringify(res.task))
                task.childs && task.childs.push(res.task)
                setAdded(res.task)
            })
            .catch((err) => toast(err))
    }
  return ( added ? 
    <>
    <TaskCard
        key={added._id}
        task={added}
        addTask={addTask}
        deleteTask={deleteTask}
        getTasks={getTasks}

    />
    <TaskAddCard 
        parent={added}
        addTask={addTask}
        deleteTask={deleteTask}
        getTasks={getTasks}

    />
    </>
    :
  <div className="pb-4">
    <div className="w-full border p-2 flex justify-between  items-center  hover:border-black">
        <input className='w-full focus:outline-none' type="text" value={name} onChange={e => setName(e.target.value)} placeholder= {parent?"Add SubTask" : "Add Task"} ></input>
        <div className="flex justify-end align-middle">
            <button onClick={onClick} className=" hover:bg-slate-500 p-2 hover:text-white"><MdAdd /></button> 
        </div>
    </div>
  </div>
    
  )
}

export default Home

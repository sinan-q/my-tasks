import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogout from '../hooks/useLogout'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from "react-simple-toasts";
import { MdOutlineDone, MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp, MdAdd } from "react-icons/md";


const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const axiosPrivate = useAxiosPrivate();
    const [tasks, setTasks] = useState("")

    const signOut = async () => {
        await logout();
        navigate('/auth/login');
    }
    const getData = async () => {
        try {
            const response = await axiosPrivate.get('/task')
            setTasks(response.data.data)
            //toast(response.data.message)

        } catch (err) {
            console.error(err);
        }   
    }
    
    const addTask = async (name, parent, exptime = null, status = 0) => {
        try {
            if (!name && name==="") return toast("Invalid Entry")
            const response = await axiosPrivate.post('/task',JSON.stringify({ name, parent, exptime, status }));
            toast(response.data.message)
        } catch (err) {
            toast(err.response?.data?.message || err.message)
  
        }
    }

    useEffect(() => {
        getData()
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
                />
            })}
            <TaskAddCard
            parent={null}
            addTask={addTask}    
            />
            <button className="border bg-slate-500 text-white rounded-md p-4  hover:bg-slate-400 flex hover:text-white fixed right-12 items-center bottom-12   ">
                <MdAdd/> 
                <div className="  "onClick={()=> {}}>Add Task</div>
            </button>
        </div>
    )
}

const TaskCard = ({task, addTask}) => {
    const [toggle, setToggle] = useState(false)

  return (
  <div className="">
    <div className="w-full border p-2 flex justify-between  items-center  border-black">
        <div className="left flex items-center">
            <button className="p-2 border text-white hover:text-black me-2"><MdOutlineDone /></button>
            <div>{task.name}</div>
            <div>{task.exptime}</div>
        </div>
        
        <button onClick={() => setToggle(prev => !prev)} className="p-2 border flex">
            <div className="">{toggle?<MdKeyboardArrowUp />:<MdKeyboardArrowDown /> }</div>
        </button>
    </div>
    { toggle && <div className="ms-4 me-1">
        {task.childs && task.childs.map((task) => 
            <TaskCard
                key={task._id}
                task={task}
                addTask={addTask}
            />
        )}
        <TaskAddCard
            parent={task._id}
            addTask={addTask}    
        />

        </div>}
  </div>
    
  )
}


const TaskAddCard = ({parent, addTask}) => {
    const [name, setName] = useState("");
  return (
  <div className="pb-4">
    <div className="w-full border p-2 flex justify-between  items-center  border-black">
        <input className='w-full focus:outline-none' type="text" value={name} onChange={e => setName(e.target.value)} placeholder= {parent?"Add SubTask" : "Add Task"} ></input>
        <div className="flex justify-end align-middle">
            <button onClick={() => addTask(name, parent)} className=" hover:bg-slate-500 p-2 hover:text-white"><MdAdd /></button> 
        </div>
    </div>
  </div>
    
  )
}

export default Home

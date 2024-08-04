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
    
    const sendData = async () => {
        try {
            //const response = await axiosPrivate.post('/wa/send',JSON.stringify({ data }));
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
            <div className='text-3xl text-center mb-8'>Template</div>
            { tasks && tasks.map(task => {
                return <TaskCard 
                    task={task}
                />
            })}
            
        </div>
    )
}

const TaskCard = ({task}) => {
  return (
    <div className="w-full border p-2 flex  items-center  border-black">
        <div>{task.name}</div>
        <div>{task.exptime}</div>
        <div className="flex gap-2 justify-end align-middle w-full">
            <button className=""><MdOutlineDone /></button>
            <button className=""><MdAdd /></button>
        </div>
       
    </div>
  )
}


export default Home

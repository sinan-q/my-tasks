import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogout from '../hooks/useLogout'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from "react-simple-toasts";

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
        <div className="absolute    ">
            <div className='text-3xl text-center'>Template</div>
            { tasks && tasks.map(task => {
                return <TaskCard 
                    task={task}
                />
            })}
            <div className="mt-1   ">
                <button className=" border p-2 m-auto text-center w-full hover:bg-red-400 hover:text-white "onClick={signOut}>Sign Out</button>
            </div>
        </div>
    )
}

const TaskCard = ({task}) => {
  return (
    <div className="border border-black">
        <div>{task.name}</div>
    </div>
  )
}


export default Home

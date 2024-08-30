import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
import toast from 'react-simple-toasts';
const LOGIN_URL = '/auth/login';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, accessToken });
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                toast('No Server Response');
            } else
                toast(err.response?.data?.message || 'Unknown Error');
            
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (

        <section>
            <div className='text-3xl text-center'>Sign In</div>
            <form className='flex pb-4 flex-col' onSubmit={handleSubmit}>
                <label className='mt-3' htmlFor="username">Username:</label>
                        <input
                        className='p-1 border border-black'
                        type="text"
                        id="username"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />  

                

                <label className='mt-3' htmlFor="password">Password:</label>
                <input
                    className='p-1 border border-black'
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button className='active:animate-fade animate-reverse mt-4  p-2 bg-black transition-colors duration-500 text-white hover:bg-white hover:text-black border hover:border-black'>Sign In</button>
                <div className="persistCheck">
                    <input
                        className=' h-4 w-4 mb-0.5 mr-1 text-red-500'
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label className=' align-middle hover:text-gray-500 ' htmlFor="persist">Trust This Device</label>
                </div>
            </form>
                
            <div className="hover:text-gray-500">
                <Link to="/register">Need an Account? Sign Up</Link>
            </div>
        </section>

    )
}

export default Login

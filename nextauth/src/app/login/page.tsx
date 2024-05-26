"use client";
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const LoginPage = () => {

const router=useRouter();
    const [user,setUser]=useState({
      email:"",
      password :"",
      
    });

    const [buttonDisabled,setButtonDisabled]=useState(false);
 const [loading,setLoading]=useState(false);
    const onLogin =async()=>{
         try {
            
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile");
         } catch (error:any) {
             console.log("Login failed");
           toast.error(error.message)  
         }
    }

    useEffect(()=>{
  if(user.email.length>0 && user.password.length>0 ){
    setButtonDisabled(false)
  }else{
    setButtonDisabled(true)
  }

    },[user])
  return (
    <div className='bg-gradient-to-r from-slate-500 to-slate-800 flex flex-col items-center 
    justify-center min-h-screen py-2 text-white gap-4'>
        
        <h1  className='text-2xl font-medium text-gray-900 dark:text-white  '>{loading ? "Processing..." : "Login"}</h1>
        <hr />


<label htmlFor="email"  className='text-2xl font-medium text-gray-900 dark:text-white '>email</label>
        <input 
        className="shadow appearance-none border rounded   text-gray-700
         leading-tight focus:outline-none focus:shadow-outline p-2 mb-4 "
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password"  className='text-2xl font-medium text-gray-900 dark:text-white '>password</label>
        <input 
               className="shadow appearance-none border rounded   text-gray-700
               leading-tight focus:outline-none focus:shadow-outline p-2 mb-4 "
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
  <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 
  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
  onClick={onLogin}
 >
    
    {buttonDisabled ? "No Login" :"Login"}</button>
    <Link href="/signup" className=' text-xl font-medium  dark:text-white hover:text-cyan-400 '> Visit Signup page</Link>
        </div>
  )
}

export default LoginPage;
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
    <div className=' bg-slate-800 flex flex-col items-center 
    justify-center min-h-screen py-2 text-white gap-4'>
        
        <h1  className=' text-2xl italic '>{loading ? "Processing..." : "Login"}</h1>
        <hr />


<label htmlFor="email"  className=' text-2xl italic '>email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black gap-4"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password"  className=' text-2xl italic '>password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
  <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none 
 bg-cyan-800 focus:border-gray-600'
  onClick={onLogin}
 >
    
    {buttonDisabled ? "No Login" :"Login"}</button>
    <Link href="/signup"> Visit Signup page</Link>
        </div>
  )
}

export default LoginPage;
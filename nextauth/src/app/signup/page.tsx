 "use client";
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const page = () => {

const router=useRouter();
    const [user,setUser]=useState({
      email:"",
      password :"",
      username :""
    })

    const [buttonDisabled,setButtonDisabled]=useState(false);
 const [loading,setLoading]=useState(false);
    const onSiginup =async()=>{
         try {
            
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
         } catch (error:any) {
             console.log("Signup failed");
           toast.error(error.message)  
         }
    }

    useEffect(()=>{
  if(user.email.length>0 && user.password.length>0 && user.username.length>0){
    setButtonDisabled(false)
  }else{
    setButtonDisabled(true)
  }

    },[user])
  return (
    <div className='bg-gradient-to-r from-slate-900 to-slate-700 flex flex-col items-center 
    justify-center min-h-screen py-2 text-white gap-3'>
        
        <h1 className='text-2xl font-medium text-gray-900 dark:text-white '>{loading ? "Processing..." : "Signup"}</h1>
        <hr />

        <label htmlFor="username" className='text-2xl font-medium text-gray-900 dark:text-white '>usename</label>
<input 
  className="p-2 border border-gray-300 rounded-lg mb-4 
  focus:outline-none focus:border-gray-600 text-black"
id="username"
onChange={(e)=>setUser({...user,username:e.target.value})}
type="text"
placeholder='username'
/>
<label htmlFor="email" className='text-2xl font-medium text-gray-900 dark:text-white '>email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password"  className='text-2xl font-medium text-gray-900 dark:text-white '>password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
  <button className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 
  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
  onClick={onSiginup}
 >
    
    {buttonDisabled ? "No Signup" :"Signup"}</button>
    <Link href="/login"  className=' text-xl font-medium  dark:text-white hover:text-cyan-400 '> Visit login page</Link>
        </div>
  )
}

export default page;
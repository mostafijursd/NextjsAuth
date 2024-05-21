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
    <div className=' bg-slate-800 flex flex-col items-center 
    justify-center min-h-screen py-2 text-white'>
        
        <h1  className=' text-2xl italic '>{loading ? "Processing..." : "Signup"}</h1>
        <hr />

        <label htmlFor="username"  className=' text-2xl italic '>usename</label>
<input 
  className="p-2 border border-gray-300 rounded-lg mb-4 
  focus:outline-none focus:border-gray-600 text-black"
id="username"
onChange={(e)=>setUser({...user,username:e.target.value})}
type="text"
placeholder='username'
/>
<label htmlFor="email"  className=' text-2xl italic '>email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
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
  onClick={onSiginup}
 >
    
    {buttonDisabled ? "No Signup" :"Signup"}</button>
    <Link href="/login"> Visit login page</Link>
        </div>
  )
}

export default page;
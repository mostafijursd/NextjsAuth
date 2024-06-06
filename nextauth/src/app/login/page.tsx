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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-700 ">
      
      
     
      <div className=" bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">{loading ? "Processing..." : "Login"}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-neutral-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-neutral-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              placeholder="password"
            />
            
          </div>
          <div className="flex items-center justify-between ">
            <button
              className=" bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onLogin}
            >
              {buttonDisabled ? "No Login" :"Login"}
            </button>
            <Link href="/signup" className=" inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"> Visit Signup page</Link>
            
          </div> 
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
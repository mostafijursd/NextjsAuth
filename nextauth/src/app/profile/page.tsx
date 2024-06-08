"use client";
import  {  useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProfilePage = () => {

  const router =useRouter();
  const [data,setData]=useState("nothing");

  const getUserDetails=async()=>{
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id)
  
    
  }

  const logout=async()=>{
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
  } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
  }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-700 to-slate-800">
    <div className=" bg-slate-500 bg-opacity-75 p-6 rounded-lg shadow-lg max-w-sm">
      <div className="text-center ">
        <p  className="w-32 h-32 rounded-full mx-auto bg-slate-50"></p>
        
        {/* <h2 className="mt-4 text-2xl font-semibold text-white">John Doe</h2>
        <p className="mt-2 text-gray-600">Software Developer</p> */}
      </div>
      <div className="mt-6">
      <h2 className="p-1 rounded bg-green-700">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
      </div>
     
      <div className="mt-6 text-center">
        <button
          onClick={logout}
          className=" bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-white px-4 py-2 rounded  transition-colors duration-300"
        >
          Logout
        </button>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={getUserDetails}
          className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br  text-white px-4 py-2 rounded  transition-colors duration-300"
        >
         GetUser Details
        </button>
      </div>
    </div>
  </div>
  )
};

export default ProfilePage;
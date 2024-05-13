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
    <div className=' bg-slate-500 flex flex-col  items-center 
    justify-center min-h-screen py-2 text-white gap-4  '>

 

<h1 className=' text-xl rounded-full text-white italic text-center
 bg-teal-700 w-20 h-20 flex items-center justify-center  shadow-md cursor-pointer'>Profile</h1>
            <hr />
            <h3 className=' text-base text-yellow-400' >Profile page</h3>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>

    </div>
  )
}

export default ProfilePage;
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
    <div className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 flex flex-col  items-center 
    justify-center min-h-screen py-2 text-white gap-4  '>

 

<h1 className=' text-xl rounded-full text-white italic text-center
bg-gradient-to-r from-emerald-500 to-emerald-900 w-20 h-20 flex items-center justify-center  shadow-md cursor-pointer'>Profile</h1>
            <hr />
            <h3 className='text-2xl font-medium text-gray-900 dark:text-white ' >Profile page</h3>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 
        font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>

    </div>
  )
}

export default ProfilePage;
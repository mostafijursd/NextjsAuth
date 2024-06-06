"use client";

const page = ({params}:any) => {
  return (
    <div  className=' bg-slate-800 flex flex-col items-center 
    justify-center min-h-screen py-2 text-white gap-4'  >

<h1>Profile page</h1>
<h2 className=" p-3 ml-2 bg-green-400   rounded text-white">{params.id}</h2>
    </div>
  )
}

export default page;
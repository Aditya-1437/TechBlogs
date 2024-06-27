import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'
import { FiLogOut } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";


export default function DashProfile() {
    const {currentuser}  = useSelector((state)=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-6 text-center font-bold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-5'>
            <div className="w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full">
                <img src={currentuser.profilePicture} alt="user" 
                className='rounded-full w-full h-full object-cover border-8' />
            </div>
            <TextInput type='text' id='username' placeholder='Change Dragon Identity' defaultValue={currentuser.username} />
            <TextInput type='email' id='email' placeholder='Change Dragon email' defaultValue={currentuser.email} />
            <TextInput type='password' id='password' placeholder='Change Dragon password' />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update Identity
            </Button>
            <div className="flex justify-between text-red-600">
                <span className='cursor-pointer'><MdDeleteOutline />Delete Your Dragon Account</span>
                <span className='cursor-pointer'><FiLogOut /> Exit the Nest</span>
            </div>
        </form>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { ImProfile } from "react-icons/im";
import { FaSignOutAlt } from "react-icons/fa";
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('')
    const dispatch = useDispatch();
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const urlFromTab = urlParams.get('tab')
        if(urlFromTab){
        setTab(urlFromTab)
        }
    }, [location.search]);
    const handelSignout = async ()=>{
        try {
            const res = await fetch('/api/users/signout',{
                method:'POST',
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message)
        }
    };
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={ImProfile} label='user' labelColor = 'dark' as='div'>
                Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item onClick={handelSignout} className='cursor-pointer text-red-600' icon={FaSignOutAlt}>
                Leave the Nest
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

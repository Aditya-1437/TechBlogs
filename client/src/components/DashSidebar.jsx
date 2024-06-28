
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { ImProfile } from "react-icons/im";
import { FaSignOutAlt } from "react-icons/fa";

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('')
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const urlFromTab = urlParams.get('tab')
        if(urlFromTab){
        setTab(urlFromTab)
        }
    }, [location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={ImProfile} label='user' labelColor = 'dark' as='div'>
                Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item className='cursor-pointer text-red-600' icon={FaSignOutAlt}>
                Leave the Nest
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function OnlyAdminPrivsteRoute() {
    const {currentuser} = useSelector((state)=>state.user)
  return (currentuser && currentuser.isAdmin ? <Outlet /> : <Navigate to='/sign-in' />)
  
};

import React from 'react'
import Navbar from "../components/Navbar.jsx"
import { Outlet } from 'react-router-dom'
const mainlayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default mainlayout
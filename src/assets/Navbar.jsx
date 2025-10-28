import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
<nav className='Navar'>
    <div className='logo'><span>iTask</span></div>
    <div className='list'>
        <ul>
        <li>Home</li>
        <li>Your Task</li>
    </ul>
    </div>

</nav>
  )
}

export default Navbar

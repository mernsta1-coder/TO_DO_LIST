import './Navbar.css'

const Navbar = () => {
  return (
<nav className='Navar'>
    <div className='logo'><span>iTask</span></div>
    <div className='list'>
        <ul>
        <li>Home</li>
        <li>Your Task</li>
        <li><input type='button' className='logoutbtn' value="logout"/></li>
    </ul>
    </div>

</nav>
  )
}

export default Navbar

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../../assets/logo.png"
import PersonIcon from '@mui/icons-material/Person';
import logOutImg from "../../../assets/logout.png"
import { AppContext } from '../../../context';
import menu from "../../../assets/menu.png"
const AdminNavbar = () => {
  const { logout,adminRole } = useContext(AppContext) 
  return (
    <>
    <nav className="navbar navbar-expand-lg  dashboard-navbar d-none d-md-block">
  <div className="container pt-4">
    <Link to='/dasboard' className='navbar-brand'>
    <img src={logo} alt="logo" className='' width={300}/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      {/* <span className="navbar-toggler-icon "></span>  */}
      <img src={menu} alt="menu-icon" width={30} />
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item text-center d-none d-md-block">
         <h2> Dashboard</h2>
        </li>
      </ul>
      <div className="admin-dashboard-btn">
        <div className="user-welcome d-flex align-items-center gap-3">
        <button className='user-btn'>
        <PersonIcon/> 
            {adminRole.userDetails.name}!
        </button>
        <button className='logout-btn' onClick={logout}>
        <img src={logOutImg} className='' />
            Log out
        </button>
        </div>
      </div>
    </div> 
  </div>
</nav>

<hr className='navbar-hr d-none d-md-block'/>
    </> 
  )
}

export default AdminNavbar
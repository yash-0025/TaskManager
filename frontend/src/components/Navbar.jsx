import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { logout } from "../redux/actions/authActions";



const Navbar = () => {

    const authState = useSelector(state => state.authReducer || {isLoggedIn:false});
    const dispatch = useDispatch();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    }

    const handleLogout = () => {
        // alert("Logout");
        dispatch(logout());
    }

    return (
        <>
        <header className='flex justify-between sticky top-0 p-4 bg-white shadow-sm items-center'>
        <h2 className='cursor-pointer uppercase  text-center font-extrabold text-2xl'>
          <Link to="/" > Task Manager </Link>
        </h2>
        <ul className='hidden md:flex gap-4 uppercase font-medium'>
          {authState.isLoggedIn ? (
            <>
              <li className="bg-yellow-400 text-white hover:bg-yellow-600 font-medium rounded-md">
                <Link to='/task/add' className='block w-full h-full px-4 py-2'> <i className="fa-solid fa-plus"></i> Add task </Link>
              </li>
              <li className='py-2 px-3 cursor-pointer hover:bg-rose-700 hover:text-white transition rounded-sm' onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <li className='py-2 px-3 cursor-pointer text-primary bg-green-400 hover:bg-gray-100 transition rounded-sm'><Link to="/login">Login</Link></li>
          )}
        </ul>
        <span className='md:hidden cursor-pointer text-2xl' onClick={toggleNavbar}><i className="fa-solid fa-bars"></i></span>



        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition ${(isNavbarOpen === true) ? 'translate-x-0' : 'translate-x-full'} bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}>
          <div className='flex'>
            <span className='m-4 ml-auto cursor-pointer text-2xl' onClick={toggleNavbar}><i className="fa-solid fa-xmark"></i></span>
          </div>
          <ul className='flex flex-col gap-4 uppercase font-medium text-center'>
            {authState.isLoggedIn ? (
              <>
                <li className="bg-yellow-400 text-white hover:bg-yellow-600 font-medium transition py-2 px-3">
                  <Link to='/task/add' className='block w-full h-full'> <i className="fa-solid fa-plus"></i> Add task </Link>
                </li>
                <li className='py-2 px-3 hover:bg-rose-800 hover:text-white cursor-pointer  transition rounded-sm' onClick={handleLogout}>Logout</li>
              </>
            ) : (
              <li className='py-2 px-3 m-2 cursor-pointer text-primary 
              bg-amber-400 hover:bg-green-400 transition rounded-sm'><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </header>
        </>
    )
}


export default Navbar
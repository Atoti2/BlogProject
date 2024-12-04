import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { FaBlogger } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const NavBar = () => {
  const location = useLocation();
  const { user, logOutUser } = useContext(UserContext)
  console.log(user);
  
  const isHomePage = location.pathname === "/";
  const isAuth = location.pathname === "/register" || location.pathname === "/login"; 
  const isLoggedIn = user != null
  
  const tabs = [
    { route: <FaBlogger />, path: "/", show: true },
    { route: "| Posts |", path: "/posts", show: true },
    { route: "Post ", path: "/update/:id", show: isLoggedIn},
  ];

  return (
    <div className='flex flex-col overflow-hidden'>
      {!isAuth && (
        <ul className={`p-4  ${isHomePage ? 'top-0 right-0 fixed' : 'bg-slate-800 m-0'} w-screen text-center flex justify-between items-center sm:flex-row flex-col shadow-xl`}>
          <div className='flex gap-4 items-center'>
            {tabs.map((tab) => (
              <li key={tab.route}>
                <NavLink className={`${tabs.show ? "invisible" : "visible"} text-2xl font-mono cursor-pointer text-slate-100 hover:text-slate-200 transition-all`} to={tab.path}>{tab.route}</NavLink>
              </li>
            ))}
          </div>

          <div className='flex gap-5 mr-5 text-slate-100 font-mono justify-center items-center'>
            {
              !isLoggedIn ? (
                <>
                <NavLink to="/login">
                  <button className={`${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"}  text-2xl  rounded-md transition-all p-1`}>Sign in</button>
                </NavLink>
                <NavLink to="/register">
                  <button className={`${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"}  text-2xl rounded-md transition-all p-1`}>Sign up</button>
                </NavLink>
                </>
              ) : (
                <>
            <NavLink to={"/"} onClick={() => logOutUser()}>
              <button className={`${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"}  text-2xl  rounded-md transition-all p-1`}>Log out</button>
            </NavLink>
            <div className={`dropdown dropdown-left dropdown-bottom `}>
              <div tabIndex={0} role="button" className={`${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"} p-1 rounded-xl`}><HiDotsVertical />
              </div>
              <ul tabIndex={0} className="dropdown-content menu mt-5 gap-3 bg-slate-800 text-slate-100 rounded-box z-[1] w-52 p-2 shadow">  
                <li className='cursor-pointer hover:scale-[1.03]'>Personal data</li>
                <li className='cursor-pointer hover:scale-[1.03]'>Delete account</li>
              </ul>
            </div>
            <NavLink to="/profile">
              <div className="avatar items-center space-x-5">
                  <spa className="font-bold text-lg text-pink-300">{user.displayName}</spa>
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </NavLink>
                </>
              )
            }
          </div>
        </ul>
      )}
      <Outlet />
    </div>
  );
}

export default NavBar;

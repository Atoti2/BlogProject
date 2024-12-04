import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { FaBlogger } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const location = useLocation();
  const { user, logOutUser } = useContext(UserContext);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  const isHomePage = location.pathname === "/";
  const isAuth = location.pathname === "/register" || location.pathname === "/login"; 
  const isLoggedIn = user != null;

  const tabs = [
    { route: <FaBlogger />, path: "/", show: true },
    { route: "Posts", path: "/posts", show: true },
    { route: "Post ", path: "/update/:id", show: isLoggedIn},
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="flex flex-col overflow-hidden">
      {!isAuth && (
        <ul 
          className={`p-4 z-50 backdrop-blur-lg ${isHomePage ? 'top-0 fixed' : 'bg-slate-800 m-0'} w-screen text-center flex justify-between items-center sm:flex-row flex-col shadow-xl transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
        >
          <div className='flex justify-between items-center w-full'>

            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost backdrop-blur-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 w-full bg-base-100 p-2 rounded-box shadow-lg z-[1]">
              <ul className="menu menu-sm gap-5">
                {tabs.map((tab) => (
                  <li key={tab.route}>
                    <NavLink 
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-mono cursor-pointer transition-all`} 
                      to={tab.path}
                    >
                      {tab.route}
                    </NavLink>
                  </li>
                ))}
                {!isLoggedIn ? (
                  <>
                    <li><NavLink onClick={() => setIsMenuOpen(false)} className="text-2xl font-mono cursor-pointer transition-all" to="/login">Sign in</NavLink></li>
                    <li><NavLink  onClick={() => setIsMenuOpen(false)} className="text-2xl font-mono cursor-pointer transition-all " to="/register">Sign up</NavLink></li>
                  </>
                ) : (
                  <li><NavLink to="/" onClick={() => logOutUser()}>Log out</NavLink></li>
                )}
              </ul>
            </div>
          )}

          <div className="navbar-center hidden lg:flex w-full justify-between items-center">
          <ul className="menu menu-horizontal px-1 flex justify-start items-center gap-5 text-slate-100">
          {tabs.map((tab) => (
  <li key={tab.route}>
    <NavLink 
      className={
        `${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"} 
        text-2xl rounded-md transition-all p-1 
        `
      }
      to={tab.path}
    >
      {tab.route}
    </NavLink>
  </li>
))}

        </ul>


            <div className="flex gap-5 mr-5 text-slate-100 font-mono justify-end items-center">
              {isLoggedIn ? (
                <>
                  <NavLink to={"/"} onClick={() => logOutUser()}>
                    <button className={`${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"} text-2xl rounded-md transition-all p-1`}>Log out</button>
                  </NavLink>
                  <div className="dropdown dropdown-left dropdown-bottom">
                    <div tabIndex={0} role="button" className={`${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"} p-1 rounded-xl`}>
                      <HiDotsVertical />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu mt-5 gap-3 bg-slate-800 text-slate-100 rounded-box z-[1] w-52 p-2 shadow">
                      <li className='cursor-pointer hover:scale-[1.03]'>Personal data</li>
                      <li className='cursor-pointer hover:scale-[1.03]'>Delete account</li>
                    </ul>
                  </div>
                  <NavLink to="/profile">
                    <div className="avatar items-center space-x-5">
                      <span className="font-bold text-lg">{user.displayName}</span>
                      <div className="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <button className={`${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"} text-2xl rounded-md transition-all p-1`}>Sign in</button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className={`${isHomePage ? "hover:bg-slate-800 hover:text-slate-100" : "hover:bg-slate-100 hover:text-slate-800"} text-2xl rounded-md transition-all p-1`}>Sign up</button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </ul>
      )}
      <Outlet />
    </div>
  );
}

export default NavBar;

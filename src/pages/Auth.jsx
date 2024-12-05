import React, { useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { useEffect } from "react";
import Toastify from "../components/Toastify";


const Auth = () => {
  const location = useLocation();  
  const correctText = location.pathname === "/register" ? "Register" : "Login"; 
  const isRegister = location.pathname === "/register";
  const { user, signInUser, signUpUser, msg } = useContext(UserContext);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();  
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'), data.get('password'), data.get('username'));  
    if(!isRegister){
      signInUser(data.get('email'), data.get('password'));  
      
    }else{
      signUpUser(data.get('email'), data.get('password'), data.get('displayName'))
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{correctText}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {
              isRegister && (
                <div className="mb-4">
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  
                  type="text"
                  name="displayName"
                  placeholder="Username"
                  required
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                </div>
              )
            }
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="****"
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isRegister ? "Register" : "Log in"}
          </button>
          
        </form>
          {
            !isRegister && (
              <button
              onClick={() => navigate("/pwreset")}
              className="w-full mt-3 py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Forgot your password?
            </button>
            )
          }
          
          {!isRegister ? (
            <p className="italic text-base text-center mt-3">Don't have an account yet? 
              <NavLink className="text-indigo-700 font-bold" to="/register"> create one</NavLink>
            </p>
          ) : (
            <p className="italic text-base text-center mt-3">Already have an account? 
              <NavLink className="text-indigo-700 font-bold" to="/login"> log in</NavLink>
            </p>
          )}
          <p className="text-center mt-5">Changed your mind? <NavLink className="text-red-700 font-bold" to={"/"}>go home</NavLink></p>
        {msg && <Toastify {...msg}/>}
      </div>
    </div>
  );
};

export default Auth;

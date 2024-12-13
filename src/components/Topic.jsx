import React from 'react'
import { NavLink } from 'react-router';

const Topic = ({ title, url}) => {
  return (
    <div className="card glass w-96 group">
      <div 
        className="card-body p-0 relative overflow-hidden bg-cover bg-center h-72 cursor-pointer"
        style={{
          backgroundImage: `url(${url})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-30 transition-opacity duration-300"></div>

        <div className="absolute inset-0 flex justify-center items-center text-center px-4 py-2">
          <h2 className="text-white text-2xl font-bold z-10 transition-all group-hover:scale-105 duration-300">
            {title}
          </h2>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <NavLink to={`/posts`}>
            <button className="p-3 bg-indigo-700 border-none text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Check it out
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Topic;

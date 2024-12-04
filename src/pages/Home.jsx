import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500'>
        <div className='flex flex-col items-center justify-center h-screen gap-3 font-mono text-slate-200'>
            <h1 className='text-6xl text-center'>Find your interest<span className='text-black'>.</span></h1>
            <p className='text-lg italic'>read or create blogs you are interested in</p>
        </div>
    </div>
  )
}

export default Home
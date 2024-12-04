import React from 'react'
import Topic from '../components/Topic'

const Home = () => {
  const titles = ["Gaming", "Eat", "Sleep"]
  return (
    <div className='bg-gradient-to-br min-h-screen from-indigo-500 to-purple-500'>
        <div className='flex flex-col items-center justify-center h-[500px] gap-3 font-mono text-slate-200'>
            <h1 className='text-6xl text-center'>Find your interest<span className='text-black'>.</span></h1>
            <p className='text-lg italic text-center'>read or create blogs you are interested in</p>
        </div>
        <div className='flex gap-10 justify-center flex-wrap m-10'>
          {titles.map((title) => 
            <Topic title={title}/>
          )}
        </div>
    </div>
  )
}

export default Home
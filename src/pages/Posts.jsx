import React from 'react'
import Post from '../components/Post'
import { useEffect } from 'react';

const Posts = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when this component is loaded
  }, []);
  const titles = [
    {
      title: "Gaming",
      desc: "lorem ipsim gjeaigj eiawjg ioaejfoi aejif ojewaiog jeao gjaoi",
    },
    {
      title: "Eat",
      desc: "lorem ipsim gjeaigj eiawjg ioaejfoi aejif ojewaiog jeao gjaoi",
    },
    {
      title: "Sleep",
      desc: "lorem ipsim gjeaigj eiawjg ioaejfoi aejif ojewaiog jeao gjaoi",
    }
  ]

  return (
    <div className='min-h-screen'>
      <div className='flex gap-10 justify-center flex-col m-10 mt-40'>
          {titles.map((title) => 
            <Post key={title.title} title={title.title} desc={title.desc}/>
          )}
        </div>

    </div>
  )
}

export default Posts
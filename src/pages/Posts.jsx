import React from 'react'
import Post from '../components/Post'
const Posts = () => {
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
      <div className='flex gap-10 justify-center flex-col m-10'>
          {titles.map((title) => 
            <Post title={title.title} desc={title.desc}/>
          )}
        </div>
    </div>
  )
}

export default Posts
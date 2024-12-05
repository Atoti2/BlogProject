import React from 'react'

const Post = ({title, desc}) => {
  return (
    <div className="card sm:card-side  bg-base-100 shadow-xl w-full font-mono">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie"
      className='w-full sm:h-full h-72'
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p className='my-4 line-clamp-2'>{desc}</p>
      <div className="card-actions items-center">
        <button className="p-3 rounded-md text-slate-100 bg-indigo-700 hover:bg-white hover:text-indigo-700 transition-all">Read more</button>
        <p>Likes: 123412</p>
      </div>
    </div>
</div>
    )
}

export default Post
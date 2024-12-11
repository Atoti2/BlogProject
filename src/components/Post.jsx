import React from 'react'

const Post = ({title, desc, img}) => {
  return (
    <div className="card sm:card-side  bg-base-100 shadow-xl w-full font-mono">
  <figure>
    <img
      src={img}
      alt="Movie"
      className='sm:w-72 w-full sm:h-full h-72'
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <h3 className='bg-indigo-700 w-fit text-slate-100 p-1 rounded-xl text-sm'>Cats</h3>
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
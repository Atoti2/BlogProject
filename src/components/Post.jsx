import React from 'react'

const Post = ({title, desc, img}) => {
  const splitDesc = desc.split(' ', 5);
  const truncatedDesc = splitDesc.join(' ') + (desc.split(' ').length > 5 ? '...' : '');
  
  return (
    <div className="card sm:card-side  bg-base-100 shadow-xl w-full font-mono">
  <figure>
    <img
      src={img}
      alt={title}
     className="w-full h-auto sm:w-72 sm:h-64 object-cover"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <h3 className='bg-indigo-700 w-fit text-slate-100 p-1 rounded-xl text-sm'>Cats</h3>
      <p className='my-4 line-clamp-1'>{truncatedDesc}</p>
      <div className="card-actions items-center">
        <button className="p-3 rounded-md text-slate-100 bg-indigo-700 hover:bg-white hover:text-indigo-700 transition-all">Read more</button>
        <p>Likes: 123412</p>
      </div>
    </div>
</div>
    )
}

export default Post
import React from 'react'
import { sanitizeHTML } from '../utils/utils';
import { NavLink, useNavigate } from 'react-router';
const Post = ({title, desc, img, category, id, author}) => {
  const splitDesc = sanitizeHTML(desc).split(' ', 10);
  const truncatedDesc = splitDesc.join(' ') + (desc.split(' ').length > 5 ? '...' : '');
  const navigate = useNavigate()
  return (
    <div className="card sm:card-side  bg-base-100 shadow-xl w-full font-mono ">
     
  <figure className='flex-2'>
    <img
      src={img}
      alt={title}
     className="w-full sm:w-72 sm:h-64 object-cover"
      />
    </figure>
    <div className="card-body flex-1">
      <h2 className="card-title">{title}</h2>
      <h4 className='text-sm'>Author: {author}</h4>
      <h3 className='bg-indigo-700 w-fit text-slate-100 p-2 rounded-xl text-sm'>{category}</h3>
      <p className='my-4 line-clamp-2'>{truncatedDesc}</p>
      <div className="card-actions items-center">
          <button onClick={() => navigate(`detail/${id}`)} className="p-3 rounded-md text-slate-100 bg-indigo-700 hover:bg-white hover:text-indigo-700 transition-all">Read more</button>

        <p>Likes: 123412</p>
      </div>
    </div>
</div>
    )
}

export default Post
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { readPost } from '../utils/crudUtility'
import parse from 'html-react-parser';
import { BiSolidLike } from "react-icons/bi";


const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        readPost(setPost, id)
    }, [])  

    if (!post) {
        return <div>Loading...</div> 
    }

    return (
        <div className='mt-32'>
          <button className='p-3 rounded-md text-slate-100 bg-indigo-700 hover:bg-white hover:text-indigo-700 transition-all ml-5' onClick={() => navigate("/posts")}>Go back</button>
          {post && (
            <div className='flex flex-col items-center justify-center max-w-[800px] m-auto'>
              <img src={post.photo.url} alt={post.title} className='w-auto h-96 max-h-96 rounded-lg shadow-xl object-cover' />
              <h3 className='text-2xl font-mono mt-5 '>{post.title}</h3>
              <div className='text-justify mr-auto ml-5 mt-14 bg-zinc-200 text-slate-900 w-full p-3 font-mono'>{parse(post.story)}</div>
              <div className='mr-auto ml-5 mt-3'>
                <div className='flex items-center gap-3'>
                  <BiSolidLike  className='w-10 h-10'/>
                  <p>0</p>
                </div>
                
              </div>
            
            </div>
          )}
        </div>
    )
}

export default SinglePost

import React from 'react'
import { useParams } from 'react-router'
import { readPost } from '../utils/crudUtility'
import { useEffect } from 'react'
import { useState } from 'react'

const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    useEffect(() => {
        readPost(setPost, id)
    }, [])
    console.log(post);
    
  return (
    <div className='mt-40'>
            <div className="card lg:card-side bg-base-100 shadow-xl">
    <figure>
        <img
        src={post.photo.url}
        alt="Album" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.story}</p>
    </div>
    </div>
    </div>
  )
}

export default SinglePost
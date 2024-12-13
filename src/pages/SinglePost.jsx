import React from 'react'
import { useParams } from 'react-router'
import { readPost } from '../utils/crudUtility'
import { useEffect } from 'react'
import { useState } from 'react'

const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState([])
    useEffect(() => {
        readPost(setPost, id)
    }, [])
    console.log(post);
    
  return (
    <div className='mt-40'>
        {id}
    </div>
  )
}

export default SinglePost
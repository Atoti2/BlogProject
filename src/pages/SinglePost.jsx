import React from 'react'
import { useParams } from 'react-router'
import { readPost } from '../utils/crudUtility'

const SinglePost = () => {
    const { id } = useParams()
    
  return (
    <div className='mt-40'>
        {id}
    </div>
  )
}

export default SinglePost
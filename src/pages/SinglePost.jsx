import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deletePost, readPost } from '../utils/crudUtility'
import parse from 'html-react-parser';
import { BiSolidLike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useConfirm } from 'material-ui-confirm';
import { deletePicture } from '../utils/uploadFile';
import { UserContext } from '../context/UserContext';

const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const confirm = useConfirm();
    const isLoggedIn = user != null;
  
    const handleDelete = async () => {
      try {
        await confirm(({
          description: "Warning! This action is permanent.",
          confirmationText: 'Yes',
          cancellationText: "No",
          title: "Are you sure you want to delete your post?"
        }))
        deletePost(id)
        await deletePicture(post.photo.id)
        navigate("/posts")
      } catch (error) {
        console.log('mégsem:' ,error);
      }
    }


    useEffect(() => {
        readPost(setPost, id)
    }, [])  

    if (!post) {
        return <div>Loading...</div> 
    }
    

    return (
        <div className='mt-32'>
          <button className='p-3 mb-5 rounded-md text-slate-100 bg-indigo-700 hover:bg-white hover:text-indigo-700 transition-all ml-5' onClick={() => navigate("/posts")}>Go back</button>
          {post && (
            <div className='flex flex-col items-center justify-center max-w-[800px] m-auto'>
              <img src={post.photo.url} alt={post.title} className='w-auto h-96 max-h-96 rounded-lg shadow-xl object-cover' />
              <h3 className='text-2xl font-mono mt-5 '>{post.title}</h3>
              <div className='text-justify mr-auto ml-5 mt-14 bg-zinc-200 text-slate-900 w-full p-3 font-mono'>{parse(post.story)}</div>
              <div className='mr-auto ml-5 mt-3'>
                <div className='flex items-center gap-3 '>
                  {isLoggedIn ? (
                    <>
                      <BiSolidLike className='w-10 h-10 cursor-pointer'/>
                      <p className='font-bold text-xl'>0</p>
                    </>
                  )
                  :
                  <>
                    <p>Likes: 0</p>
                  </>
                  }
                  {
                    post.userId == user?.uid && (
                      <MdDelete onClick={handleDelete} className='w-10 h-10 cursor-pointer'/>
                    )
                  }

                </div>
                
              </div>
            
            </div>
          )}
        </div>
    )
}

export default SinglePost

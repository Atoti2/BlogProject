import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deletePost, readLikes, readPost } from '../utils/crudUtility'
import parse from 'html-react-parser';
import { BiSolidLike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useConfirm } from 'material-ui-confirm';
import { deletePicture } from '../utils/uploadFile';
import { UserContext } from '../context/UserContext';
import { MdEdit } from "react-icons/md";
import Alerts from '../components/Alerts';
import { toggleLike } from '../utils/crudUtility';

const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [text, setText] = useState(null)
    const [likesNr, setLikesNr] = useState(0)
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
        readPost(setPost, id, setLikesNr)
    }, [])  

    if (!post) {
        return <div>Loading...</div> 
    }

    const handleLike = async () => {
      if(!user) setText("Only logged in users can like the post!")
      else{
        await toggleLike(user.uid, post.id, setLikesNr)
        readLikes(id, setLikesNr)
      }  
    }
    
    return (
        <div className='mt-32'>
          <button onClick={() => navigate("/posts")} className='p-3 mb-5 rounded-md text-slate-100 bg-indigo-700 hover:bg-white hover:text-indigo-700 transition-all ml-5'>
            Go back
          </button>
          {post && (
            <div className='flex flex-col items-center justify-center max-w-full sm:max-w-[800px] m-auto mx-5 mb-5'>
              <img 
                src={post.photo.url} 
                alt={post.title} 
                className='w-full h-96 max-h-96 rounded-lg shadow-xl object-cover '
              />
              <h3 className='text-2xl font-mono mt-5 text-center sm:text-left'>{post.title}</h3>
              <div className='text-justify sm:mr-auto sm:ml-5 mt-14 bg-zinc-200 text-slate-900 w-full p-3 font-mono'>
                {parse(post.story)}
              </div>
              <div className='sm:mr-auto sm:ml-5 mt-3'>
                <div className='flex items-center gap-3 justify-center sm:justify-start'>
                  {isLoggedIn && post ? (
                    <>
                      <BiSolidLike onClick={handleLike} className='w-10 h-10 cursor-pointer text-purple-600'/>
                      <p className='font-bold text-xl'>{likesNr}</p>
                    </>
                  )
                  :
                  <p className='font-bold'>Likes: {likesNr}</p>
                  }
                  {isLoggedIn && post && post.userId === user?.uid && (
                    <>
                      <MdDelete onClick={handleDelete} className='w-10 h-10 cursor-pointer text-red-600'/>
                      <MdEdit onClick={() => navigate(`../update/${post.id}`)} className="w-10 h-10 cursor-pointer text-sky-600"/>
                      </>
                  )}
                </div>
              </div>
            </div>
          )}
          {text && <Alerts message={text} error={true}/>}
        </div>
    )
}

export default SinglePost

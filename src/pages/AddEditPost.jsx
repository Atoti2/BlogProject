import React from 'react'
import 'quill/dist/quill.snow.css';  
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Home from './Home';
import { Story } from '../components/Story';
import { useForm } from 'react-hook-form';
import { uploadFile } from '../utils/uploadFile';
import { addPost } from '../utils/crudUtility';

const AddEditPost = () => {

    const [story, setStory] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const { register, handleSubmit, formState: { errors }} = useForm();
    
    const {user} = useContext(UserContext)
    if(!user) return <Home/>
    
  const onSubmit = async (data) => {
    setLoading(true)
    let newPostData = {
        ...data,
        story,
        author: user.displayName,
        userId: user.uid,
        category: "Cats"
    }
    
    try {
        const file = data?.file ? data.file[0] : null;
        const { url, id } = file ? await uploadFile(file) : {}
        delete newPostData.file
        newPostData={...newPostData, photo: {url, id}}
        addPost(newPostData)
        setUploaded(true)
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };


    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8'>
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg my-40">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Post upload</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
          <div className="avatar flex justify-center mb-4">
              <div className="w-24 rounded-full">
                <img src={photo}/>
              </div>
            </div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              name="title"
              placeholder="Title"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.title && <p className="text-red-500 text-sm font-bold mb-5">{errors.title.message}</p>}

            <label htmlFor='file' className="block text-sm font-medium text-gray-700">Post image upload (PNG, JPG)</label>
            <input
              {...register('file', {
                validate: (value) => {
                  if (!value[0]) return true;
                  const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
                  const acceptedFormats = ['jpg', 'png'];
                  if (!acceptedFormats.includes(fileExtension)) return 'Invalid file format!';
                  if (value[0].size > 1 * 1000 * 1024) return 'File size too large. (>1MB)';
                  return true;
                }
              })}
              className="flex mt-2 mb-4 h-9 cursor-pointer w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              type="file"
              onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
            <Story setStory={setStory} uploaded={uploaded}/>
            <button
              type="submit"
              className="w-full py-2 mt-4 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >   
              Save
            </button>
          </div>
        </form>
        <div className='flex justify-center flex-col'> 
          {loading && <span className="loading loading-dots loading-lg"></span>}
        {photo && <img className='rounded-md shadow-md h-40' src={photo} />}

        </div>
      </div>
    </div>
    );
};

export default AddEditPost;

import React from 'react'
import 'quill/dist/quill.snow.css';  
import { useQuill } from 'react-quilljs';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Home from './Home';
import { useForm } from 'react-hook-form';

const AddEditPost = () => {

    const {user} = useContext(UserContext)
    if(!user) return <Home/>

    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const { register, handleSubmit, formState: { errors }} = useForm();

      
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const file = data?.file ? data.file[0] : null;
    //   const { url, id } = file ? await uploadFile(file) : null
    //addPost(...)
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };


    const [string, setString] = useState('')
    const theme = 'snow';
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'size': [] }],
        ],
        clipboard: {
            matchVisual: false,
        },
    };
    
    const placeholder = 'Compose an epic...';

    const { quill, quillRef } = useQuill({ theme, modules, placeholder });
    console.log(string);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8'>
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Post upload</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div className="avatar flex justify-center mb-4">
                <img src={photo}/>
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
            //   {...register('file', {
            //     validate: (value) => {
            //       if (!value[0]) return true;
            //       const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
            //       const acceptedFormats = ['jpg', 'png'];
            //       if (!acceptedFormats.includes(fileExtension)) return 'Invalid file format!';
            //       if (value[0].size > 1 * 1000 * 1024) return 'File size too large. (>1MB)';
            //       return true;
            //     }
            //   })}
              className="flex mt-2 h-9 cursor-pointer w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              type="file"
              onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
            {/* <div style={{ height: 300, border: '1px solid lightgray'}} className='mt-[88px]'>
                     <div ref={quillRef} />
                 <button className='btn' onClick={() => setString(quill.root.innerHTML)}>Save</button>
               </div> */}
            <button
              type="submit"
              className="w-full py-2 mt-4 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
        <div className='flex justify-center'> 
          {loading && <span className="loading loading-dots loading-lg"></span>}

        </div>
        {photo && <img className='rounded-md shadow-md h-56' src={photo} />}
      </div>
    </div>
    );
};

export default AddEditPost;

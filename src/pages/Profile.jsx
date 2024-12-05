import React from 'react'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import Toastify from '../components/Toastify';
import { uploadFile } from '../utils/uploadFile';

const Profile = () => {
  const [image, setImage] = useState(null)
  const { user, updateUser, msg} = useContext(UserContext)
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      displayName: user?.displayName || ''
    }
  });
  const onSubmit = async (data) => {
    try {
      const file = data?.file ? data.file[0] : null
      const photoUrl = file ? await uploadFile(file) : null
      photoUrl && console.log(photoUrl);
      
      // updateUser(data.displayName)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8'>
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User profile settings</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
        <div className="avatar flex justify-center mb-4">
         <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
         </div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            {...register('displayName')}
            type="text"
            name="displayName"
            placeholder="Username"
            className="mt-2 mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <label htmlFor='file' className="block text-sm font-medium text-gray-700">Profile picture upload</label>
          
          <input
            {...register('file', {
              validate: (value) => {
                if(!value[0]) return true;
                const fileExtension = value[0]?.name.split('.').pop().toLowerCase()
                const acceptedFormats = ['jpg', 'png']
                if(!acceptedFormats.includes(fileExtension)) return 'Invalid file format!'
                if(value[0].size > 1*1000*1024) return 'File size too large. (>1MB)'
                return true
            }
          })}
            className="flex mt-2 h-9 cursor-pointer w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"  type="file"
            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save changes
          </button>
          </div>
        </form>
        {image && <img className='rounded-md shadow-md h-56' src={image}/>}
      </div>
      {msg && <Toastify {...msg}/>}
    </div>
  )
}

export default Profile
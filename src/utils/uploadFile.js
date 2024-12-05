import axios from 'axios'

export const uploadFile = async (file) => {  
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', import.meta.VITE_CLOUDINARY_UPLOAD_PRESET)
    
    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_v1/${import.meta.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
        return response.data.secure_url
    } catch (error) {
        console.log(error);
        
    }
}
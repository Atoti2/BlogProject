import axios from 'axios';

export const uploadFile = async (file) => {  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return {url: response.data.secure_url, id: response.data.public_id}
    } catch (error) {
        console.error("File upload failed:", error);
        throw error; 
    }
};

const url = "https://totiblogserver.onrender.com/post/"
// const url = "https://totiblogserver.onrender.com"

export const deletePicture = async (id) => {
    console.log(id);
    try {
        await axios.delete(url + id);
        
    } catch (error) {
        console.error("error: " + error)
    }
}
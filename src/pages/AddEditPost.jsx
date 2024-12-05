import React from 'react'
import 'quill/dist/quill.snow.css';  
import { useQuill } from 'react-quilljs';
import { useState } from 'react';
const AddEditPost = () => {
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
        <div style={{ width: 500, height: 300, border: '1px solid lightgray' }} className='mt-[88px]'>
            <div ref={quillRef} />
            <button onClick={() => setString(quill.root.innerHTML)}>Save</button>
        </div>
    );
};

export default AddEditPost;

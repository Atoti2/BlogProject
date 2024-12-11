import React from 'react'
import 'quill/dist/quill.snow.css';  
import { useQuill } from 'react-quilljs';
import { useEffect } from 'react';

const editorStyle={ 
    maxWidth: 500,
    minHeight: 300,
    display:'flex',
    flexDirection:'column',
    justifyContent:'between',
    backgroundColor:'whitesmoke',
    color:'black',
    margin:'auto'
}

export const Story = ({setStory,uploaded}) => {
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

    const placeholder = 'Write something here';

    const { quill, quillRef } = useQuill({ theme, modules, placeholder });

    

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setStory(quill.root.innerHTML);
            });
        }
        uploaded &&  quill.setContents([])
    }, [quill,uploaded])
    
    return (
        <div style={editorStyle}>
            <div  style={{ maxWidth: 500, minHeight: 300}} ref={quillRef} />
        </div>
    );
};


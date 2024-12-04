import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = ({err, signin, signup}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(err){
            toast.error(err, {position: "top-left"})
        }else if(signin){
            toast.success(signin, {position: "top-right"})
            setTimeout(() => {
                navigate("/")

            }, 2000)
        }else if(signup){
            toast.success(signup, {position: "top-right"})
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
    }, [err, signin, signup])
  return (
        <ToastContainer/>
    )
}

export default Toastify
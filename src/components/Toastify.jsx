import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';

const Toastify = ({err, signin, signup, resetPW, update}) => {
    const {setMsg} = useContext(UserContext)
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
        else if(resetPW){
            toast.success(resetPW, {position: "top-right"})
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
        else if(update){
            toast.success(update, {position: "top-right"})
        }
        setMsg({})
    }, [err, signin, signup, resetPW, update])
  return (
        <ToastContainer/>
    )
}

export default Toastify
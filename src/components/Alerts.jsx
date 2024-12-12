import React from 'react'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const Alerts = ({message, error}) => {
    useEffect(() => {
        if(error) toast.error(message)
        else toast.success(message)
    }, [message, error])

  return (
    <div>
        <ToastContainer/>
    </div>
  )
}

export default Alerts
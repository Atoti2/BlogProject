import React from 'react'
import { auth } from '../utils/firebaseApp'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [msg, setMsg] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const signInUser = async (email, password) => {
        
        try {
            await signInWithEmailAndPassword(auth, email, password)
            delete msg?.err
            setMsg({ signin: "Sikeres bejelentkezés" })  
        } catch(error) {
            console.log(error);
            setMsg({ err: error.message }) 
        }
    }
    
    const signUpUser = async (email, password, displayName) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, { displayName })
            delete msg?.err
            setMsg({ signup: "Sikeres regisztráció" })  
        } catch (error) {
            console.log(error);
            setMsg({ err: error.message }) 
        }
    }
    

    const logOutUser = async () => {
        try {
            await signOut(auth)
            delete msg?.signin
        }catch(error){
            console.log(error);
        }
    }
    
    


    return (
        <UserContext.Provider value={{user, signInUser, logOutUser, signUpUser, msg}}>
            {children}
        </UserContext.Provider>
    )
}
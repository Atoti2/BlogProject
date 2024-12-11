import { createContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { readPosts } from "../utils/crudUtility";

export const PostContext = createContext()

export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState(null)
    
    useEffect(() => {
        readPosts(setPosts)
    }, [])

    return (
        <PostContext.Provider value={{posts}}>
            {children}
        </PostContext.Provider>
    )

}
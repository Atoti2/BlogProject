import { addDoc, collection, deleteDoc, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { db } from "./firebaseApp"
import { doc, getDoc } from "firebase/firestore";
import axios from 'axios';


export const readCategories = (setCategories) => {
    const collectionReference = collection(db, 'categories')
    const q=query(collectionReference, orderBy('name', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {setCategories(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))})
    return unsubscribe;
}

export const addPost = async (formData) => {
    const collectionRef = collection(db, 'posts')
    const newItem={...formData, timestamp:serverTimestamp()}
    await addDoc(collectionRef, newItem)
}

export const readPosts = (setPosts, selectedCateg) => {
    const collectionReference = collection(db, 'posts')
    const q=selectedCateg.length == 0 ? 
    query(collectionReference, orderBy('timestamp', 'desc'))
    :
    query(collectionReference, where('category', 'in', selectedCateg))
    const unsubscribe = onSnapshot(q, (snapshot) => {setPosts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))})
    return unsubscribe;
}

export const readPost = async (setPost, postId) => {
    const docRef = doc(db,'posts',postId)
    const docSnap = await getDoc(docRef)
    setPost({...docSnap.data(), id: docSnap.id})
}

export const deletePost = async (id) => {
    const docRef = doc(db,'posts',id)
    await deleteDoc(docRef)
}
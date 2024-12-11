import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Post from '../components/Post';
import { useContext } from 'react';
import { CategContext } from '../context/CategContext';
import { readPosts } from '../utils/crudUtility';
import { useState } from 'react';

const Posts = () => {
  const { categories } = useContext(CategContext)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    readPosts(setPosts)
  
  }, [])
  console.log(posts);
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className='min-h-screen'>
      <div className='flex gap-10 justify-center flex-col m-10 mt-40'>
      <div className="flex gap-10 m-auto flex-col sm:flex-row">
        {categories?.length > 0 && categories.map((category) => (
          <div className='bg-slate-100/50 p-1 rounded-md flex items-center gap-10' key={category.name}>
            <span className="label-text">{category.name}</span>
            <input type="checkbox" className="checkbox" />
          </div>
        ))}
      </div>
        {posts?.length > 0 && posts.map((post) => 
          <Post key={post.id} title={post.title} desc={post.story} img={post.photo.url}/>
        )}
      </div>
    </div>
  );
}

export default Posts;

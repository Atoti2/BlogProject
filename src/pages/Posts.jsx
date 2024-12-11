import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Post from '../components/Post';
import { useContext } from 'react';
import { CategContext } from '../context/CategContext';
import { PostContext } from '../context/PostContext';

const Posts = () => {
  let params = useParams();
  const { categories } = useContext(CategContext)
  const {posts} = useContext(PostContext)
  console.log(posts);
  
  console.log(categories);
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className='min-h-screen'>
      <div className='flex gap-10 justify-center flex-col m-10 mt-40'>
      <div className="flex gap-10 m-auto flex-col sm:flex-row">
        {categories.map((category) => (
          <div className='bg-slate-100/50 p-1 rounded-md flex items-center gap-10' key={category}>
            <span className="label-text">{category.name}</span>
            <input type="checkbox" className="checkbox" />
          </div>
        ))}
      </div>
        {posts.map((post) => 
          <Post key={post.id} title={post.title} desc={post.story} img={post.photo.url}/>
        )}
      </div>
    </div>
  );
}

export default Posts;

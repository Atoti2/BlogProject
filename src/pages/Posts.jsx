import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CategContext } from '../context/CategContext';
import Post from '../components/Post';
import { readPosts } from '../utils/crudUtility';
import { useSearchParams } from 'react-router';

const Posts = () => {
  const { categories } = useContext(CategContext);
  const [searchParams] = useSearchParams()
  const [selCateg, setSelCateg] = useState(searchParams.get('ctg') ? [searchParams.get('ctg')] : [])
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    readPosts(setPosts, selCateg);
  }, [selCateg]);

  const handleCategoryChange = (categoryName) => {
    setSelCateg(prevState => {
      if (prevState.includes(categoryName)) {
        return prevState.filter(category => category !== categoryName);
      } else {
        return [...prevState, categoryName];
      }
    });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen'>
      <div className='flex gap-10 justify-center flex-col m-10 mt-40'>
        <div className="flex gap-10 m-auto flex-col sm:flex-row">
          {categories?.length > 0 && categories.map((category) => (
            <div
              className=' p-1 rounded-md flex items-center gap-10'
              key={category.name}
            >
              <span className="label-text">{category.name}</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={selCateg.includes(category.name)}  
                onChange={() => handleCategoryChange(category.name)}
              />
            </div>
          ))}
        </div>

          {posts.length > 0 ? (
            posts && posts.map((post) => (
              <Post key={post.id} title={post.title} desc={post.story} img={post.photo.url} category={post.category} id={post.id} author={post.author}/>
            ))
          )
          :
          <p className='text-red-600 text-center font-bold text-lg'>No post available for the selected category.</p>
          }
       
        
      </div>
    </div>
  );
};

export default Posts;

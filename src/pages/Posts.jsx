import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CategContext } from '../context/CategContext';
import Post from '../components/Post';
import { readPosts } from '../utils/crudUtility';

const Posts = () => {
  const { categories } = useContext(CategContext);
  const [posts, setPosts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  console.log(posts);
  
  useEffect(() => {
    readPosts(setPosts);
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const filtered = posts.filter(post =>
        selectedCategories.includes(post.category)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategories, posts]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories(prevState => {
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
              className='bg-slate-100/50 p-1 rounded-md flex items-center gap-10'
              key={category.name}
            >
              <span className="label-text">{category.name}</span>
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => handleCategoryChange(category.name)}
              />
            </div>
          ))}
        </div>

        {filteredPosts?.length > 0 ? (
          filteredPosts.map((post) => (
            <Post key={post.id} title={post.title} desc={post.story} img={post.photo.url} category={post.category}/>
          ))
        ) : (
          <div className="text-center text-lg text-red-500">No posts available for the selected categories.</div>
        )}
      </div>
    </div>
  );
};

export default Posts;

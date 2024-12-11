import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Post from '../components/Post';
import { useContext } from 'react';
import { CategContext } from '../context/CategContext';

const Posts = () => {
  let params = useParams();
  const { categories } = useContext(CategContext)
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const titles = [
    {
      title: "Gaming",
      desc: "lorem ipsim gjeaigj eiawjg ioaejfoi aejif ojewaiog jeao gjaoi",
    },
    {
      title: "Eating",
      desc: "lorem ipsim gjeaigj eiawjg ioaejfoi aejif ojewaiog jeao gjaoi",
    },
    {
      title: "Sleeping",
      desc: "lorem ipsim gjeaigj eiawjg ioaejfoi aejif ojewaiog jeao gjaoi",
    }
  ];

  const filteredPosts = params.id === "all"
    ? titles
    : titles.filter((post) => post.title.toLowerCase() === params.id.toLowerCase());

  return (
    <div className='min-h-screen'>
      <div className='flex gap-10 justify-center flex-col m-10 mt-40'>
      <div className="flex gap-10 m-auto flex-col sm:flex-row">
        {categories.map((category) => (
          <div className='bg-slate-100/50 p-1 rounded-md flex items-center gap-10'>
          <span className="label-text">{category.name}</span>
          <input type="checkbox" defaultChecked className="checkbox" />
          
          </div>
        ))}
      </div>
        {filteredPosts.map((title) => 
          <Post key={title.title} title={title.title} desc={title.desc}/>
        )}
      </div>
    </div>
  );
}

export default Posts;

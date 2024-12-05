import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Post from '../components/Post';

const Posts = () => {
  let params = useParams();

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
        {filteredPosts.map((title) => 
          <Post key={title.title} title={title.title} desc={title.desc}/>
        )}
      </div>
    </div>
  );
}

export default Posts;

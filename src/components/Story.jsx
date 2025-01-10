import { useState, useEffect } from 'react';
import Editor from 'react-simple-wysiwyg';

export const Story = ({ setStory, uploaded, story="Write something here" }) => {
  const [html, setHtml] = useState("Write something here");

  useEffect(() => {
    setHtml(story);
  }, [story]);

  return (
    <Editor
      className="rsw-ce min-h-40 max-w-[600px]"
      value={html}
      onChange={(e) => setHtml(e.target.value)}
      onBlur={() => setStory(html)} 
    />
  );
};

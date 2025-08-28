import React from 'react';  
import Article from '../components/Article';  

const ArticlePage = () => {  
  const title = "Sample Article Title";  
  const content = "This is the content of the article. It can include multiple paragraphs, images, and other elements to make the article more engaging.";  

  return (  
    <div className="p-6">  
      <Article title={title} content={content} />  
    </div>  
  );  
};  

export default ArticlePage;
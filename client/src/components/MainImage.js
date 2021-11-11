import React from 'react';

const MainImage = ({ contents, imageLink, subcontents }) => {
  return (
    <div className="MainImageContainer">
      <div>
        {contents.map((content, i) => (
          <div className="content" key={i}>
            {content}
          </div>
        ))}
        {subcontents.map((content, i) => (
          <div className="subcontent" key={i}>
            {content}
          </div>
        ))}
      </div>
      <img className="content-img" src={imageLink} alt=""></img>
    </div>
  );
};

export default MainImage;

// modules
import React from 'react';

// styles
import './ListedVideo.css';

const listedVideo = (props) => (
  <article className="video" onClick={props.clicked}>
    <div className="image-placeholder">
      <a href="https://placeholder.com/"><img alt="video preview" src={props.imageUrl}></img></a>
    </div>
    <div className="content">
      <h3>{props.title}</h3>
      <p> {props.author}</p>
      <p> {props.duration} </p>
      
    </div>
  </article>
);


export default listedVideo;
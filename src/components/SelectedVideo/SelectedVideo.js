// modules
import React, { Component } from 'react';

// styles
import './SelectedVideo.css';

class SelectedVideo extends Component {
  state = {
    selectedVideo: null
  }

  // get the selected video from db
  componentDidUpdate() {
    console.log(this.props)
    
    // video was selected
    if (this.props.id) {
      // selected video is unset, or it's set and its value(previous) is not equal to the (current) selected value.
      // this prevents infinite loop of setting state and updating component
      if (!this.state.selectedVideo || (this.state.selectedVideo && this.state.selectedVideo._id !== this.props.id)) {
        fetch("http://localhost:10327/api/getData/videos/" + this.props.id)
          .then(data => data.json())
          .then(res => {
            this.setState({ selectedVideo: res.data })
          })
          .catch(error => console.log(error));
        }
      }
    }


  render() {
    let video = null;
    
    if (this.props.id) 
    {
      video = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (this.state.selectedVideo) {
      video = (
        <div className="selected-video">
          <h1>{this.state.selectedVideo.title}</h1>
          <p>{this.state.selectedVideo.author}</p>
          
          <iframe title='y-video-selected' width="420" height="315"
            src={"http://www.youtube.com/embed/" + this.state.selectedVideo.videoId}>
          </iframe>
          
          <div className="navigation-link">
            <input className="input-field" value={"https://localhost:3000/videoplayer/" + this.state.selectedVideo._id } readOnly></input>
            <a className="button-go" href={"/videoplayer/" + this.state.selectedVideo._id }>GO</a>
          </div>
        </div>
      );
    }

    return video
  }
}

export default SelectedVideo;
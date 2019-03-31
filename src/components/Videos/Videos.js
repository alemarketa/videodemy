// modules
import React, { Component } from 'react';

// components
import ListedVideo from '../ListedVideo/ListedVideo'
import SelectedVideo from '../SelectedVideo/SelectedVideo'

// moment packages
var moment = require('moment')
require('moment-duration-format')

class Videos extends Component {

  state = {
    error: false,
    selectedVideoId: null,
    videos: [],
  };


  componentDidMount() {

    fetch("http://localhost:10327/api/getData/videos")
      .then(data => data.json())
      .then(allVideos => {
        
        let videoObjectsWithDuration = allVideos.data
        
        // call YT api foreach video
        for (let [i, video] of allVideos.data.entries()) {
          fetch("https://www.googleapis.com/youtube/v3/videos?id=" + video.videoId + "&part=contentDetails&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
            .then(responseYoutube => responseYoutube.json())
            .then(videoMetaData => {
              
              // has metadata duration
              if(videoMetaData.items.length > 0) {
                let duration = videoMetaData.items[0].contentDetails['duration']
                //let durationFormated = duration.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '')
                let durationFormated = moment.duration(duration).format('hh:mm:ss')
                videoObjectsWithDuration[i]['duration'] = durationFormated
                videoObjectsWithDuration[i]['imageUrl'] = 'https://via.placeholder.com/150'
              }

              // doesn't have metadata duration
              else {
              videoObjectsWithDuration[i]['duration'] = 0
              videoObjectsWithDuration[i]['imageUrl'] = 'https://via.placeholder.com/150'
              }
              
            })
            .catch(error => console.error(error))
        }

        //update state, 1000 = wait until all videos are fetched
        setTimeout(() => {
          this.setState({ videos: videoObjectsWithDuration })
        }, 1000)

      })
      .catch(error => console.log(error))
    };



  // set selectedVideoId inside state + re-render component
  onSelectedVideo = (videoId) => {
    this.setState({ selectedVideoId: videoId })
  }


  render () {
    let videos;

    if(this.state.error) {
      videos = <p style={{ textAlign: 'center' }}> Videos cannot be loaded</p>;
    }

    if(this.state.videos.length === 0) {
      videos = <p style={{ textAlign: 'center' }}> Loading...</p>;
    }

    if (!this.state.error && this.state.videos.length > 0) {
      videos = this.state.videos.map(video => {
        return (
            <ListedVideo
              key={video._id}
              author={video.author}
              imageUrl={video.imageUrl}
              duration={video.duration}
              title={video.title}
              clicked={() => this.onSelectedVideo(video._id)} />
          );
        });
      }

      return (
        <div>
          <section className="videos">
            {videos}
          </section>
          <section className="selected-video">
            <SelectedVideo id={this.state.selectedVideoId} />
          </section>
        </div>
    )
  }
}

export default Videos
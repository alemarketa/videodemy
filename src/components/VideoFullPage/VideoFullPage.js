// modules
import React, {Component} from 'react';
import  Youtube  from 'react-youtube';

// styles
import './VideoFullPage.css';



class VideoFullPage extends Component {
  
  state = {
    videoObject : null,
    timeTextArray: []
  }

  constructor(props) {
    super(props);
    this.videotime = 0;
    this.timeupdater = null
    this._onReady = this._onReady.bind(this)
  }

    componentDidMount() {
     
      if (this.props.match.params.id) 
      {
        // get the selected video from db
        fetch("http://localhost:10327/api/getData/videos/" + this.props.match.params.id)
        .then(data => data.json())
        .then(res => 
        {
          // if the questions array is not empty
          if (res.data.questions.length > 0) 
          {
            // for each question inside the question array, i = index
            for(let [i,question] of res.data.questions.entries()) 
            {
              // get question from db
              fetch("http://localhost:10327/api/getData/questions/" + question.questionId)
              .then( dataQuestion => dataQuestion.json())
              .then(resQuestion => 
              {
                // set text key inside related question object to the fetched question[text] value
                let videoObjectWithText = res.data
                videoObjectWithText.questions[i]['text'] = resQuestion.data.text
                
                // update videoObject only when all questions have text assigned, prevents repeated re-rendering
                if(i === res.data.questions.length-1) 
                {
                  this.setState({ videoObject: videoObjectWithText })
                }
              })
            }
          }
          // if video has no questions
          if(res.data.questions.length === 0) 
          {
            this.setState({ videoObject: res.data})
          }
        })
        .catch(error => console.log(error));
      }

    }


    render() {

      const opts = {
        height: '390',
        width: '640',
      }

      let video = <p style={{ textAlign: 'center' }}>Video cannot be loaded</p>;

      if (this.props.match.params.id) {
        video = <p style={{ textAlign: 'center' }}>Loading...</p>;
      }

      if (this.state.videoObject) {
        console.log('state-fullVideo', this.state.videoObject)

        // video with related questions => has onReady
        if(this.state.videoObject.questions.length > 0) {
          video = (
            <div className="FullVideo">
              <h1>{this.state.videoObject.title}</h1>
              <div>
                <Youtube
                  videoId={this.state.videoObject.videoId}
                  opts={opts}
                  onReady={this._onReady}
                />
              </div>
            </div>
          );
        }

        // video with no questions
        if (this.state.videoObject.questions.length == 0) {
          video = (
            <div className="FullVideo">
              <h1>{this.state.videoObject.title}</h1>
              <div>
                <Youtube
                  videoId={this.state.videoObject.videoId}
                  opts={opts}
                />
              </div>
            </div>
          );
        }

      }

      return video
      
    }

      // display alert window when time of the question is reached
      _onReady(event){
        var videoQuestions = this.state.videoObject.questions

        // get currentTime of the video every 1s
        function updateTime() {
          var oldTime = this.videotime;

          if (event.target && event.target.getCurrentTime) {
            this.videotime = event.target.getCurrentTime();
          }

          if (this.videotime !== oldTime) {
            onProgress(this.videotime);
          }


          // check if current time === question time, show alert
          function onProgress(time) { 
            var timeRoundedDown = Math.floor(time)
            console.log('timeRoundedDown', timeRoundedDown)
            // if timeRoundedDown is the same as any time of object inside the questions array
            if (videoQuestions.some(el => el.time === timeRoundedDown))
            {
              event.target.pauseVideo()

              // get corresponding object 
              var targetQuestion = videoQuestions.filter(obj => {
                return obj.time === timeRoundedDown
              })

              // playVideo() after clicking on 'OK' inside alert. Alert returns 'undefined', therefore !window.alert 
              setTimeout(function () {
                if(!window.alert(targetQuestion[0]['text'])) event.target.playVideo();
              }, 3)     
            }
          }
        }
        this.timeupdater = setInterval(updateTime, 1000); 
      }

    }
  

export default VideoFullPage;


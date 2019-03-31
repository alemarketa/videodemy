// modules
import React, { Component } from 'react';
import { Route } from 'react-router-dom'

// components
import Videos from '../Videos/Videos';

// styles
import './MainPage.css';
import VideoFullPage from '../VideoFullPage/VideoFullPage';



class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <Route path="/" component={Videos} exact />
        <Route path="/videoplayer/:id" component={VideoFullPage}/> 
      </div>
    );
  }
}


export default MainPage;
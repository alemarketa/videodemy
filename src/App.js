import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
require('dotenv').config()

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

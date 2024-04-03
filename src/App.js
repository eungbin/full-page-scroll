import './App.css';
import React, {  } from 'react';
import FullPageScroll from './components/FullPageScroll';

function App() {

  return (
    <FullPageScroll>
      <div id='fp-contents' style={{backgroundColor:'orange', height:'100vh'}}></div>
      <div id='fp-contents' style={{backgroundColor:'lightcoral', height:'100vh'}}></div>
      <div id='fp-contents' style={{backgroundColor:'orange', height:'100vh'}}></div>
      <div id='fp-contents' style={{backgroundColor:'lightcoral', height:'100vh'}}></div>
    </FullPageScroll>
  );
}

export default App;
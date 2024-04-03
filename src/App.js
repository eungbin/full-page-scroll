import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Main from './components/Main';

function App() {

  return (
    <Main>
      <div id='fp-contents' style={{backgroundColor:'orange', height:'100vh'}}></div>
      <div id='fp-contents' style={{backgroundColor:'lightcoral', height:'100vh'}}></div>
      <div id='fp-contents' style={{backgroundColor:'orange', height:'100vh'}}></div>
      <div id='fp-contents' style={{backgroundColor:'lightcoral', height:'100vh'}}></div>
    </Main>
  );
}

export default App;
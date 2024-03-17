import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Main from './components/Main';

function App() {
  const scrolling = useRef(false);
  const currentPage = useRef(0); // now page
  const totalPage = useRef(0);   // all page's length
  const outerDiv = useRef(null);
  const contents = useRef(null);

  useEffect(() => {
    totalPage.current = document.getElementById('outer').children.length;
    contents.current = document.getElementById('outer').children;
    outerDiv.current = document.getElementById('outer');

    outerDiv.current.addEventListener('wheel', handleWheel);
    return () => {
      outerDiv.current.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    if(scrolling.current) return;

    const { deltaY } = e;
    if(deltaY < 0) scrollUp();
    else scrollDown();
  }

  const scrollUp = () => {
    if(currentPage.current === 0) return;

    currentPage.current -= 1;
    const pageHeight = outerDiv.current?.children.item(0)?.clientHeight; // 100vh(화면 세로 길이)

    if(pageHeight && outerDiv.current) {
      window.scrollTo({
        top: pageHeight * (currentPage.current-1),
				left: 0,
				behavior: "smooth",
      })
    }
    scrolling.current = true;
    setTimeout(() => {
      scrolling.current = false;
    }, 500);
  }

  const scrollDown = () => {
    if(currentPage.current === totalPage.current-1) return;

    currentPage.current += 1;
    const pageHeight = outerDiv.current?.children.item(0)?.clientHeight; // 100vh(화면 세로 길이)

    if(pageHeight && outerDiv.current) {
      window.scrollTo({
        top: pageHeight * (currentPage.current+1),
				left: 0,
				behavior: "smooth",
      })
    }
    scrolling.current = true;
    setTimeout(() => {
      scrolling.current = false;
    }, 500);
  }

  return (
    <div className="App" id={'outer'}>
      <Main color={'aquamarine'} innerContents={'first'} id={'fp-contents'} />
      <Main color={'yellow'} innerContents={'second'} id={'fp-contents'} />
    </div>
  );
}

export default App;
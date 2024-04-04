import React, { useState, useEffect, useRef } from 'react';
import './css/Main.css';

export default function FullPageScroll(props) {
  const scrolling = useRef(false);
  const dragging = useRef(false);
  const currentPage = useRef(0); // now page
  const totalPage = useRef(0);   // all page's length
  const outerDiv = useRef(null);
  const contents = useRef(null);
  const mouseScreenY = useRef(0);
  const initMouseScreenY = useRef(0);
  const pageHeight = useRef(0);

  useEffect(() => {
    totalPage.current = document.getElementById('outer').children.length;
    contents.current = document.getElementById('outer').children;
    outerDiv.current = document.getElementById('outer');
    pageHeight.current = outerDiv.current?.children.item(0)?.clientHeight; // 100vh(화면 세로 길이)

    outerDiv.current.addEventListener('wheel', handleWheel);
    outerDiv.current.addEventListener('touchstart', touchDown);
    outerDiv.current.addEventListener('toudchend', touchUp);
    outerDiv.current.addEventListener('touchmove', handleScroll);
    outerDiv.current.addEventListener('mousedown', mouseDown);
    outerDiv.current.addEventListener('mouseup', mouseUp);
    outerDiv.current.addEventListener('mousemove', handleMouse);
    return () => {
      outerDiv.current.removeEventListener('wheel', handleWheel);
      outerDiv.current.removeEventListener('touchstart', touchDown);
      outerDiv.current.removeEventListener('toudchend', touchUp);
      outerDiv.current.removeEventListener('touchmove', handleScroll);
      outerDiv.current.removeEventListener('mousedown', mouseDown);
      outerDiv.current.removeEventListener('mouseup', mouseUp);
      outerDiv.current.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  /**
   * Desktop mouse wheel
   * @param {*} e 
   */
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

    if(pageHeight.current && outerDiv.current) {
      window.scrollTo({
        top: pageHeight.current * (currentPage.current),
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

    if(pageHeight.current && outerDiv.current) {
      window.scrollTo({
        top: pageHeight.current * (currentPage.current),
				left: 0,
				behavior: "smooth",
      })
    }
    scrolling.current = true;
    setTimeout(() => {
      scrolling.current = false;
    }, 500);
  }

  const scrollBack = () => {

    window.scrollTo({
      top: pageHeight.current * (currentPage.current),
			left: 0,
			behavior: "smooth",
    })
  }

  /**
   * Mobile touch
   * @param {*} e 
   */
  const touchDown = (e) => {
    console.log(e);
  }
  const touchUp = (e) => {
    console.log(e);
  }

  /**
   * Desktop mouse drag
   * @param {*} e 
   */
  const mouseDown = (e) => {
    mouseScreenY.current = e.screenY;
    initMouseScreenY.current = e.screenY;
    dragging.current = true;
  }
  const mouseUp = (e) => {
    const movedMouseY = e.screenY-initMouseScreenY.current;

    if(Math.abs(movedMouseY) > pageHeight.current/2) {
      if(movedMouseY > 0) {
        scrollUp();
      } else {
        scrollDown();
      }
    } else {
      scrollBack();
    }
    dragging.current = false;
  }

  const handleScroll = (e) => {
    e.preventDefault();
  }

  const handleMouse = (e) => {
    let movedMouseY = e.screenY - mouseScreenY.current;
    if(dragging.current) {
      window.scrollBy(0, movedMouseY * -1);
      mouseScreenY.current = e.screenY;
    }
  }

  return (
    <div className="container-fp" id={'outer'}>
      {props?.children}
    </div>
  );
}
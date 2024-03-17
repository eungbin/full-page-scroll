import React, { useState, useEffect } from 'react';
import './css/Main.css';

export default function Main(props) {
  const [bgColor, setBgColor] = useState('white');
  useEffect(() => {
    setBgColor(props.color);
  }, [props]);

  return (
    <div className='container' style={{backgroundColor:bgColor }} id={props.id}>
      {props.innerContents}
    </div>
  );
}
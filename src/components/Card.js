import React from 'react';
import '../styles/Card.css';

function Card(props) {
  return (
    <div className="my-card">
      { props.children } 
    </div>
  )
}

export default Card;

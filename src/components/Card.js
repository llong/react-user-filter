import React from 'react';
import './Card.css';

const Card = ({ firstName, lastName, city, state, email, phone, photo, onClick }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <i className="fas fa-user-edit edit-btn" onClick={ onClick } />
        <span className='card-user-name'>{ `${ firstName } ${ lastName }` }</span>
      </div>
      <div className='card-body'>
        <img className='card-photo' src={ photo } alt='' />
        <span>{ email }</span>
        <span>{ phone }</span>
        <span>{ `${ city }, ${ state }` }</span>
      </div>
    </div>
  )
}

export default Card;

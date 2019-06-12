import React from 'react';
import './Card.css';


export default class Card extends React.Component {
  render() {
    const { firstName, lastName, city, state, email, phone, photo, onClick } = this.props;
    return (
      <div className='card'>
        <div className='card-header'>
          <i className="fas fa-user-edit edit-btn" onClick={ onClick } />
          <span className='card-user-name'>{ `${ firstName } ${ lastName }` }</span>
        </div>
        <div className='card-body'>
          <img className='card-photo' src={ photo } />
          <span>{ email }</span>
          <span>{ phone }</span>
          <span>{ `${ city }, ${ state }` }</span>
        </div>
      </div>
    )
  }
}
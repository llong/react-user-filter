import React from 'react';
import './EditUserForm.css';

export default class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      state: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state);
  }

  componentDidMount() {
    this.setState({ ...this.props })
  }

  render() {
    const { cancel, submit } = this.props;
    const { firstName, lastName, email, phone, city, state } = this.state;
    return (
      <div className='edit-user-form'>
        <form onSubmit={ this.handleSubmit }>
          <input
            name='firstName' 
            type='text' 
            value={ firstName }
            placeholder={ this.props.firstName }
            onChange={ this.handleChange }
          />
          <input
            name='lastName' 
            type='text'
            value={ lastName }
            placeholder={ this.props.lastName }
            onChange={ this.handleChange }
          />
          <input
            name='email' 
            type='text'
            value={ email }
            placeholder={ this.props.email }
            onChange={ this.handleChange }
          />
          <input
            name='phone' 
            type='text'
            value={ phone }
            placeholder={ this.props.phone }
            onChange={ this.handleChange }
          />
          <input
            name='city' 
            type='text'
            value={ city }
            placeholder={ this.props.city }
            onChange={ this.handleChange }
          />
          <input
            name='state' 
            type='text'
            value={ state }
            placeholder={ this.props.state }
            onChange={ this.handleChange }
          />
          <button type='submit' className='submit-btn'>Submit</button>
          <button className='cancel-btn' onClick={ cancel }>Cancel</button>
        </form>
      </div>
    )
  }
}


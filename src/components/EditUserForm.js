import React, { useState, useEffect } from 'react';
import './EditUserForm.css';

const EditUserForm  = props => {
  const [state, setState] = useState({
    firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      state: ''
  })

 const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
    console.log([e.target.name], e.target.value)
    console.log(state)
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.submit(state);
  }

  const renderTextInputs = () => {
    return Object.entries(state).map(([key, value]) => (
      <input
          key={ key }
          name={ key }
          type='text'
          value={ value.toString() }
          placeholder={ value.toString() }
          onChange={ handleChange }
        />
    ))
  }

  useEffect(() => {
    let { cancel, submit, ...rest } = props;
    setState({...rest})
  }, [props]);

  
    const { cancel } = props;
    return (
      <div className='edit-user-form'>
        <form onSubmit={ handleSubmit }>
          { renderTextInputs() }
          <button type='submit' className='submit-btn'>Submit</button>
          <button className='cancel-btn' onClick={ cancel }>Cancel</button>
        </form>
      </div>
    )
}

export default EditUserForm;

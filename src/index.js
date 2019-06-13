import React, { Component } from 'react';
import { render } from 'react-dom';
import sortBy from 'lodash/sortBy';
import './style.css';
import Card from './components/Card';
import EditUserForm from './components/EditUserForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      filterText: '',
      editMode: false,
      activeUser: null,
      activeUserIndex: null
    };
  }

  componentDidMount() {
    // Fetch user list from API
    fetch('https://randomuser.me/api/?results=20')
      .then(res => res.json())
      .then(data => this.setState({ users: data.results }));
  }

  renderUsers = () => {
    const { users, filterText } = this.state;
    if (users.length) {
      const filteredList = users.filter((user) =>  JSON.stringify(user).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
      return (
       filteredList.map((user, index) => { 
            return (
              <Card
                key={ user.phone }
                firstName={ user.name.first }
                lastName={ user.name.last }
                phone={ user.phone }
                email={ user.email }
                city={ user.location.city }
                state={ user.location.state }
                photo={ user.picture.large }
                onClick={ () => this.editUser(user, index) }
              />
            )
        })
      )
    }
  }

  sortUsers = property => {
    const { users } = this.state;
    if (users.length) {
      const sortedUsers = sortBy(users, property);
      this.setState({ users: sortedUsers });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  editUser = (user, index) => {
    this.setState({ editMode: true, activeUser: user, activeUserIndex: index });
  }

  updateUser = state => {
    const { activeUserIndex, activeUser } = this.state;
    const users = this.state.users;
    const updatedUser = {
      ...activeUser,
      name: {
        first: state.firstName,
        last: state.lastName,
      },
      phone: state.phone,
      email: state.email,
      location: {
        city: state.city,
        state: state.state
      }
    }
    users[activeUserIndex] = updatedUser;
    this.setState({ users, editMode: false });
  }

  render() {
    const { filterText, editMode, activeUser } = this.state;
    return (
      <div>
        <input 
          type='text' 
          name='filterText' 
          className='user-filter' 
          onChange={ this.handleChange } 
          value={ filterText }
          placeholder='Filter list...'
        />
        <p>
          <span>Sort User List: </span>
          <select onChange={ e => this.sortUsers(e.target.value)}>
            <option>&nbsp;</option>
            <option value='name.first'>First Name</option>
            <option value='name.last'>Last Name</option>
            <option value='phone'>Phone</option>
            <option value='email'>Email</option>
            <option value='location.city'>City</option>
            <option value='location.state'>State</option>
          </select>
        </p>
        { editMode && (
          <EditUserForm 
            firstName={ activeUser.name.first }
            lastName={ activeUser.name.last }
            email={ activeUser.email }
            phone={ activeUser.phone }
            city={ activeUser.location.city }
            state={ activeUser.location.state }
            submit={ this.updateUser }
            cancel={ () => this.setState({ activeUser: null, editMode: false })}
          />
         ) 
        }
        <div className='card-container'>{ this.renderUsers() }</div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

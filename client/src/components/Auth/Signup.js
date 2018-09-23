import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
   username: '',
   email: '',
   password: '',
   passwordConfirmation: ''
}

class Signup extends Component {
   state = { ...initialState }

   clearState = () => {
      this.setState({ ...initialState })
   }

   validateForm = () => {
      const {username, email, password, passwordConfirmation} = this.state;
      const isValid = !username || !email || !password || password !== passwordConfirmation;
      return isValid;
   }

   handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value})
   }
   handleSubmit = (event, signupUser) => {
      event.preventDefault();
      signupUser().then(async ({data}) => {
         console.log(data);
         localStorage.setItem('token', data.signinUser.token);
         await this.props.refetc();
         this.clearState();
         this.props.history.push('/');
      })
   }
   render() {
      const {username, email, password, passwordConfirmation} = this.state;
      return (
         <div className='App'>
            <h2>Signup</h2>
            <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
               {(signupUser, {data, loading, error}) => {
                  
                  return (
                     <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                        <input type="text" name='username' placeholder='Username' value={username} onChange={this.handleChange}/>
                        <input type="email" name='email' placeholder='Email Addess' value={email} onChange={this.handleChange} />
                        <input type="password" name='password' placeholder='Password' value={password} onChange={this.handleChange} />
                        <input type="password" name='passwordConfirmation' placeholder='Confirm Password' value={passwordConfirmation} onChange={this.handleChange} />
                        <button type='submit' disabled={loading || this.validateForm() } className='button-primary'>Submit</button>
                        {error && <Error error={error}/> }
                     </form>
                  )
               }}
            </Mutation>
            
         </div>
      );
   }
}

export default withRouter(Signup);

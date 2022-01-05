import React, {useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios';
//import AuthImg from '../assets/signup.jpg';
const cookies = new Cookies();
const initalState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword:'',
  phoneNumber:'',
  avatarURL:'',
}

const Auth = () => {
  const [form, setForm] = useState(initalState);
  const [isUp, setIsUp] = useState(true);

  const inputChange = (event) =>{
    setForm({...form, [event.target.name] : event.target.value});
    //console.log(form)
  }
  const submit = async (event) =>{
    event.preventDefault();
    //console.log(form);

    const {username, password, phoneNumber, avatarURL} = form;
    const URL = 'http://localhost:5000/auth';

    const {data : {token, userId, hashedPassword, fullName}} = await axios.post( `${URL}/${isUp ? 'signup' : 'login'}`, {
      username, password, fullName: form.fullName, phoneNumber, avatarURL,
    });
    cookies.set('userId', userId);
    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    

    if(isUp){
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    window.location.reload();
    
  }

  const switchMode  = () =>{
    setIsUp((prevIsUp) => !prevIsUp);
  }
  return (
    <div className='auth__form-container'>
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>
            {isUp ? ' Sign Up' : ' Sign In'}
          </p>

          <form onSubmit={submit}>
            {isUp && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor="FullName">Employee Name</label>
                <input 
                name = "fullName" 
                type="text" 
                placeholder='Employee Name' 
                onChange={inputChange} 
                required/>
              </div>
            )}
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor="username">Username</label>
                <input 
                name = "username" 
                type="text" 
                placeholder='Username' 
                onChange={inputChange} 
                required/>
              </div>
              {isUp && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor="phoneNumber">Employee Phone Number</label>
                <input 
                name = "phoneNumber" 
                type="tel" 
                placeholder='Employee Phone Number' 
                onChange={inputChange}
                required/>
              </div>
            )}              
            {isUp && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor="avatarURL">Employee Phone Number</label>
                <input 
                name = "avatarURL" 
                type="url" 
                placeholder='Avatar URL (optional)' 
                onChange={inputChange} 
                />
              </div>
            )}
            <div      className='auth__form-container_fields-content_input'>
                <label htmlFor="password">Password</label>
                <input 
                name = "password" 
                type="password" 
                placeholder='Password' 
                onChange={inputChange} 
                required/>
              </div>

              {isUp && (
            <div      className='auth__form-container_fields-content_input'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
            name = "confirmPassword" 
            type="password" 
            placeholder='Confirm Password' 
            onChange={inputChange} 
            required/>
          </div>
            )}

            <div className="auth__form-container_fields-content_button">
              <button>
                {isUp ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isUp
              ? "Already have an account?" 
            : "Don't have an account?"
            }
            <span onClick={switchMode}>
              {isUp ? 'Sign In' : 'Sign Up'}
            </span>
            </p>

          </div>
        </div>

      </div>
      {/*
      <div className="auth__form-container_image">
        <img src='' alt="" />
      </div>
      */}
    </div>
  )
}

export default Auth

import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';

function LoginForm({ setShowLogIn }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    setShowLogIn(false)
    return <Redirect to="/" />
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
        else if (data) {
          const errors = []
          errors.push(data.message)
          setErrors(errors)
        }
      });
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1 className="login-header">Welcome to WhereBnb</h1>
      <label className="login-label">
        <input
          type="text"
          placeholder="Email"
          className="login-input email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="password"
          placeholder="Password"
          className="login-input password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <ul className='login-ul'>
        {errors.map((error, idx) => <li key={idx} className="login-errors">{error}</li>)}
      </ul>
      <button
        type="submit"
        className="login-form-button"
      >Log In</button>
      <button
        type="submit"
        className="demo-login-form-button"
        onClick={() => { setEmail("demo@user.io"); setPassword("password") }}
      >Demo User</button>
    </form>
  );
}

export default LoginForm;

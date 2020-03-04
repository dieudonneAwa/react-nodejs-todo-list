import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { AuthFormWrapper } from './Styles';
import { Context } from '../../context/authContext';

const SignIn = ({ signIn }) => {
  const { state } = useContext(Context);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [passwordErr, setpasswordErr] = useState('');

  const handleChange = (e, name) => {
    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    // validations
    switch (name) {
      case 'email':
        setemail(user.email);
        !emailRegEx.test(user.email) ? setemailErr('Invalid Email!') : setemailErr('');
        break;
      case 'password':
        setpassword(user.password);
        user.password.length < 8 ? setpasswordErr('Password must be at least 8 characters!') : setpasswordErr('');
        break;
      default:
        break;
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email && password && !emailErr && !passwordErr) {
      await signIn({ email, password });
    }
  }

  return (
    <Layout>
      <AuthFormWrapper>
        <h2 className="text-center">Sign In</h2>
        {state.signInErr && <div className="alert alert-danger text-center">
          <span className="text-danger text-capitalize">{state.signInErr}</span>
        </div>}
        <form className="mt-4" onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="email">Enter Email Address</label>
            <input
              type="email"
              name="email"
              className={classnames(
                "form-control",
                { 'is-invalid': emailErr, 'is-valid': !emailErr && email.length }
              )}
              id="email"
              placeholder="Email Address"
              onChange={(e) => handleChange(e, 'email')}
            />
            {emailErr && <small className="text-danger">{emailErr}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              name="password"
              className={classnames(
                "form-control",
                { 'is-invalid': passwordErr, 'is-valid': !passwordErr && password.length }
              )}
              id="password"
              placeholder="Password"
              onChange={(e) => handleChange(e, 'password')}
            />
            {passwordErr && <small className="text-danger">{passwordErr}</small>}
          </div>
          <input type="submit" className="btn btn-primary" value="Sign In" />
        </form>
        <p className="float-left">
          Don't yet have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </AuthFormWrapper>
    </Layout>
  )
}

export default SignIn

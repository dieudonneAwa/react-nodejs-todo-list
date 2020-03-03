import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { AuthFormWrapper } from './Styles';
import { Context } from '../../context/authContext';

const SignUp = ({ signUp }) => {
  const { state } = useContext(Context);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confPassword, setconfPassword] = useState('');
  const [nameErr, setnameErr] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [confPasswordErr, setconfPasswordErr] = useState('');

  const handleChange = (e, name) => {
    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    // validations
    switch (name) {
      case 'name':
        setname(user.name);
        user.name.length < 3 ? setnameErr('Name must be at least 3 characters!') : setnameErr('');
        break;
      case 'email':
        setemail(user.email);
        !emailRegEx.test(user.email) ? setemailErr('Invalid Email!') : setemailErr('');
        break;
      case 'password':
        setpassword(user.password);
        user.password.length < 8 ? setpasswordErr('Password must be at least 8 characters!') : setpasswordErr('');
        break;
      case 'confPassword':
        setconfPassword(user.confPassword);
        user.confPassword !== password ? setconfPasswordErr('Passwords do not match!') : setconfPasswordErr('');
        break;
      default:
        break;
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name && email && password && confPassword && !nameErr && !emailErr && !passwordErr && !confPasswordErr) {
      await signUp({ name, email, password });
    }
  }
  
  return (
    <Layout>
      <AuthFormWrapper>
        <h2 className="text-center">Create an Account</h2>
        {state.signUpErr && <div className="alert alert-danger text-center">
          <span className="text-danger text-capitalize">{state.signUpErr}</span>
          </div>}
        <form className="mt-4" onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">Enter Full Name</label>
            <input
              type="text"
              name="name"
              className={classnames(
                "form-control",
                { 'is-invalid': nameErr, 'is-valid': !nameErr && name.length }
              )}
              id="name"
              placeholder="Full Name"
              onChange={(e) => handleChange(e, 'name')}
            />
            {nameErr && <small className="text-danger">{nameErr}</small>}
          </div>
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
          <div className="form-group">
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
              type="password" 
              name="confPassword"
              className={classnames(
                "form-control",
                { 'is-invalid': confPasswordErr, 'is-valid': !confPasswordErr && confPassword.length }
              )}
              id="confPassword"
              placeholder="confPassword"
              onChange={(e) => handleChange(e, 'confPassword')}
            />
            {confPasswordErr && <small className="text-danger">{confPasswordErr}</small>}
          </div>
          <input type="submit" className="btn btn-primary" value="Sign Up"/>
        </form>
        <p className="float-left">
          Already have an account? <NavLink to="signin">Sign In</NavLink>
        </p>
      </AuthFormWrapper>
    </Layout>
  )
}

export default SignUp

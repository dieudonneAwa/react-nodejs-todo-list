import React from 'react';
import { Nav } from './Styles';
import { signUp, signIn } from '../../actions';

const NavBar = (props) => {
  const handleSignUp = async () => {
    await props.signUp({
      name: 'Awa',
      email: 'dieudonneawa7@gmail.com',
      password: 'password1'
    });
  }

  const handleSignIn = async () => {
    await props.signIn({
      email: 'dieudonneawa7@gmail.com',
      password: 'password1'
    });
  }
  return (
    <Nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <div className="logo"><a href="/">Best To Do List</a></div>
          </div>
          <div className="auth-btns col-md-7">
            <button onClick={handleSignUp} className="btn sign-up">Sign Up</button>
            <button onClick={handleSignIn} className="btn sign-in">Sign In</button>
          </div>
        </div>
      </div>
    </Nav>
  )
};

const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return { ...auth }
}

export default NavBar;

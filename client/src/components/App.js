import React, { useContext } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './landing/Landing';
import { Provider, Context } from '../context/authContext';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';

function App() {
  const { signUp, signIn } = useContext(Context)
  
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" render={() => (<SignUp signUp={async (user) => {
            await signUp(user);
          }} />)
        } />
        <Route path="/signin" render={() => (<SignIn signIn={async (user) => {
          const res = await signIn(user);
          console.log(res);
        }} />)} />
      </Router>
    </div>
  );
}

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
};

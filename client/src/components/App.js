import React, { useContext } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'js-cookie';
import Landing from './landing/Landing';
import { Provider, Context } from '../context/authContext';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import ListTodos from './todos/ListTodos';

function App() {
  const { signUp, signIn } = useContext(Context);
  
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" render={({ history }) => (<SignUp signUp={async (user) => {
            const res = await signUp(user);
            if (res) {
              Cookies.set('token', res.data.token);
              history.push('/todos');
            }
          }} />)
        } />
        <Route path="/signin" render={({ history }) => (<SignIn signIn={async (user) => {
          const res = await signIn(user);
          if (res) {
            Cookies.set('token', res.data.token);
            history.push('/todos');
          }
        }} />)} />
        <Route path="/todos" render={() => (<ListTodos />)} />
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

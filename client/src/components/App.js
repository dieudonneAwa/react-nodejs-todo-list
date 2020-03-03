import React, { useContext } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './landing/Landing';
import { Provider, Context } from '../context/authContext';
import SignUp from './auth/SignUp';

function App() {
  const { signUp } = useContext(Context)
  
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" render={() => (<SignUp signUp={async (user) => {
            await signUp(user);
          }} />)
        } />
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

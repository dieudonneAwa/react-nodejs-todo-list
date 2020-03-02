import React from 'react';
import Landing from './landing/Landing';
import { Provider } from '../context/authContext';

function App() {
  return (
    <div className="App">
      <Landing />
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

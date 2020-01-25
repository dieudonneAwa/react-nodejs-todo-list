/* eslint-disable import/prefer-default-export */
import auth from '../controllers/authController';
import validateAuth from '../middlewares/auth';

export const routes = (app) => {
  app.get('/', (req, res) => res.send({ message: 'Welcome to Todo API' }));

  app.post('/api/auth/sign_up', validateAuth, auth.signUp);
  app.post('/api/auth/sign_in', auth.signIn);
};

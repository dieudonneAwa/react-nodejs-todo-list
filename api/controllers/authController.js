import validator from 'validator';
import sendEmail from '../utils/sendEmail';
import models from '../models';
import { hashPassword, jwtToken, comparePassword } from '../utils';

const { User } = models;

const auth = {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hash = hashPassword(password);
      const user = await User.create({ name, email, password: hash });
      const token = jwtToken.createToken(user);
      const { id } = user;
      return res.status(201).send({ token, user: { id, name, email } });
    } catch (e) {
      return next(new Error(e));
    }
  },

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user && comparePassword(password, user.password)) {
        const { name, id } = user;
        const token = jwtToken.createToken(user);
        return res.status(200).send({ token, user: { id, name, email } });
      }
      return res.status(400).send({ error: 'invalid email/password combination ' });
    } catch (e) {
      return next(new Error(e));
    }
  },

  async sendResetLink(req, res, next) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!email) {
        return res.status(400).send({ error: 'Email is required' });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).send({ error: 'Invalid email' });
      }
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      const token = jwtToken.createToken(user);
      const link = `${req.protocol}://localhost:5000/reset_password/${token}`;
      await sendEmail(
        email,
        'noreply@todo.com',
        'Best To Do password reset',
        `
        <div>Click the link below to reset your password</div><br/>
        <div>${link}</div>
        `
      );
      return res.status(200).send({ message: 'Password reset link has been successfully sent to your inbox' });
    } catch (e) {
      return next(new Error(e));
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { password } = req.body;
      const { token } = req.params;
      const decoded = jwtToken.verifyToken(token);
      const hash = hashPassword(password);
      const updatedUser = await User.update(
        { password: hash },
        {
          where: { id: decoded.userId },
          returning: true,
          plain: true,
        }
      );
      const { id, name, email } = updatedUser[1];
      return res.status(200).send({ token, user: { id, name, email } });
    } catch (e) {
      return next(new Error(e));
    }
  }
};

export default auth;

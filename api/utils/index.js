/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

export const jwtToken = {
  createToken({ id, email }) {
    return jwt.sign(
      { userId: id, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  },
  verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '24h' });
    return decoded;
  }
};

export const hashPassword = (password) => bcrypt.hashSync(password, 10);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

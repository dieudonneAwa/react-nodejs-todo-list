import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import models from '../models';

const { User } = models;

config();

export default (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '24h' }, (error, decoded) => {
    if (error) {
      return res.status(401).send({ error });
    }
    req.decoded = decoded;
    return User.findByPk(decoded.userId)
      .then((user) => {
        if (!user) {
          return res.status(401).send({ error: 'User does not exist' });
        }
        return next();
      });
  });
};

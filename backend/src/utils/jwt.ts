import jwt from 'jsonwebtoken';
import type { JWTPayload } from '../types/index.js';

const JWT_SECRET: string = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRE: string = process.env.JWT_EXPIRE || '7d';

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
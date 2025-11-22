import jwt from 'jsonwebtoken';
import type { JWTPayload } from '../types/index.js';

const JWT_SECRET: string = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRE: string = process.env.JWT_EXPIRE || '7d';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    // TypeScript'e "as any" diyerek bu değerin geçerli olduğunu garanti ediyoruz.
    // Ayrıca || '7d' ekleyerek, eğer .env okunamazsa varsayılan 7 gün olsun diyoruz.
    expiresIn: (process.env.JWT_EXPIRE || '7d') as any
  });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
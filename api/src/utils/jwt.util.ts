import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

// In production, ALWAYS define JWT_SECRET in the .env file.
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_development_secret_do_not_use_in_prod';
const JWT_EXPIRES_IN = '24h';

export interface JwtPayload {
  userId: string;
  roleId: string;
}

/**
 * Generates a signed JWT for an authenticated user.
 * 
 * @param {JwtPayload} payload - User ID and Role ID to encode in the token.
 * @returns {string} The signed JWT string.
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifies and decodes a JWT.
 * 
 * @param {string} token - The JWT string provided by the client.
 * @returns {JwtPayload} The decoded payload.
 * @throws {Error} If the token is invalid or expired.
 */
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

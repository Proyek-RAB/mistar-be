import { Request } from 'express';

declare module 'express' {
  interface Request {
    userId?: string; // Add your custom properties here
  }
}
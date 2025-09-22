import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  // Placeholder: Replace with real admin check
  const isAdminUser = req.headers['x-admin'] === 'true';
  if (!isAdminUser) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}
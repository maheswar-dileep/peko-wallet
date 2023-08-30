import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined | string[] = req.headers.authorization || req.headers.Authorization;

  if (!Array.isArray(authHeader) && !authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = Array.isArray(authHeader) ? authHeader[0]?.split(' ')[1] : authHeader?.split(' ')[1];

  jwt.verify(token, process.env.ACCESSTOKEN_SECRET as string, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ error: err });
    }

    (req as { userId?: string }).userId = decoded?.Userinfo?.id;
    (req as { userEmail?: string }).userEmail = decoded.Userinfo?.email;
    
    next();
  });
};

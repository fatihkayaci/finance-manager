import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    username: string;
    email?: string;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log("🔑 Token Ayrıştırıldı:", token);

      // JWT Secret kontrolü
      if (!process.env.JWT_SECRET) {
        console.error("❌ HATA: .env dosyasında JWT_SECRET bulunamadı!");
        return res.status(500).json({ success: false, message: 'Server config error' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      console.log("✅ Token Çözüldü (Decoded):", decoded);

      console.log(req.user);
      req.user = decoded;
      console.log("req");
      console.log(req.user);
      next();
    } catch (error) {
      console.error("❌ Token Doğrulama Hatası:", error);
      res.status(401).json({ success: false, message: 'Token geçersiz.' });
    }
  } else {
    console.log("⚠️ HATA: Authorization header yok veya 'Bearer' ile başlamıyor.");
    res.status(401).json({ success: false, message: 'Token yok.' });
  }
};
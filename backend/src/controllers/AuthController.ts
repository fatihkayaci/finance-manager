import { Request, Response } from 'express';
import authService from '../services/AuthService';

class AuthController {
  // Kayıt ol
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      // Validasyon
      if (!username || !email || !password) {
        res.status(400).json({ 
          success: false, 
          message: 'All fields are required' 
        });
        return;
      }

      // Service'i çağır
      const result = await authService.register({ username, email, password });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Giriş yap
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validasyon
      if (!email || !password) {
        res.status(400).json({ 
          success: false, 
          message: 'Email and password are required' 
        });
        return;
      }

      // Service'i çağır
      const result = await authService.login({ email, password });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AuthController();
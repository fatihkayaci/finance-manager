import userRepository from '../repositories/UserRepository';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { RegisterDTO, LoginDTO, AuthResponse } from '../types';

class AuthService {
  // Kayıt ol
  async register(data: RegisterDTO): Promise<AuthResponse> {
    const { username, email, password } = data;

    // Kullanıcı zaten var mı?
    const exists = await userRepository.existsByEmailOrUsername(email, username);
    if (exists) {
      throw new Error('Email or username already exists');
    }

    // Şifreyi hashle
    const hashedPassword = await hashPassword(password);

    // Kullanıcıyı oluştur
    const user = await userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    // Token oluştur
    const token = generateToken({
      userId: user.id,
      username: user.username,
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  // Giriş yap
  async login(data: LoginDTO): Promise<AuthResponse> {
    const { email, password } = data;

    // Kullanıcıyı bul
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Şifreyi kontrol et
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Token oluştur
    const token = generateToken({
      userId: user.id,
      username: user.username,
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}

export default new AuthService();
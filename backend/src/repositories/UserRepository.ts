import prisma from '../config/database';
import { User } from '@prisma/client';

class UserRepository {
    // Kullanıcıyı email ile bul
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
        where: { email },
        });
    }

    // Kullanıcıyı ID ile bul
    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
        where: { id },
        });
    }

    // Yeni kullanıcı oluştur
    async create(data: {
        username: string;
        email: string;
        password: string;
    }): Promise<User> {
        return prisma.user.create({
        data,
        });
    }

    // Kullanıcı var mı kontrol et (email veya username)
    async existsByEmailOrUsername(
        email: string,
        username: string
    ): Promise<boolean> {
    const count = await prisma.user.count({
        where: {
        OR: [{ email }, { username }],
        },
    });
    return count > 0;
    }
}
export default new UserRepository();
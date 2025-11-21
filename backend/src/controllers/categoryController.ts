import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();

// 1. Kategorileri Getir
export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    // DÜZELTME BURADA: req.user?.id yerine req.user?.userId
    const userId = req.user?.userId; 

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Kullanıcı ID bulunamadı' });
    }

    const categories = await prisma.category.findMany({
      where: { userId: userId }, // Veritabanında hala "userId" sütunu var, bu doğru
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ success: false, message: 'Hata oluştu' });
  }
};

// 2. Yeni Kategori Ekle
export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    // DÜZELTME BURADA DA:
    const userId = req.user?.userId;
    const { name, type } = req.body;

    if (!userId) return res.status(401).json({ message: 'User ID yok' });

    const newCategory = await prisma.category.create({
      data: {
        name,
        type,
        userId // Bu zaten değişken adıyla aynı olduğu için kısayol (userId: userId)
      }
    });

    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(400).json({ success: false, message: 'Kategori oluşturulamadı' });
  }
};

// 3. Kategori Sil
export const deleteCategory = async (req: AuthRequest, res: Response) => {
    try {
      // DÜZELTME BURADA DA:
      const userId = req.user?.userId;
      const categoryId = parseInt(req.params.id);
  
      if (!userId) return res.status(401).json({ message: 'User ID yok' });

      const category = await prisma.category.findFirst({
        where: { id: categoryId, userId: userId }
      });
  
      if (!category) {
        return res.status(404).json({ success: false, message: 'Bulunamadı' });
      }
  
      await prisma.category.delete({
        where: { id: categoryId }
      });
  
      res.status(200).json({ success: true, message: 'Silindi' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Silinemedi' });
    }
  };
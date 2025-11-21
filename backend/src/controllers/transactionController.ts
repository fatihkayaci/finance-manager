import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();

// 1. Tüm İşlemleri Getir (Kullanıcıya Özel)
export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    const transactions = await prisma.transaction.findMany({
      where: { userId: userId },
      orderBy: { date: 'desc' }, // En yeni tarih en üstte
      include: { category: true } // <--- DİKKAT: Kategorinin adını da getir!
    });

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'İşlemler getirilemedi' });
  }
};

// 2. Yeni İşlem Ekle
export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { description, amount, date, categoryId, type } = req.body;

    if (!userId) return res.status(401).json({ message: 'User ID yok' });

    const newTransaction = await prisma.transaction.create({
      data: {
        description,
        amount,       // Prisma Decimal'e çevirir
        date: new Date(date), // Gelen string tarihi Date objesine çevir
        type,         // INCOME veya EXPENSE
        categoryId: Number(categoryId), // ID'nin sayı olduğundan emin ol
        userId
      },
      include: { category: true } // Cevap dönerken kategori bilgisini de ekle
    });

    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error("Transaction Error:", error);
    res.status(400).json({ success: false, message: 'İşlem eklenemedi' });
  }
};

// 3. İşlem Sil
export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const id = parseInt(req.params.id);

    // Önce kontrol et: Bu işlem bu kullanıcıya mı ait?
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId }
    });

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'İşlem bulunamadı' });
    }

    await prisma.transaction.delete({ where: { id } });

    res.status(200).json({ success: true, message: 'İşlem silindi' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Silme hatası' });
  }
};
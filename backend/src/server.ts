import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Ana sayfa
app.get('/', (req, res) => {
  res.send('Finance Manager API');
});

// ----- işlemler için işlemler -----
app.get('/api/transactions', async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  });
  const formatted = transactions.map(transaction => ({
    ...transaction,
    date: transaction.date.toLocaleDateString('tr-TR', { 
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }));
  res.json(formatted);
});
app.get('/api/transactions/:id', async (req, res) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  
  if (!transaction) {
    return res.status(404).json({ error: 'İşlem bulunamadı' });
  }
  
  res.json(transaction);
});
app.put('/api/transactions/:id', async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  
  const transaction = await prisma.transaction.update({
    where: { id: parseInt(req.params.id) },
    data: {
      ...(type && { type }),
      ...(amount && { amount }),
      ...(category && { category }),
      ...(description && { description }),
      ...(date && { date: new Date(date) })
    }
  });
  
  res.json(transaction);
});
app.delete('/api/transactions/:id', async (req, res) => {
  await prisma.transaction.delete({
    where: { id: parseInt(req.params.id) }
  });
  
  res.json({ message: 'İşlem silindi' });
});

// ----- gelir için işlemler -----
app.get('/api/income', async (req, res) => {
  const incomes = await prisma.transaction.findMany({
    where: { type: 'income' },
    orderBy: { date: 'desc' }
  });
  const formatted = incomes.map(income => ({
    ...income,
    dateISO: income.date.toISOString().split('T')[0],
    date: income.date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    }),
  }));
  res.json(formatted);
});
app.post('/api/income', async (req, res) => {
  try {
    const { amount, category, description, date, paymentMethod } = req.body;
    
    if (!amount || amount <= 0)
      return res.status(400).json({ error: "Tutar 0'dan büyük olmalı." });
    
    // 💳 Kredi Kartı ise %20 komisyon kes
    let finalAmount = amount;
    let commission = 0;
    
    if (paymentMethod === 'Kredi Kartı') {
      commission = amount * 0.2;      // Kesilen tutar: 100 * 0.2 = 20₺
      finalAmount = amount - commission; // Net tutar: 100 - 20 = 80₺
    }
    
    const income = await prisma.transaction.create({
      data: {
        type: 'income',
        amount: finalAmount,
        category,
        description,
        date: new Date(date),
        paymentMethod,
        commission
      }
    });
    
    res.status(201).json(income);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});
app.delete('/api/income/:id', async (req, res) => {
  try {
    await prisma.transaction.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Gelir silindi' });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Gelir silinirken hata oluştu' });
  }
});
app.put('/api/income/:id', async (req, res) => {
  try {
    const { amount, category, description, date, paymentMethod } = req.body;
    
    // 💳 Eğer paymentMethod değiştiriliyorsa komisyon yeniden hesapla
    let finalAmount = amount;
    let commission = 0;
    
    if (paymentMethod === 'Kredi Kartı') {
      commission = amount * 0.2;           // 100 * 0.2 = 20₺
      finalAmount = amount - commission;    // 100 - 20 = 80₺
    }
    
    const income = await prisma.transaction.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(finalAmount && { amount: finalAmount }), // ← Kesilmiş tutar
        ...(category && { category }),
        ...(description && { description }),
        ...(date && { date: new Date(date) }),
        ...(paymentMethod && { paymentMethod }),
        ...(commission !== undefined && { commission }) // ← Komisyon
      }
    });
    
    res.json(income);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Gelir güncellenirken hata oluştu' });
  }
});

// ----- gider için işlemler -----
app.get('/api/expense', async (req, res) => {
  const expenses = await prisma.transaction.findMany({
    where: { type: 'expense' },
    orderBy: { date: 'desc' }
  });
  const formatted = expenses.map(expense => ({
    ...expense,
    dateISO: expense.date.toISOString().split('T')[0],  // "2025-10-27" (düzenleme için)
    date: expense.date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long' 
    }), 
    time: expense.createdAt.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }));
  
  res.json(formatted);
});
app.post('/api/expense', async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ error: "Tutar 0'dan büyük olmalı." });
    const expense = await prisma.transaction.create({
      data: {
        type: 'expense',
        amount,
        category,
        description,
        date: new Date(date)
      }
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }

});
app.delete('/api/expense/:id', async (req, res) => {
  try {
    await prisma.transaction.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Gider silindi' });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Gider silinirken hata oluştu' });
  }
});
app.put('/api/expense/:id', async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    
    const expense = await prisma.transaction.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(amount && { amount }),
        ...(category && { category }),
        ...(description && { description }),
        ...(date && { date: new Date(date) })
      }
    });
    res.json(expense);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Gider güncellenirken hata oluştu' });
  }
});

// ----- Ortak işlemler -----
app.get('/api/income/summary', async (req, res) => {
  const period = req.query.period as string;
  const type = req.query.type;
  if (typeof type !== 'string') {
    return res.status(400).json({ error: 'type string olmalı' });
  }
  let current_start;
  let current_finish;
  let previous_start;
  let previous_finish;
  if (period == "today") {
    // BUGÜN
    current_start = new Date();
    current_start.setHours(0, 0, 0, 0);
    
    current_finish = new Date();
    current_finish.setHours(23, 59, 59, 999);
    
    // DÜN (yeni değişkenler!)
    previous_start = new Date();
    previous_start.setDate(previous_start.getDate() - 1);
    previous_start.setHours(0, 0, 0, 0);
    
    previous_finish = new Date();
    previous_finish.setDate(previous_finish.getDate() - 1);
    previous_finish.setHours(23, 59, 59, 999);

  }else if (period == "week") {
    current_start = new Date();
    current_start.setDate(current_start.getDate() - 6);
    current_start.setHours(0, 0, 0, 0);

    current_finish = new Date()
    current_finish.setHours(23, 59, 59, 999);

    // geçen hafta
    previous_start = new Date();
    previous_start.setDate(previous_start.getDate() - 13);
    previous_start.setHours(0, 0, 0, 0);
    
    previous_finish = new Date();
    previous_finish.setDate(previous_finish.getDate() - 6);
    previous_finish.setHours(23, 59, 59, 999);

  }else if (period == "month") {
    current_start = new Date();
    current_start.setDate(1);
    current_start.setHours(0, 0, 0, 0);
    
    current_finish = new Date();
    current_finish.setHours(23, 59, 59, 999);
    
    previous_start = new Date();
    previous_start.setMonth(previous_start.getMonth() - 1);
    previous_start.setDate(1); 
    previous_start.setHours(0, 0, 0, 0);
    
    previous_finish = new Date();
    previous_finish.setMonth(previous_finish.getMonth() - 1);
    // setDate(0) yerine:
    const lastDayOfMonth = new Date(
      previous_finish.getFullYear(), 
      previous_finish.getMonth() + 1, 
      0
    ).getDate();
    previous_finish.setDate(lastDayOfMonth);
    previous_finish.setHours(23, 59, 59, 999);
  }else{
    return res.status(500);
  }
  console.log('Geçen ay:', previous_start, 'ile', previous_finish);

  try {
    //current
    const current_income = await prisma.transaction.aggregate({
      where: {
        type: type,
        date: {gte: current_start, lte: current_finish}
      },
      _sum: {amount: true}
    });
    const previous_income = await prisma.transaction.aggregate({
      where: { 
        type: type,
        date: { gte: previous_start, lte: previous_finish }
      },
      _sum: { amount: true }
    });

    const currentTotal = current_income._sum.amount || 0;
    const previousTotal = previous_income._sum.amount || 0;
    const percentage = previousTotal === 0 ? null : parseFloat((((currentTotal - previousTotal) / previousTotal) * 100).toFixed(2));
    res.json({
      current: currentTotal,
      change: percentage,
      period: {
        "start": current_start.toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long' 
          }),
        "end": current_finish.toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long' 
          }),
      }
    });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Gelir güncellenirken hata oluştu' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`);
});
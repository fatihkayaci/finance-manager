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
  res.json(transactions);
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
  const income = await prisma.transaction.findMany({
    where: { type: 'income' },
    orderBy: { date: 'desc' }
  });
  res.json(income);
});
app.post('/api/income', async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ error: "Tutar 0'dan büyük olmalı." });
    const income = await prisma.transaction.create({
      data: {
        type: 'income',
        amount,
        category,
        description,
        date: new Date(date)
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
    const { amount, category, description, date } = req.body;
    
    const income = await prisma.transaction.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(amount && { amount }),
        ...(category && { category }),
        ...(description && { description }),
        ...(date && { date: new Date(date) })
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
  const expense = await prisma.transaction.findMany({
    where: { type: 'expense' },
    orderBy: { date: 'desc' }
  });
  res.json(expense);
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


app.listen(PORT, () => {
  console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`);
});
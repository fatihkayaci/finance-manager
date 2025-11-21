import express from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// bu koddan sonra gelen her şey için protect fonksiyonunu çalıştır
router.use(protect);
/*
    eğer olmasaydı bunları şöyle yazacaktık

    router.get('/', protect, getCategories);
    router.post('/', protect, createCategory);
    router.delete('/:id', protect, deleteCategory);
*/
router.get('/', getCategories);       // GET /api/categories
router.post('/', createCategory);     // POST /api/categories
router.delete('/:id', deleteCategory); // DELETE /api/categories/5

export default router;
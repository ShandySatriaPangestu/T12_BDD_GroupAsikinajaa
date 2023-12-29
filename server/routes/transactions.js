import express from 'express';
import Transaction from '../models/transaction.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {  // Mengubah '/transactions' menjadi '/'
  try {
    const { date, description, amount, type } = req.body;

    const newTransaction = await Transaction.create({
      userId: req.userId,
      date,
      description,
      amount,
      type,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', async (req, res) => {  // Mengubah '/transactions' menjadi '/'
  try {
    const transactions = await Transaction.find({ userId: req.userId });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/:id_transaction', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id_transaction);

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/:id_transaction', async (req, res) => {
  try {
    const { date, description, amount, type } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id_transaction,
      { date, description, amount, type },
      { new: true }
    );

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete('/:id_transaction', async (req, res) => {
  try {
    await Transaction.findByIdAndRemove(req.params.id_transaction);

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;

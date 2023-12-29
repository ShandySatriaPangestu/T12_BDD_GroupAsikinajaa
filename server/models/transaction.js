import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Pemasukan', 'Pengeluaran'], required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

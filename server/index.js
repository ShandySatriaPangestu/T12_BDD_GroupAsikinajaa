import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transactions.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

// Routes untuk otentikasi pengguna (register dan login)
app.use('/auth', authRoutes);

// Routes untuk transaksi (pastikan menambahkan middleware otentikasi jika diperlukan)
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect('mongodb+srv://satriasendi10:yuuto_kun18@cluster0.0d7nn7a.mongodb.net/?retryWrites=true&w=majority', {
    // Remove useNewUrlParser and useUnifiedTopology options
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server berjalan pada port: ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

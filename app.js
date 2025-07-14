// Roda a API de gerenciamento de irrigação
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const pivotRoutes = require('./routes/pivotRoutes');
const irrigationRoutes = require('./routes/irrigationRoutes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pivots', pivotRoutes);
app.use('/irrigations', irrigationRoutes);

app.listen(3000, () => console.log('API rodando na porta 3000'));

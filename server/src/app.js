// Owner: M1 (everyone adds ONE line for their routes)
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes -- uncomment as each member finishes theirs
// app.use('/api/auth', require('./routes/authRoutes'));            // M1
// app.use('/api/stores', require('./routes/storeRoutes'));         // M1
// app.use('/api/products', require('./routes/productRoutes'));     // M4
// app.use('/api/dashboard', require('./routes/dashboardRoutes'));  // M4
// app.use('/api/orders', require('./routes/orderRoutes'));         // M5
// app.use('/api/payments', require('./routes/paymentRoutes'));     // M5

app.use(errorHandler);
module.exports = app;

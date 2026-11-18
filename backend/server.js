const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    studio: 'Atelier Vera Interior Architecture API',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Atelier Vera API server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

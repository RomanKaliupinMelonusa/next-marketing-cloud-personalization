const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow everything
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all HTTP methods
  allowedHeaders: ['*'], // Allow all headers
  credentials: true // Allow credentials
}));

// Configure Content Security Policy to allow everything
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "*"], // Allow all sources
      scriptSrc: ["'self'", "*", "'unsafe-inline'", "'unsafe-eval'"], // Allow all scripts including inline
      styleSrc: ["'self'", "*", "'unsafe-inline'"], // Allow all styles including inline
      imgSrc: ["'self'", "*", "data:", "blob:"], // Allow all images
      fontSrc: ["'self'", "*"], // Allow all fonts
      connectSrc: ["'self'", "*"], // Allow all connections
      frameSrc: ["'self'", "*"], // Allow all frames
      objectSrc: ["'self'", "*"], // Allow all objects
      mediaSrc: ["'self'", "*"], // Allow all media
      childSrc: ["'self'", "*"], // Allow all child sources
      workerSrc: ["'self'", "*"], // Allow all workers
      manifestSrc: ["'self'", "*"], // Allow all manifests
      baseUri: ["'self'", "*"], // Allow all base URIs
      formAction: ["'self'", "*"], // Allow all form actions
      upgradeInsecureRequests: null // Disable upgrade insecure requests
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home Page',
    currentPage: 'home'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us',
    currentPage: 'about'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us',
    currentPage: 'contact'
  });
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });
  res.render('contact', { 
    title: 'Contact Us',
    currentPage: 'contact',
    success: 'Thank you for your message! We will get back to you soon.'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: '404 - Page Not Found',
    currentPage: 'error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('CORS Policy: Allow all origins');
  console.log('CSP Policy: Allow all sources and inline content');
});

module.exports = app;
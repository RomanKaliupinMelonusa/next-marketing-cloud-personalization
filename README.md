# Marketing Cloud Personalization

A Node.js + Express application with EJS templating, featuring **permissive CORS and Content Security Policies** that allow everything from all services and domains.

## 🚀 Features

- **Node.js + Express** server with EJS templating
- **Permissive CORS Policy** - Allows all origins, methods, and headers
- **Permissive Content Security Policy** - Allows all sources, inline scripts, and external resources
- **3 Main Pages**: Home, About, Contact
- **404 Error Handling** with custom page
- **Form Handling** with POST request processing
- **Responsive Design** using Bootstrap 5
- **Static File Serving** for CSS, JS, and images

## 📋 Pages

1. **Home (`/`)** - Overview of the application and security policies
2. **About (`/about`)** - Technical details and configuration information
3. **Contact (`/contact`)** - Contact form with CORS testing functionality

## 🔧 Security Policies Configuration

### CORS Policy
```javascript
cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all HTTP methods
  allowedHeaders: ['*'], // Allow all headers
  credentials: true // Allow credentials
})
```

### Content Security Policy
```javascript
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
}
```

## 🏗️ Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd next-marketing-cloud-personalization
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the application**
```bash
npm start
```

4. **Access the application**
Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
├── app.js                 # Main Express server file
├── package.json           # Project dependencies and scripts
├── views/                 # EJS templates
│   ├── layout.ejs        # Base layout template
│   ├── index.ejs         # Home page
│   ├── about.ejs         # About page
│   ├── contact.ejs       # Contact page
│   └── 404.ejs           # Error page
├── public/               # Static assets
│   ├── css/             # Stylesheets
│   │   └── style.css    # Custom CSS
│   ├── js/              # Client-side JavaScript
│   │   └── main.js      # Main JavaScript file
│   └── images/          # Image files (placeholder)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🛠️ Dependencies

- **express** - Web framework for Node.js
- **ejs** - Embedded JavaScript templating
- **cors** - Cross-Origin Resource Sharing middleware
- **helmet** - Security middleware with configurable CSP

## ⚠️ Security Warning

**This configuration is extremely permissive and is designed for development/demonstration purposes.** 

The CORS and CSP policies allow:
- Requests from any origin
- Loading resources from any domain
- Inline scripts and styles
- eval() function execution
- All HTTP methods and headers

**For production environments, these policies should be restricted to specific domains and resources.**

## 🧪 Testing CORS and CSP

The application includes built-in testing features:

1. **Visual Indicators**: Green and yellow badges showing active policies
2. **External Resource Loading**: Bootstrap CSS/JS from CDN
3. **CORS Test Button**: On the contact page to test cross-origin requests
4. **Inline Scripts**: Demonstrates CSP allows inline JavaScript execution

## 🚦 Running the Application

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## 📝 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server (same as start)

## 🎯 Use Cases

This application is suitable for:
- Development environments requiring flexible CORS/CSP policies
- Testing cross-origin requests and external resource loading
- Demonstrating permissive security policy configurations
- Educational purposes to understand CORS and CSP mechanics
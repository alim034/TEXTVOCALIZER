# Voicify

A production-ready MERN stack application for real-time text-to-voice conversion with user authentication and dark/light mode support.

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Real-time Text-to-Speech**: Convert text to speech using browser's Speech Synthesis API
- **Voice Customization**: Select different voices, adjust pitch and speed
- **Server-side TTS**: Alternative TTS using Google Text-to-Speech (gTTS) library
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Toast Notifications**: User-friendly success/error messages
- **Audio History**: Keep track of generated audio files

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **gTTS** - Google Text-to-Speech library
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Context API** - State management

## 📁 Project Structure

```
TextVocalizer/
├── backend/
│   ├── index.js              # Main server file
│   ├── models/
│   │   └── User.js           # User model
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── tts.js            # Text-to-speech routes
│   ├── middleware/
│   │   ├── authMiddleware.js # JWT authentication
│   │   └── errorMiddleware.js# Error handling
│   ├── audio/                # Generated audio files
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/          # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd TextVocalizer
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Environment Variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env file with your values
   ```

   Required environment variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/textvocalizer
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication Routes
```
POST /api/auth/register  # Register new user
POST /api/auth/login     # User login
GET  /api/auth/me        # Get current user (protected)
```

### Text-to-Speech Routes
```
POST /api/tts/convert    # Convert text to speech (protected)
GET  /api/tts/audio/:filename # Get audio file (protected)
GET  /api/tts/history    # Get TTS history (protected)
```

### Example API Usage

**Register User:**
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Convert Text to Speech:**
```javascript
POST /api/tts/convert
Headers: { "Authorization": "Bearer <jwt_token>" }
{
  "text": "Hello, this is a test message",
  "language": "en"
}
```

## 🎨 Features Explained

### Client-Side Text-to-Speech
The primary TTS functionality uses the browser's built-in Speech Synthesis API:
- **No server processing required**
- **Instant conversion**
- **Multiple voice options**
- **Adjustable pitch and speed**
- **Works offline**

### Server-Side Text-to-Speech (Alternative)
For scenarios requiring server-generated audio files:
- **Uses Google Text-to-Speech (gTTS)**
- **Generates MP3 files**
- **Downloadable audio**
- **Multiple language support**

### Authentication System
- **JWT-based authentication**
- **Password hashing with bcrypt**
- **Protected routes**
- **Automatic token validation**
- **Secure user sessions**

### Theme System
- **Dark/Light mode toggle**
- **System preference detection**
- **localStorage persistence**
- **Smooth transitions**

## 🔧 Configuration

### Database Setup
1. **Local MongoDB:**
   ```bash
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas (Cloud):**
   - Create account at https://mongodb.com/atlas
   - Create cluster and get connection string
   - Update MONGODB_URI in .env file

### Security Configuration
- **JWT Secret**: Use a long, random string for JWT_SECRET
- **Password Requirements**: Minimum 6 characters with mixed case and numbers
- **CORS**: Configured for development (localhost:5173)

## 📱 Usage

1. **Registration**: Create account with name, email, and secure password
2. **Login**: Access dashboard with registered credentials
3. **Text Conversion**: 
   - Enter text (up to 1000 characters)
   - Select preferred voice
   - Adjust pitch (0.1-2.0) and speed (0.1-3.0)
   - Click "Convert to Speech" to hear audio
4. **Theme Toggle**: Switch between light and dark modes
5. **Logout**: Secure session termination

## 🧪 Development

### Available Scripts

**Backend:**
```bash
npm start        # Production server
npm run dev      # Development with nodemon
```

**Frontend:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Code Comments
The codebase includes comprehensive comments explaining:
- **Authentication flow**
- **JWT implementation**
- **React Context usage**
- **Speech synthesis integration**
- **Error handling patterns**

## 🚀 Production Deployment

### Backend Deployment
1. Set NODE_ENV=production in environment variables
2. Use process manager like PM2
3. Configure reverse proxy (Nginx)
4. Enable SSL/HTTPS
5. Set up MongoDB Atlas for cloud database

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Update API endpoints for production backend
4. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Mohammad Alim** - *MERN Stack Developer*


---

**Made with ❤️ by Mohammad Alim in 2025**

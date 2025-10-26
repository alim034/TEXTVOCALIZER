# Environment Setup Guide

## Prerequisites

### 1. Node.js
- Install Node.js version 16 or higher from [nodejs.org](https://nodejs.org/)
- Verify installation: `node --version` and `npm --version`

### 2. MongoDB

#### Option A: Local MongoDB Installation
1. Download MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start the MongoDB service
3. MongoDB will run on `mongodb://localhost:27017` by default

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/textvocalizer`)
4. Update the `MONGODB_URI` in your `.env` file

## Environment Variables Setup

1. Copy the example environment file:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. Edit `backend/.env` with your specific values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/textvocalizer
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/textvocalizer

# JWT Configuration (IMPORTANT: Change this to a secure random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_12345_CHANGE_THIS
JWT_EXPIRE=30d

# Frontend URL for CORS
# In development:
FRONTEND_URL=http://localhost:5173
# In production (Render/Netlify/Vercel), set this to your deployed frontend origin, e.g.:
# FRONTEND_URL=https://your-frontend.onrender.com

# SMTP Email (Required for Forgot Password)
# Use your SMTP provider credentials (e.g., Gmail App Password, SendGrid, Mailgun, or Ethereal for testing)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

# Email From (optional)
FROM_NAME=Voicify
FROM_EMAIL=no-reply@voicify.app
```

3. Create frontend environment file (optional but recommended):

```bash
cp frontend/.env.example frontend/.env
```

Then edit `frontend/.env`:

```env
# Point the frontend to your API base URL (no trailing slash)
# Local dev backend:
VITE_API_URL=http://localhost:5000
# Or your deployed backend base URL:
# VITE_API_URL=https://your-backend.onrender.com
```

## Installation Steps

### Quick Install (Automated)
Run the installation script:
- **Windows**: Double-click `install.bat` or run in command prompt
- **Mac/Linux**: Run `chmod +x install.sh && ./install.sh`

### Manual Install
1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

### Development Mode
1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Backend Health Check: http://localhost:5000/api/health

### Production Mode
1. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Start Production Backend**:
   ```bash
   cd backend
   npm start
   ```

## Testing the Application

1. **Register a new account** at http://localhost:5173/register
2. **Login** with your credentials
3. **Access the Dashboard** to test text-to-speech functionality
4. **Toggle dark/light mode** using the theme button

## Troubleshooting

### Common Issues

#### MongoDB Connection Error
- **Issue**: `MongooseError: Could not connect to any servers in your MongoDB Atlas cluster`
- **Solution**: 
  - Check your MongoDB URI in `.env`
  - Ensure MongoDB service is running (local) or cluster is active (Atlas)
  - For Atlas: Check network access settings and database user permissions

#### Port Already in Use
- **Issue**: `Error: listen EADDRINUSE: address already in use :::5000`
- **Solution**: 
  - Change the `PORT` in `.env` file
  - Or kill the process using the port: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

#### Frontend Build Issues
- **Issue**: PostCSS or Tailwind errors
- **Solution**: 
  - Delete `node_modules` and `package-lock.json`
  - Run `npm install` again
  - Ensure PostCSS config uses correct syntax

#### CORS Issues
- **Issue**: Cross-origin request blocked
- **Solution**: 
  - Check `FRONTEND_URL` in backend `.env`
  - Ensure frontend is running on the specified URL
   - If deployed, ensure `FRONTEND_URL` matches your production origin exactly (scheme + host + port)

#### Forgot Password email not received
- **Issue**: Reset emails not arriving
- **Solution**:
   - Verify SMTP variables in `backend/.env` are set and correct
   - Check server logs for `SMTP credentials are not configured` errors
   - For Gmail, use an App Password and enable access for your app
   - For testing, use Ethereal: create a test account at https://ethereal.email and fill HOST/USER/PASS
   - Ensure `FRONTEND_URL` is set so reset links point to your frontend

### Environment Validation

Test your setup:
1. **Backend Health Check**: Visit http://localhost:5000/api/health
2. **Frontend Loading**: Visit http://localhost:5173
3. **API Connection**: Check browser console for any network errors

## Security Notes

### Production Deployment
- **Change JWT_SECRET**: Use a long, random, secure string
- **Environment Variables**: Never commit `.env` files to version control
- **HTTPS**: Use SSL certificates in production
- **Database**: Use strong passwords and restrict database access
- **CORS**: Configure CORS for your production domain only

### Development
- Default JWT secret is for development only
- Local MongoDB has no authentication by default
- CORS is configured for localhost development

## Additional Resources

- **React Documentation**: [reactjs.org](https://reactjs.org/)
- **Express.js Guide**: [expressjs.com](https://expressjs.com/)
- **MongoDB Manual**: [docs.mongodb.com](https://docs.mongodb.com/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)
- **Vite Guide**: [vitejs.dev](https://vitejs.dev/)

## Support

If you encounter any issues:
1. Check the terminal output for error messages
2. Review the browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed
5. Check that MongoDB is running and accessible

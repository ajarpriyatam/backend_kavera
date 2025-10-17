# 🚀 Deployment Guide - Free Hosting

## Backend Deployment (Railway)

### Step 1: Deploy Backend to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect it's a Node.js app
6. Add environment variables in Railway dashboard:
   ```
   NODE_ENV=production
   DB_URI=mongodb+srv://ajarprince:ajar2025prince@cluster0.zjb3rka.mongodb.net/
   JWT_SECRET=mynameispriyatamajarandbelongstonitj
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=90000
   CLOUDNAME=dxxjcs7cy
   APIKEY=716877426929685
   APISECRET=1uFYtzsMypltZgAC1jpPoFvG65g
   ```
7. Railway will provide a URL like: `https://your-app-name.railway.app`

## Frontend Deployment (Vercel)

### Step 2: Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project" → Import your repository
4. Set Root Directory to: `SoleStyle`
5. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api/v2
   ```
6. Deploy!

## Alternative: Render.com (Both Frontend & Backend)

### Backend on Render:
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. "New" → "Web Service"
4. Connect your repository
5. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
6. Add environment variables (same as Railway)
7. Deploy!

### Frontend on Render:
1. "New" → "Static Site"
2. Connect your repository
3. Settings:
   - Root Directory: `SoleStyle`
   - Build Command: `npm run build`
   - Publish Directory: `build`
4. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api/v2
   ```
5. Deploy!

## Environment Variables Summary

### Backend (.env):
```
NODE_ENV=production
PORT=4000
DB_URI=mongodb+srv://ajarprince:ajar2025prince@cluster0.zjb3rka.mongodb.net/
JWT_SECRET=mynameispriyatamajarandbelongstonitj
JWT_EXPIRE=5d
COOKIE_EXPIRE=90000
CLOUDNAME=dxxjcs7cy
APIKEY=716877426929685
APISECRET=1uFYtzsMypltZgAC1jpPoFvG65g
```

### Frontend (.env):
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api/v2
```

## Quick Commands

### Build Frontend Locally:
```bash
cd SoleStyle
npm run build
```

### Test Backend Locally:
```bash
npm start
```

## Notes:
- Railway gives you 500 hours/month free
- Vercel gives unlimited static hosting
- Render gives 750 hours/month free
- All platforms auto-deploy on git push
- Custom domains available on all platforms

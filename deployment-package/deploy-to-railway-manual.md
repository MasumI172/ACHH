# Manual Railway Deployment Guide - Arabian Coast Holiday Homes

## Files Ready for Deployment:
✓ `dist/` folder - Your complete built website
✓ `package.json` - Dependencies
✓ `package-lock.json` - Locked versions
✓ `Dockerfile` - Container configuration
✓ `railway.json` - Railway configuration

## Manual Deployment Steps:

### 1. Railway Dashboard Method (Recommended)
1. Go to https://railway.app
2. Sign up/login with GitHub or email
3. Purchase Hobby plan ($5/month)
4. Click "New Project" → "Empty Project"
5. Click "Deploy from GitHub repo" or "Deploy service"

### 2. Upload Your Files
Option A: GitHub Integration
- Create GitHub repository
- Upload all project files
- Connect Railway to GitHub repo

Option B: Direct Upload
- Use Railway's file upload feature
- Upload `dist/` folder contents
- Upload package.json files

### 3. Configure Services
1. **Web Service**:
   - Start Command: `node dist/index.js`
   - Port: 5000 (auto-detected)
   
2. **Database Service**:
   - Click "Add Service" → "PostgreSQL"
   - Railway auto-generates DATABASE_URL

### 4. Environment Variables (Auto-configured)
- DATABASE_URL: Provided by Railway PostgreSQL service
- PORT: Auto-detected by Railway

## Your Website Features (All Ready):
✓ WhatsApp booking integration (+971 55 816 6062)
✓ Real-time Hostex calendar sync
✓ Beautiful 1BR property with 17+ images
✓ Stunning 1BR property with proper iCal URL
✓ Mobile-responsive luxury design
✓ Contact form with mandatory validation
✓ Automatic scroll-to-top navigation

## Deployment Time: 5-10 minutes
## Monthly Cost: $5 (Hobby plan includes everything)

Your website is production-ready!
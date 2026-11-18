# Production Deployment Guide — Atelier Vera MERN Platform

## 1. MongoDB Atlas Setup
1. Create a production cluster on MongoDB Atlas.
2. Under **Database Access**, create a dedicated database user with `readWrite` permissions.
3. Under **Network Access**, whitelist your backend host IP ranges.
4. Copy the connection string into `MONGODB_URI` on your backend host.

## 2. Cloudinary Setup
1. Log in to Cloudinary and copy your `Cloud Name`, `API Key`, and `API Secret`.
2. Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `CLOUDINARY_FOLDER=atelier-vera` in your backend environment.

## 3. Backend Deployment (Render / Railway / Fly.io)
1. Connect the `backend/` directory to your Node.js service.
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Required Environment Variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `CLIENT_URL=https://your-production-frontend-domain.com`
   - `MONGODB_URI=mongodb+srv://...`
   - `JWT_SECRET=<64-character-random-hex>`
   - `JWT_EXPIRES_IN=7d`
   - `COOKIE_SECURE=true`
   - `CLOUDINARY_CLOUD_NAME=...`
   - `CLOUDINARY_API_KEY=...`
   - `CLOUDINARY_API_SECRET=...`
   - `STUDIO_TIMEZONE=Asia/Kolkata`
5. Run `npm run seed` once via the host shell to initialize the administrator account.

## 4. Frontend Deployment (Vercel / Netlify)
1. Set the Root Directory to `frontend/`.
2. Framework Preset: **Vite** (`npm run build`, output directory `dist`).
3. Set Environment Variable:
   - `VITE_API_BASE_URL=https://your-backend-api-domain.com/api`
4. Configure SPA rewrite rules so all client routes (`/projects/*`, `/admin/*`, `/book-consultation`) resolve to `/index.html`.

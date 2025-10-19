# MILAN Full-Stack Web Application

A modern full-stack web application built for event management and scoring during IIT Hyderabad's **MILAN Festival**. This project uses **Next.js 15**, **Firebase Authentication**, and **MongoDB** for data persistence, featuring both frontend and backend integration in a single deployable app.

---

## 🚀 Features

### Authentication
- **Google Sign-In** using Firebase Authentication
- Domain restriction to `@iith.ac.in` for student logins
- Admin email whitelist for backend control
- Secure Firebase token verification via Admin SDK

### Events System
- Stores all MILAN events (Sports Boys/Girls, Cultural, Technical)
- Fetch, filter, and display real-time event information
- "Today's Events" dynamically determined based on date

### Leaderboard
- Admins can update hostel-wise scores for every sport
- Real-time leaderboard view filtered by Boys/Girls
- Dynamic spreadsheet integration using Google Sheets (CSV export + mapping GID → sport)

### User Profiles & Preferences
- Personalized user profiles created at login
- MongoDB stores user preferences (`preferredEventIds` and `preferredCategories`)
- Each authenticated user can save and update event tracking preferences

### Admin Portal
- Admin-only access based on Firebase authentication
- Table interface for updating sports scores across hostels
- Protected API routes validating admin status

### Backend (API Routes)
API routes powered by Next.js:
- `/api/auth/google-login` — Google OAuth login endpoint
- `/api/auth/profile` — Securely fetch the logged-in user's profile
- `/api/events` — Retrieve event data from MongoDB
- `/api/leaderboard/update` — Admin route to update leaderboard data

Firebase Admin SDK verifies tokens for security. All MongoDB calls are abstracted via `connectToDB()` in `lib/db.ts`.

---

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | Next.js 15, React 18, TypeScript, Tailwind CSS |
| **Authentication** | Firebase Auth (Google Sign-In) |
| **Database** | MongoDB with Mongoose (hosted on MongoDB Atlas) |
| **Server Logic** | Next.js API Routes + Firebase Admin SDK |
| **Deployment** | Vercel (primary) / Hostinger VPS (Node.js setup) |

---

## 📁 Project Structure

```
milan-demo/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── google-login/
│   │   │   └── profile/
│   │   ├── events/
│   │   └── leaderboard/
│   ├── events/
│   ├── admin/
│   └── profile/
├── lib/
│   ├── db.ts              # MongoDB connection logic
│   ├── firebase.ts        # Firebase Admin (server)
│   └── firebaseClient.ts  # Firebase client (auth frontend)
├── middleware/
│   └── auth.ts            # Token verification & domain validation
├── models/
│   ├── user.ts            # Mongoose user model
│   ├── Event.ts           # Event schema
│   └── Leaderboard.ts     # Leaderboard schema
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Firebase Admin SDK (Service Account JSON)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"milan-demo-121ef",...}

# Firebase Web App (Client Configuration)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=milan-demo-121ef.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=milan-demo-121ef
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=milan-demo-121ef.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/milan_demo
```

> **⚠️ Security Note:** Never commit `.env.local` to version control. Add it to `.gitignore`.

---

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB instance)
- Firebase project with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd milan-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env.local` (if provided)
   - Add your Firebase and MongoDB credentials

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 🔐 How It Works

### Frontend Authentication Flow

1. User clicks "Continue with Google"
2. Firebase SDK opens a Google sign-in popup
3. On success, Firebase returns an **ID token** for the current user
4. Frontend calls `/api/auth/google-login` with this token
5. Backend verifies it with Firebase Admin SDK, creates or retrieves the user entry from MongoDB, and returns the profile

### Secure API Access

All API routes use a `withAuth(req)` wrapper to validate Firebase tokens:
- Extracts the token from `Authorization: Bearer <idToken>`
- Verifies with Firebase Admin SDK (`auth.verifyIdToken(token)`)
- Rejects invalid tokens or emails not ending with `@iith.ac.in`
- Returns decoded user info with `isAdmin` flag

### Database Logic

- Each API route initializes a shared MongoDB connection via `connectToDB()`
- Auto-handles connection caching to prevent redundant reconnects
- Mongoose models: `User`, `Event`, and `Leaderboard`

### Event Rendering

- Events fetched from MongoDB and rendered by category
- "Today's Events" determined dynamically via `isToday(e.date)` utility

### Admin Scoring Logic

- Admin portal accessible to whitelisted admin emails
- Fetches and updates hostel-wise scores via `/api/leaderboard/update`
- Writes updated data to the `Leaderboard` collection

---

## ☁️ Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy automatically with each push to main branch

### Hostinger VPS (Alternative)

1. **SSH into your VPS**
   ```bash
   ssh user@your-vps-ip
   ```

2. **Install Node.js and PM2**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Clone and setup**
   ```bash
   git clone <repo-url>
   cd milan-demo
   npm install
   npm run build
   ```

4. **Start with PM2**
   ```bash
   pm2 start npm --name "milan-app" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx** (for domain and HTTPS)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 📦 Dependencies

### Core Dependencies
- `next` - React framework for production
- `react` & `react-dom` - UI library
- `firebase` - Client-side authentication
- `firebase-admin` - Server-side token verification
- `mongodb` & `mongoose` - Database ORM
- `typescript` - Type safety

### Dev Dependencies
- `tailwindcss` - Utility-first CSS framework
- `eslint` - Code linting
- `@types/*` - TypeScript type definitions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👥 Authors

Developed by IIT Hyderabad students for **MILAN 2025**.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team at IIT Hyderabad

---

## 📝 Summary

This application is an integrated **event-management and leaderboard system** powered by Next.js and Firebase. It delivers seamless authentication, real-time event data, and secure admin control — all in a single deployable project.

Perfect for college festivals or competitions requiring user-specific access, event tracking, and hostel-based score visualization.
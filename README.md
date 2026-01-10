# 📝 Smart ToDo-List (나의 할 일)

A modern, responsive ToDo list application built with React, TypeScript, and Firebase. Features real-time synchronization across devices and a clean, premium UI.

## 🚀 Live Demo
**[Click here to view the live site](https://hunylee.github.io/ToDo-List/)**

*(Note: If the link is 404, please ensure the `npm run deploy` command has been run by the repository owner.)*

## ✨ Features
-   **📱 Responsive Design**: Optimized layouts for both Desktop (Full-width) and Mobile (Compact).
-   **🔄 Real-time Sync**: Uses **Firebase Firestore** to sync tasks instantly between devices.
-   **🎨 Light Theme**: Clean, minimalist aesthetic with glassmorphism-inspired details.
-   **🇰🇷 Korean Localization**: Fully localized UI.

## 🛠 Tech Stack
-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS
-   **Database**: Firebase Firestore
-   **Icons**: Lucide React

## ⚙️ Usage

### 1. Installation
```bash
npm install
```

### 2. Configuration (Firebase)
Create a `.env` file in the root directory with your Firebase keys:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Localization
Run the development server:
```bash
npm run dev
```

### 4. Deployment
This project is configured for **GitHub Pages**.
```bash
npm run deploy
```
This command builds the project and pushes it to the `gh-pages` branch.

---
Made with ❤️ by hunylee

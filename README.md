# 🎓 StudyOrbit — MERN Stack Ed-Tech Platform

StudyOrbit is a full-featured ed-tech platform that enables students to discover, purchase, and consume educational courses, and empowers instructors to create and manage their own course content. Built entirely on the MERN stack.

### 🌍 Live Demo
**[https://study-orbit.vercel.app/](https://study-orbit.vercel.app/)**

---

## 📝 Overview

StudyOrbit connects students and instructors on a single platform:

- **Students** can browse courses by category, add them to a cart, purchase them via Razorpay, track their progress, and rate/review completed courses.
- **Instructors** can create courses with sections and sub-sections, upload video lectures and thumbnails, publish/unpublish courses, and view an analytics dashboard of their course performance.

---

## ✨ Features

**Authentication & Security**
- Email/password signup with OTP verification
- JWT-based authentication with role-based access (Student / Instructor / Admin)
- Forgot password / reset password flow

**For Students**
- Browse courses by category with a searchable catalog
- Cart & checkout with Razorpay payment integration
- Enrolled courses dashboard with progress tracking
- Rate and review purchased courses

**For Instructors**
- Create, edit, and delete courses
- Add sections and video sub-sections to structure course content
- Upload thumbnails and lecture videos via Cloudinary
- Instructor dashboard with course insights and stats

**Platform**
- Responsive UI built with Tailwind CSS
- Toast notifications, lazy-loaded images, and smooth animations
- Markdown-based course content rendering

---

## 💻 Tech Stack

**Frontend:** React.js, Vite, Redux Toolkit, Tailwind CSS, React Router
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Media Storage:** Cloudinary
**Payments:** Razorpay
**Auth:** JSON Web Tokens (JWT), bcrypt
**Email:** Nodemailer

---

## ⚙️ Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (local or MongoDB Atlas)
- A Cloudinary account (for media uploads)
- A Razorpay account (for payments)
- An SMTP/Gmail app password (for OTP & notification emails)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd StudyOrbit
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following variables:
```env
PORT=5000
DATABASE_NAME=StudyOrbit
COOKIE_EXPIRES=3
COOKIE_KEY=your_cookie_secret
BCRYPT_GEN_SALT_NUMBER=10
UPLOAD_DIRECTORY=./uploads

JWT_SECRET=your_jwt_secret
MONGODB_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=StudyOrbit

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

Run the backend:
```bash
npm run dev
```
The server starts on `http://localhost:5000`.

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/` with:
```env
VITE_APP_BASE_URL=http://localhost:5000
VITE_APP_RAZORPAY_KEY=your_razorpay_key_id
```

Run the frontend:
```bash
npm run dev
```
The app starts on `http://localhost:5173`.

---

## 🔐 Roles

| Role | Capabilities |
|------|-------------|
| **Student** | Browse & purchase courses, track progress, rate courses |
| **Instructor** | Create & manage own courses |
| **Admin** | Manage categories platform-wide |

> Note: there is no public signup option for the Admin role — the first Admin account must be created directly in the database (or via a seed script) before categories can be added.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋 Author

**Vishnu Chaurasiya**
Full Stack (MERN) Developer, Gorakhpur, Uttar Pradesh, India
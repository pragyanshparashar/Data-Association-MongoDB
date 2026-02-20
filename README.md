# Data Association MongoDB App

A full-stack web application demonstrating user authentication, relational data modeling, and protected routes using MongoDB, Express, Node.js, and EJS.  
This project showcases real-world backend architecture patterns such as JWT authentication, hashed passwords, middleware authorization, schema relationships, and file uploads.

---

## 🚀 Features

- User Registration & Login system
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes with middleware
- Create posts
- Like / Unlike posts
- Edit posts
- User ↔ Post relationship (MongoDB references)
- Server-side rendering using EJS
- Session persistence using cookies
- Profile image upload using Multer
- Default profile picture for new users
- User profile photo update support

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js
- Multer (file upload handling)

**Database**
- MongoDB
- Mongoose ODM

**Authentication**
- JSON Web Tokens (JWT)
- bcrypt password hashing
- cookie-parser

**Frontend**
- EJS templating engine
- TailwindCSS (CDN)

---

## 🧠 Architecture Overview

This application follows a classic MVC-inspired backend pattern:

Client → Routes → Middleware → Controller Logic → Database → View Rendering.

Relationships implemented:

User  
└── posts → references Post collection  

Post  
└── user → references User collection  
└── likes → array of User references  

---

## 🔐 Authentication Flow

1. User registers  
2. Password is hashed  
3. JWT token is generated  
4. Token stored in cookies  
5. Protected routes verify token  
6. If valid → access granted  
7. If invalid → redirect to login  

---

## 📂 Project Structure


project/
│
├── models/
│ ├── user.js
│ └── post.js
│
├── views/
│ ├── index.ejs
│ ├── login.ejs
│ ├── profile.ejs
│ └── edit.ejs
│
├── public/
│ └── images/
│ └── uploads/
│
├── app.js
└── package.json


Server runs on:

http://localhost:4000


---

---

## 📌 Routes Overview

| Route | Method | Description |
|------|--------|-------------|
/ | GET | Register page |
/register | POST | Create account |
/login | GET | Login page |
/login | POST | Authenticate user |
/profile | GET | User dashboard |
/posts | POST | Create post |
/likes/:id | GET | Toggle like |
/edit/:id | GET | Edit page |
/update/:id | POST | Update post |
/logout | GET | Logout user |

---

## 🖼 Profile Image System

- Default avatar assigned at registration
- Images stored locally using Multer
- Unique filename generation prevents conflicts
- Static file serving configured via Express
- Users can update profile image anytime

---

## 🎯 Learning Outcomes

This project demonstrates practical understanding of:

- Authentication systems
- Middleware design
- Database relationships
- Secure password storage
- Protected routing
- MVC backend structuring
- Full CRUD operations
- Session management
- File uploads handling
- Static asset serving

---

## 🔮 Future Improvements

- Delete posts
- Comment system
- API version
- REST architecture conversion
- Frontend framework integration (React / Next.js)
- Refresh token authentication
- Role-based authorization

---

## 👨‍💻 Pragyansh Parashar

Built as a backend architecture practice project to master authentication, database relations, file handling, and real-world server logic.

---

⭐ If you found this project useful, consider starring the repo.

GitHub Repo — https://github.com/pragyanshparashar/Data-Association-MongoDB

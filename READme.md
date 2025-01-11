# RBAC Blog

## Overview 
This is role based authorization blog application built with React and Node.js , Express, Supabase(Postgresql), and Tailwind CSS.

### Project Structure

## Project Structure

```
rbac-blog/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── posts.js
│   │   │   └── users.js
│   │   └── middleware/
│   │       └── authMiddleware.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   └── App.jsx
    └── .env
```

## Setup Instructions 

### Backend

create .env file in backend folder and add the following variables
```
PORT=5000
JWT_SECRET=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

run the following commands in backend folder

```
cd backend
pnpm install
pnpm dev
```

### Frontend

create .env file in frontend folder and add the following variables

```
VITE_APP_API_URL=http://localhost:5000
```

run the following commands in frontend folder
```
cd frontend
pnpm install
pnpm dev
```

### Api endpoints


#### Authentication


- **POST** `/api/auth/signup`: Create a new user.
- **POST** `/api/auth/login`: Log in an existing user.

#### Blog Posts
- **GET** `/api/posts`: Get all blog posts.
- **GET** `/api/posts/user`: Get all blog posts created by the user.
- **GET** `/api/posts/:id`: Get a specific blog post.
- **POST** `/api/posts`: Create a new blog post.
- **PUT** `/api/posts/:id`: Update a blog post.
- **DELETE** `/api/posts/:id`: Delete a blog post.

#### Users
- **GET** `/api/users/profile`: Get the user's profile.


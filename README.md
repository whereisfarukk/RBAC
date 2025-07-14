# Role-Based Authentication System

This is a full-stack authentication project built with **Node.js**, **Express**, **MongoDB**, and **Passport.js**, featuring **role-based access control (RBAC)**. It supports three roles: `admin`, `moderator`, and `client`. The frontend can be developed separately (e.g., in React) and communicates with this backend through session-based authentication.

---

## 🚀 Features

-   ✅ User Registration
-   ✅ User Login with Session Support
-   ✅ Role-Based Access (Admin, Moderator, Client)
-   ✅ Flash Message Support for Feedback
-   ✅ Secure Password Hashing with Bcrypt
-   ✅ Admin can change the role of other users

---

## 👥 Roles

-   **Admin**: Full access. Can change the roles of other users.
-   **Moderator**: Limited access for content management or support.
-   **Client**: Default role for newly registered users.

---

## 🛠 Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose)
-   **Authentication**: Passport.js with Local Strategy
-   **Session Store**: connect-mongo
-   **Templating**: EJS (for testing only; works well with React frontend too)

---

## 🔐 Authentication Flow

1. User registers with email and password.
2. Password is hashed using Bcrypt before saving.
3. Upon login, a session is created using `express-session`.
4. Role is assigned based on email or default:
    - `ADMIN_EMAIL` (from `.env`) → `admin`
    - Others → `client`
5. Authenticated session is stored in MongoDB.
6. Role-based routes are protected with middleware.

---

## 📁 Project Structure

```
role-based-auth-app/
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── User.js
│
├── public/
│
├── route/
│   ├── adminRoute.js
│   ├── authRoute.js
│   ├── indexRoute.js
│   └── userRoute.js
│
├── utils/
│   ├── constantUserRole.js
│   └── passportAuth.js
│
├── validator/
│   └── auth/
│       └── signupValidator.js
│
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   └── profile.ejs
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── app.js

```

---

## 📦 Installation

1. Clone the repo:

```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file:

```bash
DB_USER=your_db_user
DB_PASS=your_db_pass
ADMIN_EMAIL=admin@example.com
```

4. Start the server:

```bash
npm start
```

## 🌐 API Endpoints

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| POST   | `/auth/register` | Register a new user              |
| POST   | `/auth/login`    | Login existing user              |
| GET    | `/user/profile`  | Get logged-in user's profile     |
| GET    | `/admin/users`   | Admin route to view/update roles |

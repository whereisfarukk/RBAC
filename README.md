## 🧭 High-Level Passport.js Authentication Workflow

### 🔁 Goal:

Authenticate users with email/password using sessions — so they stay logged in after login.

## ⚙️ 1. Setup Middleware in Express

In my `app.js` or entry file:

```js
app.use(passport.initialize());
app.use(passport.session());
```

- `passport.initialize()` → sets up Passport

- `passport.session()` → manages persistent login sessions via cookies

## 🛠️ 2. Local Strategy Configuration

```js
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // use "email" instead of default "username"
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user)
        return done(null, false, { message: "username/email not registered" });

      const match = await bcrypt.compare(password, user.password);
      if (match) return done(null, user);
      else return done(null, false, { message: "Incorrect password" });
    }
  )
);
```

### 📌 What's happening here:

- This is the authentication logic.

- Called automatically when you run `passport.authenticate("local", ...)`.

- It verifies if the email/password are correct.

- If yes, `done(null, user)` is called → triggers session creation.

## 📦 3. Login Request Triggers Local Strategy

My route:

```js
router.post(
  "/login",
  isUnAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);
```

- `passport.authenticate("local", ...)` calls the local strategy above.

- If login success: redirects to `/user/profile`

- If failure: redirects back with flash messages

## 🔒 4. Session Management

### ✅ Serialize User:

```js
passport.serializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});
```

- Runs after successful login

- Stores the user object (or user ID typically) in the session store (in-memory or DB(We will save it in MongoDb later using `coonect-mongo`))

- Sends session ID as a cookie to the client (`connect.sid`)

### 🔑 Deserialize User:

```js
passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});
```

- Runs on every subsequent request

- Uses the session ID (from the cookie) to restore the `req.user` object

🔍 deserializeUser tells Passport how to rebuild the user object from the session.

## 📂 5. req.user Is Available

After login and on all future requests:

```js
app.use((req, res, next) => {
  res.locals.user = req.user; // makes user available in views
  next();
});
```

## 🧠 Summary Workflow

```bash
🔹 User submits login form → POST /login
    ⮡ passport.authenticate("local") called
        ⮡ LocalStrategy runs (checks email/password)
            ⮡ If OK → done(null, user)
                ⮡ serializeUser() stores session (e.g. user._id)
                ⮡ session ID saved in cookie
🔹 Later requests:
    ⮡ cookie sent by browser (connect.sid)
        ⮡ deserializeUser() fetches user
        ⮡ req.user available in routes/middleware/views
```

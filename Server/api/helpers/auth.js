// /Server/api/helpers/auth.js
// ---------------------------------------------------------------------------
// itty-router-ready handlers for Register / Login.
// - They RETURN Response objects (using jsonResponse helper).
// - They connect DB, validate payload, and set auth cookie.
// - No "fetch to self" anywhere.
// ---------------------------------------------------------------------------

import bcrypt from 'bcrypt';
import { jsonResponse } from './jsonResponse.js';
import { connectDB } from '../config/db.js';
import User from '../models/user.model.js';
import validateEmail from './validateEmail.js';
import validatePassword from './validatePassword.js';
import { setAuthCookie } from '../Cookies/appCookie.js';

// -----------------------------
// REGISTER (POST /register)
// -----------------------------
export async function registerHandler(req) {   console.log('➡️Registeration is running ... ');
  await connectDB();                         // ensure DB is ready
  const { username, email, password } = await req.json(); // parse JSON body

  // Validate inputs early
  if (!username || !email || !password) {
    return jsonResponse({ message: 'All fields are required.' }, 400);
  }
  if (!validateEmail(email)) {
    return jsonResponse({ message: 'Invalid email format.' }, 400);
  }
  if (!validatePassword(password)) {
    return jsonResponse({ message: 'Weak password.' }, 400);
  }

  try {
    // Check duplicate email
    const exists = await User.findOne({ email });
    if (exists) {
      return jsonResponse({ message: 'User already exists.' }, 400);
    }

    // Hash & insert
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    // Create auth cookie (simple userId for demo)
    const cookieHeaders = setAuthCookie(user._id.toString());

    // Respond success + set cookie
    return jsonResponse(
      { message: '🚀User created successfully.', user: { ...user.toObject(), password: undefined } },
      201,
      cookieHeaders
    );
  } catch (err) {
    // Handle predictable errors
    return jsonResponse({ message: err.message || 'Registration failed.' }, 400);
  }
}

// -----------------------------
// LOGIN (POST /login)
// -----------------------------
export async function loginHandler(req) {
  await connectDB();                          // ensure DB is ready
  const { email, password } = await req.json(); // parse JSON payload

  if (!email || !password) {
    return jsonResponse({ message: 'Email and password are required.' }, 400);
  }

  try {
    // Lookup user
    const user = await User.findOne({ email });
    if (!user) {
      return jsonResponse({ message: 'User not found.' }, 400);
    }

    // Compare password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return jsonResponse({ message: 'Wrong password🔥.' }, 400);
    }

    // Set auth cookie
    const cookieHeaders = setAuthCookie(user._id.toString());

    // Respond success
    return jsonResponse(
      { message: 'Logged in successfully.➡️ That’s really kind of you to join us ❤️', user: { ...user.toObject(), password: undefined } },
      200,
      cookieHeaders
    );
  } catch (err) {
    return jsonResponse({ message: err.message || 'Login failed.' }, 400);
  }
}

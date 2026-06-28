"use client";

import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  async function login() {
    await signInWithEmailAndPassword(auth, "test@test.com", "password123");
  }

  async function signup() {
    await createUserWithEmailAndPassword(auth, "test@test.com", "password123");
  }

  return (
    <div>
      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

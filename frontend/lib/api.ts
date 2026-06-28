import { auth } from "./firebase";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  console.log("CURRENT USER:", auth.currentUser);

  const token = auth.currentUser ? await auth.currentUser.getIdToken() : "";

  console.log("TOKEN:", token);

  const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  return await res.json();
}

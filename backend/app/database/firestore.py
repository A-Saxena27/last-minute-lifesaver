import firebase_admin
from firebase_admin import credentials, firestore

# Prevent initializing Firebase multiple times
if not firebase_admin._apps:
    cred = credentials.Certificate("secrets/firebase-key.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()


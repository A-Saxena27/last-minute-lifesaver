from fastapi import Header, HTTPException
import firebase_admin
from firebase_admin import auth

def get_current_user(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]
        decoded = auth.verify_id_token(token)
        return decoded
    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized"
        )
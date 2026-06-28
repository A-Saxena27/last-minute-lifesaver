from app.models.user import User
from fastapi import APIRouter
from fastapi import Depends
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
def get_users():
    return {"message": "Users router is working"}

@router.get("/me")
def get_current_user():
    # This would typically use a dependency to get the current authenticated user
    pass

@router.post("/login")
def login_user(username: str, password: str):
    for user in users:
        if user.username == username and user.password == password:
            return {"message": "Login successful", "user": user}
    return {"error": "Invalid username or password"}

@router.get("/{user_id}")
def get_user(user_id: int):
    if user_id < 0 or user_id >= len(users):
        return {"error": "User not found"}
    return users[user_id]

@router.post("/sync")
def sync_user():
    return {
        "message": "User sync endpoint working"
    }

@router.get("/protected")
def protected_route(user=Depends(get_current_user)):
    return {
        "message": "Authenticated!",
        "user": user
    }
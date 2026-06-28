from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routers.tasks import router as task_router
from app.routers.user import router as user_router
from app.routers import ai
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend Running"}

app.include_router(task_router)
app.include_router(user_router)
app.include_router(ai.router)
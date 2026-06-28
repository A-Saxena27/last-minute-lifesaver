from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    id: str
    title: str
    description: Optional[str] = ""
    deadline: str
    priority: str
    estimated_hours: int
    status: str = "pending"
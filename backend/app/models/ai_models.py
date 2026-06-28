from pydantic import BaseModel
from typing import List


class TaskInput(BaseModel):
    title: str
    description: str = ""
    priority: str
    deadline: str
    estimated_time: int


class PrioritizeRequest(BaseModel):
    tasks: List[TaskInput]


class BattlePlanRequest(BaseModel):
    tasks: List[TaskInput]
    available_hours: int


class FutureSelfRequest(BaseModel):
    tasks: List[TaskInput]
    days_delayed: int


class ReplanRequest(BaseModel):
    completed_tasks: List[str]
    pending_tasks: List[TaskInput]
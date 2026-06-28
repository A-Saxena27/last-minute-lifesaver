from app.models.task import Task
from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.repositories.task_repository import TaskRepository
router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/create")
def create_task(
    task: dict,
    user=Depends(get_current_user)
):
    result = TaskRepository.create_task(
        user["uid"],
        task
    )

    return {
        "success": True,
        "data": result
    }

@router.get("/")
def get_tasks(
    user=Depends(get_current_user)
):
    tasks = TaskRepository.get_all_tasks(
        user["uid"]
    )

    return {
        "success": True,
        "data": tasks
    }

@router.get("/{task_id}")
def get_task(task_id: str):

    task = TaskRepository.get_task(task_id)

    if not task:
        return {"error": "Task not found"}

    return task

@router.put("/{task_id}")
def update_task(task_id: str, task: Task):

    return TaskRepository.update_task(
        task_id,
        task.model_dump()
    )

@router.delete("/{task_id}")
def delete_task(task_id: str):

    TaskRepository.delete_task(task_id)

    return {"message": "Deleted"}
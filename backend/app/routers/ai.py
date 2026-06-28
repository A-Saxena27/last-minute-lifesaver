from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.repositories.task_repository import TaskRepository
from app.repositories.ai_repository import (
    prioritize as ai_prioritize,
    future_self as ai_future_self,
    battle_plan as ai_battle_plan,
    replan as ai_replan,
    save_ai_result
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


# ---------------- PRIORITIZE ----------------
@router.post("/prioritize")
def prioritize_route(
    user=Depends(get_current_user)
):
    uid = user["uid"]

    tasks = TaskRepository.get_all_tasks(uid)

    result = ai_prioritize(tasks)

    return {
        "success": True,
        "data": result
    }


# ---------------- FUTURE SELF ----------------
@router.post("/future-self")
def future_route(
    user=Depends(get_current_user)
):
    uid = user["uid"]

    tasks = TaskRepository.get_all_tasks(uid)

    result = ai_future_self(tasks)

    return {
        "success": True,
        "data": result
    }


# ---------------- BATTLE PLAN ----------------
@router.post("/battle-plan")
def battle_route(
    user=Depends(get_current_user)
):
    uid = user["uid"]

    tasks = TaskRepository.get_all_tasks(uid)

    result = ai_battle_plan(tasks)

    return {
        "success": True,
        "data": result
    }

# ---------------- REPLAN ----------------
@router.post("/replan")
def replan_route(
    user=Depends(get_current_user)
):
    uid = user["uid"]

    tasks = TaskRepository.get_all_tasks(uid)

    result = ai_replan(tasks)

    return {
        "success": True,
        "data": result
    }
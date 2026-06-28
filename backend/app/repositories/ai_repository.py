from app.services.gemini_service import (
    generate_response,
    load_prompt
)
from app.database.firestore import db
from datetime import datetime


def save_ai_result(plan_type, prompt, response):
    doc = {
        "type": plan_type,
        "prompt": prompt,
        "response": response,
        "created_at": datetime.utcnow()
    }

    db.collection("aiPlans").add(doc)

    return doc
def prioritize(tasks):

    return generate_response(
        load_prompt("prioritize.txt"),
        str(tasks)
    )


def battle_plan(tasks):

    return generate_response(
        load_prompt("battle_plan.txt"),
        str(tasks)
    )


def future_self(tasks):

    return generate_response(
        load_prompt("future_self.txt"),
        str(tasks)
    )


def replan(tasks):

    return generate_response(
        load_prompt("replan.txt"),
        str(tasks)
    )
from app.database.firestore import db


class TaskRepository:

    collection = db.collection("tasks")

    @staticmethod
    def create_task(uid, task):
        ref = (
            db.collection("users")
              .document(uid)
              .collection("tasks")
        )

        doc = ref.document()

        task["id"] = doc.id

        doc.set(task)

        return task
    
    @staticmethod
    def get_all_tasks(uid):
        docs = (
            db.collection("users")
            .document(uid)
            .collection("tasks")
            .stream()
        )

        return [
            d.to_dict()
            for d in docs
        ]


    @staticmethod
    def get_task(task_id: str):

        doc = TaskRepository.collection.document(task_id).get()

        if doc.exists:
            return doc.to_dict()

        return None

    @staticmethod
    def update_task(task_id: str, task: dict):

        TaskRepository.collection.document(task_id).update(task)

        return TaskRepository.get_task(task_id)

    @staticmethod
    def delete_task(task_id: str):

        TaskRepository.collection.document(task_id).delete()

        return True
from app.database.firestore import db


class UserRepository:

    COLLECTION = "users"

    @staticmethod
    def get_user(uid: str):
        """
        Returns a user document if it exists.
        """
        doc = db.collection(UserRepository.COLLECTION).document(uid).get()

        if doc.exists:
            return doc.to_dict()

        return None


    @staticmethod
    def create_user(uid: str, user_data: dict):
        """
        Creates a new user document.
        """
        db.collection(UserRepository.COLLECTION).document(uid).set(user_data)

        return user_data
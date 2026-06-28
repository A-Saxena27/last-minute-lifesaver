from firebase_admin import auth


def verify_token(id_token: str):
    """
    Verify Firebase ID Token.

    Returns:
        decoded Firebase user information.

    Raises:
        Exception if token is invalid.
    """

    decoded_token = auth.verify_id_token(id_token)

    return decoded_token
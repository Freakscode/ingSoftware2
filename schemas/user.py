def user_schema(user) -> dict:
    return {"id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "profile": user["profile"] if "profile" in user else None,
            "hashed_password": user["hashed_password"]}
# api/version1/login.py
from fastapi import APIRouter, HTTPException
from db.client import db_client
from pydantic import BaseModel
from models.user import User, userLogin

router = APIRouter()

@router.post("/")
async def login(user: userLogin):
    user_in_db = db_client.local.users.find_one({"email": user.email, "username": user.username})
    if user_in_db:
        return {"message": "Inicio de sesión exitoso"}
    else:
        raise HTTPException(status_code=400, detail="Error de inicio de sesión")
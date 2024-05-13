from typing import List
from fastapi import APIRouter, HTTPException,status
from models import user
from db.client import db_client
from schemas.user import user_schema

User = user.User

router = APIRouter(prefix="/users",
                    tags = ["users"],
                    responses={status.HTTP_404_NOT_FOUND: 
                        {"message":"No encontrado"}})


@router.post("/", response_model = User, status_code=status.HTTP_201_CREATED)
async def create_user(user: User):
    if type(search_user_by_email(user.email)) == User:
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST,
                            detail = "Usuario ya existe")
    else:
        user_dict = dict(user)
        del user_dict["id"]
        id = db_client.local.users.insert_one(user_dict).inserted_id
        new_user = user_schema(db_client.local.users.find_one({"_id": id}))
        return User(**new_user)
    

def search_user_by_email(email:str):
    try:
        user = db_client.local.users.find_one({"email": email})
        return User(**user_schema(user))
    except:
        pass
    
@router.get("/", response_model=List[User])
async def read_users():
    users = db_client.local.users.find()
    return [User(**user_schema(user)) for user in users]

## Crea la función get_user que recibirá un token y devolverá un usuario
def get_user(userId:str):
    user = db_client.local.users.find_one({"username": userId})
    return User(**user_schema(user))

## Crea la función verify_password que recibirá una contraseña y un hash y devolverá True si la contraseña es correcta
def verify_password(password, hashed_password):
    return password == hashed_password
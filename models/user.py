from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    id: Optional[str]
    username: str
    email: str
    profile: Optional[str]
    hashed_password: Optional[str]


class userLogin(BaseModel):
    username: str
    email: str

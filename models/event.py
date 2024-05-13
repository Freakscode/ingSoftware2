from pydantic import BaseModel
from typing import Optional

class Event(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    date: str
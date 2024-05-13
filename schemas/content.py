from pydantic import BaseModel

class ContentSchema(BaseModel):
    initial_text: str
    max_length: int
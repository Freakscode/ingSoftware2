from openai import OpenAI
from typing import List
from fastapi import APIRouter, HTTPException, status
from fastapi import APIRouter
from models.content import Content
from schemas.content import ContentSchema
from db.openai import generate_content

router = APIRouter()

@router.post("/generate", response_model=Content)
def generate_content_endpoint(content: ContentSchema):
    generated_text = generate_content(content.initial_text, content.max_length)
    return Content(text=generated_text)
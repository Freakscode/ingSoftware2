from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.version1.router import users, entities, events, content, login

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(entities.router, prefix="/entities", tags=["entities"])
app.include_router(events.router, prefix="/events", tags=["events"])
app.include_router(content.router, prefix="/content", tags=["content"])
app.include_router(login.router, prefix="/login", tags=["login"])


origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}
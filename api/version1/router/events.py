from typing import List
from fastapi import APIRouter, HTTPException, status
from models.event import Event
from db.client import db_client
from schemas.event import event_schema

router = APIRouter(prefix="/events",
                    tags=["events"],
                    responses={status.HTTP_404_NOT_FOUND: 
                        {"message": "No encontrado"}})

@router.post("/", response_model=Event, status_code=status.HTTP_201_CREATED)
async def create_event(event: Event):
    if type(search_event_by_name(event.name)) == Event:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Evento ya existe")
    else:
        event_dict = dict(event)
        del event_dict["id"]
        id = db_client.local.events.insert_one(event_dict).inserted_id
        new_event = event_schema(db_client.local.events.find_one({"_id": id}))
        
        return Event(**new_event)

def search_event_by_name(name: str):
    try:
        event = db_client.local.events.find_one({"name": name})
        return Event(**event_schema(event))
    except:
        pass

@router.get("/", response_model=List[Event])
async def read_events():
    events = db_client.local.events.find()
    return [Event(**event_schema(event)) for event in events]
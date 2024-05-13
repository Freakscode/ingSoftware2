from typing import List
from fastapi import APIRouter, HTTPException, status
from models.entity import Entity
from db.client import db_client
from schemas.entity import entity_schema

router = APIRouter(prefix="/entities",
                    tags=["entities"],
                    responses={status.HTTP_404_NOT_FOUND: 
                        {"message": "No encontrado"}})

@router.post("/", response_model=Entity, status_code=status.HTTP_201_CREATED)
async def create_entity(entity: Entity):
    if type(search_entity_by_name(entity.name)) == Entity:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Entidad ya existe")
    else:
        entity_dict = dict(entity)
        del entity_dict["id"]
        id = db_client.local.entities.insert_one(entity_dict).inserted_id
        new_entity = entity_schema(db_client.local.entities.find_one({"_id": id}))
        
        return Entity(**new_entity)

def search_entity_by_name(name: str):
    try:
        entity = db_client.local.entities.find_one({"name": name})
        return Entity(**entity_schema(entity))
    except:
        pass

@router.get("/", response_model=List[Entity])
async def read_entities():
    entities = db_client.local.entities.find()
    return [Entity(**entity_schema(entity)) for entity in entities]
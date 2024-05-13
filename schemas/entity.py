def entity_schema(entity) -> dict:
    return {"id": str(entity["_id"]) if "_id" in entity else None,
            "name": entity["name"],
            "description": entity["description"] if "description" in entity else None}
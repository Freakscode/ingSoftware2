def event_schema(event) -> dict:
    return {"id": str(event["_id"]) if "_id" in event else None,
            "name": event["name"],
            "description": event["description"] if "description" in event else None,
            "date": event["date"]}
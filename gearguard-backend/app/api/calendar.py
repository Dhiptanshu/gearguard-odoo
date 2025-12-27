from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.maintenance_request import MaintenanceRequest
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/api/calendar", tags=["Calendar"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class CalendarEvent(BaseModel):
    id: int
    title: str
    start: datetime
    end: datetime | None
    allDay: bool = False
    resourceId: int | None = None

@router.get("", response_model=list[dict])
def get_calendar_events(db: Session = Depends(get_db)):
    """
    Get maintenance requests formatted for calendar display.
    """
    requests = db.query(MaintenanceRequest).all()
    events = []
    
    for req in requests:
        start_time = req.scheduled_date or req.created_at
        end_time = start_time
        if req.estimated_duration_hours:
            from datetime import timedelta
            end_time = start_time + timedelta(hours=req.estimated_duration_hours)

        events.append({
            "id": req.id,
            "title": f"{req.title} ({req.stage})",
            "start": start_time, 
            "end": end_time,   
            "resourceId": req.equipment_id,
            "extendedProps": {
                "status": req.stage,
                "priority": req.priority
            }
        })
    
    return events

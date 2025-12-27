from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.requests import MaintenanceCreate, MaintenanceStageUpdate
from app.services.maintenance_service import create_request, update_stage

router = APIRouter(prefix="/api/requests", tags=["Requests"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


from app.schemas.requests import (
    MaintenanceCreate,
    MaintenanceStageUpdate,
    MaintenanceStageUpdate,
    MaintenanceOut
)
from app.models.maintenance_request import MaintenanceRequest

@router.get("", response_model=list[MaintenanceOut])
def list_requests(db: Session = Depends(get_db)):
    return db.query(MaintenanceRequest).all()

@router.post("", response_model=MaintenanceOut)
def create(payload: MaintenanceCreate, db: Session = Depends(get_db)):
    return create_request(db, payload, user_id="demo-user")



@router.patch("/{req_id}/stage")
def change_stage(req_id: int, payload: MaintenanceStageUpdate, db: Session = Depends(get_db)):
    return update_stage(db, req_id, payload, user_id="demo-user")

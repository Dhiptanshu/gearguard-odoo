from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.equipment import Equipment
from app.schemas.equipment import EquipmentOut

router = APIRouter(prefix="/api/equipment", tags=["Equipment"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=list[EquipmentOut])
def list_equipment(db: Session = Depends(get_db)):
    return db.query(Equipment).all()


@router.post("/seed")
def seed_equipment(db: Session = Depends(get_db)):
    items = [
        {
            "name": "Office Printer",
            "serial_number": "PRN-001",
            "location": "Admin Office",
            "status": "active"
        },
        {
            "name": "HVAC Unit",
            "serial_number": "HVAC-204",
            "location": "Building A",
            "status": "active"
        },
        {
            "name": "Server Rack",
            "serial_number": "SRV-12",
            "location": "Data Center",
            "status": "critical"
        }
    ]

    created = 0

    for item in items:
        exists = (
            db.query(Equipment)
            .filter(Equipment.serial_number == item["serial_number"])
            .first()
        )
        if not exists:
            db.add(Equipment(**item))
            created += 1

    db.commit()

    return {
        "message": "Equipment seed completed",
        "created": created
    }

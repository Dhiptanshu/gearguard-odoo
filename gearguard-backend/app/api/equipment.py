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


from fastapi import HTTPException
from app.schemas.equipment import EquipmentCreate, EquipmentOut

@router.get("", response_model=list[EquipmentOut])
def list_equipment(db: Session = Depends(get_db)):
    return db.query(Equipment).all()

@router.post("", response_model=EquipmentOut)
def create_equipment(payload: EquipmentCreate, db: Session = Depends(get_db)):
    exists = db.query(Equipment).filter(Equipment.serial_number == payload.serial_number).first()
    if exists:
        raise HTTPException(status_code=400, detail="Serial number already exists")
    
    item = Equipment(**payload.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{item_id}", response_model=EquipmentOut)
def update_equipment(item_id: int, payload: EquipmentCreate, db: Session = Depends(get_db)):
    item = db.get(Equipment, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Equipment not found")
        
    for k, v in payload.dict().items():
        setattr(item, k, v)
        
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{item_id}")
def delete_equipment(item_id: int, db: Session = Depends(get_db)):
    item = db.get(Equipment, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Equipment not found")
        
    db.delete(item)
    db.commit()
    return {"message": "Deleted"}


@router.post("/seed")
def seed_equipment(db: Session = Depends(get_db)):
    items = [
        {
            "name": "Office Printer",
            "serial_number": "PRN-001",
            "location": "Admin Office",
            "status": "active",
            "department": "Admin",
            "employee": "Unknown"
        },
        {
            "name": "HVAC Unit",
            "serial_number": "HVAC-204",
            "location": "Building A",
            "status": "active",
            "department": "Facility",
            "employee": "Manager"
        },
        {
            "name": "Server Rack",
            "serial_number": "SRV-12",
            "location": "Data Center",
            "status": "critical",
            "department": "IT",
            "employee": "Sysadmin"
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

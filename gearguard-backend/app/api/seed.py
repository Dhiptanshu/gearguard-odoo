from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.user import User
from app.models.team import Team
from app.models.equipment_category import EquipmentCategory
from app.models.equipment import Equipment

router = APIRouter(prefix="/api/seed", tags=["Seed"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("")
def seed_all(db: Session = Depends(get_db)):
    # Seed Teams
    if not db.query(Team).first():
        db.add_all([
            Team(name="Internal Maintenance"),
            Team(name="External Vendor"),
        ])

    # Seed Categories
    if not db.query(EquipmentCategory).first():
        db.add_all([
            EquipmentCategory(name="Electrical"),
            EquipmentCategory(name="Mechanical"),
        ])

    # Seed Users
    if not db.query(User).first():
        db.add_all([
            User(name="Admin User", department="Admin", role="admin"),
            User(name="John Technician", department="Maintenance", role="technician"),
        ])

    # Seed Equipment (check by serial number)
    existing_serials = {
        e.serial_number for e in db.query(Equipment.serial_number).all()
    }

    equipment_to_add = []

    if "PRN-001" not in existing_serials:
        equipment_to_add.append(
            Equipment(
                name="Office Printer",
                serial_number="PRN-001",
                location="Admin Office",
                status="active",
            )
        )

    if "HVAC-204" not in existing_serials:
        equipment_to_add.append(
            Equipment(
                name="HVAC Unit",
                serial_number="HVAC-204",
                location="Building A",
                status="active",
            )
        )

    if equipment_to_add:
        db.add_all(equipment_to_add)

    db.commit()
    return {"message": "Seed completed safely"}

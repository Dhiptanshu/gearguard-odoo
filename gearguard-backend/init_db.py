import os
from datetime import datetime, timedelta
from app.db.session import engine, SessionLocal
from app.db.base import Base
from app.models.user import User
from app.models.team import Team
from app.models.equipment_category import EquipmentCategory
from app.models.equipment import Equipment
from app.models.maintenance_request import MaintenanceRequest
from app.core.security import get_password_hash

def init_db():
    # Drop existing tables to ensure clean state
    # Base.metadata.drop_all(bind=engine)
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # --- Seed Teams ---
    teams = [
        Team(name="Internal Maintenance"),
        Team(name="External Vendor"),
        Team(name="Facility Management"),
        Team(name="IT Support"),
        Team(name="Safety Inspectors")
    ]
    
    if not db.query(Team).first():
        print("Seeding Teams...")
        db.add_all(teams)
        db.commit() 
        teams = db.query(Team).all()
    else:
        teams = db.query(Team).all()

    # --- Seed Categories ---
    categories = [
        EquipmentCategory(name="Computers"),
        EquipmentCategory(name="Printers"),
        EquipmentCategory(name="Monitors"),
        EquipmentCategory(name="Machinery"),
        EquipmentCategory(name="Software"),
        EquipmentCategory(name="Fleet Vehicles"),
        EquipmentCategory(name="HVAC"),
        EquipmentCategory(name="Safety Gear")
    ]
    
    if not db.query(EquipmentCategory).first():
        print("Seeding Categories...")
        db.add_all(categories)
        db.commit()
        categories = db.query(EquipmentCategory).all()
    else:
        categories = db.query(EquipmentCategory).all()
        
    # --- Seed Users ---
    default_password = get_password_hash("admin")
    
    users = [
        User(name="Admin User", department="Admin", role="admin", email="admin@gearguard.com", hashed_password=default_password),
        User(name="Technician", department="Maintenance", role="technician", email="tech@gearguard.com", hashed_password=default_password),
        User(name="Mitchell Admin", department="Management", role="admin", email="mitchell@gearguard.com", hashed_password=default_password),
        User(name="Marc Demo", department="Production", role="user", email="marc@gearguard.com", hashed_password=default_password),
        User(name="Joel Willis", department="Sales", role="user", email="joel@gearguard.com", hashed_password=default_password),
        User(name="Hans Zimmer", department="IT", role="technician", email="hans@gearguard.com", hashed_password=default_password),
        User(name="Sarah Connor", department="Operations", role="user", email="sarah@gearguard.com", hashed_password=default_password),
        User(name="John Doe", department="Logistics", role="user", email="john@gearguard.com", hashed_password=default_password),
    ]
    
    if not db.query(User).first():
        print("Seeding Users...")
        db.add_all(users)
        db.commit()
    
    # --- Seed Equipment ---
    equipment_ids = {} # Map name to ID
    if not db.query(Equipment).first():
        print("Seeding Equipment...")
        equipment_list = [
            Equipment(name='Samsung Monitor 15"', serial_number='MT/125/227F8837', location='Admin Office', status='active', department='Admin', employee='Tejas Modi', category_id=categories[2].id),
            Equipment(name='Acer Laptop', serial_number='MT/122/11112222', location='Tech Lab', status='active', department='Technician', employee='Bhaumik P', category_id=categories[0].id),
            Equipment(name='HP LaserJet Pro', serial_number='HP/456/88990011', location='Sales Floor', status='active', department='Sales', employee='Sarah Connor', category_id=categories[1].id),
            Equipment(name='CNC Machine Model X', serial_number='CNC/789/55667788', location='Production Floor', status='active', department='Production', employee='Marc Demo', category_id=categories[3].id),
            Equipment(name='Industrial Drill Press', serial_number='MCH/999/DRILL01', location='Workshop', status='under_maintenance', department='Maintenance', employee='Technician', category_id=categories[3].id),
            Equipment(name='Deliver Van 1', serial_number='VH/001/FORD', location='Parking Lot A', status='active', department='Logistics', employee='John Doe', category_id=categories[5].id),
            Equipment(name='Forklift 3000', serial_number='VH/002/CAT', location='Warehouse', status='active', department='Logistics', employee='John Doe', category_id=categories[5].id),
            Equipment(name='Main Server Rack', serial_number='IT/SRV/001', location='Server Room', status='active', department='IT', employee='Hans Zimmer', category_id=categories[0].id),
            Equipment(name='Adobe Creative Cloud', serial_number='SW/ACC/001', location='Cloud', status='active', department='Design', employee='Joel Willis', category_id=categories[4].id),
            Equipment(name='Office AC Unit #1', serial_number='HVAC/001/LG', location='Office Ceiling', status='active', department='Facility', employee='Mitchell Admin', category_id=categories[6].id),
            Equipment(name='Safety Harness Kit', serial_number='SF/KIT/005', location='Storage B', status='active', department='Safety', employee='Sarah Connor', category_id=categories[7].id),
        ]
        db.add_all(equipment_list)
        db.commit()
        # Reload to get IDs
        refreshed_equipment = db.query(Equipment).all()
        for eq in refreshed_equipment:
            equipment_ids[eq.name] = eq.id
    else:
        for eq in db.query(Equipment).all():
             equipment_ids[eq.name] = eq.id
        
    # --- Seed Maintenance Requests (Calendar Data) ---
    if not db.query(MaintenanceRequest).first():
        print("Seeding Maintenance Requests...")
        
        now = datetime.now()
        
        requests = [
            # Past
            MaintenanceRequest(
                request_number="MR/0001",
                title="Monthly Server Maintenance",
                # description="Routine checkup and updates.", # Model might not have description? Check model. Assuming title is subject.
                equipment_id=equipment_ids.get('Main Server Rack'),
                category_id=categories[0].id,
                created_by="Hans Zimmer",
                priority="2",
                stage="repaired",
                maintenance_type="preventive",
                assigned_team_id=teams[3].id,
                scheduled_date=now - timedelta(days=5),
                estimated_duration_hours=4
            ),
            MaintenanceRequest(
                request_number="MR/0002",
                title="Fix Leaking AC (Unit #1)",
                equipment_id=equipment_ids.get('Office AC Unit #1'),
                category_id=categories[6].id,
                created_by="Mitchell Admin",
                priority="3",
                stage="repaired",
                maintenance_type="corrective",
                assigned_team_id=teams[2].id,
                scheduled_date=now - timedelta(days=10),
                estimated_duration_hours=2
            ),
            
            # Current
            MaintenanceRequest(
                request_number="MR/0003",
                title="Drill Press Calibration",
                equipment_id=equipment_ids.get('Industrial Drill Press'),
                category_id=categories[3].id,
                created_by="Marc Demo",
                priority="2",
                stage="in_progress",
                maintenance_type="preventive",
                assigned_team_id=teams[0].id,
                scheduled_date=now, 
                estimated_duration_hours=3
            ),
             MaintenanceRequest(
                request_number="MR/0004",
                title="Laptop Screen Flicker",
                equipment_id=equipment_ids.get('Acer Laptop'),
                category_id=categories[0].id,
                created_by="Bhaumik P",
                priority="1",
                stage="new",
                maintenance_type="corrective",
                assigned_team_id=teams[3].id, 
                scheduled_date=now + timedelta(hours=2), 
                estimated_duration_hours=1
            ),
            
            # Future
            MaintenanceRequest(
                request_number="MR/0005",
                title="Van Oil Change",
                equipment_id=equipment_ids.get('Deliver Van 1'),
                category_id=categories[5].id,
                created_by="John Doe",
                priority="1",
                stage="new",
                maintenance_type="preventive",
                assigned_team_id=teams[1].id,
                scheduled_date=now + timedelta(days=2),
                estimated_duration_hours=3 # rounded 2.5 to 3 for Integer
            ),
            MaintenanceRequest(
                request_number="MR/0006",
                title="Forklift Tire Replacement",
                equipment_id=equipment_ids.get('Forklift 3000'),
                category_id=categories[5].id,
                created_by="John Doe",
                priority="3",
                stage="new",
                maintenance_type="corrective",
                assigned_team_id=teams[1].id,
                scheduled_date=now + timedelta(days=5),
                estimated_duration_hours=5
            ),
             MaintenanceRequest(
                request_number="MR/0007",
                title="Quarterly Safety Inspection",
                equipment_id=equipment_ids.get('Safety Harness Kit'),
                category_id=categories[7].id,
                created_by="Sarah Connor",
                priority="3",
                stage="new",
                maintenance_type="preventive",
                assigned_team_id=teams[4].id,
                scheduled_date=now + timedelta(days=7),
                estimated_duration_hours=8
            ),
             MaintenanceRequest(
                request_number="MR/0008",
                title="Printer Toner Replacement",
                equipment_id=equipment_ids.get('HP LaserJet Pro'),
                category_id=categories[1].id,
                created_by="Sarah Connor",
                priority="1",
                stage="new",
                maintenance_type="corrective",
                assigned_team_id=teams[3].id,
                scheduled_date=now + timedelta(days=1),
                estimated_duration_hours=1
            )
        ]
        db.add_all(requests)
        
    db.commit()
    db.close()
    print("Database initialization completed with realistic seed data.")

if __name__ == "__main__":
    if os.path.exists("gearguard.db"):
        try:
            os.remove("gearguard.db")
            print("Removed existing database.")
        except PermissionError:
            print("Could not remove existing database. It might be in use.")
    init_db()

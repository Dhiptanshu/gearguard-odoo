from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from app.db.base import Base
from datetime import datetime

class MaintenanceRequest(Base):
    __tablename__ = "maintenance_requests"

    id = Column(Integer, primary_key=True)
    request_number = Column(String, unique=True, nullable=False)
    subject = Column(String, nullable=False)

    equipment_id = Column(Integer, ForeignKey("equipment.id"))
    category_id = Column(Integer)
    maintenance_type = Column(String)

    stage = Column(String, default="new")
    assigned_team_id = Column(Integer)
    assigned_technician_id = Column(String)

    scheduled_date = Column(DateTime)
    actual_duration_hours = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)

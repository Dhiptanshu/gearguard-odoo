from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from app.db.base import Base

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    serial_number = Column(String, unique=True, nullable=False)
    category_id = Column(Integer)  # FK removed temporarily
    maintenance_team_id = Column(Integer)  # FK removed temporarily
    default_technician_id = Column(String)
    location = Column(String)
    status = Column(String, default="operational")
    is_critical = Column(Boolean, default=False)
    employee = Column(String, nullable=True)
    department = Column(String, nullable=True)

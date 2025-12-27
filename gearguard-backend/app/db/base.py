from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

# Import ALL models so SQLAlchemy registers them
from app.models.equipment import Equipment
from app.models.maintenance_request import MaintenanceRequest
from app.models.request_history import RequestHistory
from app.models.user import User
from app.models.team import Team
from app.models.equipment_category import EquipmentCategory

from pydantic import BaseModel
from datetime import datetime
from typing import Literal, Optional

class MaintenanceCreate(BaseModel):
    subject: str
    equipment_id: int
    category_id: int
    maintenance_type: str
    assigned_team_id: int
    assigned_technician_id: int
    scheduled_date: datetime
    estimated_duration_hours: int


class MaintenanceStageUpdate(BaseModel):
    stage: Literal["new", "in_progress", "repaired", "scrap"]
    actual_duration_hours: Optional[float] = None

class MaintenanceOut(BaseModel):
    id: int
    subject: str
    equipment_id: int
    maintenance_type: str
    stage: str

    class Config:
        from_attributes = True

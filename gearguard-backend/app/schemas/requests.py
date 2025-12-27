from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Literal

class MaintenanceCreate(BaseModel):
    subject: str
    equipment_id: int
    category_id: int
    maintenance_type: str

    # Optional for now
    assigned_team_id: Optional[int] = None
    assigned_technician_id: Optional[int] = None
    scheduled_date: Optional[datetime] = None
    estimated_duration_hours: Optional[int] = None


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

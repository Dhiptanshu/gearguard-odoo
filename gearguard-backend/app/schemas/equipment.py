from pydantic import BaseModel

class EquipmentBase(BaseModel):
    name: str
    serial_number: str
    location: str | None = None
    status: str = "operational"
    category_id: int | None = None
    employee: str | None = None
    department: str | None = None
    default_technician_id: str | None = None

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentOut(EquipmentBase):
    id: int
    
    class Config:
        from_attributes = True

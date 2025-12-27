from pydantic import BaseModel

class UserOut(BaseModel):
    id: int
    name: str
    department: str | None
    role: str

    class Config:
        from_attributes = True

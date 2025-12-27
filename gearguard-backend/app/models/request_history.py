from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.db.base import Base
from datetime import datetime

class RequestHistory(Base):
    __tablename__ = "request_history"

    id = Column(Integer, primary_key=True)
    request_id = Column(Integer, ForeignKey("maintenance_requests.id"), nullable=False)
    changed_by_user_id = Column(String, nullable=False)

    field_name = Column(String, nullable=False)
    old_value = Column(String)
    new_value = Column(String)

    change_type = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

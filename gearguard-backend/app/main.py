from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.base import Base
from app.db.session import engine

# 👇 IMPORT ALL MODELS HERE (IMPORTANT)
from app.models.equipment import Equipment
from app.models.maintenance_request import MaintenanceRequest
from app.models.request_history import RequestHistory

from app.api import equipment, requests

app = FastAPI(title="GearGuard Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 CREATE TABLES AFTER MODELS ARE IMPORTED
Base.metadata.create_all(bind=engine)

app.include_router(equipment.router)
app.include_router(requests.router)

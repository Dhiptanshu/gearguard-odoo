from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine
from app.db.base import Base

from app.api import equipment, requests, users, teams, categories

app = FastAPI(title="GearGuard Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables ONCE
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(equipment.router)
app.include_router(requests.router)
app.include_router(users.router)
app.include_router(teams.router)
app.include_router(categories.router)
from app.api import seed
app.include_router(seed.router)

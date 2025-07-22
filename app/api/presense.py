###
### POST and GET implementation of pinging.
### Changed implementation to WebSockets for better performance in ws.py
###

from fastapi import APIRouter
from datetime import datetime, timedelta, timezone
from typing import Dict

router = APIRouter()

clients: Dict[str, datetime] = {}
CLIENT_TIMEOUT = timedelta(seconds=10)

@router.post("/api/announce_{device_name}")
async def announce(device_name: str):
    clients[device_name] = datetime.now(timezone.utc)
    return {"message": "Client announced", "name" : device_name}

@router.get("/api/clients")
async def get_clients():
    now = datetime.now(timezone.utc)
    inactive = [ip for ip, ts in clients.items() if now - ts >= CLIENT_TIMEOUT]
    for ip in inactive:
        del clients[ip]
    clients.clear()
    return list(clients.keys())
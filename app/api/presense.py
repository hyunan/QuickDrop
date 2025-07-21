from fastapi import APIRouter, Request
from datetime import datetime, timedelta, timezone
from typing import Dict

router = APIRouter()

clients: Dict[str, datetime] = {}
CLIENT_TIMEOUT = timedelta(seconds=30)

@router.post("/announce")
async def announce(request: Request):
    ip = request.client.host
    clients[ip] = datetime.now(timezone.utc)
    return {"message": "Client announced", "ip": ip}

@router.get("/clients")
async def get_clients():
    now = datetime.now(timezone.utc)
    active_clients = {
        ip: ts for ip, ts in clients.items() if now - ts < CLIENT_TIMEOUT
    }
    clients.clear()
    clients.update(active_clients)
    return list(active_clients.keys())
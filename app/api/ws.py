from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
    
    def get_connections(self) -> Dict[str, WebSocket]:
        return self.active_connections

    async def connect(self, name: str, socket: WebSocket):
        await socket.accept()
        self.active_connections[name] = socket
        await self.broadcast_devices()
        print(f"Connected Devices: {list(self.active_connections.keys())}")

    def disconnect(self, name: str):
        self.active_connections.pop(name, None)

    async def broadcast(self, message: str, sender: WebSocket):
        for name, socket in self.active_connections.items():
            if socket != sender:
                await socket.send_text(message)

    async def broadcast_devices(self):
        names = list(self.active_connections.keys())
        message = {
            "type": "device_list",
            "devices": names
        }
        for name, ws in list(self.active_connections.items()):
            try:
                await ws.send_json(message)
            except Exception as e:
                print(f"[WARN] Failed to send to {name}: {e}")
    
    async def send_to(self, target_name: str, message: dict):
        target_ws = self.active_connections.get(target_name)
        if target_ws:
            try:
                await target_ws.send_json(message)
            except Exception as e:
                print(f"[WARN] Failed to send message to {target_ws}: {e}")

manager = ConnectionManager()

@router.websocket("/ws/{name}")
async def websocket_endpoint(socket: WebSocket, name: str):
    print(f"[CONNECT] {name}")
    await manager.connect(name, socket)
    try:
        while True:
            data = await socket.receive_json()
            if data["type"] == "send_download":
                target_name = data["target"]
                file_url = data["file_url"]
                if target_name in manager.get_connections().keys():
                    print(f"[SEND] Notifying {target_name} to download {file_url}")
                    await manager.get_connections()[target_name].send_json({
                        "type": "download_file",
                        "file_url": file_url
                    })

    except WebSocketDisconnect:
        print(f"[DISCONNECT] {name}")
        manager.disconnect(name)
        await manager.broadcast_devices()
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Dict

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

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
        for name, ws in self.active_connections.items():
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

@app.websocket("/ws/{name}")
async def websocket_endpoint(socket: WebSocket, name: str):
    print(f"[CONNECT] {name}")
    await manager.connect(name, socket)
    try:
        while True:
            data = await socket.receive_json()
            msg_type = data.get("type")
            if msg_type == "signal":
                target = data.get("target")
                payload = data.get("payload")
                if target and payload:
                    await manager.send_to(target, {
                        "type": "singal",
                        "from": name,
                        "payload": payload
                    })

    except WebSocketDisconnect:
        print(f"[DISCONNECT] {name}")
        manager.disconnect(name)
        await manager.broadcast_devices()

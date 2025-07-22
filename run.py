import uvicorn
import webbrowser
from pathlib import Path

from app.utils.get_ip import get_local_ip

DEV = True # True to enable reload (dev mode)
PORT = 8000
ip = get_local_ip()

if not DEV:
    webbrowser.open(f"http://{ip}:{PORT}")

env_file_path = Path(__file__).parent / "frontend" / ".env"
env_file_path.write_text(f"VITE_BACKEND_HOST={ip}:{PORT}\n")

if __name__ == "__main__":
    if DEV:
        print(f"[RUNNING] http://{ip}:{PORT}")
    uvicorn.run("app.main:app", host=ip, port=PORT, reload=DEV)
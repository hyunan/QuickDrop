import uvicorn
import webbrowser

from app.utils.get_ip import get_local_ip

DEV = True # True to enable reload (dev mode)
PORT = 8000
ip = get_local_ip()

if not DEV:
    webbrowser.open(f"http://{ip}:{PORT}")

if __name__ == "__main__":
    if DEV:
        print(f"[RUNNING] http://{ip}:{PORT}")
    uvicorn.run("app.main:app", host="0.0.0.0", port=PORT, reload=DEV)
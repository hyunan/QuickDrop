from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import random
from pathlib import Path
import mimetypes

from .api import ws
from .utils.get_ip import get_local_ip

UPLOAD_DIR = Path(__file__).parent / "uploads"
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/random")
def random_number():
    """Return random number."""
    return {"random_number": random.randint(1, 10)}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload file into upload folder with unique filename if needed."""
    filename = file.filename.split()
    filename = "_".join(filename)
    file_path = UPLOAD_DIR / filename
    name = file_path.stem
    ext = file_path.suffix

    i = 1
    while file_path.exists():
        file_path = UPLOAD_DIR / f"{name}_{i}{ext}"
        i += 1

    with open(file_path, "wb") as f:
        f.write(await file.read())
    
    print(f"[UPLOAD] Uploaded {file_path.name}")
    return {"filename": f"{file_path.name}"}

@app.delete("/api/delete/{file_name}")
def delete_file(file_name: str):
    """Delete file matching file name"""
    safe_path = UPLOAD_DIR / file_name
    if not safe_path.exists():
        return {"result": "File does not exist"}
    safe_path.unlink()
    return {"result": f"{file_name} was successfully deleted"}

def delete(path: Path) -> None:
    """Delete file (for use after download)"""
    if path.exists():
        path.unlink()

@app.get("/api/download/{file_name}")
def download_file(file_name: str, background_tasks: BackgroundTasks):
    """Downloads the specific file"""
    file_path = UPLOAD_DIR / file_name
    background_tasks.add_task(delete, file_path)
    
    return FileResponse(
        path=file_path,
        filename=file_path.name,
        media_type="application/octet-stream",
        background=background_tasks
    )

@app.get("/api/viewfile/{file_name}")
def view_file(file_name: str, background_tasks: BackgroundTasks):
    """Views the specific file"""
    file_path = UPLOAD_DIR / file_name
    
    media_type, _ = mimetypes.guess_type(str(file_path))
    return FileResponse(
        path=file_path,
        filename=file_path.name,
        media_type=media_type
    )

@app.get("/api/files")
def list_files():
    """Returns the list of files currently on the server"""
    files = list(x.name for x in UPLOAD_DIR.iterdir())
    return {"files": files}

@app.get("/api/get_local_ip")
async def get_ip():
    """Returns the local ip of host machine"""
    print(get_local_ip())
    return {"ip": get_local_ip()}

app.include_router(ws.router)

frontend_path = Path(__file__).parent.parent / "frontend" / "dist"
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

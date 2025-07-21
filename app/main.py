from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import random
from pathlib import Path

from .api import presense

UPLOAD_DIR = Path(__file__).parent / "uploads"
app = FastAPI()

@app.get("/api/random")
def random_number():
    """Return random number."""
    return {"random_number": random.randint(1, 10)}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload file into upload folder with unique filename if needed."""
    filename = file.filename
    file_path = UPLOAD_DIR / filename
    name = file_path.stem
    ext = file_path.suffix

    i = 1
    while file_path.exists():
        file_path = UPLOAD_DIR / f"{name}_{i}{ext}"
        i += 1

    with open(file_path, "wb") as f:
        f.write(await file.read())

    return {"filename": file_path.name}

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
    file_path = UPLOAD_DIR / file_name
    background_tasks.add_task(delete, file_path)
    
    return FileResponse(
        path=file_path,
        filename=file_path.name,
        media_type="application/octet-stream",
        background=background_tasks
    )

@app.get("/api/files")
def list_files():
    """Returns the list of files currently on the server"""
    files = list(x.name for x in UPLOAD_DIR.iterdir())
    return {"files": files}

app.include_router(presense.router)

frontend_path = Path(__file__).parent.parent / "frontend" / "dist"
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

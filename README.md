# 📡 Local Network File Sharing App

A fast, lightweight peer-to-peer file sharing app over your **local network (LAN)**. No internet needed — just open the app on multiple devices and share files instantly.

![Screenshot Placeholder](./assets/ui_screenshot.png)

---

## 🚀 Features

- 📁 Drag & drop file uploads
- 📡 Real-time device discovery using **WebSockets**
- ⚡ Instant downloads via FastAPI endpoints
- 🖼️ Image and file previews (images, zips, PDFs, audio/video)
- 🧹 Auto-delete files after download
- 📷 Scan QR code to connect from mobile
- 🖥️ Clean responsive UI with Chakra UI

---

## 🛠️ Tech Used

### Frontend:
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [React Dropzone](https://react-dropzone.js.org/)
- [Axios](https://axios-http.com/)
- [react-qr-code](https://github.com/rosskhanas/react-qr-code)

### Backend:
- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/) (ASGI server)

---

## 📡 How It Works

1. **Start the server**: It exposes a local IP (`192.168.x.x`) so other devices can reach it.
2. **Open frontend via QR code or local IP**.
3. **Devices announce themselves via WebSocket** and appear instantly.
4. **Upload a file** → **Pick a device** → **Send!** (Uploaded files are in `app/uploads`)
5. Recipients get a download preview modal with the option to accept or cancel.
6. Files auto-delete after download or cancellation.

---

## 🔧 How to Run It

### 1. Running frontend without building
Make sure you are in a Python virtual environment.
```bash
# Set up and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install Python dependencies and run
pip install -r requirements.txt
python run.py
```

### 2. Building frontend
Make sure you are in a Python virtual environment. Also ensure Node.js is installed.
```bash
pip install -r requirements.txt
# Build the frontend
cd frontend
npm install
npm run build
```
Then run `run.py`.
```bash
python run.py
```
export function connectToSignaling(name: string, onDeviceList: (devices: string[]) => void) {
    const socket = new WebSocket(`ws://localhost:8000/ws/${encodeURIComponent(name)}`);
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "device_list") {
            onDeviceList(data.devices);
        }
    };

    return socket
}
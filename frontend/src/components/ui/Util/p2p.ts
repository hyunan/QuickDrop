export function talkToPeers(
        name: string,
        onDeviceList: (devices: string[]) => void,
        downloadFileName: (devices: string) => void,
    ) {
    const backendIp = import.meta.env.VITE_BACKEND_HOST;
    
    const socket = new WebSocket(`ws://${backendIp}/ws/${encodeURIComponent(name)}`);
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "device_list") {
            onDeviceList(data.devices);
        } else if (data.type === "download_file") {
            const fileUrl = data.file_url
            downloadFileName(fileUrl)
            console.log(`[LOG] ${name} is downloading ${fileUrl}`)
        }
    };

    return socket
}
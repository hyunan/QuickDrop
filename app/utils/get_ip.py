import socket

def get_local_ip() -> str:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 1))
        local_ip = s.getsockname()[0]
    except Exception as e:
        print(f"[ERROR] {e}")
        local_ip = "127.0.0.1"
    finally:
        s.close()
    
    return local_ip

if __name__ == "__main__":
    print(get_local_ip())
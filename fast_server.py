import http.server
import socketserver

PORT = 8080

class CachingHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.endswith(('.png', '.jpg', '.jpeg', '.mp4', '.css', '.js')):
            self.send_header('Cache-Control', 'public, max-age=3600')
        else:
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    address_family = socketserver.socket.AF_INET # Force IPv4
    allow_reuse_address = True

with ThreadedHTTPServer(("0.0.0.0", PORT), CachingHTTPRequestHandler) as httpd:
    print(f"Serving at port {PORT} with multithreading and caching...")
    httpd.serve_forever()

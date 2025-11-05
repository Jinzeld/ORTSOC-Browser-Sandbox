from flask import Flask, request, jsonify
from flask_cors import CORS
from proxmoxer import ProxmoxAPI

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# # Connect to your Proxmox host
# proxmox = ProxmoxAPI(
#     host='10.8.0.1',       # WireGuard private IP of Proxmox
#     user='sandbox@pve',
#     token_name='mytoken',
#     token_value='your_token_here',
#     verify_ssl=False
# )

# @app.route("/api/sandbox", methods=["POST"])
# def create_sandbox():
#     data = request.get_json()
#     target_url = data.get("targetUrl")

#     # template for VM 
#     proxmox.nodes("proxmox-node-name").qemu.post(
#         vmid=9000,  
#         newid=9999,
#         name=f"sandbox-{target_url.replace('.', '-')}"
#     )

#     return jsonify({"message": f"Sandbox for {target_url} started."})

# Home route for testing
@app.route('/')
def home():
    return "Welcome to the ORTSOC redirect URL Microservice, \n Please copy the page URL and run it on your Test Program"


if __name__ == "__main__":
    app.run(debug=True)

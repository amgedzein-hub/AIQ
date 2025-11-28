import urllib.request
import json
import sys
import os

API_KEY = sys.argv[1]
REPO_URL = "https://github.com/amgedzein-hub/AIQ"

def make_request(endpoint, method="GET", data=None):
    url = f"https://api.render.com/v1{endpoint}"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
        
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.read().decode()}")
        sys.exit(1)

def main():
    print("Fetching owners...")
    owners = make_request("/owners")
    if not owners:
        print("No owners found.")
        sys.exit(1)
        
    owner_id = owners[0]['owner']['id']
    print(f"Using owner ID: {owner_id}")
    
    payload = {
        "serviceDetails": {
            "type": "web",
            "name": "aiq-backend",
            "ownerId": owner_id,
            "repo": REPO_URL,
            "branch": "main",
            "runtime": "docker",
            "region": "oregon",
            "plan": "starter", 
            "envSpecificDetails": {
                "dockerfilePath": "./apps/backend/Dockerfile",
                "dockerContext": "."
            },
            "envVars": [
                {"key": "BACKEND_PORT", "value": "3001"},
                {"key": "NODE_ENV", "value": "production"},
                {"key": "JWT_SECRET", "value": "change_me_to_a_secure_random_string"},
                {"key": "DATABASE_URL", "value": "postgres://user:pass@host/db"},
                {"key": "ANTHROPIC_API_KEY", "value": "sk-placeholder"}
            ]
        },
        "type": "web_service",
        "name": "aiq-backend",
        "ownerId": owner_id,
        "repo": REPO_URL,
        "branch": "main",
        "serviceDetails": {
            "dockerfilePath": "./apps/backend/Dockerfile",
            "dockerContext": ".",
            "env": "docker",
            "plan": "starter",
            "region": "oregon"
        }
    }

    print("Checking for existing services...")
    services = make_request("/services?limit=100")
    
    existing_service = None
    for service in services:
        if service['service']['name'] == 'aiq-backend':
            existing_service = service['service']
            break
            
    if existing_service:
        print(f"Found existing service: {existing_service['id']}")
        print("Deleting existing service...")
        try:
            make_request(f"/services/{existing_service['id']}", "DELETE")
            print("Service deleted.")
        except Exception as e:
            print(f"Error deleting service: {e}")

    print("Creating new service...")
    
    final_payload = {
        "ownerId": owner_id,
        "name": "aiq-backend",
        "repo": REPO_URL,
        "branch": "main",
        "type": "web_service",
        "serviceDetails": {
            "env": "docker",
            "region": "oregon",
            "plan": "starter",
            "dockerfilePath": "./apps/backend/Dockerfile",
            "dockerContext": ".",
            "envVars": [
                {"key": "BACKEND_PORT", "value": "3001"},
                {"key": "NODE_ENV", "value": "production"},
                {"key": "JWT_SECRET", "value": "change_me_secure_key"},
                {"key": "DATABASE_URL", "value": "postgres://placeholder"},
                {"key": "ANTHROPIC_API_KEY", "value": "sk-placeholder"}
            ]
        }
    }
    
    try:
        response = make_request("/services", "POST", final_payload)
        print("Service created successfully!")
        print(f"Service ID: {response['id']}")
        print(f"Service URL: {response['service']['serviceDetails']['url']}")
    except Exception as e:
        print(f"Failed to create service: {e}")

if __name__ == "__main__":
    main()

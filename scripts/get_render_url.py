import urllib.request
import json
import sys

API_KEY = sys.argv[1]

def make_request(endpoint):
    url = f"https://api.render.com/v1{endpoint}"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def main():
    services = make_request("/services?limit=100")
    for service in services:
        s = service['service']
        if s['name'] == 'aiq-backend':
            print(f"ID: {s['id']}")
            print(f"URL: {s['serviceDetails']['url']}")
            print(f"Status: {s.get('suspended', 'unknown')}") # Render API structure varies, let's just inspect what we can
            # To get deployment status we need a separate call usually, but let's see if service object has it
            return
    print("Service not found")

if __name__ == "__main__":
    main()

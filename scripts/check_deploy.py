import urllib.request
import json
import sys

API_KEY = sys.argv[1]
SERVICE_ID = "srv-d4hkt60dl3ps739rqae0"

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
    deploys = make_request(f"/services/{SERVICE_ID}/deploys?limit=1")
    if deploys:
        d = deploys[0]['deploy']
        print(f"Deploy ID: {d['id']}")
        print(f"Status: {d['status']}")
        print(f"Commit: {d['commit']['message']}")
    else:
        print("No deploys found")

if __name__ == "__main__":
    main()

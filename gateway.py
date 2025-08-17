# gateway.py
from fastapi import FastAPI, Request, HTTPException
import httpx
import os

app = FastAPI()
CORE_REFLECTION_URL = os.getenv("CORE_REFLECTION_URL", "http://localhost:9000/reflect")
MAX_QUERIES_PER_DAY = int(os.getenv("MAX_QUERIES", "5"))

# Simple in-memory quota store (for prototyping)
user_queries = {}

@app.middleware("http")
async def quota_control(request: Request, call_next):
    user_ip = request.client.host
    user_queries.setdefault(user_ip, 0)

    if request.url.path == "/reflect":
        if user_queries[user_ip] >= MAX_QUERIES_PER_DAY:
            raise HTTPException(status_code=429, detail="Daily reflection limit reached.")
        user_queries[user_ip] += 1

    response = await call_next(request)
    return response

@app.post("/reflect")
async def proxy_reflect(request: Request):
    payload = await request.json()
    async with httpx.AsyncClient() as client:
        res = await client.post(CORE_REFLECTION_URL, json=payload)
        return res.json()
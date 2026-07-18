from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router

app = FastAPI(
    title="AI Powered Call Center",
    version="1.0"
)

# Allow React frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "AI Powered Call Center Backend Running 🚀"
    }
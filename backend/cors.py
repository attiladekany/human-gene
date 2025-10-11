from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def configure_cors(app: FastAPI):
    origins = [
        "http://localhost:3000",          # React dev server
        "https://human-gene.vercel.app",  # your deployed frontend (replace with actual domain)
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,        # List of allowed origins
        allow_credentials=True,
        allow_methods=["*"],          # Allow all HTTP methods
        allow_headers=["*"],          # Allow all headers
    )

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from frames import extract_frames
import os
from api_call import call_crowd_recognition
from metrics import calculate_density
from mongodb import get_db
from bson import ObjectId
from typing import Dict, Any
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Simple endpoint to test image upload
@app.post("/testImage")
async def test_image(image: UploadFile = File(...)):
    print("image sending")
    if not image:
        raise HTTPException(status_code=400, detail="No image file provided")
    
    return {"message": "Image received successfully"}
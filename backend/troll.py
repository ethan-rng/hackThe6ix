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

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def serialize_document(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Convert MongoDB document to a JSON-serializable format."""
    if doc is None:
        return None
    # Recursively convert ObjectId and other types
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            doc[key] = str(value)
        elif isinstance(value, dict):
            doc[key] = serialize_document(value)
        elif isinstance(value, list):
            doc[key] = [serialize_document(item) if isinstance(item, dict) else item for item in value]
    return doc

# Hello World endpoint
@app.get("/")
async def read_root():
    return {"message": "Hello World"}

# Simple endpoint to test image upload
@app.post("/testImage")
async def test_image(image: UploadFile = File(...)):
    print("image sending")
    if not image:
        raise HTTPException(status_code=400, detail="No image file provided")
    
    return {"message": "Image received successfully"}

# make this handle so that it feeds venue into metrics
@app.post("/analyze_frame")
async def analyze_frame(image: UploadFile = File(...)):
    print("hello")
    if not image:
        raise HTTPException(status_code=400, detail="No image file provided")
    
    try:
        print(image.filename)
        result = call_crowd_recognition(image)
        return JSONResponse(content={"message": result}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/test-mongo")
async def mongo():
    try:
        # Access the database and collection
        db = get_db()
        collection = db['alerts']  # Replace with your actual collection name
        
        print(collection)
        # Fetch some data from the collection
        # Example: Fetch the first document in the collection
        data = collection.find_one()
        print(data)
        
        data = serialize_document(data)

        # Return the data as a JSON response
        if data:
            return data
        else:
            raise HTTPException(status_code=404, detail="No data found")
    
    except Exception as e:
        # Handle any errors that occur
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=6969, reload=True)
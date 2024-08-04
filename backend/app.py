from flask import Flask, request, jsonify
from flask_cors import CORS

from frames import extract_frames
import os
from api_call import call_crowd_recognition
from metrics import calculate_density
from mongodb import get_db
from bson import ObjectId  # Ensure ObjectId is imported from bson
import uuid

app = Flask(__name__)
CORS(app)


import cv2
import numpy as np
import base64

def base64_to_image(base64_str):
    # Decode the base64 string into bytes
    img_data = base64.b64decode(base64_str)
    # Convert bytes to a NumPy array
    np_array = np.frombuffer(img_data, np.uint8)
    # Decode the NumPy array into an image
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    unique_filename = f"{uuid.uuid4()}.jpg"
    # Create the output path
    output_path = os.path.join('./payload', unique_filename)
    # Save the image to the specified path
    cv2.imwrite(output_path, img)
    return output_path


def serialize_document(doc):
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

@app.route('/testImage', methods=['POST'])
def testImage():
    print("Request files:", request)
    image = request.files.get('image')
    print("Image:", image)

    if not image:
        return jsonify({'error': 'No image file provided'}), 400
    
    return jsonify({'message': "we in"}), 200
    

# make this handle so that it feeds venue into metrics
@app.route('/analyze_frame', methods=['POST'])
def analyze_frame():
    picture = request.form.get('picture')
    image = base64_to_image(picture)

    if not image or not venue:
        return jsonify({'error': 'No image file provided'}), 400
    
    try:
        result = call_crowd_recognition(image)

        db = get_db()
        collection = db['venues']
        query = {'venueName': venue}

        venue_entry = collection.find_one(query)
        if not venue_entry:
            return jsonify({'error': 'No venue entry for specified'}), 400

        calculate_density(venue_entry.get('venueName'), result, venue_entry.get('width_m'), venue_entry.get('height_m'))
        return jsonify({'message': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/density-metrics', methods=['GET'])
# def density_metrics():
    
@app.route('/test-mongo', methods=['GET'])
def mongo():
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
            return jsonify(data)
        else:
            return jsonify({'message': 'No data found'}), 404
    
    except Exception as e:
        # Handle any errors that occur
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
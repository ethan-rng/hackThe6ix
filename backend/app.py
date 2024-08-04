from flask import Flask, request, jsonify
from frames import extract_frames
import os
from api_call import call_crowd_recognition
from metrics import calculate_density
from mongodb import get_db
from bson import ObjectId  # Ensure ObjectId is imported from bson

app = Flask(__name__)

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

# make this handle so that it feeds venue into metrics
@app.route('/analyze_frame', methods=['POST'])
def analyze_frame():
    image = request.files.get('image')

    if not image:
        return jsonify({'error': 'No image file provided'}), 400
    
    try:
        result = call_crowd_recognition(image)
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
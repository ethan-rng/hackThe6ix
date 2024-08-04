from flask import Flask, request, jsonify
from frames import extract_frames
import os
from api_test import call_crowd_recognition
from density import calculate_density

app = Flask(__name__)

@app.route('/extract_frames', methods=['POST'])
def extract_frames_from_video():
    video_file = request.files.get('video')
    frame_interval = request.form.get('frame_interval', type=int, default=1)  # Default to 1 if not provided
    output_folder = 'extracted_frames'

    # Check if a video file was provided
    if not video_file:
        return jsonify({'error': 'No video file provided'}), 400

    # Save the video file
    video_path = os.path.join('concert_drone_footage', video_file.filename)
    video_file.save(video_path)

    # Ensure the output directory exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    try:
        extract_frames(video_path, output_folder, frame_interval)
        os.remove(video_path)
        return jsonify({'message': 'Frames extracted successfully', 'output_folder': output_folder}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


@app.route('/analyze_frame', methods=['POST'])
def analyze_frame():
    image = request.files.get('image')
    venue = request.get('venue')

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

@app.route('/average_density', methods=['POST'])
def average_density():
    db = get_db()
    dash_collection = db['dashboard']

    average_density = {
        'average_density': average,
        'venue': venue,
    }

    result = dash_collection.insert_one(average_density)
    print(result.inserted_id)
    return result.inserted_id

@app.route('/area_utilizaton', methods=['POST'])
def area_utilizaton():
    db = get_db()
    dash_collection = db['dashboard']

    area_utilization = {
        'utilization': utilization,
        'venue': venue,
    }

    result = dash_collection.insert_one(area_utilization)
    print(result.inserted_id)
    return result.inserted_id 
    
# @app.route('/test-mongo', methods=['GET'])
# def mongo():
#     try:
#         # Access the database and collection
#         db = get_db()
#         collection = db['alerts']  # Replace with your actual collection name
        
#         print(collection)
#         # Fetch some data from the collection
#         # Example: Fetch the first document in the collection
#         data = collection.find_one()
#         print(data)
        
#         data = serialize_document(data)

#         # Return the data as a JSON response
#         if data:
#             return jsonify(data)
#         else:
#             return jsonify({'message': 'No data found'}), 404
    
    # except Exception as e:
    #     # Handle any errors that occur
    #     return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
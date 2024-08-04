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

    if not image:
        return jsonify({'error': 'No image file provided'}), 400
    
    try:
        result = call_crowd_recognition(image)
        return jsonify({'message': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/density-metrics', methods=['GET'])
def density_metrics():
    

@app.route('/alert', methods=['GET'])
def alert():
    DENSITY_THRESHOLD = 0.0008
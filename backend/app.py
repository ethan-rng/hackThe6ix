from frames import extract_frames

# taking frames of object
video_path = 'path.mp4' # take in from api call
output_folder = 'extracted_frames'
extract_frames(video_path, output_folder, frame_interval)

# RUN IMAGES FROM EXTRACTED_FRAMES INTO MODEL (.PTH in ./models)
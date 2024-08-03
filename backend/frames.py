import cv2
import os

def extract_frames(video_path, output_dir, frame_interval=10):
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Open the video file
    cap = cv2.VideoCapture(video_path)

    # Check if the video file opened successfully
    if not cap.isOpened():
        print(f"Error: Could not open video file {video_path}")
        return

    # Get video properties
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    print(f"Video FPS: {fps}")
    print(f"Total Frames: {frame_count}")

    frame_number = 0
    while True:
        # Read the next frame
        ret, frame = cap.read()

        if not ret:
            break

        # Save the frame as an image at specified intervals
        if frame_number % frame_interval == 0:
            frame_filename = os.path.join(output_dir, f"frame_{frame_number:04d}.jpg")
            cv2.imwrite(frame_filename, frame)
            print(f"Saved: {frame_filename}")

        frame_number += 1

    # Release the video capture object
    cap.release()
    print("Frame extraction completed.")
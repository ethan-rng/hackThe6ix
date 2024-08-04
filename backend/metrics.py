import cv2
import torch
import numpy as np
import matplotlib.pyplot as plt
import os
from api_call import call_crowd_recognition
from datetime import datetime
from mongodb import get_db

def add_alert_to_db(date_time: datetime, venue: str, message: str):
    db = get_db()
    alerts_collection = db['alerts']

    alert = {
        'date_time': date_time,
        'venue': venue,
        'message': message
    }

    result = alerts_collection.insert_one(alert)
    print(result.inserted_id)
    return result.inserted_id    
    
def calculate_density(venue, predictions, image_width, image_height):
    DENSITY_THRESHOLD_LOW = 0
    DENSITY_THRESHOLD_MID = 0
    DENSITY_THRESHOLD_HIGH = 0

    densities = []
    
    total_area = image_width * image_height
    
    for pred in predictions:
        x = pred['x']
        y = pred['y']
        width = pred['width']
        height = pred['height']
        
        bbox_area = width * height
        
        density = bbox_area / total_area
        
        densities.append({
            'detection_id': pred['detection_id'],
            'bounding_box_area': bbox_area,
            'density': density
        })
        
        if density >= DENSITY_THRESHOLD_HIGH:
            message = f"Critical Alert: Density detected in venue {venue}: {bbox_area} has reached critical threshold. Current density: {density}."
            add_alert_to_db(datetime.now(), venue, message)
        elif density >= DENSITY_THRESHOLD_LOW:
            message = f"Warning: Density detected in venue {venue}: {bbox_area} is approaching level of concern. Current density: {density}."
            add_alert_to_db(datetime.now(), venue, message)
        elif density >= DENSITY_THRESHOLD_MID:
            message = f"Alert: Density detected in venue {venue}: {bbox_area} has reached level of concern. Current density: {density}."
            add_alert_to_db(datetime.now(), venue, message)
    
    return densities

# Example usage with the given JSON data
predictions = [
    {'x': 460.3125, 'y': 863.4375, 'width': 31.875, 'height': 31.875, 'confidence': 0.1225394755601883, 'class': 'people', 'class_id': 0, 'detection_id': '949606fb-057f-445d-abe9-d67b9758edf8'},
    {'x': 930.9375, 'y': 627.1875, 'width': 24.375, 'height': 20.625, 'confidence': 0.12189931422472, 'class': 'people', 'class_id': 0, 'detection_id': 'becc679b-d691-4f80-9496-c7eb79560231'},
    {'x': 451.875, 'y': 421.875, 'width': 30.0, 'height': 22.5, 'confidence': 0.12095370888710022, 'class': 'people', 'class_id': 0, 'detection_id': 'f888e1b6-77bf-4713-8b95-b770b18ff4ed'},
    {'x': 217.5, 'y': 983.4375, 'width': 30.0, 'height': 31.875, 'confidence': 0.12021209299564362, 'class': 'people', 'class_id': 0, 'detection_id': 'e5cc2feb-a801-4727-bbf6-2eed4b7a9aba'},
    {'x': 1561.875, 'y': 656.25, 'width': 37.5, 'height': 33.75, 'confidence': 0.1197568029165268, 'class': 'people', 'class_id': 0, 'detection_id': 'a406ec7e-1ff2-40b2-8b75-4ea7e7497562'}
]

# IN METERS
image_width = 1920
image_height = 1080

densities = calculate_density(1, predictions, image_width, image_height)
print(densities)
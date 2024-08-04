import cv2
import torch
import numpy as np
import matplotlib.pyplot as plt
import os
from api_call import call_crowd_recognition
from datetime import datetime
from mongodb import get_db
from collections import defaultdict

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
    DENSITY_THRESHOLD_LOW = 3
    DENSITY_THRESHOLD_MID = 5
    DENSITY_THRESHOLD_HIGH = 7

    density_per_square_meter = defaultdict(int)    
    width_m = int(image_width)
    height_m = int(image_height)
    
    for pred in predictions:
        print(pred['confidence'])
        x = pred['x']
        y = pred['y']
        width = pred['width']
        height = pred['height']
                
        # finding the meters subsection it should be in
        x_min = int(x / 1920 * width_m)
        x_max = int((x + width) / 1920 * width_m)
        y_min = int(y / 1080 * height_m)
        y_max = int((y + height) / 1080 * height_m)
        print(f"x_min: {x_min}, x_max: {x_max}, y_min: {y_min}, y_max: {y_max}")

        for i in range(x_min, x_max + 1):
            for j in range(y_min, y_max + 1):
                if 0 <= i < width_m and 0 <= j < height_m:
                    density_per_square_meter[(i, j)] += 1

    density_per_square_meter1 = dict(density_per_square_meter)
    print(density_per_square_meter1)

    for (x, y), count in density_per_square_meter.items():
        density = count

        if density >= DENSITY_THRESHOLD_HIGH:
            message = f"Critical Alert: Density detected in Venue {venue}: Zone ({x}m, {y}m) has reached critical threshold. Current density: {density}."
            add_alert_to_db(datetime.now(), venue, message)
        elif density >= DENSITY_THRESHOLD_LOW:
            message = f"Warning: Density detected in Venue {venue}: Zone ({x}m, {y}m) is approaching level of concern. Current density: {density}."
            add_alert_to_db(datetime.now(), venue, message)
        elif density >= DENSITY_THRESHOLD_MID:
            message = f"Alert: Density detected in Venue {venue}: Zone ({x}m, {y}m) has reached level of concern. Current density: {density}."
            add_alert_to_db(datetime.now(), venue, message)
    
    return

# Example usage with the given JSON data
predictions = [
    {
      "x": 1794,
      "y": 951,
      "width": 44,
      "height": 40,
      "confidence": 0.747,
      "class": "people",
      "class_id": 0,
      "detection_id": "ebeb5ef6-62a0-4978-b33a-eac2174e629f"
    },
    {
      "x": 1820,
      "y": 941,
      "width": 44,
      "height": 40,
      "confidence": 0.647,
      "class": "people",
      "class_id": 0,
      "detection_id": "ebeb5ef6-62a0-4978-b33a-eac2174e629f"
    },
    {
      "x": 1541,
      "y": 269,
      "width": 42,
      "height": 38,
      "confidence": 0.717,
      "class": "people",
      "class_id": 0,
      "detection_id": "8d742df6-7023-4a8c-ac00-3bd8d7e1f668"
    }
]

# IN METERS
image_width = 15
image_height = 8

densities = calculate_density(1, predictions, image_width, image_height)
print(densities)
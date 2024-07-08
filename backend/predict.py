from modddel import model

import numpy as np
import cv2


def read_image_(path):
     #path=path.decode()
     x = cv2.imread(path)
     #print(x)
     x = cv2.cvtColor(x, cv2.COLOR_BGR2RGB)
     x = cv2.resize(x, (224, 224))
     x = x/255.0
     return x

def display_segmentation(image_path, model):
    # Read image
    x = read_image_(image_path)

    # Predict mask
    y_pred = model.predict(np.expand_dims(x, axis=0))[0] > 0.5
    y_pred = cv2.resize(y_pred.astype(np.uint8), (x.shape[1], x.shape[0]))

    # Create overlay with original image
    overlay = x.copy()

    # Highlight the boundary of the affected area
    contours, _ = cv2.findContours(y_pred, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(overlay, contours, -1, (255, 255, 255), thickness=1)  # Change color to white and reduce thickness

    # Blend the overlay with original image using alpha value for a whitish shade
    alpha = 0.3  # Set the alpha value for transparency (adjust as needed)
    cv2.addWeighted(overlay, alpha, x, 1 - alpha, 0, x)

    # Display the image with segmentation overlay
    return x




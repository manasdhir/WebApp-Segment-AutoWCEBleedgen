import pickle
from predict import cv2
from predict import read_image_
from predict import plt
from modddel import np
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

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

    return overlay

# Example usage:
image_path = "img- (1).png"
segmentation_overlay = display_segmentation(image_path, model)

# Display the resulting image with segmentation overlay
plt.imshow(segmentation_overlay)
plt.title("Segmentation Overlay")
plt.show()
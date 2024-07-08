from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS  # Import Flask-CORS
import os
from modddel import model
from predict import read_image_
from predict import display_segmentation
from PIL import Image
from modddel import np
app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Check if the 'image' file is in the request
        if 'image' not in request.files:
            return jsonify({'error': 'No file part'})

        # Access the uploaded file from the request
        image_file = request.files['image']

        # Save the uploaded file to the upload folder
        filename = secure_filename(image_file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_file.save(file_path)
        img=display_segmentation(file_path,model)
        img_clipped = np.clip(img, 0, 1)
        Image.fromarray((img_clipped * 255).astype(np.uint8)).save(file_path)
        # Return the relative path to the saved file
        return jsonify({'file_name': filename}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)

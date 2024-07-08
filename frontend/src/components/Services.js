import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./Service.css";

function Service() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [predictedImagePath, setPredictedImagePath] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImagePreview, setUploadedImagePreview] = useState(
    "https://laravelshopper.dev/img/single-upload.png"
  ); // Preset image URL for uploaded image
  const [predictedImagePreview, setPredictedImagePreview] = useState(
    "https://img.freepik.com/free-photo/3d-rendering-cartoon-like-doctor_23-2150797604.jpg?t=st=1712978554~exp=1712982154~hmac=4fc5a5bcf44c23b6815761a0482c6c33fcb89f0d70f1afd26f68447652ea1ca9&w=740"
  ); // Preset image URL for predicted image
  const [isPredicting, setIsPredicting] = useState(false); // State to track prediction loading

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setErrorMessage(""); // Clear any previous error message when a new image is selected
    setImagePath(""); // Reset image path when a new file is selected

    // Read the selected image file and convert it to data URL
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImagePreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (automatic upload)

    if (!selectedImage) {
      setErrorMessage("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setIsPredicting(true); // Start the prediction loading animation
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const responseData = await response.json();
      const newPath = responseData.file_name;

      setImagePath(newPath);
      setSelectedImage(null); // Clear selected image state after successful upload

      // Here you can call another function to process the uploaded image and get the predicted image path
      // For now, let's assume it's returned as predictedImagePath

      // setPredictedImagePath(predictedImagePath); // Uncomment this line once you have the predicted image path
    } catch (error) {
      console.error(error);
      setErrorMessage("Error uploading image");
    } finally {
      setIsPredicting(false); // Stop the prediction loading animation
    }
  };

  const handleClickOnPreview = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        backgroundColor: "rgb(194, 239, 212)",
        color: "#145a32",
        textAlign: "center",
      }}
    >
      <h1 className="my-4">
        Perform Diagnosis of Video Capsule Endoscopy frames
      </h1>

      <div className="d-flex justify-content-center align-items-center flex-wrap">
        {/* Card to display uploaded image */}
        <Card style={{ width: "20rem", margin: "1rem" }} className="shadow">
          <Card.Img
            variant="top"
            src={uploadedImagePreview}
            className="img-fluid"
            style={{ height: "300px" }} // Set a fixed height for the image
            onClick={handleClickOnPreview}
          />
          <Card.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select an image for diagnostics</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </Form.Group>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </Card.Body>
        </Card>

        {/* Arrow loading animation */}
        {isPredicting && (
          <div className="mx-3">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {/* Predict button */}
        <div className="text-center my-3">
          <Button
            className="btn  btn-lg"
            variant="success"
            onClick={handleImageUpload}
            disabled={!selectedImage && !imagePath} // Disable the button if no image is selected and no image is uploaded
          >
            Predict
          </Button>
        </div>

        {/* Card to upload and display segmented image */}
        <Card style={{ width: "20rem", margin: "1rem" }} className="shadow">
          {imagePath ? (
            <Card.Img
              variant="top"
              src={`http://127.0.0.1:5000/uploads/${imagePath}`}
              className="img-fluid"
              style={{ height: "300px" }} // Set a fixed height for the image
            />
          ) : (
            <Card.Img
              variant="top"
              src={predictedImagePreview}
              className="img-fluid"
              style={{ height: "300px" }} // Set a fixed height for the image
            />
          )}
          <Card.Body style={{ minHeight: "5rem" }}>
            <Card.Title>Predicted Image</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Service;

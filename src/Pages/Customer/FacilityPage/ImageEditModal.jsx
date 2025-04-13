"use client";

import { useState, useCallback } from "react";
import { Modal, Button, Slider } from "antd";
import ReactCrop from "react-easy-crop";

// Function to create a cropped image
const createCroppedImage = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to the cropped size
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // Draw the cropped image
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }

        blob.name = "cropped.jpeg";
        const croppedFile = new File([blob], "cropped.jpeg", {
          type: "image/jpeg",
        });
        resolve({ file: croppedFile, preview: URL.createObjectURL(blob) });
      }, "image/jpeg");
    };
  });
};

const ImageEditModal = ({ visible, image, onCancel, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      if (!croppedAreaPixels) return;

      const croppedImage = await createCroppedImage(image, croppedAreaPixels);
      onSave(croppedImage);
    } catch (e) {
      console.error("Error creating cropped image:", e);
    }
  };

  return (
    <Modal
      title="Edit Image"
      visible={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <div className="relative h-96 w-full">
        {image && (
          <ReactCrop
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>
      <div className="mt-4">
        <p>Zoom</p>
        <Slider
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(value) => setZoom(value)}
        />
      </div>
    </Modal>
  );
};

export default ImageEditModal;

"use client";

import { useState, useEffect } from "react";
import { Modal, Button } from "antd";

// Function to create a processed image based on orientation
const createProcessedImage = async (imageSrc) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set fixed output dimensions to 1024x768
      const outputWidth = 1024;
      const outputHeight = 768;

      // Set canvas to the output dimensions
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Fill with white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to maintain aspect ratio
      const imageAspectRatio = image.width / image.height;
      const outputAspectRatio = outputWidth / outputHeight;

      let drawWidth, drawHeight, xOffset, yOffset;

      if (imageAspectRatio > outputAspectRatio) {
        // Image is wider than output - fit to width
        drawWidth = outputWidth;
        drawHeight = outputWidth / imageAspectRatio;
        xOffset = 0;
        yOffset = (outputHeight - drawHeight) / 2;
      } else {
        // Image is taller than output - fit to height
        drawHeight = outputHeight;
        drawWidth = outputHeight * imageAspectRatio;
        xOffset = (outputWidth - drawWidth) / 2;
        yOffset = 0;
      }

      // Draw the image centered
      ctx.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }

        blob.name = "processed.jpeg";
        const processedFile = new File([blob], "processed.jpeg", {
          type: "image/jpeg",
        });
        resolve({ file: processedFile, preview: URL.createObjectURL(blob) });
      }, "image/jpeg");
    };
  });
};

const ImageEditModal = ({ visible, image, onCancel, onSave }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  // Generate preview when image changes
  useEffect(() => {
    if (image) {
      const generatePreview = async () => {
        const result = await createProcessedImage(image);
        setPreviewUrl(result.preview);
      };

      generatePreview();
    }

    // Clean up preview URL when component unmounts or image changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  const handleSave = async () => {
    try {
      if (!image) return;
      const processedImage = await createProcessedImage(image);
      onSave(processedImage);
    } catch (e) {
      console.error("Error processing image:", e);
    }
  };

  return (
    <Modal
      title="画像編集"
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="back" onClick={onCancel}>
          キャンセル
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          保存
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-4">
        {previewUrl && (
          <div className="w-full flex flex-col">
            <h4 className="font-medium mb-2">プレビュー:</h4>
            <div className="border rounded-md overflow-hidden">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageEditModal;

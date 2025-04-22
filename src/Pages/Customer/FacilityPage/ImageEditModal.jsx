"use client";

import { useState, useEffect } from "react";
import { Modal, Button } from "antd";

// Function to create a processed image with 4:3 aspect ratio, fitting to height
const createProcessedImage = async (imageSrc) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set output dimensions with 4:3 aspect ratio
      const outputHeight = 768;
      const outputWidth = Math.round(outputHeight * (4 / 3)); // 1024 for 4:3 ratio

      // Set canvas to the output dimensions
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Fill with white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to fit by height
      const scale = outputHeight / image.height;
      const scaledWidth = image.width * scale;

      // Calculate x-offset for centering (with cropping or padding as needed)
      let xOffset = 0;
      if (scaledWidth > outputWidth) {
        // Image is too wide after scaling to height - crop the sides
        xOffset = (outputWidth - scaledWidth) / 2; // This will be negative, cropping both sides equally
      } else {
        // Image is narrower than output after scaling to height - center it with padding
        xOffset = (outputWidth - scaledWidth) / 2; // This will be positive, adding padding
      }

      // Draw the image centered (or cropped) horizontally, full height
      ctx.drawImage(image, xOffset, 0, scaledWidth, outputHeight);

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }

          blob.name = "processed.jpeg";
          const processedFile = new File([blob], "processed.jpeg", {
            type: "image/jpeg",
          });
          resolve({ file: processedFile, preview: URL.createObjectURL(blob) });
        },
        "image/jpeg",
        0.9
      ); // Added quality parameter for better compression
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

      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h4 className="font-medium mb-2">画像処理方法:</h4>
        <p className="text-sm">
          画像は4:3の比率で処理されます。元の画像の高さに合わせてサイズが調整され、幅が広すぎる場合は両側がトリミングされ、狭い場合は白い余白が追加されます。
        </p>
      </div>
    </Modal>
  );
};

export default ImageEditModal;

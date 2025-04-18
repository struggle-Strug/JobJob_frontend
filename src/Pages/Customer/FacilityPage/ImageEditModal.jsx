"use client";

import { useState, useCallback, useEffect } from "react";
import { Modal, Button, Slider } from "antd";
import ReactCrop from "react-easy-crop";

// Function to create a processed image based on orientation
const createProcessedImage = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set fixed output dimensions (4:3 aspect ratio)
      const outputWidth = 800;
      const outputHeight = 600;
      const targetAspectRatio = outputWidth / outputHeight;

      // Set canvas to the output dimensions
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Fill with white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions based on orientation
      const imageAspectRatio = pixelCrop.width / pixelCrop.height;
      const isPortrait = imageAspectRatio < targetAspectRatio;

      if (isPortrait) {
        // Portrait image: fit height and center horizontally with white space on sides
        const scaleFactor = outputHeight / pixelCrop.height;
        const scaledWidth = pixelCrop.width * scaleFactor;
        const xOffset = (outputWidth - scaledWidth) / 2;

        // Draw the image centered horizontally
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          xOffset,
          0,
          scaledWidth,
          outputHeight
        );
      } else {
        // Landscape image: fit width and crop height from center
        const scaleFactor = outputWidth / pixelCrop.width;
        const scaledHeight = pixelCrop.height * scaleFactor;
        const yOffset = (outputHeight - scaledHeight) / 2;

        // Draw the image centered vertically (may crop top/bottom)
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          yOffset,
          outputWidth,
          scaledHeight
        );
      }

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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageOrientation, setImageOrientation] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Detect image orientation when image changes
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const targetAspectRatio = 4 / 3;
        setImageOrientation(
          aspectRatio < targetAspectRatio ? "portrait" : "landscape"
        );
      };
      img.src = image;
    }

    // Clean up preview URL when component unmounts or image changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);

      // Generate a preview of the processed image
      const generatePreview = async () => {
        if (croppedAreaPixels) {
          const result = await createProcessedImage(image, croppedAreaPixels);

          // Clean up previous preview URL if it exists
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }

          setPreviewUrl(result.preview);
        }
      };

      generatePreview();
    },
    [image, previewUrl]
  );

  const handleSave = async () => {
    try {
      if (!croppedAreaPixels) return;

      const processedImage = await createProcessedImage(
        image,
        croppedAreaPixels
      );
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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative h-96 w-full md:w-2/3">
          {image && (
            <ReactCrop
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          )}
        </div>

        {previewUrl && (
          <div className="w-full md:w-1/3 flex flex-col">
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

      <div className="mt-4">
        <p>ズーム</p>
        <Slider
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(value) => setZoom(value)}
        />
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h4 className="font-medium mb-2">画像処理方法:</h4>
        {imageOrientation === "portrait" ? (
          <p className="text-sm">
            縦長の画像:
            画像の高さを維持し、左右に白い余白が追加されます。画像の上下は切り取られません。
          </p>
        ) : imageOrientation === "landscape" ? (
          <p className="text-sm">
            横長の画像:
            画像の幅を維持し、中央部分のみが表示されます（上下がクロップされます）。
          </p>
        ) : (
          <p className="text-sm">
            画像は4:3の比率で処理されます。ドラッグして位置を調整し、ズームで拡大・縮小できます。
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ImageEditModal;

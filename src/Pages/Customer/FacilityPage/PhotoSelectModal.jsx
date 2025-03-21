// PhotoSelectModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import axios from "axios";

const PhotoSelectModal = ({ visible, onCancel, onSelect }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    if (visible) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/photo/`)
        .then((response) => {
          setPhotos(response.data.photos?.images || []);
        })
        .catch(() => {
          message.error("写真の取得に失敗しました");
        });
    }
  }, [visible]);

  const toggleSelect = (photoUrl) => {
    if (selectedPhotos.includes(photoUrl)) {
      setSelectedPhotos(selectedPhotos.filter((p) => p !== photoUrl));
    } else {
      setSelectedPhotos([...selectedPhotos, photoUrl]);
    }
  };

  return (
    <Modal
      visible={visible}
      title="写真管理から写真を選択"
      onCancel={onCancel}
      onOk={() => onSelect(selectedPhotos)}
      okText="選択"
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => toggleSelect(photo.photoUrl)}
            style={{
              border: selectedPhotos.includes(photo.photoUrl)
                ? "2px solid #1890ff"
                : "1px solid #d9d9d9",
              padding: 2,
              cursor: "pointer",
            }}
          >
            <img
              src={photo.photoUrl}
              alt={`Photo ${index}`}
              style={{ width: 100, height: 75, objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default PhotoSelectModal;

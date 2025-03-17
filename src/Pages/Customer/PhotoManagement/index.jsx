import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Tooltip, Upload } from "antd";
import axios from "axios";
import DescriptionChangeModal from "./DescriptionChangeModal";
const { Dragger } = Upload;

const PhotoManagement = () => {
  const [fileList, setFileList] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const beforeUpload = () => {
    return false;
  };

  const handleChange = (info) => {
    let updatedFileList = [...info.fileList];
    setFileList(updatedFileList);

    // Provide feedback on upload status
    info.fileList.forEach((file) => {
      if (file.status === "done") {
        message.success(`${file.name} file uploaded successfully`);
      } else if (file.status === "error") {
        message.error(`${file.name} file upload failed.`);
      }
    });
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      return;
    }

    const formData = new FormData();

    // Append multiple files
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj); // Ensure correct file object
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/file/multi`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("ファイルアップロード完了!");
      return response.data.files; // Assuming API returns an array of URLs
    } catch (error) {
      message.error("ファイルアップロードに失敗しました");
    }
  };

  const handleSave = async () => {
    const files = await handleUpload();
    await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/photo/`, files);
    getPhotosByCustomerId();
    setFileList([]);
  };

  const getPhotosByCustomerId = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/photo/`
    );
    setPhotos(response.data.photos?.images);
  };

  const handleOpenDescriptionModal = (description, id) => {
    setDescriptionModalOpen(true);
    setDescription(description);
    setSelectedPhoto(id);
  };

  const updateDescription = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/photo/${selectedPhoto}`,
      { description: description }
    );
    if (response.data.error) return message.error(response.data.message);
    message.success("説明文更新成功");
    setDescription("");
    setDescriptionModalOpen(false);
    getPhotosByCustomerId();
  };

  useEffect(() => {
    getPhotosByCustomerId();
    document.title = "写真管理";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex flex-col w-full bg-white rounded-lg shadow-xl min-h-screen">
          <p className="text-left lg:text-xl md:text-base text-sm font-bold text-[#343434] p-4">
            写真管理
          </p>
          <p className="text-left lg:text-xl md:text-base text-sm font-bold text-[#343434] p-4">
            新規アップロード
          </p>
          <div className="flex flex-col px-8">
            <p className="text-left lg:text-sm text-xs text-[#343434]">
              JPG・PNG・GIF形式の画像ファイルをアップロードしてください。
            </p>
            <p className="text-left lg:text-sm text-xs text-[#343434]">
              1ファイルあたりnnMBのファイルが登録可能です。
            </p>
            <div className="w-2/3 mt-4 min-h-80">
              <Dragger
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  画像をドラッグアンドドロップ　または　ここをクリックして画像選択
                </p>
              </Dragger>
              <Button className="primary mt-4" onClick={handleSave}>
                アップロード
              </Button>
            </div>
          </div>
          <p className="text-left text-lg font-bold text-[#343434] p-4">
            アップロード済みの写真
          </p>
          <div className="flex flex-wrap">
            {photos?.map((photo, index) => (
              <div className="flex flex-col w-1/5 p-4">
                <img
                  key={index}
                  src={photo.photoUrl}
                  alt={`Uploaded Photo ${index}`}
                  className="aspect-[4/3] object-cover p-2"
                />
                <Tooltip
                  placement="bottom"
                  title={photo.description}
                  className="duration-300"
                >
                  <p className="text-xs text-[#343434] pl-2 break-words line-clamp-2">
                    {photo.description}
                  </p>
                </Tooltip>
                <button
                  className="text-left text-xs text-[#FF2A3B] pl-2 mt-2"
                  onClick={() =>
                    handleOpenDescriptionModal(photo.description, photo._id)
                  }
                >
                  説明文を更新
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DescriptionChangeModal
        open={descriptionModalOpen}
        onCancel={() => setDescriptionModalOpen(false)}
        description={description}
        setDescription={setDescription}
        updateDescription={updateDescription}
      />
    </>
  );
};

export default PhotoManagement;

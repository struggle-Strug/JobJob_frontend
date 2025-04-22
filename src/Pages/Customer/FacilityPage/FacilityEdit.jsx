"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Checkbox,
  Input,
  Radio,
  Select,
  Upload,
  message,
  Modal,
  Spin,
  Button,
  Carousel,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Facilities,
  Features,
  JobType,
  Prefectures,
} from "../../../utils/constants/categories";
import { getBase64 } from "../../../utils/getBase64";
import { useAuth } from "../../../context/AuthContext";
import { getJobValueByKey } from "../../../utils/getFunctions";
import PhotoSelectModal from "./PhotoSelectModal";
import Loading from "../../../components/Loading";
import { Municipalities } from "../../../utils/constants/categories/municipalities";
import ImageEditModal from "./ImageEditModal";

const FacilityEdit = () => {
  const { customer } = useAuth();
  const [facility, setFacility] = useState({});
  const [facilityName, setFacilityName] = useState("");
  const [facilityPostalCode, setFacilityPostalCode] = useState("");
  const [facilityPrefecture, setFacilityPrefecture] = useState("");
  const [facilityCity, setFacilityCity] = useState("");
  const [facilityVillage, setFacilityVillage] = useState("");
  const [facilityBuilding, setFacilityBuilding] = useState("");
  const [facilityPhoto, setFacilityPhoto] = useState([]);
  const [facilityPhotoUrl, setFacilityPhotoUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [photoSelectModalVisible, setPhotoSelectModalVisible] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [facilityIntroduction, setFacilityIntroduction] = useState("");
  const [facilityJobTypeDetail, setFacilityJobTypeDetail] = useState("");
  const [facilityAccess, setFacilityAccess] = useState([]);
  const [facilityAccessText, setFacilityAccessText] = useState("");
  const [facilityGenre, setFacilityGenre] = useState("");
  const [facilityEstablishmentDateYear, setFacilityEstablishmentDateYear] =
    useState("");
  const [facilityEstablishmentDateMonth, setFacilityEstablishmentDateMonth] =
    useState("");
  const [facilityServiceTime, setFacilityServiceTime] = useState("");
  const [facilityRestDay, setFacilityRestDay] = useState("");
  const [jobPosts, setJobPosts] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [endModal, setEndModal] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const navigate = useNavigate();

  // Add state for image editing
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const editorStyle = {
    width: "80%",
  };

  const [saveLoading, setSaveLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef();

  const allPrefectureKeys = [
    ...Object.keys(Prefectures.KANTO),
    ...Object.keys(Prefectures.KANSAI),
    ...Object.keys(Prefectures.TOKAI),
    ...Object.keys(Prefectures.HOKKAIDO_TOHOKU),
    ...Object.keys(Prefectures.KOSHINETSU_HOKURIKU),
    ...Object.keys(Prefectures.CHUGOKU_SHIKOKU),
    ...Object.keys(Prefectures.KYUSHU_OKINAWA),
  ];

  const allPrefectureOptions = allPrefectureKeys.map((item) => ({
    label: item,
    value: item,
  }));

  const jobTypesOptions = [
    {
      label: "選択する",
      value: "",
    },
    ...Object.keys(JobType).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  const jobTypeDetailOptions = (jobType) => {
    return [
      {
        label: "選択する",
        value: "",
      },
      ...Object.keys(JobType[jobType]).map((type) => ({
        value: type,
        label: type,
      })),
    ];
  };

  const cityOptions = (prefecture) => {
    return [
      { label: "選択する", value: "" },
      ...Municipalities[prefecture].map((type) => ({
        value: type,
        label: type,
      })),
    ];
  };

  const accessOptions = [
    ...Object.keys(Features.ACCESS).map((station) => ({
      value: station,
      label: station,
    })),
  ];

  const facilityGenreOptions = [
    ...Object.keys(Facilities).map((genre) => ({
      value: genre,
      label: genre,
    })),
  ];

  const onCloseEndModal = async () => {
    await setEndModal(false);
    navigate("/customers/facility");
  };

  // Modified to handle image editing
  const beforeUpload = (file) => {
    // When a file is selected, show the edit modal instead of uploading directly
    getBase64(file).then((base64) => {
      setCurrentImage(base64);
      setEditModalVisible(true);
    });
    // Return false to prevent automatic upload
    return false;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Handle the edited image save
  const handleEditSave = (croppedImage) => {
    const { file, preview } = croppedImage;

    // Create a new file entry with the cropped image
    const newFile = {
      uid: `${Date.now()}`,
      name: file.name || "cropped-image.jpg",
      status: "done",
      originFileObj: file,
      preview: preview,
      url: preview, // Add url for consistency with PhotoSelectModal
    };

    // Check if adding this would exceed the limit
    if (facilityPhoto.length >= 10) {
      message.error("最大10枚までしか選択できません");
      return;
    }

    // Add only the edited image to the file list
    setFacilityPhoto((prev) => [...prev, newFile]);
    setEditModalVisible(false);
    setCurrentImage(null);
  };

  // Remove handleChange as we're bypassing the default upload behavior

  const handleUpload = async () => {
    if (facilityPhoto.length === 0) {
      return { fileUrls: [], files: [] };
    }

    const formData = new FormData();
    // 新規アップロードするファイルのみを抽出
    const newFiles = facilityPhoto.filter((file) => file.originFileObj);
    const existingFiles = facilityPhoto.filter((file) => !file.originFileObj);

    newFiles.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    let uploadedFileUrls = [];
    let uploadedFiles = [];

    if (newFiles.length > 0) {
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
        message.success("ファイルのアップロードに完了しました");
        uploadedFileUrls = response.data.files.map((item) => item.fileUrl);
        uploadedFiles = response.data.files;
      } catch (error) {
        message.error("ファイルのアップロードに失敗しました");
        return { fileUrls: [], files: [] };
      }
    }

    // 既存ファイルの URL を抽出
    const existingFileUrls = existingFiles.map((file) => file.url);

    // 両方を統合して返す
    return {
      fileUrls: [...uploadedFileUrls, ...existingFileUrls],
      files: uploadedFiles,
    };
  };

  const getFacility = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/facility/${id}`
      );

      const fetchedFacility = response.data.facility;
      setFacility(fetchedFacility);
      setFacilityName(fetchedFacility.name);
      setFacilityPostalCode(fetchedFacility.postal_code);
      setFacilityPrefecture(fetchedFacility.prefecture);
      setFacilityCity(fetchedFacility.city);
      setFacilityVillage(fetchedFacility.village);
      setFacilityBuilding(fetchedFacility.building);
      setFacilityPhotoUrl(fetchedFacility.photo);
      setFacilityIntroduction(fetchedFacility.introduction);
      setFacilityAccess(fetchedFacility.access);
      setFacilityAccessText(fetchedFacility.access_text);
      setFacilityGenre(fetchedFacility.facility_genre);
      setFacilityEstablishmentDateYear(
        fetchedFacility.establishment_date.split("-")[0]
      );
      setFacilityEstablishmentDateMonth(
        fetchedFacility.establishment_date.split("-")[1]
      );
      setFacilityServiceTime(fetchedFacility.service_time);
      setFacilityRestDay(fetchedFacility.rest_day);

      // facilityPhotoUrl をアップロード用のファイルリストに変換して保存
      if (fetchedFacility.photo && Array.isArray(fetchedFacility.photo)) {
        const initialFileList = fetchedFacility.photo.map((url, index) => ({
          uid: `existing-${index}`,
          name: `image-${index}`,
          status: "done",
          url: url,
        }));
        setFacilityPhoto(initialFileList);
      }
    } catch (error) {
      console.error("Error fetching facility data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 施設編集の保存処理
  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const photoUrl = await handleUpload();
      const originPictures = facilityPhoto.filter((p) => !p.originFileObj);
      const urls = originPictures.map((p) => p.url);

      if (facilityName === "") {
        return message.error("施設名を入力してください。");
      }
      if (facilityPostalCode === "") {
        return message.error("郵便番号を入力してください。");
      } else if (facilityPrefecture === "") {
        return message.error("都道府県を選択してください。");
      } else if (facilityCity === "") {
        return message.error("市区町村を入力してください。");
      } else if (facilityVillage === "") {
        return message.error("町名・番地を入力してください。");
      } else if (facilityBuilding === "") {
        return message.error("建物名を入力してください。");
      }

      const facilityData = {
        customer_id: customer.customer_id,
        name: facilityName,
        postal_code: facilityPostalCode,
        prefecture: facilityPrefecture,
        city: facilityCity,
        village: facilityVillage,
        building: facilityBuilding,
        photo: photoUrl.fileUrls ? [...photoUrl.fileUrls, ...urls] : urls,
        introduction: facilityIntroduction,
        access: facilityAccess,
        access_text: facilityAccessText,
        facility_genre: facilityGenre,
        establishment_date: `${facilityEstablishmentDateYear}-${facilityEstablishmentDateMonth}`,
        service_time: facilityServiceTime,
        rest_day: facilityRestDay,
      };

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/photo/image`,
        photoUrl.files || []
      );
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/facility`,
        facilityData
      );
      if (response.data.error) {
        return message.error(response.data.error);
      }
      message.success(response.data.message);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error(error);
      message.error("施設の保存中にエラーが発生しました。");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleRequest = async (status) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/${id}/${status}`
    );
    if (response.data.error) message.error(response.data.error);
    if (status === "ended") return setEndModal(true);
    navigate(`/customers/facility`);
  };

  const handleDeleteFacility = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/${id}`
    );
    if (response.data.error) return message.error(response.data.error);
    message.success("削除成功");
    navigate("/customers/facility");
  };

  const handleRequestEnd = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/${id}/ended`
    );
    if (response.data.error) return message.error(response.data.error);
    message.success("掲載終了成功");
    navigate("/customers/facility");
  };

  // Add a function to remove files
  const handleRemove = (file) => {
    const newFileList = facilityPhoto.filter((item) => item.uid !== file.uid);
    setFacilityPhoto(newFileList);
  };

  useEffect(() => {
    document.title = "施設編集";
    getFacility();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {loading ? <Loading /> : <></>}
      <div className="w-full min-h-screen flex flex-col p-4 bg-white rounded-lg mb-8">
        <h1 className="lg:text-2xl md:text-base text-sm font-bold">施設編集</h1>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">施設名</p>
          <Input
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">郵便番号</p>
          <Input
            value={facilityPostalCode}
            onChange={(e) => setFacilityPostalCode(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">都道府県</p>
          <Select
            options={allPrefectureOptions}
            value={facilityPrefecture}
            onChange={(e) => setFacilityPrefecture(e)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">市区町村</p>
          <Select
            value={facilityCity}
            onChange={(e) => setFacilityCity(e)}
            className="w-1/4"
            options={facilityPrefecture ? cityOptions(facilityPrefecture) : []}
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">町名・番地</p>
          <Input
            value={facilityVillage}
            onChange={(e) => setFacilityVillage(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">建物名</p>
          <Input
            value={facilityBuilding}
            onChange={(e) => setFacilityBuilding(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-start mt-4">
          <div className="flex items-center justify-start gap-1 w-1/5">
            <span className="lg:text-sm text-xs text-[#343434]">施設写真</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Upload
              maxCount={10}
              name="avatar"
              listType="picture-card"
              fileList={facilityPhoto}
              onPreview={handlePreview}
              onRemove={handleRemove}
              customRequest={({ onSuccess }) => {
                // Do nothing, just call onSuccess to mark it as done
                setTimeout(() => {
                  onSuccess("ok", null);
                }, 0);
              }}
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              openFileDialogOnClick={false} // Prevent opening file dialog on click
            >
              <div
                className="flex items-center justify-center aspect-square w-32 cursor-pointer flex-col rounded-lg border border-dashed bg-light-gray p-3"
                onClick={() => {
                  // Create a file input element
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      getBase64(file).then((base64) => {
                        setCurrentImage(base64);
                        setEditModalVisible(true);
                      });
                    }
                  };
                  input.click();
                }}
              >
                <PlusOutlined />
                <div className="mt-4 text-center">Upload</div>
              </div>
            </Upload>
          </div>
        </div>
        <div className="flex items-start mt-1">
          <div className="flex items-center justify-start gap-1 w-1/5" />
          <div className="flex items-center justify-start gap-2">
            <Button onClick={() => setPhotoSelectModalVisible(true)}>
              写真管理から選択
            </Button>
          </div>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">施設紹介</p>
          <TextArea
            value={facilityIntroduction}
            onChange={(e) => setFacilityIntroduction(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">アクセス</p>
          <Checkbox.Group
            options={accessOptions}
            value={facilityAccess}
            onChange={(value) => setFacilityAccess(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/5">アクセス（補足）</p>
          <Input
            value={facilityAccessText}
            onChange={(e) => setFacilityAccessText(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">施設ジャンル</p>
          <Radio.Group
            options={facilityGenreOptions}
            value={facilityGenre}
            onChange={(value) => setFacilityGenre(value.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">設立年月</p>
          <div className="flex justify-start items-end w-4/5">
            <Input
              value={facilityEstablishmentDateYear}
              onChange={(e) => setFacilityEstablishmentDateYear(e.target.value)}
              className="w-1/4"
            />
            <span className="mx-2">年</span>
            <Input
              value={facilityEstablishmentDateMonth}
              onChange={(e) =>
                setFacilityEstablishmentDateMonth(e.target.value)
              }
              className="w-1/4"
            />
            <span className="mx-2">月</span>
          </div>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">営業時間</p>
          <Input
            value={facilityServiceTime}
            onChange={(e) => setFacilityServiceTime(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">休日</p>
          <Input
            value={facilityRestDay}
            onChange={(e) => setFacilityRestDay(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-center justify-center w-full mt-8 gap-4 border-t-[1px] border-[#e7e7e7] pt-4">
          <button
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            onClick={() => setPreviewModal(true)}
          >
            プレビュー
          </button>
          {facility?.allowed === "draft" && (
            <>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleSave}
              >
                掲載を申請する
              </button>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleDeleteFacility}
              >
                削除する
              </button>
            </>
          )}
          {facility?.allowed === "pending" && (
            <button
              className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
              onClick={handleDeleteFacility}
            >
              削除する
            </button>
          )}
          {facility?.allowed === "allowed" && (
            <>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={() => handleRequest("ended")}
              >
                掲載を終了する
              </button>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleDeleteFacility}
              >
                削除する
              </button>
            </>
          )}
          {facility?.allowed === ("ended" || "rejected") && (
            <>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleSave}
              >
                掲載を申請する
              </button>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleDeleteFacility}
              >
                削除する
              </button>
            </>
          )}
          {facility?.allowed === "rejected" && (
            <>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleDeleteFacility}
              >
                削除する
              </button>
            </>
          )}
        </div>
      </div>

      <Modal
        open={successModalOpen}
        onCancel={() => setSuccessModalOpen(false)}
        footer={null}
        width={600}
        className="modal"
      >
        <div className="flex flex-col">
          <p className="text-lg font-bold text-[#343434] pl-4">
            施設の掲載申請が完了しました。
          </p>
          <p className="text-sm text-[#343434] mt-4">
            ※内容の確認と公開までに即日～2営業日程度かかる場合がございます。
          </p>
          <p className="text-sm text-[#343434]">
            ※掲載された内容を事務局により修正される場合がございます。
          </p>
          <Link
            to="/customers/facility"
            className="text-center text-blue-500 mt-4"
          >
            施設一覧へ戻る
          </Link>
        </div>
      </Modal>

      <Modal
        open={previewModal}
        onCancel={() => setPreviewModal(false)}
        footer={null}
        width={800}
        className="modal"
      >
        <div className="flex w-full p-8">
          <div className="container flex justify-between gap-8">
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-6 w-full shadow-2xl hover:scale-[1.02] duration-300">
                {/* Carousel を追加 */}
                <div className="relative w-full">
                  <Carousel
                    ref={carouselRef}
                    dots={false}
                    beforeChange={(_, next) => setCurrentSlide(next)}
                  >
                    {facilityPhoto?.length > 0 ? (
                      facilityPhoto.map((photo, index) => (
                        <div key={index}>
                          <img
                            src={
                              photo.url || photo.preview || "/placeholder.svg"
                            }
                            alt={`facility-photo-${index}`}
                            className="w-full aspect-video object-cover rounded-t-xl"
                          />
                        </div>
                      ))
                    ) : (
                      <div>
                        <img
                          src="/assets/images/noimage.png"
                          alt="no-image"
                          className="w-full aspect-video object-cover"
                        />
                      </div>
                    )}
                  </Carousel>
                  {/* スライドインジケーター（画像上に表示） */}
                  {facilityPhoto?.length > 0 && (
                    <div className="absolute top-2 right-2 bg-[#fdfcf9] text-black text-xs px-2 py-1 rounded-xl z-10 border border-[#ddccc9]">
                      {currentSlide + 1}/{facilityPhoto.length}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between w-full bg-[#fdfcf9]  h-11 rounded-b-xl border border-[#ddccc9]">
                  <button
                    onClick={() => {
                      const newIndex =
                        (currentSlide - 1 + facilityPhoto.length) %
                        facilityPhoto.length;
                      carouselRef.current.goTo(newIndex, false);
                      setCurrentSlide(newIndex);
                    }}
                    className="bg-transparent text-[#FF6B56] border-r border-[#ddccc9] p-2 w-11 h-11 flex items-center justify-center "
                  >
                    <svg
                      aria-label="前の写真を表示"
                      class="h-[13px] border-b border-transparent transition-jm group-hover:border-jm-linkHover"
                      width="24"
                      height="24"
                      role="img"
                      aria-hidden="false"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 13L5.27083 8L11 3"
                        stroke="#FF6B56"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const newIndex =
                        (currentSlide + 1) % facilityPhoto.length;
                      carouselRef.current.goTo(newIndex, false);
                      setCurrentSlide(newIndex);
                    }}
                    className="bg-transparent text-[#FF6B56] border-l border-[#ddccc9] p-2 w-11 h-11 flex items-center justify-center "
                  >
                    <svg
                      aria-label="次の写真を表示"
                      class="h-[13px] border-b border-transparent transition-jm group-hover:border-jm-linkHover"
                      width="24"
                      height="24"
                      role="img"
                      aria-hidden="false"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13L10.7292 8L5 3"
                        stroke="#FF6B56"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col items-start justify-start p-4 w-full h-full gap-4">
                  <p className="lg:text-xl md:text-sm text-[#343434]">
                    <span className="lg:text-2xl md:text-xl font-bold">
                      {facilityName}
                    </span>
                    <span className="text-base">の求人情報</span>
                  </p>
                  <div>
                    <p className="lg:text-sm md:text-xs text-[#343434]">
                      {facilityPrefecture}
                      {facilityCity}
                      {facilityVillage}
                      {facilityBuilding}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white px-4 rounded-lg mt-8 w-full">
                <p className="lg:text-lg font-bold text-sm text-[#343434] border-b-[1px] py-6 border-[#e7e7e7]">
                  事業所情報
                </p>
                <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                  <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                    法人・施設名
                  </p>
                  <Link
                    to={`/facility/${facility?.facility_id}`}
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline w-4/5"
                  >
                    {facilityName}
                  </Link>
                </div>
                <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                  <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                    募集職種
                  </p>
                  <div className="flex flex-col items-start justify-start w-4/5">
                    {facility?.jobPosts?.map((jobPost, index) => (
                      <Link
                        key={index}
                        to={`/${getJobValueByKey(jobPost.type)}/details/${
                          jobPost?.jobpost_id
                        }`}
                        className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                      >
                        {jobPost?.type}({jobPost?.employment_type})
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                  <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                    施設紹介
                  </p>
                  <p className="lg:text-base text-sm text-[#343434] w-4/5">
                    <pre>{facilityIntroduction}</pre>
                  </p>
                </div>
                <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                  <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                    アクセス
                  </p>
                  <div className="flex flex-col items-start justify-start w-4/5">
                    <div className="inline-block items-start justify-start gap-2">
                      {facilityAccess?.map((item, index) => (
                        <div
                          key={index}
                          className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg"
                        >
                          <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="lg:text-base text-sm text-[#343434] mt-1">
                      {facilityPrefecture}
                      {facilityCity}
                      {facilityVillage}
                      {facilityBuilding}
                    </p>
                    <div className="w-full py-4 aspect-square">
                      <iframe
                        title="Google Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${facilityPrefecture}${facilityCity}${facilityVillage}${facilityBuilding}&output=embed`}
                      ></iframe>
                    </div>
                    <p className="lg:text-base text-sm text-[#343434] mt-1">
                      {facilityAccessText}
                    </p>
                    <Link
                      to={`https://www.google.com/maps?q=${encodeURIComponent(
                        `${facilityPrefecture}${facilityCity}${facilityVillage}${facilityBuilding}`
                      )}`}
                      target="_blank"
                      className="lg:text-base text-sm text-[#FF2A3B] hover:underline mt-1 border-[1px] border-[#FF2A3B] py-1 px-2 rounded-lg"
                    >
                      Google Mapsで見る
                    </Link>
                  </div>
                </div>
                <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                  <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                    設立年月
                  </p>
                  <p className="lg:text-base text-sm text-[#343434] w-4/5">
                    {facilityEstablishmentDateYear}年
                    {facilityEstablishmentDateMonth}月
                  </p>
                </div>
                <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                  <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                    施設
                  </p>
                  <div className="flex flex-col items-start justify-start w-4/5">
                    <Link
                      to={`/${Facilities[facilityGenre]}`}
                      className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                    >
                      {facilityGenre}
                    </Link>
                  </div>
                </div>
                <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                  <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                    営業時間
                  </p>
                  <p className="lg:text-base text-sm text-[#343434] w-4/5">
                    <pre>{facilityServiceTime}</pre>
                  </p>
                </div>
                <div className="flex items-start justify-start py-6">
                  <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                    休日
                  </p>
                  <p className="lg:text-base text-sm text-[#343434] w-4/5">
                    <pre>{facilityRestDay}</pre>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* モーダルで拡大表示 */}
      <Modal
        visible={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        closeIcon={
          <CloseOutlined
            style={{
              backgroundColor: "#fff",
              padding: "5px",
              borderRadius: "5px",
            }}
          />
        }
      >
        <img
          src={previewImage || "/placeholder.svg"}
          alt="enlarged"
          style={{ width: "100%" }}
        />
      </Modal>
      <PhotoSelectModal
        visible={photoSelectModalVisible}
        onCancel={() => setPhotoSelectModalVisible(false)}
        onSelect={(selected) => {
          const formattedPhotos = selected.map((photoUrl, index) => ({
            uid: `existing-${Date.now()}-${Math.random()}`, // 常に新規の一意キーを生成
            name: `Photo ${facilityPhoto.length + index + 1}`,
            url: photoUrl,
            status: "done",
          }));
          // 既存の画像数と新たに追加する画像数の合計をチェック
          const totalPhotos = facilityPhoto.length + formattedPhotos.length;
          if (totalPhotos > 10) {
            message.error("最大10枚までしか選択できません");
            return;
          }
          setFacilityPhoto((prev) => [...prev, ...formattedPhotos]);
          setPhotoSelectModalVisible(false);
        }}
      />

      {/* Image Edit Modal */}
      <ImageEditModal
        visible={editModalVisible}
        image={currentImage}
        onCancel={() => {
          setEditModalVisible(false);
          setCurrentImage(null);
        }}
        onSave={handleEditSave}
      />

      <Modal
        open={endModal}
        onCancel={onCloseEndModal}
        footer={null}
        className="modal"
      >
        <div className="flex flex-col p-4">
          <p className="text-lg font-bold text-[#343434] pl-4">
            施設の掲載を終了しました。再度掲載される場合は、掲載申請をお願いします。
          </p>
          <Link
            to="/customers/facility"
            className="text-center text-blue-500 mt-4"
          >
            施設一覧へ戻る
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default FacilityEdit;

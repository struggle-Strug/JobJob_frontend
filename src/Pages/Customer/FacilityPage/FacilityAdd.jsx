import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Input, message, Radio, Select, Upload, Button } from "antd";
import {
  Facilities,
  Features,
  JobType,
  Prefectures,
} from "../../../utils/constants/categories";
import { getBase64 } from "../../../utils/getBase64";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "../../../context/AuthContext";
import { Municipalities } from "../../../utils/constants/categories/municipalities";
import PhotoSelectModal from "./PhotoSelectModal";

const FacilityAdd = () => {
  const { customer } = useAuth();
  const [facilityName, setFacilityName] = useState("");
  const [facilityPostalCode, setFacilityPostalCode] = useState("");
  const [facilityPrefecture, setFacilityPrefecture] = useState("");
  const [facilityCity, setFacilityCity] = useState("");
  const [facilityVillage, setFacilityVillage] = useState("");
  const [facilityBuilding, setFacilityBuilding] = useState("");
  const [facilityPhoto, setFacilityPhoto] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [photoSelectModalVisible, setPhotoSelectModalVisible] = useState(false);
  const [facilityIntroduction, setFacilityIntroduction] = useState("");
  const [facilityJobType, setFacilityJobType] = useState("");
  const [facilityJobTypeDetail, setFacilityJobTypeDetail] = useState("");
  const [facilityAccess, setFacilityAccess] = useState("");
  const [facilityAccessText, setFacilityAccessText] = useState("");
  const [facilityGenre, setFacilityGenre] = useState("");
  const [facilityServiceType, setFacilityServiceType] = useState([]);
  const [facilityEstablishmentDateYear, setFacilityEstablishmentDateYear] =
    useState("");
  const [facilityEstablishmentDateMonth, setFacilityEstablishmentDateMonth] =
    useState("");
  const [facilityServiceTime, setFacilityServiceTime] = useState("");
  const [facilityRestDay, setFacilityRestDay] = useState("");

  const navigate = useNavigate();

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

  const cityOptions = (prefecture) => {
    return [
      {
        label: "選択する",
        value: "",
      },
      ...Municipalities[prefecture].map((type) => ({
        value: type,
        label: type,
      })),
    ];
  };

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

  const serviceTypeOptions = [
    ...Object.keys(Features.SERVICE_TYPES).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  const beforeUpload = () => {
    return false;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = (info) => {
    let updatedFileList = [...info.fileList];

    if (updatedFileList.length > 10) {
      updatedFileList.pop();
      message.error("10枚まで選択できます");
    }

    setFacilityPhoto(updatedFileList);

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleUpload = async () => {
    if (facilityPhoto.length === 0) {
      return [];
    }
    const formData = new FormData();
    facilityPhoto.forEach((file) => {
      formData.append("files", file.originFileObj);
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
      message.success("ファイルのアップロードに完了しました");
      // バックエンドから返された files 配列を利用する
      const fileUrls = response.data.files.map((item) => item.fileUrl);
      return { fileUrls: fileUrls, files: response.data.files };
    } catch (error) {
      message.error("ファイルのアップロードに失敗しました");
      return [];
    }
  };

  const handleSave = async () => {
    const photoUrls = await handleUpload();

    if (facilityName === "") return message.error("施設名を入力してください。");
    if (facilityPostalCode === "")
      return message.error("郵便番号を入力してください。");
    if (facilityPrefecture === "")
      return message.error("都道府県を選択してください。");
    if (facilityCity === "")
      return message.error("市区町村を入力してください。");
    if (facilityVillage === "")
      return message.error("町名・番地を入力してください。");

    const facilityData = {
      customer_id: customer.customer_id,
      name: facilityName,
      postal_code: facilityPostalCode,
      prefecture: facilityPrefecture,
      city: facilityCity,
      village: facilityVillage,
      building: facilityBuilding,
      photo: photoUrls.fileUrls,
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
      photoUrls.files
    );

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/facility`,
      facilityData
    );
    if (response.data.error) message.error(response.data.error);
    message.success(response.data.message);
    navigate(`/customers/facility`);
  };
  return (
    <div className="min-h-screen bg-white p-6 rounded-lg">
      <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
        施設を新規登録
      </p>
      <div className="flex items-center mt-4">
        <p className="lg:text-sm text-xs w-1/5">
          施設名
          <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
        </p>
        <Input
          value={facilityName}
          onChange={(e) => setFacilityName(e.target.value)}
          className="w-1/4"
        />
      </div>
      <div className="flex items-center mt-4">
        <p className="lg:text-sm text-xs w-1/5">
          郵便番号
          <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
        </p>
        <Input
          value={facilityPostalCode}
          onChange={(e) => setFacilityPostalCode(e.target.value)}
          className="w-1/4"
        />
      </div>
      <div className="flex items-center mt-4">
        <p className="lg:text-sm text-xs w-1/5">
          都道府県
          <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
        </p>
        <Select
          options={allPrefectureOptions}
          onChange={(e) => setFacilityPrefecture(e)}
          className="w-1/4"
        />
      </div>
      {facilityPrefecture !== "" && (
        <div
          className="flex items-center mt-4"
          disabled={facilityPrefecture !== "" ? true : false}
        >
          <p className="lg:text-sm text-xs w-1/5">
            市区町村
            <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
          </p>
          <Select
            options={cityOptions(facilityPrefecture)}
            onChange={(e) => setFacilityCity(e)}
            className="w-1/4"
          />
        </div>
      )}
      <div className="flex items-center mt-4">
        <p className="lg:text-sm text-xs w-1/5">
          町名・番地
          <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
        </p>
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
          <Button onClick={() => setPhotoSelectModalVisible(true)}>
                        写真管理から選択
                      </Button>
        </div>
        <div className="flex items-center justify-start gap-2">
          <Upload
            maxCount={10}
            name="avatar"
            listType="picture-card"
            fileList={facilityPhoto}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <div className="flex items-center justify-center aspect-square w-32 cursor-pointer flex-col rounded-lg border border-dashed bg-light-gray p-3">
              <PlusOutlined />
              <div className="mt-4 text-center">Upload</div>
            </div>
          </Upload>
        </div>
      </div>
      <div className="flex items-start mt-4 textarea">
        <p className="lg:text-sm text-xs w-1/5">施設紹介</p>
        <TextArea
          value={facilityIntroduction}
          onChange={(e) => setFacilityIntroduction(e.target.value)}
          className="w-3/4 h-40"
        />
      </div>
      {/* <div className="flex items-center mt-4">
        <p className="lg:text-sm text-xs w-1/5">募集職種</p>
        <div className="flex items-center justify-start gap-2 w-3/4">
          <Select
            placeholder="職種"
            options={jobTypesOptions}
            value={facilityJobType}
            onChange={(value) => setFacilityJobType(value)}
            className="w-1/2"
          />
          {facilityJobType && (
            <Select
              placeholder="職種"
              options={jobTypeDetailOptions(facilityJobType)}
              value={facilityJobTypeDetail}
              onChange={(value) => setFacilityJobTypeDetail(value)}
              className="w-1/2"
            />
          )}
        </div>
      </div> */}
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
      {/* <div className="flex items-start mt-4 desireEmployment">
        <p className="lg:text-sm text-xs w-1/5">サービス形態</p>
        <Checkbox.Group
          options={serviceTypeOptions}
          value={facilityServiceType}
          onChange={(value) => setFacilityServiceType(value)}
          className="w-4/5"
        />
      </div> */}
      <div className="flex items-start mt-4 textarea">
        <p className="lg:text-sm text-xs w-1/5">設立年月日</p>
        <div className="flex justify-start items-end w-4/5">
          <Input
            value={facilityEstablishmentDateYear}
            onChange={(e) => setFacilityEstablishmentDateYear(e.target.value)}
            className="w-1/4"
          />
          <span className="mx-2">年</span>
          <Input
            value={facilityEstablishmentDateMonth}
            onChange={(e) => setFacilityEstablishmentDateMonth(e.target.value)}
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
          onClick={handleSave}
        >
          施設を申請する
        </button>
      </div>
      <PhotoSelectModal
  visible={photoSelectModalVisible}
  onCancel={() => setPhotoSelectModalVisible(false)}
  onSelect={(selected) => {
    const formattedPhotos = selected.map((photoUrl, index) => ({
      uid: `existing-${index}`,
      name: `Photo ${index + 1}`,
      url: photoUrl,
      status: 'done',
    }));
    setFacilityPhoto((prev) => [...prev, ...formattedPhotos]);
    setPhotoSelectModalVisible(false);
  }}
/>
    </div>
  );
};

export default FacilityAdd;

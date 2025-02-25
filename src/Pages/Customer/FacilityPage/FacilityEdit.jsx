import { useState, useEffect, useCallback } from "react";
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
} from "antd";
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
  const [previewOpen, setPreviewOpen] = useState(false);
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
  const [jobPosts, setJobPosts] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const navigate = useNavigate();

  const editorStyle = {
    width: "80%",
  };

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

    if (updatedFileList.length > 1) {
      updatedFileList = updatedFileList.slice(-1);
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
      return;
    }

    const formData = new FormData();
    formData.append("file", facilityPhoto[0].originFileObj);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("写真アップロード成功!");
      return response.data.fileUrl;
    } catch (error) {
      message.error("写真アップロード失敗");
    }
  };

  const getFacility = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/facility/${id}`
      );
      setFacility(response.data.facility);
      setFacilityName(response.data.facility.name);
      setFacilityPostalCode(response.data.facility.postal_code);
      setFacilityPrefecture(response.data.facility.prefecture);
      setFacilityCity(response.data.facility.city);
      setFacilityVillage(response.data.facility.village);
      setFacilityBuilding(response.data.facility.building);
      setFacilityPhotoUrl(response.data.facility.photo);
      setFacilityIntroduction(response.data.facility.introduction);
      setFacilityJobType(
        Object.keys(JobType.医科).includes(response.data.facility.job_type[0])
          ? "医科"
          : Object.keys(JobType.歯科).includes(
              response.data.facility.job_type[0]
            )
          ? "歯科"
          : Object.keys(JobType.薬剤師).includes(
              response.data.facility.job_type[0]
            )
          ? "薬剤師"
          : Object.keys(JobType.看護婦).includes(
              response.data.facility.job_type[0]
            )
          ? "看護婦"
          : Object.keys(JobType.診療放射線技師).includes(
              response.data.facility.job_type[0]
            )
          ? "診療放射線技師"
          : Object.keys(JobType.診療放射線技師).includes(
              response.data.facility.job_type[0]
            )
          ? "診療放射線技師"
          : ""
      );
      setFacilityJobTypeDetail(response.data.facility.job_type[0]);
      setFacilityAccess(response.data.facility.access);
      setFacilityAccessText(response.data.facility.access_text);
      setFacilityGenre(response.data.facility.facility_genre);
      setFacilityServiceType(response.data.facility.service_type);
      setFacilityEstablishmentDateYear(
        response.data.facility.establishment_date.split("-")[0]
      );
      setFacilityEstablishmentDateMonth(
        response.data.facility.establishment_date.split("-")[1]
      );
      setFacilityServiceTime(response.data.facility.service_time);
      setFacilityRestDay(response.data.facility.rest_day);
    } catch (error) {
      console.error("Error fetching facility data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, []);

  const handleSave = async () => {
    const photoUrl = await handleUpload();

    if (facilityName === "") return message.error("施設名を入力してください。");
    if (facilityPostalCode === "")
      return message.error("郵便番号を入力してください。");
    if (facilityPrefecture === "")
      return message.error("都道府県を選択してください。");
    // if (facilityCity === "") return message.error("市区町村を入力してください。");
    if (facilityVillage === "")
      return message.error("町名・番地を入力してください。");
    if (facilityBuilding === "")
      return message.error("建物名を入力してください。");

    const facilityData = {
      customer_id: customer.customer_id,
      name: facilityName,
      postal_code: facilityPostalCode,
      prefecture: facilityPrefecture,
      city: facilityCity,
      village: facilityVillage,
      building: facilityBuilding,
      photo: photoUrl ? photoUrl : facilityPhotoUrl,
      introduction: facilityIntroduction,
      job_type: facilityJobTypeDetail,
      access: facilityAccess,
      access_text: facilityAccessText,
      facility_genre: facilityGenre,
      service_type: facilityServiceType,
      establishment_date: `${facilityEstablishmentDateYear}-${facilityEstablishmentDateMonth}`,
      service_time: facilityServiceTime,
      rest_day: facilityRestDay,
    };

    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/${id}`,
      facilityData
    );
    if (response.data.error) message.error(response.data.error);
    message.success(response.data.message);
    navigate(`/customers/facility`);
  };

  const handleRequestAllow = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/pending/${id}`
    );
    if (response.data.error) message.error(response.data.error);
    setSuccessModalOpen(true);
  };

  useEffect(() => {
    document.title = "施設編集";
    getFacility();
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
      <div className="w-full min-h-screen flex flex-col p-4 bg-white rounded-lg mb-8">
        <h1 className="lg:text-2xl md:text-base text-sm font-bold">施設編集</h1>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">施設名</p>
          <Input
            value={facility.name}
            onChange={(e) => setFacilityName(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">郵便番号</p>
          <Input
            value={facility.postal_code}
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
            {facilityPhoto.length == 0 && (
              <img
                src={facilityPhotoUrl}
                alt="施設写真"
                className="w-32 h-32 rounded-lg"
              />
            )}
            <Upload
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
            className="w-4/5"
          />
        </div>
        <div className="flex items-center mt-4">
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
          <p className="lg:text-sm text-xs w-1/5">アクセス(住所)</p>
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
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">サービス形態</p>
          <Checkbox.Group
            options={serviceTypeOptions}
            value={facilityServiceType}
            onChange={(value) => setFacilityServiceType(value)}
            className="w-4/5"
          />
        </div>
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
          <button className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300">
            プレビュー
          </button>
          <button
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            onClick={handleSave}
          >
            下書き保存
          </button>
          <button
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            onClick={handleRequestAllow}
          >
            掲載を申請する
          </button>
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
    </>
  );
};

export default FacilityEdit;

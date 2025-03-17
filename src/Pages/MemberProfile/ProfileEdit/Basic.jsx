import { Checkbox, Image, Input, message, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../utils/getBase64";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Prefectures } from "../../../utils/constants/categories";
import Private from "../../../components/Private";
import { getDateOptions } from "../../../utils/date";
import { Qualifications } from "./../../../utils/constants/categories/qualifications";
import { Municipalities } from "../../../utils/constants/categories/municipalities";

const Basic = () => {
  const [sei, setSei] = useState("");
  const [mei, setMei] = useState("");
  const [hiraganaSei, setHiraganaSei] = useState("");
  const [hiraganaMei, setHiraganaMei] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [municipalities, setMunicipalities] = useState("");
  const [village, setVillage] = useState("");
  const [building, setBuilding] = useState("");
  const [dependents, setDependents] = useState("");
  const [spouse, setSpouse] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selfPR, setSelfPR] = useState("");
  const [photo, setPhoto] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isQualificationOpen, setIsQualificationOpen] = useState(false);
  const [isQualificationOtherOpen, setIsQualificationOtherOpen] =
    useState(false);
  const [qualificationOther, setQualificationOther] = useState([]);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [qualificationDetails, setQualificationDetails] = useState(
    user?.qualification.length > 0
      ? user?.qualification.map((qualification) => ({
          qualification: qualification.qualification,
          year: "",
          month: "",
        }))
      : []
  );

  const qualificationKeys = [
    ...Object.keys(Qualifications.REQUIRED),
    ...Object.keys(Qualifications.OTHERS),
  ];

  const genderOptions = [
    { label: "男性", value: "男性" },
    { label: "女性", value: "女性" },
  ];

  const spouseOptions = [
    { label: "有り", value: "有り" },
    { label: "無し", value: "無し" },
  ];

  const prefecturesOptions = Object.entries(Prefectures).flatMap(
    ([region, prefs]) =>
      Object.entries(prefs).map(([name, value]) => ({
        label: name,
        value: name,
      }))
  );

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

  const { yearsOptions, monthsOptions, daysOptions } = getDateOptions();

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

    // Limit the number of files to 1
    if (updatedFileList.length > 1) {
      updatedFileList = updatedFileList.slice(-1);
    }

    setFileList(updatedFileList);

    // Provide feedback on upload status
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj); // Use the correct file object

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
      message.success("写真アップロード完了!");
      return response.data.fileUrl;
    } catch (error) {
      message.error("写真アップロード失敗");
    }
  };

  const handleQualificationOtherSave = async () => {
    const addedQualifications = qualificationOther.map((qualification) => ({
      qualification: qualification,
      year: "",
      month: "",
    }));

    setQualificationDetails((prev) => [...prev, ...addedQualifications]);
    setIsQualificationOtherOpen(false);
  };
  console.log(municipalities);

  const handleSave = async () => {
    const error = [];
    if (sei === "" || mei === "") error.push("名前");
    if (hiraganaSei === "" || hiraganaMei === "") error.push("ふりがな");
    if (gender === "") error.push("性別");
    if (year === "" || month === "" || day === "") error.push("生年月日");
    if (phoneNumber === "") error.push("電話番号");
    if (email === "") error.push("メールアドレス");

    // Validate qualification details if the qualification section is open
    if (isQualificationOpen) {
      const hasQualification = qualificationDetails.some(
        (detail) => detail.year && detail.month
      );
      if (!hasQualification) error.push("資格の取得年月");
    }

    if (error.length > 0)
      return message.error(error.join(", ") + "を入力してください。");

    // Pass the fileList to handleUploadChange
    const photoUrl = await handleUpload();

    const userData = {
      name: `${sei} ${mei}`,
      hiraganaName: `${hiraganaSei} ${hiraganaMei}`,
      gender: gender,
      birthday: `${year}-${month}-${day}`,
      currentStatus: currentStatus || user?.currentStatus,
      postalCode: postalCode || user?.postalCode,
      municipalities: municipalities || user?.municipalities,
      village: village || user?.village,
      building: building || user?.building,
      prefecture: prefecture || user?.prefecture,
      phoneNumber: phoneNumber,
      email: email,
      qualification: qualificationDetails,
      dependents: dependents,
      spouse: spouse,
      selfPR: selfPR,
      photo: photoUrl,
    };

    const resData = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/${user._id}/update`,
      userData
    );
    if (resData.data.error) return message.error(resData.data.message);
    setUser(resData.data.user);
    message.success(resData.data.message);
    navigate("/members/profiles");
  };

  useEffect(() => {
    setSei(user?.name.split(" ")[0]);
    setMei(user?.name.split(" ")[1]);
    setHiraganaSei(user?.hiraganaName.split(" ")[0]);
    setHiraganaMei(user?.hiraganaName.split(" ")[1]);
    setGender(user?.gender);
    setYear(new Date(user?.birthday).getFullYear());
    setMonth(new Date(user?.birthday).getMonth() + 1);
    setDay(new Date(user?.birthday).getDate());
    setPhoneNumber(user?.phoneNumber);
    setCurrentStatus(user?.currentStatus);
    setPrefecture(user?.prefecture);
    setPostalCode(user?.postalCode);
    setMunicipalities(user?.municipalities);
    setVillage(user?.village);
    setBuilding(user?.building);
    setEmail(user?.email);
    setDependents(user?.dependents);
    setSpouse(user?.spouse);
    setSelfPR(user?.selfPR);
    setPhoto(user?.photo);
    setQualificationDetails(
      user?.qualification.length > 0
        ? user?.qualification.map((qualification) => ({
            qualification: qualification.qualification,
            year: qualification.year,
            month: qualification.month,
          }))
        : []
    );
    setIsQualificationOpen(user?.qualification.length > 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user]);
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            基本情報
          </p>
          <div className="flex items-center justify-between w-full mt-2">
            <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
            <button
              className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              非公開について
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
          <div className="flex items-center justify-center w-full mt-2">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                氏名
              </span>
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                (必須)
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Input
                placeholder="性"
                value={sei}
                onChange={(e) => setSei(e.target.value)}
              />
              <Input
                placeholder="名"
                value={mei}
                onChange={(e) => setMei(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                ふりがな
              </span>
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                (必須)
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Input
                placeholder="せい"
                value={hiraganaSei}
                onChange={(e) => setHiraganaSei(e.target.value)}
              />
              <Input
                placeholder="めい"
                value={hiraganaMei}
                onChange={(e) => setHiraganaMei(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                性別
              </span>
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                (必須)
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Select
                options={genderOptions}
                value={gender}
                className="w-1/3"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                生年月日
              </span>
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                (必須)
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5 lg:text-sm md:text-xs text-xs">
              <Select
                options={yearsOptions}
                className="w-2/5"
                value={year}
                onChange={(value) => setYear(value)}
              />
              年
              <Select
                options={monthsOptions}
                className="w-1/4"
                value={month}
                onChange={(value) => setMonth(value)}
              />
              月
              <Select
                options={daysOptions}
                className="w-1/4"
                value={day}
                onChange={(value) => setDay(value)}
              />
              日
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                郵便番号
              </span>
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                (必須)
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Input
                className="w-1/3"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                都道府県
              </span>
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                (必須)
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Select
                options={prefecturesOptions}
                className="w-1/3"
                value={prefecture ? prefecture : user?.prefecture}
                onChange={(value) => setPrefecture(value)}
              />
            </div>
          </div>
          {prefecture !== "" && (
            <div className="flex items-center justify-center w-full mt-4">
              <div className="flex items-center justify-start gap-2 w-2/5">
                <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                  市区町村{" "}
                </span>
                <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                  (必須)
                </span>
              </div>
              <div className="flex items-center justify-start gap-2 w-3/5">
                <Select
                  value={municipalities ? municipalities : user?.municipalities}
                  options={cityOptions(
                    prefecture !== "" ? prefecture : user?.prefecture
                  )}
                  onChange={(e) => setMunicipalities(e)}
                  className="w-1/3"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                町名・番地{" "}
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Input
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-1/2"
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                建物名{" "}
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Input
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-1/2"
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-2 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                電話番号
              </span>
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                (必須)
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Input
                placeholder="000-0000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-1/2"
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-1 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                メールアドレス
              </span>
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                (必須)
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Input
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-start justify-center w-full mt-4">
            <div className="flex items-center justify-start gap-1 w-2/5 pt-2">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                資格/取得年月
              </span>
            </div>
            <div className="flex flex-col w-3/5">
              <div className="flex flex-col items-start justify-start w-full">
                <Checkbox
                  className="lg:text-sm md:text-xs text-xs font-bold w-full bg-[#EFEFEF] rounded-lg text-[#343434] p-2 border-none"
                  checked={isQualificationOpen}
                  onClick={() => setIsQualificationOpen(!isQualificationOpen)}
                >
                  資格を持っている
                </Checkbox>
              </div>
              <div
                className="flex flex-col w-full bg-[#EFEFEF] rounded-lg mt-4"
                style={{ display: isQualificationOpen ? "block" : "none" }}
              >
                <button
                  className="lg:text-sm md:text-xs text-xs font-bold text-white bg-[#ff9a9a] rounded-lg p-2 border-none mt-4 ml-2"
                  onClick={() =>
                    setIsQualificationOtherOpen(!isQualificationOtherOpen)
                  }
                >
                  上記以外の資格を追加
                </button>
                {qualificationDetails.map((detail, index) => (
                  <div
                    className="flex flex-col items-start justify-start gap-2 w-full p-2"
                    key={index}
                  >
                    <p className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      {detail.qualification}
                    </p>
                    <div className="flex items-center justify-start gap-2 w-4/5 lg:text-sm md:text-xs text-xs">
                      <Select
                        options={yearsOptions}
                        className="w-1/2 p-0.5"
                        value={detail.year}
                        onChange={(year) => {
                          const updatedDetails = [...qualificationDetails];
                          updatedDetails[index].year = year;
                          setQualificationDetails(updatedDetails);
                        }}
                      />
                      年
                      <Select
                        options={monthsOptions}
                        className="w-1/2 p-0.5"
                        value={detail.month}
                        onChange={(month) => {
                          const updatedDetails = [...qualificationDetails];
                          updatedDetails[index].month = month;
                          setQualificationDetails(updatedDetails);
                        }}
                      />
                      月
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start w-full mt-4">
            <div className="flex items-center justify-start gap-1 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                扶養家族
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-1/5">
              <Input
                placeholder="1"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
              />
              <p className="lg:text-base md:text-sm text-xs text-[#343434]">
                人
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start w-full mt-4">
            <div className="flex items-center justify-start gap-1 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                配偶者
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Select
                options={spouseOptions}
                value={spouse}
                onChange={(e) => setSpouse(e)}
                className="w-1/3"
              />
            </div>
          </div>
          <div className="flex items-start justify-start w-full mt-6">
            <div className="flex items-center justify-start gap-1 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                顔写真
              </span>
              <span
                className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                非公開
              </span>
            </div>
            <div className="flex flex-col items-start justify-center gap-2 w-3/5">
              <div className="flex items-center justify-start gap-2 w-full">
                {fileList.length == 0 && (
                  <img
                    src={photo}
                    alt="顔写真"
                    className="w-32 h-32 rounded-lg"
                  />
                )}
                <Upload
                  name="avatar"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  <div className="flex items-center justify-center aspect-square w-32 cursor-pointer flex-col rounded-lg border border-dashed bg-light-gray p-3">
                    <PlusOutlined />
                    <div className="mt-2 text-center">Upload</div>
                  </div>
                </Upload>
              </div>
              <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">
                ※ 単身胸から上。3ヶ月以内に撮影されたものを使用してください
              </p>
            </div>
          </div>
          <div className="flex items-start justify-start w-full mt-4">
            <div className="flex items-center justify-start gap-1 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                自己PR
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2 w-3/5 textarea">
              <p className="lg:text-sm md:text-xs text-xs text-[#343434]">
                特技、好きな学科、アピールポイントなど
              </p>
              <TextArea
                placeholder="自己PRを入力してください"
                value={selfPR}
                onChange={(e) => setSelfPR(e.target.value)}
                className="w-full h-40"
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-8 gap-4">
            <Link
              to={"/members/profiles"}
              className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            >
              プロフィール一覧を見る
            </Link>
            <button
              className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
              onClick={handleSave}
            >
              保存して確認する
            </button>
          </div>
        </div>
      </div>

      {isOpen && <Private isOpen={isOpen} setIsOpen={setIsOpen} />}

      {isQualificationOtherOpen && (
        <Modal
          open={isQualificationOtherOpen}
          onCancel={() => setIsQualificationOtherOpen(false)}
          footer={null}
          width={1000}
          height={800}
        >
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between gap-2 w-full flex-wrap p-4 overflow-scroll h-[40rem] overflow-x-hidden">
              {qualificationKeys.map((qualification) => (
                <Checkbox
                  key={qualification} // Ensure to provide a unique key
                  className="lg:text-sm md:text-sm text-xs text-[#000000] w-1/5 px-2 py-2 border-none bg-[#EFEFEF] rounded-lg"
                  value={qualification} // Set the value prop
                  disabled={qualificationDetails.some(
                    (detail) => detail.qualification === qualification
                  )}
                  onChange={(e) => {
                    const { checked } = e.target; // Get the checked state
                    if (checked) {
                      // If checked, add the qualification to the state
                      setQualificationOther((prev) => [...prev, qualification]);
                    }
                  }}
                >
                  {qualification}
                </Checkbox>
              ))}
            </div>
            <button
              className="lg:text-base md:text-sm text-xs text-white bg-[#ff6e7a] hover:bg-[#ff1d30] p-2 rounded-lg w-40 mt-8"
              onClick={handleQualificationOtherSave}
            >
              資格を追加する
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Basic;

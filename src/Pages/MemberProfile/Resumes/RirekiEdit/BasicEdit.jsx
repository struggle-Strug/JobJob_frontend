import { Checkbox, Input, message, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../../utils/getBase64";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Prefectures } from "../../../../utils/constants/categories";
import Private from "../../../../components/Private";
import { getDateOptions } from "../../../../utils/date";

const BasicEdit = ({ rireki }) => {
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
  const [prefecture, setPrefecture] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [photo, setPhoto] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [otherContacts, setOtherContacts] = useState(false);
  const [otherContactsDetail, setOtherContactsDetail] = useState({
    phoneNumber: "",
    email: "",
    prefecture: "",
  });
  const navigate = useNavigate();

  const genderOptions = [
    { label: "男性", value: "男性" },
    { label: "女性", value: "女性" },
  ];

  const prefecturesOptions = Object.entries(Prefectures).flatMap(
    ([region, prefs]) =>
      Object.entries(prefs).map(([name, value]) => ({
        label: name,
        value: name,
      }))
  );

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
      message.success("写真アップロード成功!");
      return response.data.fileUrl;
    } catch (error) {
      message.error("写真アップロード失敗");
    }
  };

  const handleSave = async () => {
    const error = [];
    if (sei === "" || mei === "") error.push("名前");
    if (hiraganaSei === "" || hiraganaMei === "") error.push("ふりがな");
    if (gender === "") error.push("性別");
    if (year === "" || month === "" || day === "") error.push("生年月日");
    if (phoneNumber === "") error.push("電話番号");
    if (email === "") error.push("メールアドレス");

    if (error.length > 0)
      return message.error(error.join(", ") + "を入力してください。");

    // Pass the fileList to handleUploadChange
    const photoUrl = await handleUpload();

    const rirekiData = {
      name: `${sei} ${mei}`,
      hiraganaName: `${hiraganaSei} ${hiraganaMei}`,
      gender: gender,
      birthday: `${year}-${month}-${day}`,
      prefecture: prefecture,
      phoneNumber: phoneNumber,
      email: email,
      photo: photoUrl ? photoUrl : photo,
      otherPhone: otherContacts ? otherContactsDetail.phoneNumber : "同上",
      otherEmail: otherContacts ? otherContactsDetail.email : "同上",
      otherPrefecture: otherContacts ? otherContactsDetail.prefecture : "同上",
    };

    const resData = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/rireki/update/basic/${rireki._id}`,
      rirekiData
    );
    if (resData.data.error) return message.error(resData.data.message);
    message.success(resData.data.message);
    navigate(`/members/resumes/rireki/detail/${rireki._id}`);
  };

  useEffect(() => {
    setSei(rireki?.basic.name.split(" ")[0]);
    setMei(rireki?.basic.name.split(" ")[1]);
    setHiraganaSei(rireki?.basic.hiraganaName.split(" ")[0]);
    setHiraganaMei(rireki?.basic.hiraganaName.split(" ")[1]);
    setGender(rireki?.basic.gender);
    setYear(new Date(rireki?.basic.birthday).getFullYear());
    setMonth(new Date(rireki?.basic.birthday).getMonth() + 1);
    setDay(new Date(rireki?.basic.birthday).getDate());
    setPhoneNumber(rireki?.basic.phoneNumber);
    setPrefecture(rireki?.basic.prefecture);
    setEmail(rireki?.basic.email);
    setPhoto(rireki?.basic.photo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
                value={prefecture}
                onChange={(value) => setPrefecture(value)}
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
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
              <Input
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-start justify-start w-full mt-6">
            <div className="flex items-center justify-start gap-1 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                顔写真
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
          <div className="flex items-center justify-center w-full mt-4 border-t border-[#c7c7c7] pt-4">
            <div className="flex items-center justify-start gap-1 w-2/5">
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                連絡先
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5 desire duration-300">
              <Checkbox
                checked={!otherContacts}
                onChange={() => setOtherContacts(false)}
              >
                同上
              </Checkbox>
              <Checkbox
                checked={otherContacts}
                onChange={() => setOtherContacts(true)}
              >
                その他連絡先
              </Checkbox>
            </div>
          </div>
          {otherContacts && (
            <>
              <div className="flex items-center justify-center w-full mt-4 duration-300">
                <div className="flex items-center justify-start gap-2 w-2/5">
                  <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                    電話番号
                  </span>
                  <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                    (必須)
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2 w-3/5">
                  <Input
                    placeholder="00000000000"
                    value={otherContactsDetail.phoneNumber}
                    onChange={(value) =>
                      setOtherContactsDetail({
                        ...otherContactsDetail,
                        phoneNumber: value,
                      })
                    }
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
                </div>
                <div className="flex items-center justify-start gap-2 w-3/5">
                  <Input
                    placeholder="example@example.com"
                    value={otherContactsDetail.email}
                    onChange={(value) =>
                      setOtherContactsDetail({
                        ...otherContactsDetail,
                        email: value,
                      })
                    }
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
                    value={otherContactsDetail.prefecture}
                    onChange={(value) =>
                      setOtherContactsDetail({
                        ...otherContactsDetail,
                        prefecture: value,
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}
          <div className="flex items-center justify-center w-full mt-8 gap-4">
            <button
              className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
              onClick={handleSave}
            >
              プレビュー
            </button>
          </div>
          <div className="flex items-center justify-center w-full mt-8 gap-4">
            <Link
              to={`/members/resumes/rireki/detail/${rireki?._id}`}
              className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            >
              もどる
            </Link>
            <button
              className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
              onClick={handleSave}
            >
              保存する
            </button>
          </div>
        </div>
      </div>

      {isOpen && <Private isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default BasicEdit;

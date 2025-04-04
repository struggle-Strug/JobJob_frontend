import { Link, useLocation, useNavigate } from "react-router-dom";
import { getJobTypeKeyByValue } from "../../../utils/getFunctions";
import { useAuth } from "../../../context/AuthContext";
import { Checkbox, Input, message, Modal, Radio, Select } from "antd";
import { getDateOptions } from "../../../utils/date";
import { useEffect, useState } from "react";
import {
  Municipalities,
  Prefectures,
} from "../../../utils/constants/categories";
import axios from "axios";

const JobOffer = () => {
  const { user } = useAuth();
  const [customer, setCustomer] = useState(null);
  const [jobPost, setJobPost] = useState(null);
  const [sei, setSei] = useState("");
  const [mei, setMei] = useState("");
  const [hiraganaSei, setHiraganaSei] = useState("");
  const [hiraganaMei, setHiraganaMei] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [municipalities, setMunicipalities] = useState("");
  const [village, setVillage] = useState("");
  const [building, setBuilding] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState([]);
  const [period, setPeriod] = useState("");
  const [meetingDate, setMeetingDate] = useState([
    {
      date: "", // A date string (e.g., '2025-01-06')
      times: [
        { time: "", minute: "" }, // Each time object
      ],
    },
  ]);
  const [successModal, setSuccessModal] = useState(false);

  const { pathname } = useLocation();
  const jobType = pathname.split("/")[1];
  const jobpost_id = pathname.split("/").pop();

  const navigate = useNavigate();

  const { yearsOptions, monthsOptions, daysOptions } = getDateOptions();
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
      ...Municipalities[prefecture]?.map((type) => ({
        value: type,
        label: type,
      })),
    ];
  };
  const periodOptions = [
    { value: "未経験", label: "未経験" },
    { value: "1年未満", label: "1年未満" },
    { value: "2年未満", label: "2年未満" },
    { value: "3年未満", label: "3年未満" },
    { value: "4年未満", label: "4年未満" },
    { value: "5年未満", label: "5年未満" },
    { value: "6年未満", label: "6年未満" },
    { value: "7年未満", label: "7年未満" },
    { value: "8年未満", label: "8年未満" },
    { value: "9年未満", label: "9年未満" },
    { value: "10年未満", label: "10年未満" },
    { value: "10年以上", label: "10年以上" },
  ];

  const genderOptions = [
    { label: "男性", value: "男性" },
    { label: "女性", value: "女性" },
  ];

  const requiredQualificationsOptions = jobPost?.qualification_type.map(
    (qualification) => ({
      label: qualification,
      value: qualification,
    })
  );

  const userQualifications = user?.qualification.map(
    (qualificationObject) => qualificationObject.qualification
  );

  const generateDateOptions = () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Format date: "M月D日 (Day of Week)"
      const month = date.getMonth() + 1; // Months are zero-indexed
      const day = date.getDate();
      const weekDay = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]; // Japanese-style day of the week
      const formattedDate = `${month}月${day}日 (${weekDay})`;

      dates.push(formattedDate);
    }

    return dates;
  };

  const dateOptions = generateDateOptions().map((date) => ({
    label: date,
    value: date,
  }));
  const timeOptions = Array.from({ length: 24 }, (_, i) => ({
    label: i,
    value: i,
  }));
  const minuteOptions = [
    { label: "00", value: "00" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "45", value: "45" },
  ];
  const onChangeSei = (value) => {
    setSei(value.target.value);
  };
  const onChangeMei = (value) => {
    setMei(value.target.value);
  };
  const onChangeHiraganaSei = (value) => {
    setHiraganaSei(value.target.value);
  };
  const onChangeHiraganaMei = (value) => {
    setHiraganaMei(value.target.value);
  };
  const onChangeGender = (value) => {
    setGender(value);
  };
  const onChangeYear = (value) => {
    setYear(value);
  };
  const onChangeMonth = (value) => {
    setMonth(value);
  };
  const onChangeDay = (value) => {
    setDay(value);
  };
  const onChangePhoneNumber = (value) => {
    setPhoneNumber(value.target.value);
  };
  const onChangePassword = (value) => {
    setPassword(value.target.value);
  };

  const handleDateChange = (value, dateIndex) => {
    setMeetingDate((prev) =>
      prev.map((meeting, i) =>
        i === dateIndex ? { ...meeting, date: value } : meeting
      )
    );
  };

  const handleTimeChange = (value, dateIndex, timeIndex) => {
    setMeetingDate((prev) =>
      prev.map((meeting, i) =>
        i === dateIndex
          ? {
              ...meeting,
              times: meeting.times.map((time, j) =>
                j === timeIndex ? { ...time, time: value } : time
              ),
            }
          : meeting
      )
    );
  };

  const handleMinuteChange = (value, dateIndex, timeIndex) => {
    setMeetingDate((prev) =>
      prev.map((meeting, i) =>
        i === dateIndex
          ? {
              ...meeting,
              times: meeting.times.map((time, j) =>
                j === timeIndex ? { ...time, minute: value } : time
              ),
            }
          : meeting
      )
    );
  };

  const handleDeleteMeetingDate = (index) => {
    const newMeetingDates = meetingDate.filter((_, i) => i !== index);
    setMeetingDate(newMeetingDates);
  };

  const handleAddMeetingDate = () => {
    setMeetingDate([
      ...meetingDate,
      { date: "", times: [{ time: "", minute: "" }] },
    ]);
  };

  const handleDeleteMeetingTime = (dateIndex, timeIndex) => {
    const newMeetingDates = meetingDate.map((meeting, index) => {
      if (index === dateIndex) {
        return {
          ...meeting,
          times: meeting.times.filter((_, i) => i !== timeIndex),
        };
      }
      return meeting;
    });
    setMeetingDate(newMeetingDates);
  };

  const handleAddMeetingTime = (dateIndex) => {
    const newMeetingDates = meetingDate.map((meeting, index) => {
      if (index === dateIndex) {
        return {
          ...meeting,
          times: [...meeting.times, { time: "", minute: "" }],
        };
      }
      return meeting;
    });
    setMeetingDate(newMeetingDates);
  };

  const getJobPost = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobpost_id}`
      );
      setJobPost(res.data.jobpost);
      setQualification(user?.qualification?.map((q) => q.qualification));
      const resData = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/customers/${res.data.jobpost.customer_id.customer_id}`
      );
      setCustomer(resData.data.customer);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const onModalClose = () => {
    setSuccessModal(false);
    navigate(`/${jobType}/${jobpost_id}`);
  };

  const handleApply = async () => {
    if ((sei || mei) === "") return message.error("氏名を入力してください。");
    if ((hiraganaSei || hiraganaMei) === "")
      return message.error("ふりがな名を入力してください。");
    if ((year || month || day) === "")
      return message.error("生年月日を入力してください。");
    if (gender === "") return message.error("性別を選択してください。");
    if (phoneNumber === "")
      return message.error("電話番号を入力してください。");
    if (prefecture === "") return message.error("都道府県を選択してください。");
    if (email === "")
      return message.error("メールアドレスを入力してください。");

    const messageData = {
      jobPost_id: jobpost_id,
      sender: user?._id,
      recevier: customer?._id,
      content: `
            この度は、ジョブジョブの求人広告を見て応募いたしました。

            宜しければ、面接の機会をいただけましたら幸いです。

            ご多忙の所恐縮ですが、どうぞよろしくお願い致します。

            ■応募勤務形態 ${jobPost?.employment_type[0]}

            ${period !== "" ? `■応募職種の経験 ${period}` : ""}

            ${
              jobPost?.qualification_type?.every((q) =>
                qualification?.includes(q)
              )
                ? `■資格 ${jobPost?.qualification_type.join(",")}`
                : ""
            }
            ${
              meetingDate[0].date !== ""
                ? `■面接日時
            ${meetingDate
              .map(
                (meeting) =>
                  `${meeting.date} ${meeting.times
                    .map(
                      (meetingTime) =>
                        `${meetingTime.time}:${meetingTime.minute}~`
                    )
                    .join(", ")}`
              )
              .join("\n")}`
                : ""
            }
            `
        .trim()
        .replace(/^\s+/gm, ""),
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/message`,
      messageData
    );
    if (res.data.error) return message.error(res.data.message);
    setSuccessModal(true);
  };

  useEffect(() => {
    if (user !== null) {
      setSei(user?.name.split(" ")[0]);
      setMei(user?.name.split(" ")[1]);
      setHiraganaSei(user?.hiraganaName.split(" ")[0]);
      setHiraganaMei(user?.hiraganaName.split(" ")[1]);
      setGender(user?.gender);
      setYear(user?.birthday.split("-")[0]);
      setMonth(user?.birthday.split("-")[1]);
      setDay(user?.birthday.split("-")[2]);
      setPhoneNumber(user?.phoneNumber);
      setPrefecture(user?.prefecture);
      setMunicipalities(user?.municipalities);
      setVillage(user?.village);
      setBuilding(user?.building);
      setCurrentStatus(user?.currentStatus);
      setEmail(user?.email);
    }
    getJobPost();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user]);

  return (
    <>
      <div>
        <div className="flex w-full h-auto px-4 bg-[#EFEFEF]">
          <div className="container flex items-center justify-between gap-8">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex justify-start bg-white rounded-lg px-6 py-6 w-full shadow-xl">
                <p className="lg:text-lg md:text-base text-sm text-[#343434]">
                  <span className="font-bold">{jobPost?.facility_id.name}</span>
                  の
                  <span className="font-bold">
                    {getJobTypeKeyByValue(jobType)}求人
                  </span>
                  に応募する
                </p>
              </div>
              <div className="flex flex-col justify-center bg-white rounded-lg px-6 py-6 w-full shadow-xl mt-4">
                <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
                  基本情報
                </p>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>氏名</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <div className="flex justify-start gap-8">
                          <Input
                            placeholder="姓"
                            value={sei}
                            className="w-1/3"
                            onChange={onChangeSei}
                          />
                          <Input
                            placeholder="名"
                            value={mei}
                            className="w-1/3"
                            onChange={onChangeMei}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>ふりがな</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <div className="flex justify-start gap-8">
                          <Input
                            placeholder="せい"
                            value={hiraganaSei}
                            className="w-1/3"
                            onChange={onChangeHiraganaSei}
                          />
                          <Input
                            placeholder="めい"
                            value={hiraganaMei}
                            className="w-1/3"
                            onChange={onChangeHiraganaMei}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>性別</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <div className="flex justify-start gap-8">
                          <Select
                            options={genderOptions}
                            value={gender}
                            className="w-1/3"
                            onChange={onChangeGender}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>生年月日</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <div className="flex justify-start items-end gap-4 lg:text-sm md:text-xs text-xs">
                          <Select
                            options={yearsOptions}
                            value={year}
                            className="w-1/4"
                            onChange={onChangeYear}
                          />
                          年
                          <Select
                            options={monthsOptions}
                            value={month}
                            className="w-1/4"
                            onChange={onChangeMonth}
                          />
                          月
                          <Select
                            options={daysOptions}
                            value={day}
                            className="w-1/4"
                            onChange={onChangeDay}
                          />
                          日
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>電話番号</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <div className="flex justify-start gap-4">
                          <Input
                            placeholder="電話番号"
                            value={phoneNumber}
                            className="w-1/3"
                            onChange={onChangePhoneNumber}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>住所</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <div className="flex justify-start gap-8">
                          <Select
                            options={prefecturesOptions}
                            className="w-1/4"
                            value={prefecture ? prefecture : user?.prefecture}
                            onChange={(value) => setPrefecture(value)}
                          />
                          {(prefecture || user) && (
                            <Select
                              options={cityOptions(
                                prefecture ? prefecture : user?.prefecture
                              )}
                              className="w-1/4"
                              value={
                                municipalities
                                  ? municipalities
                                  : user?.municipalities
                              }
                              onChange={(value) => setMunicipalities(value)}
                            />
                          )}
                          <Input
                            className="w-1/4"
                            value={village ? village : user?.village}
                            onChange={(e) => setVillage(e.target.value)}
                          />
                          <Input
                            className="w-1/4"
                            value={building ? building : user?.building}
                            onChange={(e) => setBuilding(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>就業状況</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <div className="flex justify-start gap-4">
                          <Radio.Group
                            value={
                              currentStatus
                                ? currentStatus
                                : user?.currentStatus
                            }
                            onChange={(e) => setCurrentStatus(e.target.value)}
                          >
                            <Radio value="就業中">就業中</Radio>
                            <Radio value="離職中">離職中</Radio>
                            <Radio value="在学中">在学中</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {user == null && (
                  <div className="flex justify-between w-full mt-6">
                    <div className="flex items-start gap-2 justify-end">
                      <p>PASSWORD</p>
                      <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                    </div>
                    <div className="flex flex-col w-4/5">
                      <div className="flex flex-col px-2">
                        <div className="duration-300 overflow-hidden">
                          <div className="flex justify-start gap-4">
                            <Input
                              type="password"
                              placeholder="PASSWORD"
                              className="w-1/2 py-2"
                              onChange={onChangePassword}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434] mt-6">
                  応募内容
                </p>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>応募職種</p>
                  </div>
                  <div className="flex items-start justify-start w-4/5">
                    {getJobTypeKeyByValue(jobType)}(
                    {jobPost?.employment_type[0]})
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>応募職種の経験</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <Select
                          className="w-32"
                          placeholder="未設定"
                          value={period || undefined}
                          onChange={(value) => setPeriod(value)}
                          options={periodOptions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>保有資格・免許</p>
                  </div>
                  <div className="flex flex-col items-start justify-start desireEmployment w-4/5">
                    {!jobPost?.qualification_type?.every((q) =>
                      qualification?.includes(q)
                    ) && (
                      <p className="text-xs text-[#FF2A3B]">
                        応募条件を満たす資格/免許が選択されていません。お持ちの場合はチェックしてください。
                      </p>
                    )}
                    <Checkbox.Group
                      options={requiredQualificationsOptions}
                      value={qualification}
                      onChange={(value) => setQualification(value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex items-start gap-2 justify-end">
                    <p>面接希望日</p>
                  </div>
                  <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                      <div className="duration-300 overflow-hidden">
                        <p className="lg:text-sm text-xs">
                          日程調整をスムーズにするポイント
                        </p>
                        <p className="lg:text-sm text-xs">
                          ・本日から7日前後の日程を選択する
                        </p>
                        <p className="lg:text-sm text-xs">
                          ・複数の日程を選択する
                        </p>
                        <p className="lg:text-sm text-xs">
                          ※選択した時間から1時間以内を希望時間とします。面接の実施や日程は確定ではありません。
                        </p>
                        {meetingDate.length === 0 ? (
                          <>
                            <button
                              onClick={() => handleAddMeetingDate()}
                              className="text-[#343434] hover:text-[#FF2A3B] border-[1px] rounded-lg px-4 py-2 text-xs text-center mt-2 duration-300"
                            >
                              面接希望日を追加する
                            </button>
                          </>
                        ) : (
                          meetingDate.map((meeting, dateIndex) => {
                            return (
                              <>
                                <div className="flex flex-col w-full">
                                  <div
                                    key={dateIndex}
                                    className="flex flex-col bg-[#EFEFEF] rounded-lg p-2 mt-4 w-2/5"
                                  >
                                    <Select
                                      options={dateOptions}
                                      placeholder="日程を選択"
                                      value={meeting.date}
                                      onChange={(value) =>
                                        handleDateChange(value, dateIndex)
                                      }
                                      className="w-full"
                                    />
                                    {meeting.times.map((time, timeIndex) => {
                                      return (
                                        <>
                                          <div
                                            key={timeIndex}
                                            className="flex mt-4 gap-2 items-center"
                                          >
                                            <Select
                                              options={timeOptions}
                                              placeholder="時間を選択"
                                              value={time.time}
                                              onChange={(value) =>
                                                handleTimeChange(
                                                  value,
                                                  dateIndex,
                                                  timeIndex
                                                )
                                              }
                                              className="w-1/3"
                                            />
                                            <Select
                                              options={minuteOptions}
                                              placeholder="分を選択"
                                              value={time.minute}
                                              onChange={(value) =>
                                                handleMinuteChange(
                                                  value,
                                                  dateIndex,
                                                  timeIndex
                                                )
                                              }
                                              className="w-1/3"
                                            />
                                            ~
                                            <button
                                              onClick={() =>
                                                handleDeleteMeetingTime(
                                                  dateIndex,
                                                  timeIndex
                                                )
                                              }
                                              className="text-[#FF2A3B] text-xs"
                                            >
                                              時間を削除
                                            </button>
                                          </div>
                                        </>
                                      );
                                    })}
                                    <button
                                      onClick={() =>
                                        handleAddMeetingTime(dateIndex)
                                      }
                                      className="text-[#FF2A3B] text-xs mt-2"
                                    >
                                      時間を追加
                                    </button>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleDeleteMeetingDate(dateIndex)
                                    }
                                    className="text-[#FF2A3B] text-xs w-2/5 text-right mt-2"
                                  >
                                    希望日を削除する
                                  </button>
                                  <button
                                    onClick={() => handleAddMeetingDate()}
                                    className="text-[#FF2A3B] text-xs w-2/5 text-left mt-1"
                                  >
                                    面接希望日を追加する
                                  </button>
                                </div>
                              </>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full border-t-[1px] border-[#EFEFEF] mt-4 text-center p-4">
                  <p className="text-sm text-center mb-2">
                    <Link
                      to="/rule"
                      className="text-[#FF2A3B] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      利用規約・個人情報の取り扱い
                    </Link>
                    に同意の上、ご登録ください
                  </p>
                  <button
                    className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-24 py-3 duration-300"
                    onClick={handleApply}
                  >
                    応募する
                  </button>
                  <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">
                    応募が完了すると応募先に質問事項などを自由に送れるようになります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <Modal
          open={successModal}
          close={onModalClose}
          footer={false}
          className="modal"
        >
          <div className="flex flex-col items-start justify-start">
            <h1 className="lg:text-base text-sm font-bold text-[#343434]">
              {jobPost?.facility_id.name}({jobPost?.type}/
              {jobPost?.employment_type[0]})への応募が完了しました。
            </h1>
            <p className="text-xs text-[#343434] mt-4">
              ご応募ありがとうございます。応募後の流れなどを紹介している応募完了メールを送信しました。質問や追加アピール、履歴書の送付などはメッセージにて応募先へ直接連絡できます。
            </p>
            <Link
              to={"/members/message"}
              className="mt-4 bg-[#EFEFEF] px-4 py-2 rounded-lg"
            >
              メッセージに移動する
            </Link>
          </div>
        </Modal>
      }
    </>
  );
};

export default JobOffer;

import { useEffect, useState } from "react";
import Private from "../../../components/Private";
import { Input, message, Select } from "antd";
import { Facilities } from "./../../../utils/constants/categories/facilities";
import { getDateOptions } from "../../../utils/date";
import {
  EmploymentType,
  JobType,
  Paysystems,
} from "../../../utils/constants/categories";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const WorkHistory = () => {
  const { user, setUser } = useAuth();

  const [workHistories, setWorkHistories] = useState([
    {
      companyName: "",
      contents: "",
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      employmentType: "",
      jobType: "",
      jobTypeDetail: "",
      workContent: "",
      officialPosition: "",
      payType: "",
      amount: "",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const facilitiesOptions = [
    {
      label: "選択する",
      value: "",
    },
    ...Object.keys(Facilities).map((facility) => ({
      value: facility,
      label: facility,
    })),
  ];

  const employmentTypeOptions = [
    {
      label: "選択する",
      value: "",
    },
    ...Object.keys(EmploymentType).map((type) => ({
      value: type,
      label: type,
    })),
  ];

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

  const officalPositionOptions = [
    {
      label: "選択する",
      value: "",
    },
    {
      label: "なし",
      value: "なし",
    },
    {
      label: "医院長/副医院長",
      value: "医院長/副医院長",
    },
    {
      label: "その他",
      value: "その他",
    },
  ];

  const PayTypeOptions = [
    {
      label: "選択する",
      value: "",
    },
    ...Object.keys(Paysystems).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  const { yearsOptions, monthsOptions } = getDateOptions();

  const validateWorkHistory = (history) => {
    const requiredFields = [
      "companyName",
      "contents",
      "startYear",
      "startMonth",
      "endYear",
      "endMonth",
      "employmentType",
      "jobType",
      "jobTypeDetail",
      "workContent",
      "officialPosition",
      "payType",
      "amount",
    ];

    console.log(history)

    for (let field of requiredFields) {
      if (!history[field]) {
        console.log(history[field])
        return { status: false, field: field };
      }
    }
    return { status: true };
  };

  const handleGenerate = () => {
    const lastHistory = workHistories[workHistories.length - 1];
    if (!validateWorkHistory(lastHistory).status) {
      if (validateWorkHistory(lastHistory).field === "companyName")
        message.error("勤務先名を入力してください。");
      if (validateWorkHistory(lastHistory).field === "contents")
        message.error("事業内容を入力してください。");
      if (validateWorkHistory(lastHistory).field === "startYear")
        message.error("勤務開始年を入力してください。");
      if (validateWorkHistory(lastHistory).field === "startMonth")
        message.error("勤務開始月を入力してください。");
      if (validateWorkHistory(lastHistory).field === "endYear")
        message.error("勤務終了年を入力してください。");
      if (validateWorkHistory(lastHistory).field === "endMonth")
        message.error("勤務終了月を入力してください。");
      if (validateWorkHistory(lastHistory).field === "employmentType")
        message.error("勤務形態を入力してください。");
      if (validateWorkHistory(lastHistory).field === "jobType")
        message.error("職種を入力してください。");
      if (validateWorkHistory(lastHistory).field === "jobTypeDetail")
        message.error("職種はどちらも入力してください。");
      if (validateWorkHistory(lastHistory).field === "workContent")
        message.error("仕事内容を入力してください。");
      if (validateWorkHistory(lastHistory).field === "officialPosition")
        message.error("役職を入力してください。");
      if (validateWorkHistory(lastHistory).field === "payType")
        message.error("給与形態を入力してください。");
      if (validateWorkHistory(lastHistory).field === "amount")
        message.error("給与額を入力してください。");
      return;
    }
    setWorkHistories([
      ...workHistories,
      {
        companyName: "",
        contents: "",
        startYear: "",
        startMonth: "",
        endYear: "",
        endMonth: "",
        employmentType: "",
        jobType: "",
        jobTypeDetail: "",
        workContent: "",
        officialPosition: "",
        payType: "",
        amount: "",
      },
    ]);
  };

  const handleDeleteWorkHistory = (index) => {
    const newWorkHistories = workHistories.filter((_, i) => i !== index);
    setWorkHistories(newWorkHistories);
  };

  const handleSave = async () => {
    const lastHistory = workHistories[workHistories.length - 1];
    if (!validateWorkHistory(lastHistory).status)
      return message.error("すべてのフィールドに入力してください。");
    const workDatas = workHistories.map((workHistory) => ({
      companyName: workHistory.companyName,
      contents: workHistory.contents,
      startDate: `${workHistory.startYear}-${workHistory.startMonth}`,
      endDate: `${workHistory.endYear}-${workHistory.endMonth}`,
      employmentType: workHistory.employmentType,
      jobType: workHistory.jobType,
      jobTypeDetail: workHistory.jobTypeDetail,
      workContent: workHistory.workContent,
      officialPosition: workHistory.officialPosition,
      payType: workHistory.payType,
      amount: workHistory.amount,
    }));
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/${user?._id}/update/work_history`,
      workDatas
    );
    if (res.data.error) return message.error(res.data.message);
    setUser(res.data.user);
    message.success(res.data.message);
    navigate("/members/profiles");
  };

  useEffect(() => {
    user?.workHistories.length > 0 &&
      setWorkHistories(
        user?.workHistories?.map((workHistory) => ({
          companyName: workHistory.companyName,
          contents: workHistory.contents,
          startYear: workHistory.startDate.split("-")[0],
          startMonth: workHistory.startDate.split("-")[1],
          endYear: workHistory.endDate.split("-")[0],
          endMonth: workHistory.endDate.split("-")[1],
          employmentType: workHistory.employmentType,
          jobType: workHistory.jobType,
          jobTypeDetail: workHistory.jobTypeDetail,
          workContent: workHistory.workContent,
          officialPosition: workHistory.officialPosition,
          payType: workHistory.payType,
          amount: workHistory.amount,
        }))
      );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            職務経歴
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
      </div>
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
        {workHistories.map((history, index) => {
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

          return (
            <WorkHistoryEntry
              key={index}
              history={history}
              index={index}
              updateHistory={(field, value) => {
                const newHistories = [...workHistories];
                newHistories[index][field] = value;
                setWorkHistories(newHistories);
              }}
              handleDeleteWorkHistory={handleDeleteWorkHistory}
              facilitiesOptions={facilitiesOptions}
              employmentTypeOptions={employmentTypeOptions}
              jobTypesOptions={jobTypesOptions}
              officalPositionOptions={officalPositionOptions}
              PayTypeOptions={PayTypeOptions}
              yearsOptions={yearsOptions}
              monthsOptions={monthsOptions}
              jobTypeDetailOptions={jobTypeDetailOptions}
            />
          );
        })}
        <div className="text-center w-full mt-8">
          <button
            onClick={handleGenerate}
            className="bg-[#fff8f8] text-[#FF2A3B] px-2 py-1 rounded-lg"
          >
            職歴を追加する
          </button>
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

      {isOpen && <Private isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

const WorkHistoryEntry = ({
  history,
  index,
  updateHistory,
  handleDeleteWorkHistory,
  facilitiesOptions,
  employmentTypeOptions,
  jobTypesOptions,
  jobTypeDetailOptions,
  officalPositionOptions,
  PayTypeOptions,
  yearsOptions,
  monthsOptions,
}) => (
  <div key={index} className="w-full">
    <div className="flex items-center justify-end w-full">
      <button
        onClick={() => handleDeleteWorkHistory(index)}
        className="text-[#FF2A3B] lg:text-sm md:text-xs text-xs hover:underline"
      >
        この職歴を削除する
      </button>
    </div>
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex items-center justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          勤務先名
        </span>
        <span className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
          非公開
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 w-full">
        <Input
          placeholder="勤務先名"
          value={history.companyName}
          onChange={(e) => updateHistory("companyName", e.target.value)}
          className="w-3/4"
        />
      </div>
    </div>
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex items-center justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          事業内容
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 w-full">
        <Select
          placeholder="事業内容"
          options={facilitiesOptions}
          value={history.contents}
          onChange={(value) => updateHistory("contents", value)}
          className="w-1/2"
        />
      </div>
    </div>
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex items-center justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          勤務開始
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 w-full lg:text-base md:text-sm text-xs">
        <Select
          placeholder="年"
          options={yearsOptions}
          value={history.startYear}
          onChange={(value) => updateHistory("startYear", value)}
          className="w-1/4"
        />
        年
        <Select
          placeholder="月"
          options={monthsOptions}
          value={history.startMonth}
          onChange={(value) => updateHistory("startMonth", value)}
          className="w-1/4"
        />
        月
      </div>
    </div>
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex items-center justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          勤務終了
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 w-full lg:text-base md:text-sm text-xs">
        <Select
          placeholder="年"
          options={yearsOptions}
          value={history.endYear}
          onChange={(value) => updateHistory("endYear", value)}
          className="w-1/4"
        />
        年
        <Select
          placeholder="月"
          options={monthsOptions}
          value={history.endMonth}
          onChange={(value) => updateHistory("endMonth", value)}
          className="w-1/4"
        />
        月
      </div>
    </div>
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex items-center justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          勤務形態
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 w-full">
        <Select
          placeholder="勤務形態"
          options={employmentTypeOptions}
          value={history.employmentType}
          onChange={(value) => updateHistory("employmentType", value)}
          className="w-1/2"
        />
      </div>
    </div>
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex items-center justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          職種
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 w-full">
        <Select
          placeholder="職種"
          options={jobTypesOptions}
          value={history.jobType}
          onChange={(value) => updateHistory("jobType", value)}
          className="w-1/2"
        />
        {history.jobType && (
          <Select
            placeholder="職種"
            options={jobTypeDetailOptions(history.jobType)}
            value={history.jobTypeDetail}
            onChange={(value) => updateHistory("jobTypeDetail", value)}
            className="w-1/2"
          />
        )}
      </div>
    </div>
    <div className="flex justify-start w-full mt-4">
      <div className="flex items-start justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          仕事内容
        </span>
        <span className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg mt-1">
          非公開
        </span>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 w-full textarea">
        <p className="lg:text-sm md:text-xs text-xs text-[#343434] w-4/5">
          配属部署、担当業務、リーダー・プリセプター経験の有無など
        </p>
        <TextArea
          placeholder="仕事内容を入力してください"
          value={history.workContent}
          onChange={(e) => updateHistory("workContent", e.target.value)}
          className="w-4/5"
        />
      </div>
    </div>
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex items-center justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          役職
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 w-full">
        <Select
          placeholder="役職"
          options={officalPositionOptions}
          value={history.officialPosition}
          onChange={(value) => updateHistory("officialPosition", value)}
          className="w-1/2"
        />
      </div>
    </div>
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex items-center justify-start gap-2 w-2/5">
        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
          給与
        </span>
      </div>
      <div className="flex items-center justify-start gap-2 w-full lg:text-base md:text-sm text-xs">
        <Select
          placeholder="形態"
          options={PayTypeOptions}
          value={history.payType}
          onChange={(value) => updateHistory("payType", value)}
          className="w-1/2"
        />
        <Input
          placeholder=""
          value={history.amount}
          onChange={(e) => updateHistory("amount", e.target.value)}
          className="w-1/4"
        />
        円
      </div>
    </div>
  </div>
);

export default WorkHistory;

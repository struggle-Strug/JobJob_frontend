import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDateOptions } from "../../../../utils/date";
import { Checkbox, Input, message, Select } from "antd";
import axios from "axios";

const WorkHistoryEdit = ({ rireki }) => {
  const [workHistories, setWorkHistories] = useState([
    {
      companyName: "",
      notes: [],
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      endStatus: "",
      resignationReason: "",
    },
  ]);

  const navigate = useNavigate();

  const { yearsOptions, monthsOptions } = getDateOptions();

  const endStatusOptions = [
    { value: "選択する", label: "" },
    { value: "退職", label: "退職" },
    { value: "退職予定", label: "退職予定" },
  ];

  const resignationReasonOptions = [
    { value: "選択する", label: "" },
    { value: "一身上の都合により", label: "一身上の都合により" },
    { value: "会社都合により", label: "会社都合により" },
  ];

  const validateWorkHistory = (history) => {
    const requiredFields = ["companyName"];

    for (let field of requiredFields) {
      if (!history[field]) {
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
      return;
    }
    setWorkHistories([
      ...workHistories,
      {
        companyName: "",
        notes: [""],
        startYear: "",
        startMonth: "",
        endYear: "",
        endMonth: "",
        endStatus: "",
        resignationReason: "",
      },
    ]);
  };

  const handleDeleteWorkHistory = (index) => {
    const newWorkHistories = workHistories.filter((_, i) => i !== index);
    setWorkHistories(newWorkHistories);
  };

  const handleSave = async () => {
    let workDatas = [];
    if (workHistories.length === 0) {
      const resData = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/rireki/update/work_history/${rireki._id}`,
        workDatas
      );
      if (resData.data.error) return message.error(resData.data.message);
      message.success(resData.data.message);
      navigate(`/members/resumes/rireki/detail/${rireki._id}`);
      return;
    }
    const lastHistory = workHistories[workHistories.length - 1];
    if (!validateWorkHistory(lastHistory).status)
      return message.error("すべてのフィールドに入力してください。");
    workDatas = workHistories.map((workHistory) => ({
      companyName: workHistory.companyName,
      notes: workHistory.notes,
      startDate: `${workHistory.startYear}-${workHistory.startMonth}`,
      endDate: `${workHistory.endYear}-${workHistory.endMonth}`,
      endStatus: workHistory.endStatus,
      resignationReason: workHistory.resignationReason,
    }));
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/rireki/update/work_history/${rireki._id}`,
      workDatas
    );
    if (res.data.error) return message.error(res.data.message);
    message.success(res.data.message);
    navigate(`/members/resumes/rireki/detail/${rireki._id}`);
  };

  useEffect(() => {
    setWorkHistories(
      rireki?.workhistory?.length > 0
        ? rireki?.workhistory?.map((workHistory) => ({
            companyName: workHistory.companyName,
            notes: workHistory.notes,
            startYear: workHistory.startDate.split("-")[0],
            startMonth: workHistory.startDate.split("-")[1],
            endYear: workHistory.endDate.split("-")[0],
            endMonth: workHistory.endDate.split("-")[1],
            endStatus: workHistory.endStatus,
            resignationReason: workHistory.resignationReason,
          }))
        : [
            {
              companyName: "",
              notes: [""],
              startYear: "",
              startMonth: "",
              endYear: "",
              endMonth: "",
              endStatus: "",
              resignationReason: "",
            },
          ]
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            職歴
          </p>
          <p className="lg:text-base md:text-sm text-xs text-[#343434]">
            履歴書には入職年月の古い順で自動で並び変えられます
          </p>
          <div className="flex items-center justify-between w-full mt-2">
            <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
        {workHistories.map((workHistory, index) => {
          return (
            <>
              <WorkHistoryEditEntry
                key={index}
                workHistory={workHistory}
                workHistories={workHistories}
                setWorkHistories={setWorkHistories}
                index={index}
                updateWorkHistory={(field, value) => {
                  const newWorkHistories = [...workHistories];
                  newWorkHistories[index][field] = value;
                  setWorkHistories(newWorkHistories);
                }}
                handleDeleteWorkHistory={handleDeleteWorkHistory}
                yearsOptions={yearsOptions}
                monthsOptions={monthsOptions}
                endStatusOptions={endStatusOptions}
                resignationReasonOptions={resignationReasonOptions}
              />
            </>
          );
        })}
        <div className="flex items-start justify-center w-full mt-6">
          <div className="flex items-center justify-start gap-2 w-2/5">
            <span className="lg:text-base md:text-sm text-xs text-[#343434]"></span>
          </div>
          <div className="flex items-start justify-start gap-2 w-3/5 desire"></div>
        </div>
        <div className="flex items-start justify-center w-full mt-6">
          <div className="flex items-center justify-start gap-2 w-2/5">
            <span className="lg:text-base md:text-sm text-xs text-[#343434]"></span>
          </div>
          <div className="flex items-start justify-start gap-2 w-3/5 desire">
            {
              <Checkbox
                onChange={() =>
                  setWorkHistories([
                    {
                      companyName: "",
                      notes: [""],
                      startYear: "",
                      startMonth: "",
                      endYear: "",
                      endMonth: "",
                      endStatus: "",
                      resignationReason: "",
                    },
                  ])
                }
                className="lg:text-base md:text-sm text-xs text-[#343434]"
              >
                職歴を記載しない
              </Checkbox>
            }
          </div>
        </div>
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
    </>
  );
};

const WorkHistoryEditEntry = ({
  workHistory,
  workHistories,
  setWorkHistories,
  index,
  updateWorkHistory,
  yearsOptions,
  monthsOptions,
  endStatusOptions,
  resignationReasonOptions,
  handleDeleteWorkHistory,
}) => {
  return (
    <div className="flex flex-col items-start justify-start w-full mt-2">
      <div className="flex items-center justify-between w-full">
        <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
          経歴<span className="number">{index + 1}</span>
        </p>
        <button
          onClick={() => handleDeleteWorkHistory(index)}
          className="text-[#FF2A3B] lg:text-sm md:text-xs text-xs hover:underline"
        >
          この職歴を削除する
        </button>
      </div>
      <div className="flex items-start justify-center w-full mt-2">
        <div className="flex items-center justify-start gap-2 w-2/5">
          <span className="lg:text-base md:text-sm text-xs text-[#343434]">
            勤務先名
          </span>
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-3/5">
          <Input
            placeholder="勤務先名"
            value={workHistory?.companyName}
            onChange={(e) => {
              updateWorkHistory("companyName", e.target.value);
            }}
            className="p-2"
          />
        </div>
      </div>
      <div className="flex items-start justify-center w-full mt-4">
        <div className="flex items-center justify-start gap-2 w-2/5">
          <span className="lg:text-base md:text-sm text-xs text-[#343434]">
            備考欄
          </span>
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-3/5">
          <p className="lg:text-sm md:text-xs text-xs text-[#343434]">
            異動などの記載は、備考欄を使用してください
          </p>
          {workHistory?.notes?.map((note, noteIndex) => {
            return (
              <>
                <div key={noteIndex}>
                  <Input
                    placeholder="備考欄"
                    value={note}
                    onChange={(e) => {
                      const newWorkHistories = [...workHistories];
                      newWorkHistories[index].notes[noteIndex] = e.target.value;
                      setWorkHistories(newWorkHistories);
                    }}
                    className="p-2"
                  />
                  <button
                    onClick={() => {
                      const newWorkHistories = [...workHistories];
                      newWorkHistories[index].notes = workHistory.notes.filter(
                        (_, i) => i !== noteIndex
                      );
                      setWorkHistories(newWorkHistories);
                    }}
                    className="text-[#FF2A3B] lg:text-sm md:text-xs text-xs hover:underline whitespace-nowrap"
                  >
                    この備考欄を削除する
                  </button>
                </div>
              </>
            );
          })}
          <button
            className="lg:text-sm md:text-xs text-xs text-[#343434] p-1 bg-[#e7e7e7] rounded-lg hover:text-white hover:bg-[#343434] duration-300"
            onClick={() => {
              const newWorkHistories = [...workHistories];
              newWorkHistories[index].notes = [...workHistory.notes, ""];
              setWorkHistories(newWorkHistories);
            }}
          >
            備考欄を一行追加する
          </button>
        </div>
      </div>
      <div className="flex items-start justify-center w-full mt-6">
        <div className="flex items-center justify-start gap-2 w-2/5">
          <span className="lg:text-base md:text-sm text-xs text-[#343434]">
            勤務開始年月
          </span>
        </div>
        <div className="flex items-start justify-start gap-2 w-3/5">
          <Select
            options={yearsOptions}
            value={workHistory?.startYear}
            onChange={(value) => {
              updateWorkHistory("startYear", value);
            }}
            className="w-1/3"
          />
          <Select
            options={monthsOptions}
            value={workHistory?.startMonth}
            onChange={(value) => {
              updateWorkHistory("startMonth", value);
            }}
            className="w-1/3"
          />
        </div>
      </div>
      <div className="flex items-start justify-center w-full mt-6">
        <div className="flex items-center justify-start gap-2 w-2/5">
          <span className="lg:text-base md:text-sm text-xs text-[#343434]">
            勤務終了年月
          </span>
        </div>
        <div className="flex items-start justify-start gap-2 w-3/5">
          <Select
            options={yearsOptions}
            value={workHistory?.endYear}
            onChange={(value) => {
              updateWorkHistory("endYear", value);
            }}
            className="w-1/3"
          />
          <Select
            options={monthsOptions}
            value={workHistory?.endMonth}
            onChange={(value) => {
              updateWorkHistory("endMonth", value);
            }}
            className="w-1/3"
          />
          <Select
            options={endStatusOptions}
            value={workHistory?.endStatus}
            onChange={(value) => {
              updateWorkHistory("endStatus", value);
            }}
            className="w-1/3"
          />
        </div>
      </div>
      <div className="flex items-start justify-center w-full mt-6">
        <div className="flex items-center justify-start gap-2 w-2/5">
          <span className="lg:text-base md:text-sm text-xs text-[#343434]">
            退職理由
          </span>
        </div>
        <div className="flex items-start justify-start gap-2 w-3/5">
          <Select
            options={resignationReasonOptions}
            value={workHistory?.resignationReason}
            onChange={(value) => {
              updateWorkHistory("resignationReason", value);
            }}
            className="w-2/3"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryEdit;

import { message, Select } from "antd";
import { useEffect, useState } from "react";
import { getDateOptions } from "../../../../utils/date";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DateEdit = ({ rireki }) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const navigate = useNavigate();

  const { yearsOptions, monthsOptions, daysOptions } = getDateOptions();

  const handleSave = async () => {
    const creationDate = `${year}-${month}-${day}`;
    const resData = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/rireki/update/date/${rireki?._id}`,
      { creationDate }
    );
    if (resData.data.error) return message.error(resData.data.message);
    message.success(resData.data.message);
    navigate(`/members/resumes/rireki/detail/${rireki?._id}`);
  };

  useEffect(() => {
    setYear(rireki?.creationDate.split("-")[0]);
    setMonth(rireki?.creationDate.split("-")[1]);
    setDay(rireki?.creationDate.split("-")[2]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
        <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
          履歴書の作成日
        </p>
        <div className="flex items-center justify-between w-full mt-2">
          <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
        <div className="flex items-start justify-center w-full mt-2">
          <div className="flex items-center justify-start gap-2 w-1/3">
            <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
              履歴書の作成日
            </span>
          </div>
          <div className="flex items-start justify-start gap-2 w-2/3 textarea">
            <Select
              options={yearsOptions}
              className="w-1/3"
              value={year}
              onChange={(value) => setYear(value)}
            />
            <Select
              options={monthsOptions}
              className="w-1/3"
              value={month}
              onChange={(value) => setMonth(value)}
            />
            <Select
              options={daysOptions}
              className="w-1/3"
              value={day}
              onChange={(value) => setDay(value)}
            />
          </div>
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
  );
};

export default DateEdit;

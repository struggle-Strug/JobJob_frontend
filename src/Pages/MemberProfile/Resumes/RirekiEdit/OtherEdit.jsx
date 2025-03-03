import { Input, message, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OtherEdit = ({ rireki }) => {
  const [other, setOther] = useState({
    time: "",
    dependents: "",
    spouse: "",
  });

  const navigate = useNavigate();

  const spouseOptions = [
    { label: "有り", value: "有り" },
    { label: "無し", value: "無し" },
  ];

  const handleSave = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/rireki/update/other/${rireki?._id}`,
      other
    );
    if (res.data.error) return message.error(res.data.message);
    message.success(res.data.message);
    navigate(`/members/resumes/rireki/detail/${rireki?._id}`);
  };

  useEffect(() => {
    setOther({
      time: rireki?.other?.time,
      dependents: rireki?.other?.dependents,
      spouse: rireki?.other?.spouse,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
        <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
          その他
        </p>
        <div className="flex items-center justify-between w-full mt-2">
          <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
        <div className="flex items-start justify-center w-full mt-2">
          <div className="flex items-center justify-start gap-2 w-2/5">
            <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
              通勤時間
            </span>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-3/5">
            <Input
              placeholder="徒歩15分＋電車20分"
              value={other.time}
              onChange={(e) => setOther({ ...other, time: e.target.value })}
              className="w-2/3"
            />
            <p className="lg:text-sm md:text-xs text-xs text-[#343434]">
              ※片道最短ルートの所要時間を5分単位で書きましょう
            </p>
          </div>
        </div>
        <div className="flex items-start justify-center w-full mt-4">
          <div className="flex items-center justify-start gap-2 w-2/5">
            <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
              扶養家族数(配偶者を除く)
            </span>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 w-3/5">
            <div className="flex items-center justify-start gap-2 w-full">
              <Input
                placeholder="扶養家族数(配偶者を除く)"
                value={other.dependents}
                onChange={(e) =>
                  setOther({ ...other, dependents: e.target.value })
                }
                className="w-1/3"
              />
              <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                人
              </span>
            </div>
            <p className="lg:text-sm md:text-xs text-xs text-[#343434]">
              ※扶養義務のある家族がいなければ、0と入力してください
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <div className="flex items-center justify-start gap-2 w-2/5">
            <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
              配偶者
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 w-3/5">
            <Select
              options={spouseOptions}
              value={other.spouse}
              onChange={(value) => setOther({ ...other, spouse: value })}
              className="w-1/3"
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

export default OtherEdit;

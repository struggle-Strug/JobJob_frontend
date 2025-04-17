import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const MyPage = () => {
  useEffect(() => {
    document.title = "マイページ | JobJob (ジョブジョブ)";
  }, []);
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center justify-start w-full bg-white rounded-lg p-4 shadow-xl">
          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            マイページ
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 w-full bg-white rounded-lg py-4 px-8 mt-4 shadow-xl">
          <div className="flex flex-col w-1/2">
            <p className="lg:text-lg md:text-base text-sm font-bold text-[#FF2A3B]">
              ご希望の求人を探してみましょう！
            </p>
            <p className="lg:text-[1rem] md:text-[0.8rem] text-[#343434] mt-2">
              思いつくキーワードで求人を検索してみましょう
            </p>
          </div>
          <div className="flex items-center justify-center w-1/2">
            <Input
              placeholder="例: 市区町村 診療科目 特徴など"
              className="px-4 py-2 lg:text-[1rem] md:text-[0.8rem] text-sm"
              suffix={<SearchOutlined style={{ color: "#FF2A3B" }} />}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 w-full bg-white rounded-lg py-4 px-4 mt-4 shadow-xl">
          <p className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">
            新着求人メール
          </p>
          <button className="text-center lg:text-sm md:text-xs text-xs bg-gray-200 hover:bg-gray-100 text-[#FF2A3B] p-1 rounded-lg">
            もっと見る
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPage;

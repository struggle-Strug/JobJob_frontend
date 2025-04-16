import { useEffect } from "react";
import { Link } from "react-router-dom";

const CLTop = () => {
  useEffect(() => {
    document.title = "採用管理トップ | JobJob (ジョブジョブ)";
  }, []);
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col items-start justify-start gap-4 w-full bg-white rounded-lg py-4 px-8 shadow-xl">
        <div className="flex flex-col items-start justify-start gap-2 border-b-[1px] border-[#e7e7e7] py-3">
          <p className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">
            カンタン3ステップで採用！（無料）
          </p>
          <img
            src="/assets/images/CLTop/カンタン3ステップ.jpg"
            alt="カンタン3ステップ"
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-2 border-b-[1px] border-[#e7e7e7] py-3">
          <p className="lg:text-xl md:text-lg text-base font-bold text-[#5d9eff]">
            リンク掲載のお願い
          </p>
          <p className="lg:text-base md:text-sm text-xs text-[#343434]">
            ジョブジョブでは、求人情報がよりたくさんの人の目に触れてほしいという思いから、皆さまへリンク掲載をお願いしています。医院や施設のホームページ・個人のブログなど問いませんので、是非ご協力ください
          </p>
        </div>
        <div className="flex items-start justify-start gap-4 border-b-[1px] border-[#e7e7e7] w-full py-3">
          <Link
            to={"/contact"}
            className="lg:text-base md:text-sm text-xs text-[#5d9eff] hover:underline hover:text-[#ff5a5f] duration-300"
          >
            お問い合わせ
          </Link>
          <Link
            to={"/customers/rule"}
            className="lg:text-base md:text-sm text-xs text-[#5d9eff] hover:underline hover:text-[#ff5a5f] duration-300"
          >
            利用規約
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CLTop;

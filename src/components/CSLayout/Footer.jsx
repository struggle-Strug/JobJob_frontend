import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#EFEFEF] w-full h-auto flex items-center px-4">
        <div className="flex flex-col justify-center container py-8 lg:py-12">
          <Link to={"/"} className="w-1/2 sm:w-1/3 lg:w-1/6">
            <img
              src={"/assets/images/header/jobjob_logo 1.png"}
              alt="logo"
              className="hover:scale-105 duration-300"
            />
          </Link>
          <p className="text-sm lg:text-lg mt-4 lg:mt-8 text-[#999999]">
            医療、介護、保育の求人を多数掲載中。ご希望の勤務地・職種や、正社員・アルバイト・パートなどの雇用形態、また年収・時給・月給や様々な特徴であなたに最適な求人を探すことができます。ジョブジョブはあなたにピッタリな求人探しを徹底サポート。
          </p>
          <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-8 lg:gap-4">
            <div className="sm:col-span-1 lg:col-span-2">
              <div className="flex flex-col justify-start">
                <p className="text-base lg:text-lg font-bold">JobJobについて</p>
                <p className="text-sm lg:text-lg py-2"></p>
                <p className="text-sm lg:text-lg py-1">ご利用規約</p>
                <p className="text-sm lg:text-lg py-1">転職ノウハウ</p>
                <p className="text-sm lg:text-lg py-1">運営会社情報</p>
              </div>
            </div>
            <div className="sm:col-span-1 lg:col-span-5">
              <div className="flex flex-col justify-start">
                <p className="text-base lg:text-lg font-bold">採用担当者様へ</p>
                <Link to={"/company"}>
                  <p className="text-sm lg:text-lg mt-2 lg:mt-4 py-1 hover:text-[#ff2A3B] duration-300">
                    求人掲載をお考えの企業様
                  </p>
                </Link>
                <p className="text-sm lg:text-lg py-1">リンク掲載について</p>
                <Link
                  to={"/customers/sign_in"}
                  className="text-sm lg:text-lg py-1 hover:text-[#ff2A3B] duration-300"
                >
                  採用担当者ログイン
                </Link>
              </div>
            </div>
            <div className="sm:col-span-1 lg:col-span-3">
              <div className="flex flex-col justify-start">
                <p className="text-base lg:text-lg font-bold">お困りの方</p>
                <p className="text-sm lg:text-lg py-2"></p>
                <div className="mt-2 lg:mt-4 ">
                  <span className="text-sm lg:text-lg text-[#FF2A3B] font-bold border-2 border-[#FF2A3B] rounded-lg p-2">
                    各種ご相談・お問い合わせ窓口
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs lg:text-sm mt-6 lg:mt-8 text-[#999999]">
            Copyright 2024 JobJob
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

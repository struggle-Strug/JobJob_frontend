import React from "react";
import { useEffect } from "react";

const Coporate = () => {
  useEffect(() => {
    document.title = "運営会社情報 | JobJob (ジョブジョブ)";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="bg-[#EFEFEF]">
        <div className="max-w-[1000px] mx-auto bg-white shadow-lg py-4 px-8 rounded-lg">
          <h1 className="lg:text-lg md:text-sm text-[#343434] font-bold">
            運営会社情報
          </h1>
          <div className="p-2">
            <h2 className="lg:text-base md:text-sm text-[#343434] font-bold mt-4">
              JobJobが目指すもの
            </h2>
            <p className="lg:text-sm text-xs text-[#343434] mt-2">
              医療や福祉の現場をなんとかしたい。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] mt-2">
              そのために人材採用が重要であると考えます。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] mt-2">
              最適な人材をコストをかけずに採用できる。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] mt-2">
              そんな世界を実現するためにJobJobは進化し続けます。
            </p>
          </div>
          <h1 className="lg:text-lg md:text-sm text-[#343434] font-bold mt-4">
            会社概要
          </h1>
          <div className="p-2">
            <div className="flex justify-start w-full">
              <p className="lg:text-base md:text-sm text-[#343434] font-bold mt-2 w-1/5">
                社名
              </p>
              <p className="lg:text-base md:text-sm text-[#343434] mt-2 w-4/5">
                JobJob合同会社
              </p>
            </div>
            <div className="flex justify-start w-full">
              <p className="lg:text-base md:text-sm text-[#343434] font-bold mt-4 w-1/5">
                所在地
              </p>
              <div className="flex flex-col items-start mt-4 w-4/5">
                <p className="lg:text-base md:text-sm text-[#343434]">
                  〒104-0061
                </p>
                <p className="lg:text-base md:text-sm text-[#343434]">
                  東京都中央区銀座1丁目12番4号N&EBLD.6F
                </p>
              </div>
            </div>
            <div className="flex justify-start w-full">
              <p className="lg:text-base md:text-sm text-[#343434] font-bold mt-4 w-1/5">
                社名
              </p>
              <p className="lg:text-base md:text-sm text-[#343434] mt-4 w-4/5">
                JobJob合同会社
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coporate;

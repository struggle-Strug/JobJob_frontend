import { Input, Radio, Select } from "antd";
import { useState } from "react";
import { Prefectures } from "../../../../utils/constants/categories";
import { Municipalities } from "../../../../utils/constants/categories/municipalities";

const Step3 = ({
  setPrefecture,
  prefecture,
  setPostalCode,
  setMunicipalities,
  setVillage,
  setBuilding,
}) => {
  const [togglePrefecture_1, setTogglePrefecture_1] = useState(false);
  const [togglePrefecture_2, setTogglePrefecture_2] = useState(false);
  const [togglePrefecture_3, setTogglePrefecture_3] = useState(false);
  const [togglePrefecture_4, setTogglePrefecture_4] = useState(false);
  const [togglePrefecture_5, setTogglePrefecture_5] = useState(false);
  const [togglePrefecture_6, setTogglePrefecture_6] = useState(false);
  const [togglePrefecture_7, setTogglePrefecture_7] = useState(false);

  const prefectureKeys_1 = Object.keys(Prefectures.KANTO);
  const prefectureKeys_2 = Object.keys(Prefectures.KANSAI);
  const prefectureKeys_3 = Object.keys(Prefectures.TOKAI);
  const prefectureKeys_4 = Object.keys(Prefectures.HOKKAIDO_TOHOKU);
  const prefectureKeys_5 = Object.keys(Prefectures.KOSHINETSU_HOKURIKU);
  const prefectureKeys_6 = Object.keys(Prefectures.CHUGOKU_SHIKOKU);
  const prefectureKeys_7 = Object.keys(Prefectures.KYUSHU_OKINAWA);

  const prefectureOptions_1 = prefectureKeys_1.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const prefectureOptions_2 = prefectureKeys_2.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const prefectureOptions_3 = prefectureKeys_3.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const prefectureOptions_4 = prefectureKeys_4.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const prefectureOptions_5 = prefectureKeys_5.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const prefectureOptions_6 = prefectureKeys_6.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const prefectureOptions_7 = prefectureKeys_7.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  const cityOptions = (prefecture) => {
    return [
      {
        label: "選択する",
        value: "",
      },
      ...Municipalities[prefecture].map((type) => ({
        value: type,
        label: type,
      })),
    ];
  };

  const onChange = async (value) => {
    setPrefecture(value.target.value);
  };

  return (
    <>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>郵便番号</p>
        </div>
        <div className="flex flex-col w-4/5">
          <Input
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-1/3"
          />
        </div>
      </div>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>都道府県</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5">
          <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
              <p
                className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
                onClick={() => setTogglePrefecture_1(!togglePrefecture_1)}
              >
                <p>関東</p>
                <img
                  src={"/assets/images/companytop/ep_arrow-right_red.png"}
                  alt="arrow"
                  className={`duration-300 ${
                    !togglePrefecture_1 ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </p>
            </div>
            <div
              className={`duration-300 overflow-hidden ${
                togglePrefecture_1
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4">
                <Radio.Group
                  options={prefectureOptions_1}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
              <p
                className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
                onClick={() => setTogglePrefecture_2(!togglePrefecture_2)}
              >
                <p>関西</p>
                <img
                  src={"/assets/images/companytop/ep_arrow-right_red.png"}
                  alt="arrow"
                  className={`duration-300 ${
                    !togglePrefecture_2 ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </p>
            </div>
            <div
              className={`duration-300 overflow-hidden ${
                togglePrefecture_2
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4">
                <Radio.Group
                  options={prefectureOptions_2}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
              <p
                className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
                onClick={() => setTogglePrefecture_3(!togglePrefecture_3)}
              >
                <p>東海</p>
                <img
                  src={"/assets/images/companytop/ep_arrow-right_red.png"}
                  alt="arrow"
                  className={`duration-300 ${
                    !togglePrefecture_3 ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </p>
            </div>
            <div
              className={`duration-300 overflow-hidden ${
                togglePrefecture_3
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4">
                <Radio.Group
                  options={prefectureOptions_3}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
              <p
                className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
                onClick={() => setTogglePrefecture_4(!togglePrefecture_4)}
              >
                <p>北海道・東北</p>
                <img
                  src={"/assets/images/companytop/ep_arrow-right_red.png"}
                  alt="arrow"
                  className={`duration-300 ${
                    !togglePrefecture_4 ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </p>
            </div>
            <div
              className={`duration-300 overflow-hidden ${
                togglePrefecture_4
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4">
                <Radio.Group
                  options={prefectureOptions_4}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
              <p
                className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
                onClick={() => setTogglePrefecture_5(!togglePrefecture_5)}
              >
                <p>甲信越・北陸</p>
                <img
                  src={"/assets/images/companytop/ep_arrow-right_red.png"}
                  alt="arrow"
                  className={`duration-300 ${
                    !togglePrefecture_5 ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </p>
            </div>
            <div
              className={`duration-300 overflow-hidden ${
                togglePrefecture_5
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4">
                <Radio.Group
                  options={prefectureOptions_5}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
              <p
                className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
                onClick={() => setTogglePrefecture_6(!togglePrefecture_6)}
              >
                <p>中国・四国</p>
                <img
                  src={"/assets/images/companytop/ep_arrow-right_red.png"}
                  alt="arrow"
                  className={`duration-300 ${
                    !togglePrefecture_6 ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </p>
            </div>
            <div
              className={`duration-300 overflow-hidden ${
                togglePrefecture_6
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4">
                <Radio.Group
                  options={prefectureOptions_6}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t-[0.1rem] border-b-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
              <p
                className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
                onClick={() => setTogglePrefecture_7(!togglePrefecture_7)}
              >
                <p>九州・沖縄</p>
                <img
                  src={"/assets/images/companytop/ep_arrow-right_red.png"}
                  alt="arrow"
                  className={`duration-300 ${
                    !togglePrefecture_7 ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </p>
            </div>
            <div
              className={`duration-300 overflow-hidden ${
                togglePrefecture_7
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4">
                <Radio.Group
                  options={prefectureOptions_7}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {prefecture !== "" && (
        <div className="flex justify-between w-full mt-12">
          <div className="flex items-start gap-2 justify-end">
            <p>市区町村</p>
            <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
          </div>
          <div className="flex flex-col w-4/5">
            <Select
              options={cityOptions(prefecture)}
              onChange={(e) => setMunicipalities(e)}
              className="w-1/4"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>町名・番地</p>
        </div>
        <div className="flex flex-col w-4/5">
          <Input
            onChange={(e) => setVillage(e.target.value)}
            className="w-1/3"
          />
        </div>
      </div>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>建物名</p>
        </div>
        <div className="flex flex-col w-4/5">
          <Input
            onChange={(e) => setBuilding(e.target.value)}
            className="w-1/3"
          />
        </div>
      </div>
    </>
  );
};

export default Step3;

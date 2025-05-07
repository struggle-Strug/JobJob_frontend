import React, { useState, useEffect } from "react";
import { Input, Radio, Select } from "antd";
import axios from "axios";
import { Prefectures } from "../../../../utils/constants/categories";
import { Municipalities } from "../../../../utils/constants/categories/municipalities";

const Step3 = ({
  postalCode,
  setPostalCode,
  prefecture,
  setPrefecture,
  municipalities,
  setMunicipalities,
  village,
  setVillage,
  building,
  setBuilding,
}) => {
  // ローカルな郵便番号バッファ
  const [localPostalCode, setLocalPostalCode] = useState(postalCode || "");
  // 都道府県グループの開閉状態
  const [toggles, setToggles] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  // 7桁になったら自動検索
  useEffect(() => {
    const code = localPostalCode.trim();
    if (/^\d{7}$/.test(code)) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/v1/user/zipsearch`, {
          zipcode: code,
        })
        .then((res) => {
          const result = res.data?.results?.[0];
          if (!result) return;

          // 親 state を更新
          setPostalCode(code);
          setPrefecture(result.address1);
          setMunicipalities(result.address2);
          setVillage(prev => prev || result.address3);

          // 自動で該当グループを開く
          const regionIndex = Object.entries({
            1: Prefectures.KANTO,
            2: Prefectures.KANSAI,
            3: Prefectures.TOKAI,
            4: Prefectures.HOKKAIDO_TOHOKU,
            5: Prefectures.KOSHINETSU_HOKURIKU,
            6: Prefectures.CHUGOKU_SHIKOKU,
            7: Prefectures.KYUSHU_OKINAWA,
          }).find(([idx, grp]) =>
            Object.keys(grp).includes(result.address1)
          )?.[0];
          if (regionIndex) {
            setToggles((prev) => ({ ...prev, [regionIndex]: true }));
          }
        })
        .catch((err) => {
          console.error("郵便番号検索エラー:", err);
        });
    }
  }, [localPostalCode, setPostalCode, setPrefecture, setMunicipalities, setVillage]);

  // 地域ごとのグループ定義
  const groups = [
    { idx: 1, label: "関東", data: Prefectures.KANTO },
    { idx: 2, label: "関西", data: Prefectures.KANSAI },
    { idx: 3, label: "東海", data: Prefectures.TOKAI },
    { idx: 4, label: "北海道・東北", data: Prefectures.HOKKAIDO_TOHOKU },
    { idx: 5, label: "甲信越・北陸", data: Prefectures.KOSHINETSU_HOKURIKU },
    { idx: 6, label: "中国・四国", data: Prefectures.CHUGOKU_SHIKOKU },
    { idx: 7, label: "九州・沖縄", data: Prefectures.KYUSHU_OKINAWA },
  ];

  // 市区町村セレクト用オプション生成
  const cityOptions = (pref) => [
    { label: "選択する", value: "" },
    ...(Municipalities[pref] || []).map((m) => ({ label: m, value: m })),
  ];

  return (
    <>
      {/* 郵便番号 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>郵便番号</p>
        </div>
        <div className="flex flex-col w-4/5">
          <Input
            className="w-1/3"
            placeholder="ハイフンなし 例:1000001"
            value={localPostalCode}
            onChange={(e) => {
              setLocalPostalCode(e.target.value);
            }}
          />
          <p className="text-sm text-gray-500">※7桁入力で自動検索</p>
        </div>
      </div>

      {/* 都道府県ラジオグループ */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>都道府県</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5">
          {groups.map(({ idx, label, data }) => {
            const options = Object.keys(data).map((k) => ({ label: k, value: k }));
            const isOpen = toggles[idx] || Object.keys(data).includes(prefecture);
            return (
              <div
                key={idx}
                className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2"
              >
                <div
                  className="w-full flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setToggles((p) => ({ ...p, [idx]: !p[idx] }))
                  }
                >
                  <p className="text-lg text-[#FF2A3B]">{label}</p>
                  <img
                    src="/assets/images/companytop/ep_arrow-right_red.png"
                    alt="arrow"
                    className={`duration-300 ${
                      isOpen ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </div>
                <div
                  className={`duration-300 overflow-hidden ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-4">
                    <Radio.Group
                      options={options}
                      onChange={(e) => setPrefecture(e.target.value)}
                      value={prefecture}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 市区町村 */}
      {prefecture && (
        <div className="flex justify-between w-full mt-12">
          <div className="flex items-start gap-2 justify-end">
            <p>市区町村</p>
            <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
          </div>
          <div className="flex flex-col w-4/5">
            <Select
              className="w-1/4"
              options={cityOptions(prefecture)}
              value={municipalities}
              onChange={setMunicipalities}
            />
          </div>
        </div>
      )}

      {/* 町名・番地 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>町名・番地</p>
        </div>
        <div className="flex flex-col w-4/5">
          <Input
            className="w-1/3"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />
        </div>
      </div>

      {/* 建物名 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>建物名</p>
        </div>
        <div className="flex flex-col w-4/5">
          <Input
            className="w-1/3"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Step3;

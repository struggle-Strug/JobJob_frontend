// src/components/Register/Step4.jsx

import React from "react";
import { Checkbox } from "antd";
import { Facilities, Paysystems } from "../../../../utils/constants/categories";

const Step4 = ({
  facilityType,
  setFacilityType,
  paymentMethod,
  setPaymentMethod,
}) => {
  const facilityKeys = Object.keys(Facilities);
  const paysystemsKeys = Object.keys(Paysystems);

  // Checkbox.Group 用の options
  const facilityOptions = facilityKeys.map((key) => ({
    label: key,
    value: key,
  }));
  const paysystemsOptions = paysystemsKeys.map((key) => ({
    label: key,
    value: key,
  }));

  return (
    <>
      {/* 施設ジャンル */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>施設ジャンル</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5 px-2">
          <Checkbox.Group
            options={facilityOptions}
            value={facilityType}       // ← 親の state をバインド
            onChange={setFacilityType} // ← 直接親の setter を呼び出し
          />
        </div>
      </div>

      {/* 給与体系 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>給与体系</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5 px-2">
          <Checkbox.Group
            options={paysystemsOptions}
            value={paymentMethod}      // ← 親の state をバインド
            onChange={setPaymentMethod}// ← 直接親の setter を呼び出し
          />
        </div>
      </div>
    </>
  );
};

export default Step4;

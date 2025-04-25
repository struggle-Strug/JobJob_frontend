// src/components/Register/Step2.jsx

import React from "react";
import { Radio, Checkbox } from "antd";
import { EmploymentType } from "../../../../utils/constants/categories";

const Step2 = ({
  employmentType,
  setEmploymentType,
  currentStatus,
  setCurrentStatus,
  setErrorMessage,
}) => {
  // EmploymentType 定義からキー一覧を取得
  const employmentKeys = Object.keys(EmploymentType);
  const employmentOptions = employmentKeys.map((key) => ({
    label: key,
    value: key,
  }));

  // 親コンポーネントの state を直接更新
  const onChangeEmployment = (values) => {
    setEmploymentType(values);
  };

  const renderCheckboxGroup = (
    options,
    onChange,
    selectedValues,
    category = null
  ) => (
    <Checkbox.Group
      options={options}
      value={selectedValues}
      onChange={(values) => onChange(values, category)}
    />
  );

  return (
    <>
      {/* 雇用形態 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>希望勤務形態</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5">
          <div className="flex flex-col border-[#a7a3a3] px-2">
            <div className={`duration-300 overflow-hidden opacity-100`}>
              <div>
                {renderCheckboxGroup(
                  employmentOptions,
                  onChangeEmployment,
                  employmentType
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 現在の就業状況 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>現在の就業状況</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5">
          <Radio.Group
            onChange={(e) => setCurrentStatus(e.target.value)}
            value={currentStatus}      // ← 現在の選択を反映
          >
            <Radio value="就業中">就業中</Radio>
            <Radio value="離職中">離職中</Radio>
            <Radio value="在学中">在学中</Radio>
          </Radio.Group>
        </div>
      </div>
    </>
  );
};

export default Step2;

// src/components/Register/Step5.jsx

import React from "react";
import { Input, Radio, Select } from "antd";
import { getDateOptions } from "../../../../utils/date";

const Step5 = ({
  sei,
  setSei,
  mei,
  setMei,
  hiraganaSei,
  setHiraganaSei,
  hiraganaMei,
  setHiraganaMei,
  gender,
  setGender,
  year,
  setYear,
  month,
  setMonth,
  day,
  setDay,
}) => {
  const { yearsOptions, monthsOptions, daysOptions } = getDateOptions();

  return (
    <>
      {/* 氏名 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>氏名</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5 px-2">
          <div className="flex justify-start gap-8">
            <Input
              placeholder="姓"
              className="w-1/3 py-2"
              value={sei}
              onChange={(e) => setSei(e.target.value)}
            />
            <Input
              placeholder="名"
              className="w-1/3 py-2"
              value={mei}
              onChange={(e) => setMei(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ふりがな */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>ふりがな</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5 px-2">
          <div className="flex justify-start gap-8">
            <Input
              placeholder="せい"
              className="w-1/3 py-2"
              value={hiraganaSei}
              onChange={(e) => setHiraganaSei(e.target.value)}
            />
            <Input
              placeholder="めい"
              className="w-1/3 py-2"
              value={hiraganaMei}
              onChange={(e) => setHiraganaMei(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 性別 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>性別</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5 px-2">
          <Radio.Group
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <Radio value="女性">女性</Radio>
            <Radio value="男性">男性</Radio>
          </Radio.Group>
        </div>
      </div>

      {/* 生年月日 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>生年月日</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5 px-2">
          <div className="flex justify-start gap-4 lg:text-sm md:text-xs text-xs items-center">
          <select
              className="w-1/4 px-2 py-1 border rounded focus:outline-none"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">年</option>
              {yearsOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            年
            <select
              className="w-1/4 px-2 py-1 border rounded focus:outline-none"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">月</option>
              {monthsOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            月
            <select
              className="w-1/4 px-2 py-1 border rounded focus:outline-none"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">日</option>
              {daysOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            日
          </div>
        </div>
      </div>
    </>
  );
};

export default Step5;

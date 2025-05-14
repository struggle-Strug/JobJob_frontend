// src/components/Register/Step6.jsx

import React from "react";
import { Input } from "antd";

const Step6 = ({
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
}) => {
  return (
    <>
      {/* 電話番号 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p className="lg:text-lg md:text-base text-sm">電話番号</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-3/4 px-2">
          <Input
            placeholder="電話番号"
            className="w-1/2 py-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      {/* メールアドレス */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p className="lg:text-lg md:text-base text-sm">メールアドレス</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-3/4 px-2">
          <Input
            type="email"
            className="w-1/2 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* パスワード */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p className="lg:text-lg md:text-base text-sm">パスワード</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-3/4 px-2">
          <Input
            type="password"
            className="w-1/2 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* パスワード確認 */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p className="lg:text-lg md:text-base text-sm">パスワード(確認)</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-3/4 px-2">
          <Input
            type="password"
            className="w-1/2 py-2"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Step6;

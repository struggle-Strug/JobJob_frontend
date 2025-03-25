import { Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (newPassword !== newConfirmPassword) {
      return setMessage("パスワードが一致しません");
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/reset-password`,
        { token, newPassword }
      );
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/members/sign_in");
      }, 1000);
    } catch (error) {
      setMessage("エラーが発生しました");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#EFEFEF] px-4">
      <div className="container bg-white rounded-lg p-6 shadow-md">
        <p className="text-2xl font-bold">新しいパスワードを設定</p>
        <div className="mt-4">
          <p>新しいパスワード</p>
          <Input
            type="password"
            placeholder="新しいパスワード"
            className="mt-2 py-2 bg-[#F5F5F5]"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <p>新しいパスワード(確認)</p>
          <Input
            type="password"
            placeholder="確認用パスワード"
            className="mt-2 py-2 bg-[#F5F5F5]"
            onChange={(e) => setNewConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-[#FF2A3B] hover:bg-[#bc212e] duration-300 text-white py-2 px-4 rounded-lg mt-6"
          onClick={onSubmit}
        >
          更新
        </button>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;

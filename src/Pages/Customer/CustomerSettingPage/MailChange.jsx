import { useEffect } from "react";
import { Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

const MailChange = () => {
  const { customer } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmail = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/customers/email/${customer?._id}`,
      { email: email }
    );
    if (response.data.error) return message.error(response.data.message);
    localStorage.removeItem("token");
    message.success("メールアドレスを変更しました。");
    navigate("/customers/sign_in");
  };

  useEffect(() => {
    document.title = "メールアドレス変更";
  }, []);
  return (
    <>
      <div className="bg-white min-h-screen p-8 rounded-lg">
        <div
          className={`duration-300 w-1/2 overflow-hidden bg-[#f7f6f2] rounded-lg p-8`}
        >
          <p className="lg:text-sm text-xs text-[#343434] font-bold">
            現在のメールアドレス
            <span className="text-[#343434] font-normal">
              (ログイン時に使用するアドレス)
            </span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            {customer?.email}
          </p>
          <p className="lg:text-sm text-xs text-[#343434] font-medium pt-4">
            新しいメールアドレス
          </p>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 mt-2"
          />
          {email == customer?.email && (
            <p className="lg:text-sm text-xs text-[#FF2A3B] font-medium mt-1">
              登録済みのメールアドレスです
            </p>
          )}
          <div className="w-full flex justify-center items-center mt-8">
            <button
              onClick={handleEmail}
              className="lg:text-base md:text-sm text-xs bg-[#e22434] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
            >
              メールアドレスを変更する
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailChange;

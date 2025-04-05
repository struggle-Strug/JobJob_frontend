import { Input } from "antd";
import axios from "axios";
import { useState } from "react";

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/forgot-password-request`,
        { email }
      );
      setMessage(res.data.message);
    } catch (error) {
      // エラーオブジェクトの詳細をコンソールに出力
      if (error.response) {
        // サーバーからのレスポンスがある場合
        console.error("Error Response:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        console.error("Error Message:", error.message);
      } else if (error.request) {
        // リクエストが送信されたがレスポンスがない場合
        console.error("Error Request:", error.request);
      } else {
        // その他のエラー
        console.error("Error Message:", error.message);
      }
      console.error("Error Config:", error.config);
      setMessage("エラーが発生しました");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center bg-[#EFEFEF] px-4">
      <div className="container bg-white rounded-lg p-6 shadow-md">
        <p className="text-2xl font-bold">パスワードリセット用メール送信</p>
        <div className="mt-4">
          <p>メールアドレス</p>
          <Input
            type="email"
            placeholder="example@jobjob.com"
            className="mt-2 py-2 bg-[#F5F5F5]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="bg-[#FF2A3B] hover:bg-[#bc212e] duration-300 text-white py-2 px-4 rounded-lg mt-6"
          onClick={onSubmit}
        >
          送信
        </button>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordRequest;

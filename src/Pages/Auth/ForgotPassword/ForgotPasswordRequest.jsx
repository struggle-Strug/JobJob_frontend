import { Input } from "antd";
import axios from "axios";
import { useState } from "react";

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    const successMessage = `${email} 宛にパスワードの再設定のご案内メールを送信しました。
なお、しばらく経ってもメールが届かない場合は、以下の原因が考えられます。
・誤ったメールアドレスを入力している
・迷惑メールフォルダに振り分けられてしまっている
入力したメールアドレスが誤っている場合は、再度手続きをやり直してください。`;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/forgot-password-request`,
        { email }
      );
      // ユーザー有無にかかわらず常に同じメッセージを出す
      setMessage(successMessage);
    } catch (error) {
      console.error(error);
      // エラー時もセキュリティ的に同じ表示にする
      setMessage(successMessage);
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
        {message && (
          <div className="text-[#FF2A3B] mt-4 flex items-center w-full">
            <pre className="mx-auto">{message}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordRequest;

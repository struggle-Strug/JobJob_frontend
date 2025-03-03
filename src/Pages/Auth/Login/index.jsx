import { Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
const Login = () => {
  const { setIsAuthenticated, setUser, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    const payload = {
      email: email,
      password: password,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
      payload
    );
    if (res.data.error) return setErrorMessage(res.data.message);
    setErrorMessage(res.data.message);
    localStorage.setItem("token", res.data.token);
    setIsAuthenticated(true);
    await setUser(res.data.user);
    setTimeout(() => {
      window.location.href = "/members/mypage";
    }, 1000);
  };
  useEffect(() => {
    if (user) {
      window.location.href = "/members/mypage";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user]);
  return (
    <div className="flex flex-col justify-center bg-[#EFEFEF] px-4">
      <div className="container">
        <div className="flex items-center justify-between border-[1.5px] border-[#a7a3a3] rounded-lg p-4 bg-white px-8">
          <p className="text-2xl font-bold">ログイン</p>
          <div className="border-[1.5px] border-[#a7a3a3] rounded-lg px-4 py-2">
            <Link
              to={"/members/sign_up"}
              className="text-lg text-[#FF2A3B] hover:underline"
            >
              無料で会員登録する
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between mt-12 border-[1.5px] border-[#a7a3a3] rounded-lg p-4 bg-white px-8">
          <div className="flex flex-col w-4/5">
            <div className="flex flex-col px-2">
              <p>メールアドレス</p>
              <div className="duration-300 overflow-hidden mt-4">
                <div className="flex justify-start gap-4">
                  <Input
                    type="email"
                    placeholder="example@jobjob.com"
                    className="w-3/4 py-2 bg-[#F5F5F5]"
                    onChange={onChangeEmail}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-4/5 mt-4">
            <div className="flex flex-col px-2">
              <p>パスワード</p>
              <div className="duration-300 overflow-hidden mt-4">
                <div className="flex justify-start gap-4">
                  <Input
                    type="password"
                    placeholder=""
                    className="w-3/4 py-2 bg-[#F5F5F5]"
                    onChange={onChangePassword}
                  />
                </div>
              </div>
            </div>
          </div>
          {errorMessage && <p className="text-red-500 pt-4">{errorMessage}</p>}
          <div className="flex items-center justify-start mt-4 gap-4 w-4/5 pl-2">
            <button
              className="bg-[#FF2A3B] hover:bg-[#bc212e] duration-300 text-white py-3 px-4 rounded-lg mt-5"
              onClick={onSubmit}
            >
              ログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

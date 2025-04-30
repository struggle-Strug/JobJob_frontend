import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Step from "./Step";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { message } from "antd";
import { useAuth } from "../../../context/AuthContext";

const Register = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState([]);
  const [employmentType, setEmploymentType] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  //   const [qualification, setQualification] = useState([]);
  //   const [feature, setFeature] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [municipalities, setMunicipalities] = useState("");
  const [village, setVillage] = useState("");
  const [building, setBuilding] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [facilityType, setFacilityType] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [sei, setSei] = useState("");
  const [mei, setMei] = useState("");
  const [hiraganaSei, setHiraganaSei] = useState("");
  const [hiraganaMei, setHiraganaMei] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onChangeNext = () => {
    if (step === 1 && jobType.length === 0)
      return message.error("希望職種を選択してください。");
    if (step === 2) {
      const error = [];
      if (employmentType.length === 0) error.push("雇用形態");
      if (currentStatus === "") error.push("現在の状況");
      // if(qualification.length === 0) error.push("資格");
      // if(feature.length === 0) error.push("特徴");

      if (error.length > 0)
        return message.error(error.join(", ") + "を選択してください。");
    }
    if (step === 3) {
      const error = [];
      if (prefecture === "") error.push("都道府県");
      if (municipalities === "") error.push("市区町村");
      if (error.length > 0)
        return message.error(error.join(", ") + "を選択してください。");
    }
    // if (step === 4) {
    //   const error = [];
    //   if (facilityType.length === 0) error.push("施設ジャンル");
    //   if (paymentMethod === "") error.push("支払い方法");
    //   if (error.length > 0)
    //     return message.error(error.join(", ") + "を選択してください。");
    // }
    if (step === 4) {
      const error = [];
      if (sei === "" || mei === "") error.push("名前");
      if (hiraganaSei === "" || hiraganaMei === "") error.push("ふるがな");
      if (gender === "") error.push("性別");
      if (year === "" || month === "" || day === "") error.push("生年月日");
      if (error.length > 0)
        return message.error(error.join(", ") + "を入力してください。");
    }

    setStep((prev) => prev + 1);
    // ステップ移動時に上部へスクロール
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChangeBefore = () => {
    setErrorMessage("");
    setStep((prev) => prev - 1);
  };

  const onHandleSubmit = async () => {
    if (step === 5) {
      const error = [];
      // 必須項目のチェック
      if (phoneNumber === "") error.push("電話番号");
      if (email === "") error.push("メールアドレス");
      if (password === "") error.push("PASSWORD");
      if (passwordConfirm === "") error.push("PASSWORD確認");

      // メールアドレス形式のチェック（空でない場合）
      if (!email.includes("@")) {
        return message.error("メールアドレスの形式が不正です。");
      }

      // 必須項目が空の場合はエラーを表示
      if (error.length > 0) {
        return message.error(error.join(", ") + "を入力してください。");
      }

      // パスワードの一致確認
      if (password !== passwordConfirm) {
        return message.error("PASSWORDが一致しません。");
      }
    }

    // const qualificationData = qualification.map((detail) => ({
    //   qualification: detail,
    //   year: "",
    //   month: "",
    // }));

    const userData = {
      name: `${sei} ${mei}`,
      hiraganaName: `${hiraganaSei} ${hiraganaMei}`,
      gender: gender,
      birthday: `${year}-${month}-${day}`,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      jobType: jobType,
      employmentType: employmentType,
      currentStatus: currentStatus,
      //   qualification: qualificationData,
      //   feature: feature,
      postalCode: postalCode,
      municipalities: municipalities,
      village: village,
      building: building,
      prefecture: prefecture,
      facilityType: facilityType,
      paymentMethod: paymentMethod,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user`,
      userData
    );
    if (res.data.error) return message.error(res.data.message);
    message.success(res.data.message);
    setTimeout(() => {
      window.location.href = "/members/sign_in";
    }, 1000);
  };

  useEffect(() => {
    if (user) {
      window.location.href = "/members/mypage";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user]);

  return (
    <section className="flex flex-col justify-center bg-[#EFEFEF] px-4">
      <div className="container">
        <div className="flex items-center justify-between border-[1.5px] border-[#a7a3a3] rounded-lg p-4 bg-white px-8">
          <p className="text-2xl font-bold">新規会員登録</p>
          {step === 1 && (
            <div className="border-[1.5px] border-[#a7a3a3] rounded-lg px-4 py-2">
              <Link
                to={"/members/sign_in"}
                className="text-lg text-[#FF2A3B] hover:underline"
              >
                会員登録済みの方はこちら
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-between mt-12 border-[1.5px] border-[#a7a3a3] rounded-lg p-4 bg-white px-8">
          <Step steps={5} currentStep={step} />
          {step === 1 && <Step1 jobType={jobType} setJobType={setJobType} />}
          {step === 2 && (
            <Step2
            employmentType={employmentType}
            setEmploymentType={setEmploymentType}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            setErrorMessage={setErrorMessage}
          />
          )}
          {step === 3 && (
            <Step3
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            prefecture={prefecture}
            setPrefecture={setPrefecture}
            municipalities={municipalities}
            setMunicipalities={setMunicipalities}
            village={village}
            setVillage={setVillage}
            building={building}
            setBuilding={setBuilding}
          />
          )}
          {/* {step === 4 && (
            <Step4
              setFacilityType={setFacilityType}
              setPaymentMethod={setPaymentMethod}
            />
          )} */}
          {step === 4 && (
            <Step5
            sei={sei}
            setSei={setSei}
            mei={mei}
            setMei={setMei}
            hiraganaSei={hiraganaSei}
            setHiraganaSei={setHiraganaSei}
            hiraganaMei={hiraganaMei}
            setHiraganaMei={setHiraganaMei}
            gender={gender}
            setGender={setGender}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
          />
          )}
          {step === 5 && (
            <Step6
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
          />
          )}
          {/* 入力部分とボタンの間は、元々の隙間（mt-12）を残す */}
          <div className="mt-12 w-full">
            {step === 5 && (
              <p className="text-sm text-center mb-2">
                <Link
                  to="/rule"
                  className="text-[#FF2A3B] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  利用規約・個人情報の取り扱い
                </Link>
                に同意の上、ご登録ください
              </p>
            )}
            <div className="flex items-center justify-center w-full gap-4">
              {step !== 1 && (
                <button
                  className="bg-[#929292] hover:bg-[#c2c2c2] duration-300 text-white py-4 px-6 rounded-lg mt-5"
                  onClick={onChangeBefore}
                >
                  戻る
                </button>
              )}
              <button
                className="bg-[#FF2A3B] hover:bg-[#bc212e] duration-300 text-white py-4 px-6 rounded-lg mt-5"
                onClick={step === 5 ? onHandleSubmit : onChangeNext}
              >
                {step === 5 ? "登録" : "次へ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

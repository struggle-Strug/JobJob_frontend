import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Step from "./Step";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

const Register = () => {
    const [step, setStep] = useState(1);
    const [jobType, setJobType] = useState([]);
    const [employmentType, setEmploymentType] = useState([]);
    const [qualification, setQualification] = useState([]);
    const [feature, setFeature] = useState([]);
    const [prefecture, setPrefecture] = useState("");
    const [facilityType, setFacilityType] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [sei, setSei] = useState("");
    const [mei, setMei] = useState("");
    const [hiraganaSei, setHiraganaSei] = useState("");
    const [hiraganaMei, setHiraganaMei] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    
    const onChangeNext = () => {
        if(step === 1 && jobType.length === 0) return setErrorMessage("希望職種を選択してください。");
        if(step === 2) {
            const error = [];
            if(employmentType.length === 0) error.push("雇用形態");
            if(qualification.length === 0) error.push("資格");
            if(feature.length === 0) error.push("特徴");
            if(error.length > 0) return setErrorMessage(error.join(", ") + "を選択してください。");
        }
        if(step === 3 && prefecture === "") return setErrorMessage("都道府県を選択してください。");
        if(step === 4){
            const error = [];
            if(facilityType.length === 0) error.push("施設ジャンル");
            if(paymentMethod === "") error.push("支払い方法");
            if(error.length > 0) return setErrorMessage(error.join(", ") + "を選択してください。");
        }
        if(step === 5){
            const error = [];
            if(sei === "" || mei === "") error.push("名前");
            if(hiraganaSei === "" || hiraganaMei === "") error.push("ふるがな");
            if(year === "" || month === "" || day === "") error.push("生年月日");
            if(error.length > 0) return setErrorMessage(error.join(", ") + "を入力してください。");
        }
        
        setErrorMessage("");
        setStep(prev => prev + 1)
    }
    const onChangeBefore = () => {
        setErrorMessage("");
        setStep(prev => prev - 1)
    }

    const onHandleSubmit = async () => {
        if(step === 6){
            const error = [];
            // Check for empty fields
            if (phoneNumber === "") error.push("電話番号");
            if (email === "") error.push("メールアドレス");
            if (password === "") error.push("PASSWORD");
            if (passwordConfirm === "") error.push("PASSWORD確認");
            
            // Check email format only if email is not empty
            if (!email.includes("@")) {
                return setErrorMessage("メールアドレスの形式が不正です。");
            }
            
            // If any required fields are empty, show that error first
            if (error.length > 0) {
                return setErrorMessage(error.join(", ") + "を入力してください。");
            }
            
            // Check password match only if both passwords are not empty
            if (password !== passwordConfirm) {
                return setErrorMessage("PASSWORDが一致しません。");
            }
        }

        const userData = {
            name: `${sei} ${mei}`,
            hiraganaName: `${hiraganaSei} ${hiraganaMei}`,
            birthday: `${year}-${month}-${day}`,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
            jobType: jobType,
            employmentType: employmentType,
            qualification: qualification,
            feature: feature,
            prefecture: prefecture,
            facilityType: facilityType,
            paymentMethod: paymentMethod,
        }

        const response = await axios.post(`/api/v1/users/register`, userData);
        console.log(response);
    }
    return (
        <section className="flex flex-col justify-center bg-[#EFEFEF]">
            <div className="container">
                <div className="flex items-center justify-between border-[1.5px] border-[#a7a3a3] rounded-lg p-4 bg-white px-8">
                    <p className="text-2xl font-bold">新規会員登録</p>
                    <div className="border-[1.5px] border-[#a7a3a3] rounded-lg px-4 py-2">
                        <Link to={'/members/login'} className="text-lg text-[#FF2A3B] hover:underline">会員登録済みの方はこちら</Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between mt-12 border-[1.5px] border-[#a7a3a3] rounded-lg p-4 bg-white px-8">
                    <Step steps={6} currentStep={step} />
                    {step === 1 && <Step1 setJobType={setJobType} />}
                    {step === 2 && <Step2 setEmploymentType={setEmploymentType} setQualification={setQualification} setFeature={setFeature} />}
                    {step === 3 && <Step3 setPrefecture={setPrefecture} errorMessage={errorMessage} />}
                    {step === 4 && <Step4 setFacilityType={setFacilityType} setPaymentMethod={setPaymentMethod} />}
                    {step === 5 && <Step5 setSei={setSei} setMei={setMei} setHiraganaSei={setHiraganaSei} setHiraganaMei={setHiraganaMei} setYear={setYear} setMonth={setMonth} setDay={setDay} />}
                    {step === 6 && <Step6 setPhoneNumber={setPhoneNumber} setEmail={setEmail} setPassword={setPassword} setPasswordConfirm={setPasswordConfirm} />}
                    {errorMessage && <p className="text-red-500 pt-4">{errorMessage}</p>}
                    <div className="flex items-center justify-center mt-12 w-full gap-4">
                        {step !== 1 &&
                            <button className="bg-[#929292] hover:bg-[#c2c2c2] duration-300 text-white py-4 px-6 rounded-lg mt-5" onClick={onChangeBefore}>戻る</button>
                        }
                        <button className="bg-[#FF2A3B] hover:bg-[#bc212e] duration-300 text-white py-4 px-6 rounded-lg mt-5" onClick={step === 6 ? onHandleSubmit : onChangeNext}>{step === 6 ? "登録" : "次へ"}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;
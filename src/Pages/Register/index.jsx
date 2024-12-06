import { useState } from "react";
import { Link } from "react-router-dom";
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
    const [errorMessage, setErrorMessage] = useState("");
    
    console.log(prefecture);
    
    
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
        setErrorMessage("");
        setStep(prev => prev + 1)
    }
    const onChangeBefore = () => {
        setErrorMessage("");
        setStep(prev => prev - 1)
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
                    {step === 5 && <Step5 />}
                    {step === 6 && <Step6 />}
                    {errorMessage && <p className="text-red-500 pt-4">{errorMessage}</p>}
                    <div className="flex items-center justify-center mt-12 w-full gap-4">
                        {step !== 1 &&
                            <button className="bg-[#929292] hover:bg-[#c2c2c2] duration-300 text-white py-4 px-6 rounded-lg mt-5" onClick={onChangeBefore}>戻る</button>
                        }
                        <button className="bg-[#FF2A3B] hover:bg-[#bc212e] duration-300 text-white py-4 px-6 rounded-lg mt-5" onClick={onChangeNext}>次へ</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;
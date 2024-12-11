import { useState } from "react";
import { Checkbox } from "antd";
import { Features, Qualifications, EmploymentType } from "../../../../utils/constants/categories";

const Step2 = ({setEmploymentType, setQualification, setFeature, setErrorMessage}) => {
    const [toggleEmployment, setToggleEmployment] = useState(false);
    const [toggleQualification_required, setToggleQualification_required] = useState(false);
    const [toggleQualification_other, setToggleQualification_other] = useState(false);
    const [toggleFeature_1, setToggleFeature_1] = useState(false);
    const [toggleFeature_2, setToggleFeature_2] = useState(false);
    const [toggleFeature_3, setToggleFeature_3] = useState(false);
    const [toggleFeature_4, setToggleFeature_4] = useState(false);
    const [toggleFeature_5, setToggleFeature_5] = useState(false);
    const [toggleFeature_6, setToggleFeature_6] = useState(false);
    const [toggleFeature_7, setToggleFeature_7] = useState(false);
    const [toggleFeature_8, setToggleFeature_8] = useState(false);
    const onChange = () => {

    }
    const employmentKeys = Object.keys(EmploymentType);
    const qualificationKeys_required = Object.keys(Qualifications.REQUIRED);
    const qualificationKeys_other = Object.keys(Qualifications.OTHERS);
    const featureKeys_1 = Object.keys(Features.HOLIDAY);
    const featureKeys_2 = Object.keys(Features.WORKING_HOURS);
    const featureKeys_3 = Object.keys(Features.ACCESS);
    const featureKeys_4 = Object.keys(Features.DESCRIPTION);
    const featureKeys_5 = Object.keys(Features.SALARY_BENEFITS_WELFARE);
    const featureKeys_6 = Object.keys(Features.SERVICE_TYPES);
    const featureKeys_7 = Object.keys(Features.EDUCATION);
    const featureKeys_8 = Object.keys(Features.MEDICAL_DEPARTMENT);
    
    const employmentOptions = employmentKeys.map((item) => {
        return {
            label: item,
            value: EmploymentType[item]
        }
    })
    const qualificationOptions_required = qualificationKeys_required.map((item) => {
        return {
            label: item,
            value: Qualifications.REQUIRED[item]
        }
    })
    const qualificationOptions_other = qualificationKeys_other.map((item) => {
        return {
            label: item,
            value: Qualifications.OTHERS[item]
        }
    })
    const featureOptions_1 = featureKeys_1.map((item) => {
        return {
            label: item,
            value: Features.HOLIDAY[item]
        }
    })
    const featureOptions_2 = featureKeys_2.map((item) => {
        return {
            label: item,
            value: Features.WORKING_HOURS[item]
        }
    })
    const featureOptions_3 = featureKeys_3.map((item) => {
        return {
            label: item,
            value: Features.ACCESS[item]
        }
    })
    const featureOptions_4 = featureKeys_4.map((item) => {
        return {
            label: item,
            value: Features.DESCRIPTION[item]
        }
    })
    const featureOptions_5 = featureKeys_5.map((item) => {
        return {
            label: item,
            value: Features.SALARY_BENEFITS_WELFARE[item]
        }
    })
    const featureOptions_6 = featureKeys_6.map((item) => {
        return {
            label: item,
            value: Features.SERVICE_TYPES[item]
        }
    })
    const featureOptions_7 = featureKeys_7.map((item) => {
        return {
            label: item,
            value: Features.EDUCATION[item]
        }
    })
    const featureOptions_8 = featureKeys_8.map((item) => {
        return {
            label: item,
            value: Features.MEDICAL_DEPARTMENT[item]
        }
    })

    const onChangeEmployment = (value) => {
        setEmploymentType(value)
    }

    const onChangeQualification = (value) => {
        setQualification(value)
    }

    const onChangeFeature = (value) => {
        setFeature(value)
    }

    return (
        <>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>雇用形態</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-col border-t-[0.1rem] border-b-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleEmployment(!toggleEmployment)}>
                                <p>
                                形態
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleEmployment ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleEmployment ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={employmentOptions}
                                    onChange={onChangeEmployment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>資格</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleQualification_required(!toggleQualification_required)}>
                                <p>
                                応募要件（資格）
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleQualification_required ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleQualification_required ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={qualificationOptions_required}
                                    onChange={onChangeQualification}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-b-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleQualification_other(!toggleQualification_other)}>
                                <p>
                                応募要件（その他）
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleQualification_other ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleQualification_other ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={qualificationOptions_other}
                                    onChange={onChangeQualification}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>特徴</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleFeature_1(!toggleFeature_1)}>
                                <p>
                                休日
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleFeature_1 ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleFeature_1 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={featureOptions_1}
                                    onChange={onChangeFeature}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleFeature_2(!toggleFeature_2)}>
                                <p>
                                勤務時間
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleFeature_2 ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleFeature_2 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={featureOptions_2}
                                    onChange={onChangeFeature}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleFeature_3(!toggleFeature_3)}>
                                <p>
                                アクセス
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleFeature_3 ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleFeature_3 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={featureOptions_3}
                                    onChange={onChangeFeature}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleFeature_4(!toggleFeature_4)}>
                                <p>
                                仕事内容
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleFeature_4 ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleFeature_4 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={featureOptions_4}
                                    onChange={onChangeFeature}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleFeature_5(!toggleFeature_5)}>
                                <p>
                                給与・待遇・福利厚生
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleFeature_5 ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleFeature_5 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={featureOptions_5}
                                    onChange={onChangeFeature}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleFeature_6(!toggleFeature_6)}>
                                <p>
                                サービス形態
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleFeature_6 ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleFeature_6 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={featureOptions_6}
                                    onChange={onChangeFeature}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleFeature_7(!toggleFeature_7)}>
                                <p>
                                教育体制・教育
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleFeature_7 ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleFeature_7 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={featureOptions_7}
                                    onChange={onChangeFeature}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-b-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleFeature_8(!toggleFeature_8)}>
                                <p>
                                診療科目
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleFeature_8 ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleFeature_8 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={featureOptions_8}
                                    onChange={onChangeFeature}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step2;

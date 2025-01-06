import { Link, useLocation, useNavigate } from "react-router-dom";
import { getEmploymentTypeKeyByValue, getFeatureKeyByValue, getJobTypeKeyByValue } from "../../utils/getFunctions";
import { EmploymentType, Features, Prefectures } from "../../utils/constants/categories";
import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import JobLists from "./JobLists";

const CertainJob = () => {
    const { pathname } = useLocation();
    const [type, setType] = useState("1");
    const [pref, setPref] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [monthlySalary, setMonthlySalary] = useState("");
    const [hourlySalary, setHourlySalary] = useState("");
    const [feature, setFeature] = useState("");

    const navigate = useNavigate();
    const path = pathname.split('/')[1];
    const JobType = getJobTypeKeyByValue(path);
    const isSelected = (v) => v === type;

    const monthlySalaryOptions = [
        { value: "", label: "指定なし" },
        { value: "180000", label: "18" },
        { value: "200000", label: "20" },
        { value: "250000", label: "25" },
        { value: "300000", label: "30" },
        { value: "1600", label: "40" },
        { value: "500000", label: "50" },
        { value: "600000", label: "60" },
        { value: "700000", label: "70" },
        { value: "800000", label: "80" },
        { value: "900000", label: "90" },
        { value: "1000000", label: "100" },
    ]

    const hourlySalaryOptions = [
        { value: "", label: "指定なし" },
        { value: "800", label: "800" },
        { value: "1000", label: "1000" },
        { value: "1200", label: "1200" },
        { value: "1400", label: "1400" },
        { value: "1600", label: "1600" },
        { value: "1800", label: "1800" },
        { value: "2000", label: "2000" },
        { value: "3000", label: "3000" },
        { value: "4000", label: "4000" },
        { value: "5000", label: "5000" },
    ]

    useEffect(() => {
        pref == "" && feature == "" && navigate(`/${path}/${employmentType}`);
        pref !== "" && navigate(`/${feature ? `${path}/${pref}/${employmentType}/${feature}` : `${path}/${pref}/${employmentType}`}`);
        pref == "" && setFeature("");
        setType("1");
    },[employmentType])
    
    useEffect(() => {
        if(pref == ""){
            employmentType !== "" && navigate(`/${path}/${employmentType}/${feature}`)
            employmentType == "" && navigate(`/${path}/${feature}`)
        }
        if(pref !== ""){
            employmentType !== "" && navigate(`/${path}/${pref}/${employmentType}/${feature}`)
            employmentType == "" && navigate(`/${path}/${pref}/${feature}`)
        }
        setType("1");
    },[feature])
    
    return (
        <>
            {!pathname.includes("pref") &&
                <div className="bg-[#EFEFEF]">
                    <section className='max-w-[1100px] mx-auto bg-white rounded-lg lg:px-12 md:px-8 py-12'>
                        <p>
                            {feature !== "" &&
                                <>
                                    <span className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">{getFeatureKeyByValue(feature)}</span>
                                    <span className="lg:text-base md:text-sm text-xs text-[#343434]">の</span>
                                </>
                            }
                            {employmentType !== "" &&
                                <>
                                    <span className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">{getEmploymentTypeKeyByValue(employmentType)}</span>
                                    <span className="lg:text-base md:text-sm text-xs text-[#343434]">の</span>
                                </>
                            }
                            <span className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">{JobType}</span>
                            <span className="lg:text-base md:text-sm text-xs text-[#343434]">の</span>
                        </p>
                        <p className="lg:text-jg md:text-base text-md text-[#343434]">求人・転職・就職・アルバイト募集情報</p>
                    </section>
                    <section className='max-w-[1100px] mx-auto bg-white rounded-lg mt-4'>
                        <div className="grid grid-cols-3 w-full px-2">
                            <button onClick={() => setType("1")} className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-4 duration-100 ${isSelected("1") ? "border-b-4 border-[#FF2A3B]" : ""}`}>
                                <img src="/assets/images/dashboard/gg_pin.png" alt="map" className="w-5 pt-0.5 " />
                                <p className="lg:text-md md:text-sm font-bold text-[#343434] duration-300">市区町村から選択</p>
                            </button>
                            <button onClick={() => setType("2")} className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-4 duration-100 ${isSelected("2") ? "border-b-4 border-[#FF2A3B]" : ""}`}>
                                <img src="/assets/images/dashboard/material-symbols_check-box-outline.png" alt="map" className="w-5 pt-0.5" />
                                <p className="lg:text-md md:text-sm font-bold text-[#343434] duration-300">雇用形態・給与から選択</p>
                            </button>
                            <button onClick={() => setType("3")} className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-4 duration-100 ${isSelected("3") ? "border-b-4 border-[#FF2A3B]" : ""}`}>
                                <img src="/assets/images/dashboard/mdi_tag-outline.png" alt="map" className="w-5 pt-0.5" />
                                <p className="lg:text-md md:text-sm font-bold text-[#343434] duration-300">特徴から選択</p>
                            </button>
                        </div>
                        {type == "1" && 
                            <div className="grid grid-cols-7 w-full py-3">
                                <div className="col-span-1 flex flex-col justify-start items-center">
                                    <div className="w-full px-4">
                                        <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">関東</p>
                                    </div>
                                    <div className="flex flex-col w-full px-4">
                                        {Object.keys(Prefectures.KANTO).map((prefecture, index) => {
                                            return (
                                                <>
                                                    <Link 
                                                        key={index} 
                                                        to={
                                                            `/${path}/${Prefectures.KANTO[prefecture]}`
                                                            + (employmentType !== "" ? `/${employmentType}` : "")
                                                            + (feature !== "" ? `/${feature}` : "")
                                                            } 
                                                        className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                                                        onClick={() => setPref(Prefectures.KANTO[prefecture])}
                                                    >
                                                        {prefecture}
                                                    </Link>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col justify-start items-center">
                                    <div className="w-full px-4">
                                        <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">関西</p>
                                    </div>
                                    <div className="flex flex-col w-full px-4">
                                        {Object.keys(Prefectures.KANSAI).map((prefecture, index) => {
                                            return (
                                                <>
                                                    <Link 
                                                        key={index} 
                                                        to={
                                                            `/${path}/${Prefectures.KANSAI[prefecture]}`
                                                            + (employmentType !== "" ? `/${employmentType}` : "")
                                                            + (feature !== "" ? `/${feature}` : "")
                                                            } 
                                                        className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                                                        onClick={() => setPref(Prefectures.KANSAI[prefecture])}
                                                    >
                                                        {prefecture}
                                                    </Link>
                                                </>
                                            )
                                        })} 
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col justify-start items-cente4">
                                    <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">東海</p>
                                    <div className="flex flex-col w-full px-4">
                                        {Object.keys(Prefectures.TOKAI).map((prefecture, index) => {
                                            return (
                                                <>
                                                    <Link 
                                                        key={index} 
                                                        to={
                                                            `/${path}/${Prefectures.TOKAI[prefecture]}`
                                                            + (employmentType !== "" ? `/${employmentType}` : "")
                                                            + (feature !== "" ? `/${feature}` : "")
                                                            } 
                                                        className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                                                        onClick={() => setPref(Prefectures.TOKAI[prefecture])}
                                                    >
                                                        {prefecture}
                                                    </Link>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col justify-start items-center">
                                    <div className="w-full px-4">
                                        <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">北海道・東北</p>
                                    </div>
                                    <div className="flex flex-col w-full px-4">
                                        {Object.keys(Prefectures.HOKKAIDO_TOHOKU).map((prefecture, index) => {
                                            return (
                                                <>
                                                    <Link 
                                                        key={index} 
                                                        to={
                                                            `/${path}/${Prefectures.HOKKAIDO_TOHOKU[prefecture]}`
                                                            + (employmentType !== "" ? `/${employmentType}` : "")
                                                            + (feature !== "" ? `/${feature}` : "")
                                                            } 
                                                        className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                                                        onClick={() => setPref(Prefectures.HOKKAIDO_TOHOKU[prefecture])}
                                                    >
                                                        {prefecture}
                                                    </Link>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col justify-start items-center">
                                    <div className="w-full px-4">
                                        <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">甲信越・北陸</p>
                                    </div>
                                    <div className="flex flex-col w-full px-4">
                                        {Object.keys(Prefectures.KOSHINETSU_HOKURIKU).map((prefecture, index) => {
                                            return (
                                                <>
                                                    <Link 
                                                        key={index} 
                                                        to={
                                                            `/${path}/${Prefectures.KOSHINETSU_HOKURIKU[prefecture]}`
                                                            + (employmentType !== "" ? `/${employmentType}` : "")
                                                            + (feature !== "" ? `/${feature}` : "")
                                                            } 
                                                        className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                                                        onClick={() => setPref(Prefectures.KOSHINETSU_HOKURIKU[prefecture])}
                                                    >
                                                        {prefecture}
                                                    </Link>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col justify-start items-center">
                                    <div className="w-full px-4">
                                        <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">中部・近畿</p>
                                    </div>
                                    <div className="flex flex-col w-full px-4">
                                        {Object.keys(Prefectures.CHUGOKU_SHIKOKU).map((prefecture, index) => {
                                            return (
                                                <>
                                                    <Link 
                                                        key={index} 
                                                        to={
                                                            `/${path}/${Prefectures.CHUGOKU_SHIKOKU[prefecture]}`
                                                            + (employmentType !== "" ? `/${employmentType}` : "")
                                                            + (feature !== "" ? `/${feature}` : "")
                                                            } 
                                                        className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                                                        onClick={() => setPref(Prefectures.CHUGOKU_SHIKOKU[prefecture])}
                                                    >
                                                        {prefecture}
                                                    </Link>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col justify-start items-center">
                                    <div className="w-full px-4">
                                        <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">九州・沖縄</p>
                                    </div>
                                    <div className="flex flex-col w-full px-4">
                                        {Object.keys(Prefectures.KYUSHU_OKINAWA).map((prefecture, index) => {
                                            return (
                                                <>
                                                    <Link 
                                                        key={index} 
                                                        to={
                                                            `/${path}/${Prefectures.KYUSHU_OKINAWA[prefecture]}`
                                                            + (employmentType !== "" ? `/${employmentType}` : "")
                                                            + (feature !== "" ? `/${feature}` : "")
                                                            } 
                                                        className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                                                        onClick={() => setPref(Prefectures.KYUSHU_OKINAWA[prefecture])}
                                                    >
                                                        {prefecture}
                                                    </Link>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>                    
                        }
                        {type == "2" && 
                            <div className="w-full">
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">雇用形態</p>
                                    <div className="flex items-center justify-start desire gap-4 mt-4">
                                        {Object.keys(EmploymentType).map((employmentTypeKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setEmploymentType(EmploymentType[employmentTypeKey])} checked={employmentType === EmploymentType[employmentTypeKey]}>{employmentTypeKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">給与</p>
                                    <div className="flex items-center justify-start desire gap-2 mt-4">
                                        <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">月給</span>
                                        <div className="flex items-end w-1/4 gap-2">
                                            <Select
                                                options={monthlySalaryOptions}
                                                onChange={(value) => setMonthlySalary(value)}
                                                value={monthlySalary}
                                                className="h-10"
                                            />
                                            <span className="lg:text-base md:text-sm text-xs text-[#343434]">万円以上</span>
                                        </div>
                                        <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">時給</span>
                                        <div className="flex items-end w-1/4 gap-2">
                                            <Select
                                                options={hourlySalaryOptions}
                                                onChange={(value) => setHourlySalary(value)}
                                                value={hourlySalary}
                                                className="h-10"
                                            />
                                            <span className="lg:text-base md:text-sm text-xs text-[#343434]">円以上</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-full">
                                    <button className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] lg:px-12 md:px-8 px-4 lg:py-4 md:py-2 py-1 rounded-lg my-6">検索する</button>
                                </div>
                            </div>
                        }
                        {
                            type == "3" && 
                            <div className="w-full">
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">休日の特徴</p>
                                    <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                        {Object.keys(Features.HOLIDAY).map((featureKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setFeature(Features.HOLIDAY[featureKey])} checked={feature === Features.HOLIDAY[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">勤務時間の特徴</p>
                                    <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                        {Object.keys(Features.WORKING_HOURS).map((featureKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setFeature(Features.WORKING_HOURS[featureKey])} checked={feature === Features.WORKING_HOURS[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">アクセスの特徴</p>
                                    <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                        {Object.keys(Features.ACCESS).map((featureKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setFeature(Features.ACCESS[featureKey])} checked={feature === Features.ACCESS[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">仕事内容の特徴</p>
                                    <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                        {Object.keys(Features.DESCRIPTION).map((featureKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setFeature(Features.DESCRIPTION[featureKey])} checked={feature === Features.DESCRIPTION[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">給与・待遇・福利厚生の特徴</p>
                                    <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                        {Object.keys(Features.SALARY_BENEFITS_WELFARE).map((featureKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setFeature(Features.SALARY_BENEFITS_WELFARE[featureKey])} checked={feature === Features.SALARY_BENEFITS_WELFARE[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">サービス形態の特徴</p>
                                    <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                        {Object.keys(Features.SERVICE_TYPES).map((featureKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setFeature(Features.SERVICE_TYPES[featureKey])} checked={feature === Features.SERVICE_TYPES[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">教育体制・教育の特徴</p>
                                    <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                        {Object.keys(Features.EDUCATION).map((featureKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setFeature(Features.EDUCATION[featureKey])} checked={feature === Features.EDUCATION[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">診療科目の特徴</p>
                                    <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                        {Object.keys(Features.MEDICAL_DEPARTMENT).map((featureKey, index) => {
                                            return (
                                                <Checkbox key={index} onChange={() => setFeature(Features.MEDICAL_DEPARTMENT[featureKey])} checked={feature === Features.MEDICAL_DEPARTMENT[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </section>
                </div>
            }
            {
                pathname.includes("pref") &&
                <JobLists 
                    path={path}  
                    employmentType={employmentType} 
                    setEmploymentType={setEmploymentType} 
                    feature={feature} 
                    setFeature={setFeature} 
                    pref={pref} 
                    setPref={setPref} 
                    JobType={JobType} 
                    monthlySalary={monthlySalary} 
                    setMonthlySalary={setMonthlySalary}
                    monthlySalaryOptions={monthlySalaryOptions}
                    hourlySalary={hourlySalary}
                    setHourlySalary={setHourlySalary}
                    hourlySalaryOptions={hourlySalaryOptions}
                />
            }
        </>
    )
}

export default CertainJob;
import { Checkbox, Input, Modal, Select } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getEmploymentTypeKeyByValue, getFeatureKeyByValue, getJobTypeKeyByValue, getPrefectureKeyByValue } from "../../../utils/getFunctions";
import { useEffect, useState } from "react";
import { EmploymentType, Features, Prefectures } from "../../../utils/constants/categories";
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../../components/Loading";

const JobLists = () => {
    const { user } = useAuth();
    const { pathname } = useLocation();
    const [pref, setPref] = useState(pathname.split('/')[2]);
    const [employmentType, setEmploymentType] = useState("");
    const [monthlySalary, setMonthlySalary] = useState("");
    const [hourlySalary, setHourlySalary] = useState("");
    const [feature, setFeature] = useState("");
    const [prefectureModalOpen, setPrefectureModalOpen] = useState(false);
    const [employmentTypeModalOpen, setEmploymentTypeModalOpen] = useState(false);
    const [featureModalOpen, setFeatureModalOpen] = useState(false);
    const [jobPosts, setJobPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const path = pathname.split('/')[1];
    const JobType = getJobTypeKeyByValue(path);
    const onClickPref = (pref) => {
        setPref(pref);
        setPrefectureModalOpen(false);
    }
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
    ];

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
    ];
    const prefecture = getPrefectureKeyByValue(pref);
    const employment_type = getEmploymentTypeKeyByValue(employmentType);
    const feature_1 = getFeatureKeyByValue(feature);
    const getJobPosts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/jobpost`);
            
            setJobPosts(
                response.data.jobposts
                    .filter(jobpost => jobpost.allowed === "allowed")
                    .filter(jobpost => jobpost.type === JobType) // Filter by job type
                    .filter(jobpost => jobpost.facility_id.prefecture === prefecture) // Filter by prefecture
                    .filter(jobpost => 
                        employment_type !== null 
                            ? jobpost.employment_type[0] === employment_type 
                            : true // Include all if employment_type is null
                    )
                    .filter(jobpost => {
                        if (feature_1 !== null) { // Check if feature_1 is not null
                            const jobPostFeatures = [
                                ...jobpost.work_item,
                                ...jobpost.service_subject,
                                ...jobpost.service_type,
                                ...jobpost.treatment_type,
                                ...jobpost.rest_type,
                                ...jobpost.work_time_type,
                                ...jobpost.education_content,
                            ];
                            return jobPostFeatures.includes(feature_1); // Filter if feature_1 matches
                        }
                        return true; // Include all if feature_1 is null
                    })
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    
    useEffect(() => {
        document.title = "求人一覧";
        getJobPosts();
    }, [employmentType, feature, pref]);

    useEffect(() => {
        pref == "" && feature == "" && navigate(`/${path}/${employmentType}`);
        pref !== "" && navigate(`/${feature ? `${path}/${pref}/${employmentType}/${feature}` : `${path}/${pref}/${employmentType}`}`);
        pref == "" && setFeature("");
    },[employmentType]);
    
    useEffect(() => {
        if(pref == ""){
            employmentType !== "" && navigate(`/${path}/${employmentType}/${feature}`);
            employmentType == "" && navigate(`/${path}/${feature}`);
        }
        if(pref !== ""){
            employmentType !== "" && navigate(`/${path}/${pref}/${employmentType}/${feature}`);
            employmentType == "" && navigate(`/${path}/${pref}/${feature}`);
        }
    },[feature]);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <>
           <div className="flex w-full px-4 bg-[#EFEFEF]">
                <div className="container flex items-center justify-between gap-8">
                    <div className="flex flex-col items-center justify-center w-2/3">
                        <div className="flex flex-col justify-center bg-white rounded-lg p-4 w-full shadow-xl">
                            <p className="text-lg font-bold text-gray-500">求人・転職・アルバイト情報</p>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <p className="lg:text-xl md:text-sm font-bold text-[#FF6B56]">{getPrefectureKeyByValue(pref)}</p>
                                    <p className="lg:text-xl md:text-sm font-bold text-[#343434]">の{JobType}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="lg:text-xl md:text-sm font-bold text-[#343434] ">該当件数</p>
                                    <p className="font-bold text-[#FF2A3B] lg:text-[1.7rem] md:text-[1.2rem] number">{jobPosts?.length}</p>
                                    <p className="lg:text-xl md:text-sm font-bold text-[#343434]">件</p>
                                </div>
                                <div className="flex items-center justify-between lg:px-8 md:px-2 lg:py-2 md:py-1 border-[#FF2A3B] border-2 rounded-lg gap-4">
                                    <button className="lg:text-[1rem] md:text-sm font-bold text-[#FF2A3B] hover:underline" onClick={() => setPrefectureModalOpen(true)}>都道府県を変更</button>
                                    <img src="/assets/images/dashboard/ep_arrow-right.png" alt="chevron-right" className="w-4" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">求人検索</p>
                        </div>
                        <div className="flex flex-col justify-center bg-white rounded-lg px-12 py-8 w-full shadow-xl mt-8">
                            <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg hover:px-12 duration-300 cursor-pointer">
                                <div className="flex items-center justify-between gap-1">
                                    <img src="/assets/images/dashboard/gg_pin.png" alt="map" className="w-5 pt-0.5" />
                                    <p className="lg:text-md md:text-sm font-bold text-[#343434]">市区町村から選択</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-down" className="w-4" />
                            </div>
                            <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer">
                                <div className="flex items-center justify-between gap-1 ">
                                    <img src="/assets/images/dashboard/ph_train-simple.png" alt="map" className="w-5 pt-0.5" />
                                    <p className="lg:text-md md:text-sm font-bold text-[#343434]">沿線から選択</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-down" className="w-4" />
                            </div>
                            <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer" onClick={() => setEmploymentTypeModalOpen(true)}>
                                <div className="flex items-center justify-between gap-1 ">
                                    <img src="/assets/images/dashboard/material-symbols_check-box-outline.png" alt="map" className="w-5 pt-0.5" />
                                    <p className="lg:text-md md:text-sm font-bold text-[#343434]">雇用形態・給与から選択</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-down" className="w-4" />
                            </div>
                            <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer" onClick={() => setFeatureModalOpen(true)}>
                                <div className="flex items-center justify-between gap-1 ">
                                    <img src="/assets/images/dashboard/mdi_tag-outline.png" alt="map" className="w-5 pt-0.5" />
                                    <p className="lg:text-md md:text-sm font-bold text-[#343434]">特徴から選択</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-down" className="w-4" />
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">{getPrefectureKeyByValue(pref)}の{JobType}の求人</p>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <img src="/assets/images/dashboard/flowbite_sort-outline.png" alt="map" className="w-5 pt-0.5" />
                            <div className="flex text-center py-2 px-8 bg-white rounded-lg ml-4">
                                <p className="lg:text-md md:text-sm bg-gradient-to-tr from-[#FF1812] to-[#FF5B02] bg-clip-text text-transparent text-md font-bold">おすすめ</p>
                            </div>
                            <div className="flex text-center py-2 px-8 bg-white rounded-lg ml-4">
                                <p className="lg:text-md md:text-sm text-[#343434] text-md font-bold">新着</p>
                            </div>
                            <div className="flex text-center py-2 px-4 bg-white rounded-lg ml-4">
                                <p className="lg:text-md md:text-sm text-[#343434] text-md font-bold">自宅からの距離</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-start w-full mt-8 ">
                            {/* <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl border-4 border-[#FF6B56]">
                                <div className="absolute top-0 left-0 bg-[#FF6B56] rounded-tl-2xl px-4 py-2 ml-[-0.25rem] mt-[-0.25rem]">
                                    <p className="text-sm font-bold text-white">注目求人</p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start w-full gap-4 px-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434]">給与</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">正職員 222,000円〜283,800円</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434]">住所</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">新宿区下落合四丁目9番15号</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <img src="/assets/images/dashboard/Vector.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#FF6B56]">気になる</p>
                                    </button>
                                    <Link to={`/${path}/details/6760bdf23744a91f6441ef2b`} className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl border-4 border-[#FF6B56] mt-8">
                                <div className="absolute top-0 left-0 bg-[#FF6B56] rounded-tl-2xl px-4 py-2 ml-[-0.25rem] mt-[-0.25rem]">
                                    <p className="text-sm font-bold text-white">注目求人</p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start w-full gap-4 px-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434]">給与</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">正職員 222,000円〜283,800円</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434]">住所</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">新宿区下落合四丁目9番15号</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-[#E7E7E7] rounded-lg py-2 text-white w-1/2">
                                        <img src="/assets/images/dashboard/mdi_heart.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#188CE0]">気になる済</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
                                <div className="absolute top-0 left-0 bg-[#FF6B56] rounded-tl-2xl px-4 py-2">
                                    <p className="text-sm font-bold text-white">new</p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-2">
                                    <div className="flex gap-4 h-full">
                                        <div className="flex flex-col justify-center w-2/3 h-full">
                                            <div className="flex items-center justify-start">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">給与</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">正職員 222,000円〜283,800円</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">仕事内容</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">一般民家を使用したデイサービスにて一般介護全般、清掃業務、記録、運営に関わる業務</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">応募要件</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">※運転免許必須　未経験・無資格可　安心して勤務するこが出来る教育体制が整っております。（初期教育もあり）</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">住所</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">新宿区下落合四丁目9番15号</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">勤続支援金{" "}&nbsp;&nbsp;正職員12,500円 ~ 16,000円</p>
                                            </div>
                                        </div>
                                        <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">職場の環境</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">未経験可</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">通所介護・デイサービス</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">社会保険完備</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">ボーナス賞与あり</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">交通費支給</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <img src="/assets/images/dashboard/Vector.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#FF6B56]">気になる</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
                                <div className="absolute top-0 left-0 bg-[#FF6B56] rounded-tl-2xl px-4 py-2">
                                    <p className="text-sm font-bold text-white">new</p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-2">
                                    <div className="flex gap-4 h-full">
                                        <div className="flex flex-col justify-center w-2/3 h-full">
                                            <div className="flex items-center justify-start">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">給与</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">正職員 222,000円〜283,800円</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">仕事内容</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">一般民家を使用したデイサービスにて一般介護全般、清掃業務、記録、運営に関わる業務</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">応募要件</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">※運転免許必須　未経験・無資格可　安心して勤務することが出来る教育体制が整っております。（初期教育もあり）</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">住所</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">新宿区下落合四丁目9番15号</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">勤続支援金{" "}&nbsp;&nbsp;正職員12,500円 ~ 16,000円</p>
                                            </div>
                                        </div>
                                        <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">職場の環境</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">未経験可</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">通所介護・デイサービス</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">社会保険完備</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6 rem] font-bold">ボーナス賞与あり</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">交通費支給</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-[#E7E7E7] rounded-lg py-2 text-white w-1/2">
                                        <img src="/assets/images/dashboard/mdi_heart.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#188CE0]">気になる済</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div> */}
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-2">
                                    <div className="flex gap-4 h-full">
                                        <div className="flex flex-col justify-center w-2/3 h-full">
                                            <div className="flex items-center justify-start">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">給与</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">正職員 222,000円〜283,800円</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">仕事内容</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">一般民家を使用したデイサービスにて一般介護全般、清掃業務、記録、運営に関わる業務</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">応募要件</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">※運転免許必須　未経験・無資格可　安心して勤務することが出来る教育体制が整っております。（初期教育もあり）</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">住所</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">新宿区下落合四丁目9番15号</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">勤続支援金{" "}&nbsp;&nbsp;正職員12,500円 ~ 16,000円</p>
                                            </div>
                                        </div>
                                        <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">職場の環境</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">未経験可</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">通所介護・デイサービス</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">社会保険完備</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">ボーナス賞与あり</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">交通費支給</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-[#E7E7E7] rounded-lg py-2 text-white w-1/2">
                                        <img src="/assets/images/dashboard/mdi_heart.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#188CE0]">気になる済</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                            {jobPosts?.map((jobpost, index) => {
                                return (
                                    <div key={index} className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
                                        <div className="flex md:flex-col lg:flex-row items-start justify-between w-full">
                                            <img src={`${jobpost.picture}`} alt="arrow-down" className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"/>
                                            <div className="flex flex-col items-start justify-between p-4 w-full gap-8">
                                                <p className="lg:text-xl md:text-sm font-bold text-[#343434]">{jobpost.facility_id.name}の{jobpost.type}求人</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434]">{jobpost.sub_title}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-4 px-2 mt-2">
                                            <div className="flex gap-4 h-full">
                                                <div className="flex flex-col justify-center w-2/3 h-full">
                                                    <div className="flex items-center justify-start">
                                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">給与</p>
                                                        <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">{jobpost.employment_type} {jobpost.salary_type} {jobpost.salary_min}円〜{jobpost.salary_max}円</p>
                                                    </div>
                                                    <div className="flex items-start justify-start mt-4" >
                                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">仕事内容</p>
                                                        <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-4"><pre>{jobpost.work_content}</pre></p>
                                                    </div>
                                                    <div className="flex items-start justify-start mt-4">
                                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">応募要件</p>
                                                        <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">{jobpost.qualification_content} {jobpost.qualification_welcome}</p>
                                                    </div>
                                                    <div className="flex items-start justify-start mt-4">
                                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">住所</p>
                                                        <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">{jobpost.facility_id.access_text}</p>
                                                    </div>
                                                    <div className="flex items-start justify-start mt-4">
                                                        <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">勤続支援金{" "}&nbsp;&nbsp;正職員12,500円 ~ 16,000円</p>
                                                    </div>
                                                </div>
                                                <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                                                    {[
                                                        ...jobpost.work_item,
                                                        ...jobpost.service_subject,
                                                        ...jobpost.service_type,
                                                        ...jobpost.treatment_type,
                                                        ...jobpost.work_time_type,
                                                        ...jobpost.rest_type
                                                    ].map((item, index) => {
                                                        return (
                                                            <div key={index} className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">{item}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                            <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2 hover:bg-[#FF6B56]/20 hover:scale-105 duration-300">
                                                <img src="/assets/images/dashboard/Vector.png" alt="eye" className="w-4 pt-0.5" />
                                                <p className="text-sm font-bold text-[#FF6B56]">気になる</p>
                                            </button>
                                            <Link to={`/${path}/details/${jobpost.jobpost_id}`} className="flex items-center justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                                <p className="text-sm font-bold text-white">求人を見る</p>
                                            </Link>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                        <div className="flex flex-col bg-white rounded-lg px-4 py-2 w-full mt-8 shadow-xl">
                            <div className="flex items-center justify-center w-full gap-20 mt-8">
                                <img src="/assets/images/dashboard/ep_arrow-left.png" alt="eye" className="w-4" />
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-black text-[1rem] font-bold number">1</p>
                                    <p className="text-[#999999] text-[1rem] font-bold number">2</p>
                                    <p className="text-[#999999] text-[1rem] font-bold number">3</p>
                                    <p className="text-[#999999] text-sm font-bold number">...</p>
                                    <p className="text-[#999999] text-[1rem] font-bold number">100</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="eye" className="w-4" />
                            </div>
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-[#343434] text-center mt-2">ご希望の条件の求人が登録されたときに、いち早くお知らせします。</p>
                            <button className="text-center w-full bg-[#FF6B56] text-white rounded-lg py-2 mt-4">
                                <p className="lg:text-sm md:text-xs font-bold">この条件で新着求人を受け取る</p>
                            </button>
                            <button className="text-center w-full bg-white text-[#FF6B56] border-2 border-[#FF6B56] rounded-lg py-2 mt-4">
                                <p className="text-sm font-bold">検索条件を変更する</p>
                            </button>
                            <div className="flex items-center justify-center w-full mt-8 gap-2">
                                <img src="/assets/images/dashboard/ic_round-search.png" alt="search" className="w-6" />
                                <Input placeholder="例:市区町村、診療科目、特徴など" className="w-full" />
                            </div>
                            <Link to={"/#"} className="flex items-center justify-start mt-2 pl-2">
                                <p className="lg:text-sm md:text-xs font-bold">地図から求人を選択する</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </Link>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">介護職/ヘルパーの特集から探す</p>
                        </div>
                        <div className="flex flex-col bg-white rounded-lg px-8 py-4 w-full mt-8 shadow-xl">
                            <div className="flex items-center justify-between w-full">
                                <p className="lg:text-[1rem] md:text-[0.8rem] font-bold">特集ダミーテキストダミーテキストダミーテキストの求人</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4">
                                <p className="text-[1rem] font-bold">特集ダミーテキストダミーテキストダミーテキストの求人</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4">
                                <p className="lg:text-[1rem] md:text-[0.8rem] font-bold">特集ダミーテキストダミーテキストダミーテキストの求人</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4">
                                <p className="lg:text-[1rem] md:text-[0.8rem] font-bold">特集ダミーテキストダミーテキストダミーテキストの求人</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">介護職/ヘルパーについて</p>
                        </div>
                        <div className="flex flex-col bg-white rounded-lg px-12 py-6 w-full mt-8 shadow-xl">
                            <p className="lg:text-[1rem] md:text-[0.8rem]">あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。 またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーあのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。 またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザー</p>
                        </div>

                    </div>
                    <div className="flex h-full w-1/3">
                        <div className="flex flex-col items-center justify-start h-full w-full">
                            <div className="flex items-center justify-between bg-white rounded-lg lg:px-8 md:px-4 py-4 w-full shadow-xl">
                                <Link to={"/#"} className="lg:text-lg md:text-sm font-bold text-[#343434]">地図から求人を選択する</Link>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                            <img src="/assets/images/dashboard/Group 16.png" alt="banner" className="w-full mt-8" />
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm font-bold text-[#343434]">必ず役立つ仕事術</p>
                            </div>
                            <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 py-6 w-full mt-8 shadow-xl">
                                <div className="flex items-center justify-between w-full">
                                    <p className="lg:text-[1rem] md:text-[0.8rem]">ぴったりな仕事を探すには</p>
                                    <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                                </div>
                                <div className="flex items-center justify-between w-full mt-4">
                                    <p className="lg:text-[1rem] md:text-[0.8rem]">応募の仕方</p>
                                    <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                                </div>
                                <div className="flex items-center justify-between w-full mt-4">
                                    <p className="lg:text-[1rem] md:text-[0.8rem]">履歴書の書き方</p>
                                    <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                                </div>
                                <div className="flex items-center justify-between w-full mt-4">
                                    <p className="lg:text-[1rem] md:text-[0.8rem]">メッセージの書き方</p>
                                    <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                                </div>
                            </div>
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm text-[#343434] font-bold">人気のコラムランキング</p>
                            </div>
                            <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 py-6 w-full mt-8 shadow-xl">
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <img src="/assets/images/dashboard/Group 17.png" alt="arrow-right" />
                                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！</p>
                                </div>
                                <div className="flex items-center justify-between gap-2 w-full mt-4">
                                    <img src="/assets/images/dashboard/Group 17_2.png" alt="arrow-right" />
                                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！</p>
                                </div>
                                <div className="flex items-center justify-between gap-2 w-full mt-4">
                                    <img src="/assets/images/dashboard/Group 17_3.png" alt="arrow-right" />
                                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Link to={"/#"} className="flex items-center justify-center mt-4 border-2 border-[#FF6B56] rounded-lg py-2 lg:px-16 md:px-8 px-4">
                                        <p className="lg:text-[0.75rem] md:text-[0.6rem] text-[#FF6B56]">ランキングをもっと見る</p>
                                    </Link>
                                </div>
                            </div>
                            {user == null && (
                                <>
                                    <div className="flex items-center justify-start w-full mt-8">
                                        <p className="lg:text-lg md:text-sm text-[#343434] font-bold">会員登録がまだの方</p>
                                    </div>
                                    <div className="flex flex-col items-center bg-white rounded-lg py-6 w-full mt-8 shadow-xl">
                                        <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] pb-2">
                                            <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">1.</p>
                                            <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">事務所からスカウトが届く</p>
                                        </div>
                                        <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] mt-2 pb-2">
                                            <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">2.</p>
                                            <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">希望にあった求人が届く</p>
                                        </div>
                                        <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] mt-2 pb-2">
                                            <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">3.</p>
                                            <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">会員限定機能が利用できる</p>
                                        </div>
                                        <Link to={"/members/sign_up"} className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-tr from-[#FF1812] to-[#FF5B02] rounded-lg px-6 py-2 hover:scale-105 duration-300">
                                            <img src="/assets/images/dashboard/mdi_account.png" alt="register" className="pt-0.5" />
                                            <p className="lg:text-lg md:text-sm text-white font-bold">無料で会員登録する</p>
                                        </Link>
                                    </div>
                                </>
                            )}
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm text-[#343434] font-bold">LINEでお問い合わせOK</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg px-6 py-6 w-full mt-8 shadow-xl">
                                <img src="/assets/images/dashboard/Rectangle 11.png" alt="line" className="w-full" />
                            </div>
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm text-[#343434] font-bold">JobJob公式SNS</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg px-6 py-6 w-full mt-8 shadow-xl">
                                <img src="/assets/images/dashboard/Rectangle 11.png" alt="line" className="w-full" />
                            </div>
                        </div>

                    </div>
                </div>
           </div>
           {
                <Modal
                    open={prefectureModalOpen}
                    onCancel={() => setPrefectureModalOpen(false)}
                    footer={null}
                    width={1000}
                    height={800}
                    className="modal"
                >
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
                                                onClick={() => onClickPref(Prefectures.KANTO[prefecture])}
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
                                                onClick={() => onClickPref(Prefectures.KANSAI[prefecture])}
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
                                                onClick={() => onClickPref(Prefectures.TOKAI[prefecture])}
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
                                                onClick={() => onClickPref(Prefectures.HOKKAIDO_TOHOKU[prefecture])}
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
                                                onClick={() => onClickPref(Prefectures.KOSHINETSU_HOKURIKU[prefecture])}
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
                                                onClick={() => onClickPref(Prefectures.CHUGOKU_SHIKOKU[prefecture])}
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
                                                onClick={() => onClickPref(Prefectures.KYUSHU_OKINAWA[prefecture])}
                                            >
                                                {prefecture}
                                            </Link>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div> 
                </Modal>
           }
           {
                <Modal
                    open={employmentTypeModalOpen}
                    onCancel={() => setEmploymentTypeModalOpen(false)}
                    footer={null}
                    width={1000}
                    height={800}
                    className="modal"
                >
                    <div className="w-full">
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">雇用形態</p>
                            <div className="flex items-center justify-start desire gap-4 mt-4">
                                {Object.keys(EmploymentType).map((employmentTypeKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setEmploymentType(EmploymentType[employmentTypeKey])
                                            setEmploymentTypeModalOpen(false)    
                                        }} checked={employmentType === EmploymentType[employmentTypeKey]}>{employmentTypeKey}</Checkbox>
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
                </Modal>
           }
           {
                <Modal
                    open={featureModalOpen}
                    onCancel={() => setFeatureModalOpen(false)}
                    footer={null}
                    width={1000}
                    height={800}
                    className="modal"
                >
                    <div className="w-full">
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">休日の特徴</p>
                            <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                {Object.keys(Features.HOLIDAY).map((featureKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setFeature(Features.HOLIDAY[featureKey])
                                            setFeatureModalOpen(false)    
                                        }}
                                            checked={feature === Features.HOLIDAY[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">勤務時間の特徴</p>
                            <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                {Object.keys(Features.WORKING_HOURS).map((featureKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setFeature(Features.WORKING_HOURS[featureKey])
                                            setFeatureModalOpen(false)    
                                        }} checked={feature === Features.WORKING_HOURS[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">アクセスの特徴</p>
                            <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                {Object.keys(Features.ACCESS).map((featureKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setFeature(Features.ACCESS[featureKey])
                                            setFeatureModalOpen(false)    
                                        }} checked={feature === Features.ACCESS[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">仕事内容の特徴</p>
                            <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                {Object.keys(Features.DESCRIPTION).map((featureKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setFeature(Features.DESCRIPTION[featureKey])
                                            setFeatureModalOpen(false)    
                                        }} checked={feature === Features.DESCRIPTION[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">給与・待遇・福利厚生の特徴</p>
                            <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                {Object.keys(Features.SALARY_BENEFITS_WELFARE).map((featureKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setFeature(Features.SALARY_BENEFITS_WELFARE[featureKey])
                                            setFeatureModalOpen(false)    
                                        }} checked={feature === Features.SALARY_BENEFITS_WELFARE[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">サービス形態の特徴</p>
                            <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                {Object.keys(Features.SERVICE_TYPES).map((featureKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setFeature(Features.SERVICE_TYPES[featureKey])
                                            setFeatureModalOpen(false)    
                                        }} checked={feature === Features.SERVICE_TYPES[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">教育体制・教育の特徴</p>
                            <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                {Object.keys(Features.EDUCATION).map((featureKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setFeature(Features.EDUCATION[featureKey])
                                            setFeatureModalOpen(false)    
                                        }} checked={feature === Features.EDUCATION[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full p-6">
                            <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">診療科目の特徴</p>
                            <div className="w-full desireEmployment flex flex-wrap gap-2 mt-4 justify-start">
                                {Object.keys(Features.MEDICAL_DEPARTMENT).map((featureKey, index) => {
                                    return (
                                        <Checkbox key={index} onChange={() => {
                                            setFeature(Features.MEDICAL_DEPARTMENT[featureKey])
                                            setFeatureModalOpen(false)    
                                        }} checked={feature === Features.MEDICAL_DEPARTMENT[featureKey]} className="w-[calc(33.33%-0.5rem)]">{featureKey}</Checkbox>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Modal>
           }
        </>
    )
}

export default JobLists;
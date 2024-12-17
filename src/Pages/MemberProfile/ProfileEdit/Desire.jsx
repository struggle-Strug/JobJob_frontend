import React, { useEffect, useState } from "react";
import Private from "../../../components/Private";
import { JobType as JobTypes } from "../../../utils/constants/categories/jobtype";
import { Checkbox, Input, message, Select } from "antd";
import { useAuth } from "../../../context/AuthContext";
import { EmploymentType, Features, Prefectures } from "../../../utils/constants/categories";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Desire = () => {
    const { user, setUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [toggleMedical, setToggleMedical] = useState(false);
    const [toggleDentist, setToggleDentist] = useState(false);
    const [toggleNursing, setToggleNursing] = useState(false);
    const [toggleChildcare, setToggleChildcare] = useState(false);
    const [toggleRehabilitation, setToggleRehabilitation] = useState(false);
    const [toggleOther, setToggleOther] = useState(false);
    const [toggleHealthcare, setToggleHealthcare] = useState(false);
    const [jobTypes, setJobTypes] = useState([]);
    const [prefectures, setPrefectures] = useState([]);
    const [employmentType, setEmploymentType] = useState("")
    const [employmentDate, setEmploymentDate] = useState("")
    const [yearSalary, setYearSalary] = useState("")
    const [asks, setAsks] = useState([]);
    const [toggleFeature_1, setToggleFeature_1] = useState(false);
    const [toggleFeature_2, setToggleFeature_2] = useState(false);
    const [toggleFeature_3, setToggleFeature_3] = useState(false);
    const [toggleFeature_4, setToggleFeature_4] = useState(false);
    const [toggleFeature_5, setToggleFeature_5] = useState(false);
    const [toggleFeature_6, setToggleFeature_6] = useState(false);
    const [toggleFeature_7, setToggleFeature_7] = useState(false);
    const [toggleFeature_8, setToggleFeature_8] = useState(false);
    const navigate = useNavigate();


    const medicalKeys = Object.keys(JobTypes.医科);
    const dentistKeys = Object.keys(JobTypes.歯科);
    const nursingKeys = Object.keys(JobTypes.介護);
    const childcareKeys = Object.keys(JobTypes.保育);
    const rehabilitationKeys = Object.keys(JobTypes["リハビリ／代替医療"]);
    const otherKeys = Object.keys(JobTypes.その他);
    const healthcareKeys = Object.keys(JobTypes["ヘルスケア／美容"]);
    const employmentKeys = Object.keys(EmploymentType);

    const featureKeys_1 = Object.keys(Features.HOLIDAY);
    const featureKeys_2 = Object.keys(Features.WORKING_HOURS);
    const featureKeys_3 = Object.keys(Features.ACCESS);
    const featureKeys_4 = Object.keys(Features.DESCRIPTION);
    const featureKeys_5 = Object.keys(Features.SALARY_BENEFITS_WELFARE);
    const featureKeys_6 = Object.keys(Features.SERVICE_TYPES);
    const featureKeys_7 = Object.keys(Features.EDUCATION);
    const featureKeys_8 = Object.keys(Features.MEDICAL_DEPARTMENT);

    const createOptions = (keys) => keys.map((item) => ({
        label: item,
        value: item
    }));

    const employmentOptions = createOptions(employmentKeys);
    const featureOptions_1 = createOptions(featureKeys_1);
    const featureOptions_2 = createOptions(featureKeys_2);
    const featureOptions_3 = createOptions(featureKeys_3);
    const featureOptions_4 = createOptions(featureKeys_4);
    const featureOptions_5 = createOptions(featureKeys_5);
    const featureOptions_6 = createOptions(featureKeys_6);
    const featureOptions_7 = createOptions(featureKeys_7);
    const featureOptions_8 = createOptions(featureKeys_8);

    const employmentDateOptions = [
        { value: '選択する', label: '' },
        { value: '今すぐに', label: '今すぐに' },
        { value: '1か月以内', label: '1か月以内' },
        { value: '3か月以内', label: '3か月以内' },
        { value: '3か月以上先', label: '3か月以上先' },
        { value: '機会があれば転職を検討したい', label: '機会があれば転職を検討したい' },
    ]

    const periodOptions = [
        { value: '未経験', label: '未経験' },
        { value: '2年未満', label: '2年未満' },
        { value: '3年未満', label: '3年未満' },
        { value: '4年未満', label: '4年未満' },
        { value: '5年未満', label: '5年未満' },
        { value: '6年未満', label: '6年未満' },
        { value: '7年未満', label: '7年未満' },
        { value: '8年未満', label: '8年未満' },
        { value: '9年未満', label: '9年未満' },
        { value: '10年未満', label: '10年未満' },
        { value: '10年以上', label: '10年以上' },
    ];

    const prefecturesOptions = Object.entries(Prefectures).flatMap(([region, prefs]) => 
        Object.entries(prefs).map(([name, value]) => ({ label: name, value: name }))
    );

    const onCheckboxChange = (jobType, checked) => {
        setJobTypes(prevState => {
            if (checked) {
                if (!prevState.some(job => job.type === jobType)) {
                    return [...prevState, { type: jobType, period: '' }];
                }
            } else {
                return prevState.filter(job => job.type !== jobType);
            }
            return prevState;
        });
    };

    const onPeriodChange = (jobType, period) => {
        setJobTypes(prevState =>
            prevState.map(job =>
                job.type === jobType ? { ...job, period } : job
            )
        );
    };

    const onChangeFeature = (values, category) => {
        const otherCategories = Object.keys(Features).filter(key => key !== category);
        const otherValues = asks.filter(f => 
            otherCategories.some(cat => Object.keys(Features[cat]).includes(f))
        );
        const newFeatures = [...otherValues, ...values];
        setAsks(newFeatures);
    };

    const handleAddPrefecture = () => {
        setPrefectures([...prefectures, ""])
    }

    const handlePrefectureChange = (value, index) => {
        const newPrefectures = [...prefectures];
        newPrefectures[index] = value;
        setPrefectures(newPrefectures);
    }

    const renderJobItem = (jobType) => {
        const isSelected = jobTypes?.some(job => job.type === jobType);
        const period = jobTypes?.find(job => job.type === jobType)?.period;

        return (
            <div key={jobType} className="flex items-center justify-between py-1 mt-1 lg:text-base md:text-sm text-xs bg-red-100 pr-2 rounded-lg">
                <Checkbox
                    checked={isSelected}
                    onChange={e => onCheckboxChange(jobType, e.target.checked)}
                >
                    {jobType}
                </Checkbox>
                <Select
                    className="w-32"
                    placeholder="未設定"
                    value={period || undefined}
                    onChange={value => onPeriodChange(jobType, value)}
                    options={periodOptions}
                    disabled={!isSelected}
                />
            </div>
        );
    };

    const renderFeatureItem = (feature, category) => {
        
        const isSelected = asks?.includes(feature);
    
        return (
            <div key={feature} className="flex items-center justify-between py-1 mt-1 lg:text-base md:text-sm text-xs bg-red-100 pr-2 rounded-lg">
                <Checkbox
                    checked={isSelected}
                    onChange={e => {
                        const newAsks = e.target.checked
                            ? [...asks, feature]
                            : asks.filter(f => f !== feature);
                        onChangeFeature(newAsks, category);
                    }}
                >
                    {feature}
                </Checkbox>
            </div>
        );
    };
    

    const renderCheckboxGroup = (options, onChange, selectedValues, category = null) => (
        <Checkbox.Group
            options={options}
            value={selectedValues}
            onChange={(values) => onChange(values, category)}
        />
    );

    const handleSave = async () => {
        const payload = {
            jobTypes: jobTypes,
            prefectures: prefectures,
            employmentType: employmentType,
            employmentDate: employmentDate,
            yearSalary: yearSalary,
            asks: asks,
        }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/${user?._id}/update/desire`, payload);
        if(res.data.error) return message.error(res.data.message);
        message.success(res.data.message);
        setUser(res.data.user);
        navigate("/members/profile");
    }

    useEffect(() => {
        setJobTypes(user?.jobType);
        setPrefectures(user?.prefecture);
        setEmploymentType(user?.employmentType);
        setEmploymentDate(user?.employmentDate);
        setYearSalary(user?.desireYearSalary);
        setAsks(user?.feature);
        setToggleMedical(user?.jobType?.some(item => Object.keys(JobTypes.医科).includes(item.type)));
        setToggleDentist(user?.jobType?.some(item => Object.keys(JobTypes.歯科).includes(item.type)));
        setToggleNursing(user?.jobType?.some(item => Object.keys(JobTypes.介護).includes(item.type)));
        setToggleChildcare(user?.jobType?.some(item => Object.keys(JobTypes.保育).includes(item.type)));
        setToggleRehabilitation(user?.jobType?.some(item => Object.keys(JobTypes["リハビリ／代替医療"]).includes(item.type)));
        setToggleOther(user?.jobType?.some(item => Object.keys(JobTypes.その他).includes(item.type)));
        setToggleHealthcare(user?.jobType?.some(item => Object.keys(JobTypes["ヘルスケア／美容"]).includes(item.type)));
        setToggleFeature_1(user?.feature?.some(item => Object.keys(Features.HOLIDAY).includes(item)));
        setToggleFeature_2(user?.feature?.some(item => Object.keys(Features.WORKING_HOURS).includes(item)));
        setToggleFeature_3(user?.feature?.some(item => Object.keys(Features.ACCESS).includes(item)));
        setToggleFeature_4(user?.feature?.some(item => Object.keys(Features.DESCRIPTION).includes(item)));
        setToggleFeature_5(user?.feature?.some(item => Object.keys(Features.SALARY_BENEFITS_WELFARE).includes(item)));
        setToggleFeature_6(user?.feature?.some(item => Object.keys(Features.SERVICE_TYPES).includes(item)));
        setToggleFeature_7(user?.feature?.some(item => Object.keys(Features.EDUCATION).includes(item)));
        setToggleFeature_8(user?.feature?.some(item => Object.keys(Features.MEDICAL_DEPARTMENT).includes(item)));
    }, [user]);

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">希望条件</p>
                    <div className="flex items-center justify-between w-full mt-2">
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
                        <button
                            className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            非公開
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
                <div className="flex items-start justify-start w-full mt-2">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
                            希望職種/経験年数
                        </span>
                        <p className="text-[#FF2A3B] text-sm pt-1">(必須)</p>
                    </div>
                    <div className="flex flex-col w-3/5">
                        <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2 desire">
                            <div className="w-full gap-2 ">
                                <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                onClick={() => setToggleMedical(!toggleMedical)}>
                                    <p>
                                        医科
                                    </p>
                                    <img 
                                        src={'/assets/images/top/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className={`duration-300 ${!toggleMedical ? "rotate-90" : "-rotate-90"}`}
                                    />
                                </p>
                            </div>
                            <div className={`duration-300 overflow-hidden ${toggleMedical ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="mt-4">
                                    {medicalKeys.map(key => renderJobItem(key))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2 desire">
                            <div className="w-full gap-2 ">
                                <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                onClick={() => setToggleDentist(!toggleDentist)}>
                                    <p>
                                        歯科
                                    </p>
                                    <img 
                                        src={'/assets/images/top/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className={`duration-300 ${!toggleDentist ? "rotate-90" : "-rotate-90"}`}
                                    />
                                </p>
                            </div>
                            <div className={`duration-300 overflow-hidden ${toggleDentist ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="mt-4">
                                    {dentistKeys.map(renderJobItem)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2 desire">
                            <div className="w-full gap-2 ">
                                <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                onClick={() => setToggleNursing(!toggleNursing)}>
                                    <p>
                                        介護
                                    </p>
                                    <img 
                                        src={'/assets/images/top/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className={`duration-300 ${!toggleNursing ? "rotate-90" : "-rotate-90"}`}
                                    />
                                </p>
                            </div>
                            <div className={`duration-300 overflow-hidden ${toggleNursing ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="mt-4">
                                    {nursingKeys.map(renderJobItem)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2 desire">
                            <div className="w-full gap-2 ">
                                <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                onClick={() => setToggleChildcare(!toggleChildcare)}>
                                    <p>
                                        保育
                                    </p>
                                    <img 
                                        src={'/assets/images/top/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className={`duration-300 ${!toggleChildcare ? "rotate-90" : "-rotate-90"}`}
                                    />
                                </p>
                            </div>
                            <div className={`duration-300 overflow-hidden ${toggleChildcare ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="mt-4">
                                    {childcareKeys.map(renderJobItem)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2 desire">
                            <div className="w-full gap-2 ">
                                <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                onClick={() => setToggleRehabilitation(!toggleRehabilitation)}>
                                    <p>
                                        リハビリ／代替医療
                                    </p>
                                    <img 
                                        src={'/assets/images/top/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className={`duration-300 ${!toggleRehabilitation ? "rotate-90" : "-rotate-90"}`}
                                    />
                                </p>
                            </div>
                            <div className={`duration-300 overflow-hidden ${toggleRehabilitation ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="mt-4">
                                    {rehabilitationKeys.map(renderJobItem)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2 desire">
                            <div className="w-full gap-2 ">
                                <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                onClick={() => setToggleOther(!toggleOther)}>
                                    <p>
                                        その他
                                    </p>
                                    <img 
                                        src={'/assets/images/top/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className={`duration-300 ${!toggleOther ? "rotate-90" : "-rotate-90"}`}
                                    />
                                </p>
                            </div>
                            <div className={`duration-300 overflow-hidden ${toggleOther ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="mt-4">
                                    {otherKeys.map(renderJobItem)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2 desire">
                            <div className="w-full gap-2 ">
                                <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                onClick={() => setToggleHealthcare(!toggleHealthcare)}>
                                    <p>
                                        ヘルスケア／美容
                                    </p>
                                    <img 
                                        src={'/assets/images/top/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className={`duration-300 ${!toggleHealthcare ? "rotate-90" : "-rotate-90"}`}
                                    />
                                </p>
                            </div>
                            <div className={`duration-300 overflow-hidden ${toggleHealthcare ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="mt-4">
                                    {healthcareKeys.map(renderJobItem)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start justify-start w-full mt-2">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
                            希望勤務地
                        </span>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 w-3/5">
                        {prefectures && prefectures?.map((prefecture, index) => {
                            return (
                                <Select key={index} options={prefecturesOptions} className="w-1/2" value={prefecture} onChange={(value) => handlePrefectureChange(value, index)}/>
                            )
                        })}
                        <div className="text-center w-full mt-8">
                            <button onClick={handleAddPrefecture} className="bg-[#fff8f8] text-[#FF2A3B] px-2 py-1 rounded-lg">希望勤務地を追加する</button>
                        </div>
                    </div>
                </div>
                <div className="flex items-start justify-start w-full mt-4">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
                            希望勤務形態
                        </span>
                    </div>
                    <div className="flex items-start justify-start gap-2 w-3/5 desireEmployment">
                        <Checkbox.Group options={employmentOptions} value={employmentType} onChange={(value) => setEmploymentType(value)} className="w-full"/>
                    </div>
                </div>
                <div className="flex items-start justify-start w-full mt-4">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
                            希望入職時期
                        </span>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 w-3/5">
                        <Select options={employmentDateOptions} value={employmentDate} onChange={(value) => setEmploymentDate(value)} className="w-1/2"/>
                    </div>
                </div>
                <div className="flex items-start justify-start w-full mt-4">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
                            希望年収
                        </span>
                    </div>
                    <div className="flex items-start justify-start gap-2 w-3/5">
                        <Input value={yearSalary} onChange={(value) => setYearSalary(value)} className="w-1/3"/>万円
                    </div>
                </div>
                <div className="flex items-start justify-start w-full mt-8">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">
                            こだわり条件
                        </span>
                    </div>
                    <div className="flex flex-col w-3/5">
                        {[
                            { title: '休日', options: featureOptions_1, toggle: toggleFeature_1, setToggle: setToggleFeature_1, category: 'HOLIDAY' },
                            { title: '勤務時間', options: featureOptions_2, toggle: toggleFeature_2, setToggle: setToggleFeature_2, category: 'WORKING_HOURS' },
                            { title: 'アクセス', options: featureOptions_3, toggle: toggleFeature_3, setToggle: setToggleFeature_3, category: 'ACCESS' },
                            { title: '仕事内容', options: featureOptions_4, toggle: toggleFeature_4, setToggle: setToggleFeature_4, category: 'DESCRIPTION' },
                            { title: '給与・待遇・福利厚生', options: featureOptions_5, toggle: toggleFeature_5, setToggle: setToggleFeature_5, category: 'SALARY_BENEFITS_WELFARE' },
                            { title: 'サービス形態', options: featureOptions_6, toggle: toggleFeature_6, setToggle: setToggleFeature_6, category: 'SERVICE_TYPES' },
                            { title: '教育体制・教育', options: featureOptions_7, toggle: toggleFeature_7, setToggle: setToggleFeature_7, category: 'EDUCATION' },
                            { title: '診療科目', options: featureOptions_8, toggle: toggleFeature_8, setToggle: setToggleFeature_8, category: 'MEDICAL_DEPARTMENT' },
                        ].map((feature, index) => (
                            <div key={index} className={`flex flex-col border-t-[0.1rem] ${index === 7 ? 'border-b-[0.1rem]' : ''} border-[#a7a3a3] py-4 px-2 desire`}>
                                <div className="w-full gap-2">
                                    <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                    onClick={() => feature.setToggle(!feature.toggle)}>
                                        <span>{feature.title}</span>
                                        <img 
                                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                                            alt="arrow" 
                                            className={`duration-300 ${!feature.toggle ? "rotate-90" : "-rotate-90"}`}
                                        />
                                    </p>
                                </div>
                                <div className={`duration-300 overflow-hidden ${feature.toggle ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                    <div className="mt-4">
                                        {/* {renderCheckboxGroup(feature.options, onChangeFeature, asks, feature.category)} */}
                                        {feature.options.map(option => renderFeatureItem(option.value, feature.category))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-8 gap-4">
                    <Link to={"/members/profile"} className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300">プロフィール一覧を見る</Link>
                    <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={handleSave}>保存して確認する</button>
                </div>
            </div>

            {isOpen && <Private isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};

export default Desire;

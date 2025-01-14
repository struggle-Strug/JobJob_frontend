import { useEffect, useState } from "react";
import Private from "../../../components/Private";
import { Input, message, Select } from "antd";
import { getDateOptions } from "../../../utils/date";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const Education = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastEducation, setLastEducation] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [department, setDepartment] = useState("");
    const [major, setMajor] = useState("");
    const [graduation, setGraduation] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [graduationMonth, setGraduationMonth] = useState("");
    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    const lastEducationOptions = [
        { value: "", label: "選択する" },
        { value: "高等学校", label: "高等学校" },
        { value: "高等専門学校", label: "高等専門学校" },
        { value: "短期大学", label: "短期大学" },
        { value: "大学", label: "大学" },
        { value: "大学院(修士)", label: "大学院(修士)" },
        { value: "大学院(博士)", label: "大学院(博士)" },
    ]

    const graduationOptions = [
        { value: "", label: "選択する" },
        { value: "卒業", label: "卒業" },
        { value: "中退", label: "中退" },
        { value: "卒業見込み", label: "卒業見込み" },
    ]

    const { yearsOptions, monthsOptions } = getDateOptions();

    const handleSave = async () => {
        if(graduation === "卒業見込み" && (graduationYear < new Date().getFullYear() || (graduationYear === new Date().getFullYear() && graduationMonth < new Date().getMonth() + 1))) return message.error("卒業年月を正確に選択してください。");
        const userData = {
            lastEducation: lastEducation,
            schoolName: schoolName,
            department: department,
            major: major,
            graduation: graduation,
            graduationDate: `${graduationYear}-${graduationMonth}`,
        }

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/${user._id}/update`, userData)
        if(res.data.error) return message.error(res.data.message);
        setUser(res.data.user);
        message.success(res.data.message);
        navigate("/members/profiles");
    }

    useEffect(() => {
        setLastEducation(user?.lastEducation)
        setSchoolName(user?.schoolName)
        setDepartment(user?.department)
        setMajor(user?.major)
        setGraduation(user?.graduation)
        const graduationYear = user?.graduationDate?.split("-")[0]
        const graduationMonth = user?.graduationDate?.split("-")[1]
        setGraduationYear(graduationYear)
        setGraduationMonth(graduationMonth)
    },[])

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">基本情報</p>
                    <div className="flex items-center justify-between w-full mt-2">
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
                        <button className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg" onClick={() => setIsOpen(!isOpen)}>非公開について</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
                <div className="flex items-center justify-center w-full mt-2">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">最終学歴</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 w-3/5">
                        <Select options={lastEducationOptions} value={lastEducation} onChange={(value) => setLastEducation(value)} className="w-1/2"/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-2">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">学校名</span>
                        <span className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 w-3/5 mt-4">
                        <Input placeholder="学校名" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="w-3/4"/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-2">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">学部・学科</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 w-3/5 mt-4">
                        <Input placeholder="学部・学科" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-3/4"/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-2">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">専攻</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 w-3/5 mt-4">
                        <Input placeholder="専攻" value={major} onChange={(e) => setMajor(e.target.value)} className="w-3/4"/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-4">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">卒業区分</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 w-3/5">
                        <Select options={graduationOptions} value={graduation} onChange={(value) => setGraduation(value)} className="w-1/2"/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-4">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">卒業年月</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 w-3/5 lg:text-base md:text-sm text-xs text-[#343434]">
                        <Select options={yearsOptions} value={graduationYear} onChange={(value) => setGraduationYear(value)} className="w-1/2"/>
                            年
                        <Select options={monthsOptions} value={graduationMonth} onChange={(value) => setGraduationMonth(value)} className="w-1/2"/>
                            月
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-8 gap-4">
                    <Link to={"/members/profiles"} className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300">プロフィール一覧を見る</Link>
                    <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={handleSave}>保存して確認する</button>
                </div>
            </div>

            {isOpen && <Private isOpen={isOpen} setIsOpen={setIsOpen}/>}
        </>
    )
}

export default Education;
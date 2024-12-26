import { Checkbox, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { getDateOptions } from "../../../../utils/date";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EducationEdit = ({rireki}) => {
    const [educations, setEducations] = useState([{
        schoolName_department_major: "",
        notes: [],
        admissionYear: "",
        admissionMonth: "",
        admission: "",
        graduationYear: "",
        graduationMonth: "",
        graduation: "",

    }])

    const navigate = useNavigate();

    const { yearsOptions, monthsOptions } = getDateOptions();

    const admissionOptions = [
        { label: "選択する", value: "" },
        { label: "入学", value: "入学" },
        { label: "転入学", value: "転入学" },
        { label: "編入学", value: "編入学" },
    ]

    const graduationOptions = [
        { value: "", label: "選択する" },
        { value: "卒業", label: "卒業" },
        { value: "修了", label: "修了" },
        { value: "転学", label: "転学" },
        { value: "中退退学", label: "中退退学" },
        { value: "卒業見込み", label: "卒業見込み" },
    ]

    const validateEducation = (history) => {
        const requiredFields = [
            'schoolName_department_major',
        ];
        
        for (let field of requiredFields) {
            if (!history[field]) {
                return {status: false, field: field};
            }
        }
        return {status: true};
    };

    const handleGenerate = () => {
        const lastEducation = educations[educations.length - 1];
        if (!validateEducation(lastEducation).status) {
            if(validateEducation(lastEducation).field === "schoolName_department_major") message.error('学校・学部・学科・専攻名を入力してください。');
            return;
        }
        setEducations([...educations, {
            schoolName_department_major: "",
            notes: [""],
            admissionYear: "",
            admissionMonth: "",
            admission: "",
            graduationYear: "",
            graduationMonth: "",
            graduation: "",
    
        }]);
    };

    const handleDeleteEducation = (index) => {
        const newEducations = educations.filter((_, i) => i !== index);
        setEducations(newEducations);
    };

    const handleSave = async () => {
        let educationDatas = [];
        if(educations.length === 0) {
            const resData = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rireki/update/education/${rireki._id}`, educationDatas);
            if(resData.data.error) return message.error(resData.data.message);
            message.success(resData.data.message);
            navigate(`/members/resumes/rireki/detail/${rireki._id}`);
            return;
        }
        const lastEducation = educations[educations.length - 1];
        if(!validateEducation(lastEducation).status) return message.error("すべてのフィールドに入力してください。")
           educationDatas = educations.map(education => ({
            schoolName_department_major: education.schoolName_department_major,
            notes: education.notes,
            admissionDate: `${education.admissionYear}-${education.admissionMonth}`,
            admission: education.admission,
            graduationDate: `${education.graduationYear}-${education.graduationMonth}`,
            graduation: education.graduation,
        }));

        const resData = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rireki/update/education/${rireki._id}`, educationDatas);
        if(resData.data.error) return message.error(resData.data.message);
        message.success(resData.data.message);
        navigate(`/members/resumes/rireki/detail/${rireki._id}`);
    };

    useEffect(() => {
        setEducations(rireki?.education.length > 0 ? rireki.education.map(education => {
            return {
                schoolName_department_major: education.schoolName_department_major,
                notes: education.notes,
                admissionYear: education.admissionDate ? education.admissionDate.split("-")[0] : "",
                admissionMonth: education.admissionDate ? education.admissionDate.split("-")[1] : "",
                admission: education.admission,
                graduationYear: education.graduationDate ? education.graduationDate.split("-")[0] : "",
                graduationMonth: education.graduationDate ? education.graduationDate.split("-")[1] : "",
                graduation: education.graduation,
            }
        }) : [{
            schoolName_department_major: "",
            notes: [""],
            admissionYear: "",
            admissionMonth: "",
            admission: "",
            graduationYear: "",
            graduationMonth: "",
            graduation: "",
        }])
    },[])

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">学歴</p>
                    <p className="lg:text-base md:text-sm text-xs text-[#343434]">履歴書には入学年月の古い順で自動で並び変えられます</p>
                    <div className="flex items-center justify-between w-full mt-2">
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
                {educations.map((education, index) => {
                    return (
                        <>
                            <EducationEditEntry
                                key={index}
                                educations={educations}
                                education={education}
                                setEducations={setEducations}
                                handleDeleteEducation={handleDeleteEducation}
                                index={index}
                                updateEducation={(field, value) => {
                                    const newEducations = [...educations];
                                    newEducations[index][field] = value;
                                    setEducations(newEducations);
                                }}
                                yearsOptions={yearsOptions}
                                monthsOptions={monthsOptions}
                                admissionOptions={admissionOptions}
                                graduationOptions={graduationOptions}
                            />
                        </>
                    )
                })}
                <div className="flex items-start justify-center w-full mt-6">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434]"></span>
                    </div>
                    <div className="flex items-start justify-start gap-2 w-3/5 desire">
                        { educations.length > 1 && <Checkbox onChange={() => setEducations([{
                                                schoolName_department_major: "",
                                                notes: [""],
                                                admissionYear: "",
                                                admissionMonth: "",
                                                admission: "",
                                                graduationYear: "",
                                                graduationMonth: "",
                                                graduation: "",

                                            }])} className="lg:text-base md:text-sm text-xs text-[#343434]">
                            学歴を記載しない
                        </Checkbox>}
                    </div>
                </div>
                <div className="text-center w-full mt-8">
                    <button onClick={handleGenerate} className="bg-[#fff8f8] text-[#FF2A3B] px-2 py-1 rounded-lg">学歴を追加する</button>
                </div>
                <div className="flex items-center justify-center w-full mt-8 gap-4">
                    <Link to={`/members/resumes/rireki/detail/${rireki?._id}`} className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300">もどる</Link>
                    <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={handleSave}>保存する</button>
                </div>
            </div>
        </>
    )
}

const EducationEditEntry = ({educations, education, setEducations, index, updateEducation, yearsOptions, monthsOptions, admissionOptions, graduationOptions, handleDeleteEducation}) => {
    return (
        <div className="flex flex-col items-start justify-start w-full mt-2">
            <div className="flex items-center justify-between w-full">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">学歴<span className="number">{index + 1}</span></p>
                <button
                    onClick={() => handleDeleteEducation(index)}
                    className="text-[#FF2A3B] lg:text-sm md:text-xs text-xs hover:underline"
                >
                    この学歴を削除する
                </button>
            </div>
            <div className="flex items-start justify-center w-full mt-2">
                <div className="flex items-center justify-start gap-2 w-2/5">
                    <span className="lg:text-base md:text-sm text-xs text-[#343434]">学校・学部・学科・専攻名</span>
                </div>
                <div className="flex flex-col items-start justify-start gap-2 w-3/5">
                    <Input placeholder="学校・学部・学科・専攻名" value={education.schoolName_department_major} onChange={(e) => {updateEducation("schoolName_department_major", e.target.value)}}  className="p-2"/>
                    <p className="lg:text-sm md:text-xs text-xs text-[#343434]">※名称は省略せず正式名称で表記してください</p>
                </div>
            </div>
            <div className="flex items-start justify-center w-full mt-4">
                <div className="flex items-center justify-start gap-2 w-2/5">
                    <span className="lg:text-base md:text-sm text-xs text-[#343434]">備考欄</span>
                </div>
                <div className="flex flex-col items-start justify-start gap-2 w-3/5">
                    <p className="lg:text-sm md:text-xs text-xs text-[#343434]">休学や留学の場合は、備考欄を使用してください</p>
                    {education.notes.map((note, noteIndex) => {
                        return (
                                    <>
                                            <Input placeholder="備考欄"  key={noteIndex} value={note} onChange={(e) => {
                                                const newEducations = [...educations];
                                                newEducations[index].notes[noteIndex] = e.target.value;
                                                setEducations(newEducations);
                                            }} className="p-2"/>
                                            <button 
                                                onClick={() => {
                                                    const newEducations = [...educations];
                                                    newEducations[index].notes = education.notes.filter((_, i) => i !== noteIndex);
                                                    setEducations(newEducations);
                                                }}
                                                className="text-[#FF2A3B] lg:text-sm md:text-xs text-xs hover:underline whitespace-nowrap"
                                            >
                                                この備考欄を削除する
                                            </button>
                                    </>
                                )
                    })}
                </div>
            </div>
            <div className="flex items-start justify-center w-full mt-4">
                <div className="flex items-center justify-start gap-2 w-2/5">
                    <span className="lg:text-base md:text-sm text-xs text-[#343434]"></span>
                </div>
                <div className="flex flex-col items-start justify-start gap-2 w-3/5">
                    <button
                        onClick={() => {
                            const newEducations = [...educations];
                            newEducations[index].notes = [...education.notes, ""];
                            setEducations(newEducations);
                        }}
                        className="lg:text-sm md:text-xs text-xs text-[#343434] p-1 bg-[#e7e7e7] rounded-lg hover:text-white hover:bg-[#343434] duration-300"
                        >
                        備考欄を一行追加する
                    </button>
                </div>
            </div>
            <div className="flex items-start justify-center w-full mt-6">
                <div className="flex items-center justify-start gap-2 w-2/5">
                    <span className="lg:text-base md:text-sm text-xs text-[#343434]">入学年月</span>
                </div>
                <div className="flex items-start justify-start gap-2 w-3/5">
                    <Select options={yearsOptions} value={education.admissionYear} onChange={(value) => {updateEducation("admissionYear", value)}}  className="w-1/3"/>
                    <Select options={monthsOptions} value={education.admissionMonth} onChange={(value) => {updateEducation("admissionMonth", value)}}  className="w-1/3"/>
                    <Select options={admissionOptions} value={education.admission} onChange={(value) => {updateEducation("admission", value)}}  className="w-1/3"/>
                </div>
            </div>
            <div className="flex items-start justify-center w-full mt-6">
                <div className="flex items-center justify-start gap-2 w-2/5">
                    <span className="lg:text-base md:text-sm text-xs text-[#343434]">卒業年月</span>
                </div>
                <div className="flex items-start justify-start gap-2 w-3/5">
                    <Select options={yearsOptions} value={education.graduationYear} onChange={(value) => {updateEducation("graduationYear", value)}}  className="w-1/3"/>
                    <Select options={monthsOptions} value={education.graduationMonth} onChange={(value) => {updateEducation("graduationMonth", value)}}  className="w-1/3"/>
                    <Select options={graduationOptions} value={education.graduation} onChange={(value) => {updateEducation("graduation", value)}}  className="w-1/3"/>
                </div>
            </div>
            
        </div>
    )
}

export default EducationEdit;
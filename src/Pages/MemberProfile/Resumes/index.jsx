import { Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Rireki from "./Rireki";
import RirekiEdit from "./RirekiEdit";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import Careersheets from "./CareerSheets";

const Resumes = () => {
    const { user } = useAuth();
    const [rirekis, setRirekis] = useState([]);
    const initialDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    const [resumeTitle, setResumeTitle] = useState(`${initialDate.split("-")[0]}年${initialDate.split("-")[1]}月${initialDate.split("-")[2]}日`);
    const [titleModalOpen, setTitleModalOpen] = useState(false);
    const [careerSheets, setCareerSheets] = useState([]);

    const navigate = useNavigate();

    const { pathname } = useLocation();
    const path = pathname.split('/').pop();

    const handleTitleModalOpen = () => {
        setTitleModalOpen(true);
    }
    const getAllRirekis = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/rireki/all/${user?._id}`);
        setRirekis(res.data.rirekis);
    }

    const getAllCareerSheets = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/career/all/${user?._id}`);
        setCareerSheets(res.data.careerSheets);
    }

    const handleRireki = async () => {
        const newRireki = {
            title: resumeTitle,
            user: user?._id,
            basic: {
                name: user?.name,
                hiraganaName: user?.hiraganaName,
                gender: user?.gender,
                birthday: user?.birthday,
                phoneNumber: user?.phoneNumber,
                prefecture: user?.prefecture,
                email: user?.email,
                photo: user?.photo,
                otherPhone: "",
                otherEmail: "",
                otherPrefecture: ""
            },
            education: [{
                schoolName_department_major: `${user?.schoolName}${" "}${user?.department}${" "}${user?.major}`,
                notes: "",
                admissionDate: "",
                admission: "",
                graduationDate: user?.graduationDate,
                graduation: user?.graduation,
            }],
            workhistory: user?.workHistories.map((workHistory) => {
                return {
                    companyName: workHistory.companyName,
                    notes: "",
                    startDate: workHistory.startDate,
                    endDate: workHistory.endDate,
                    endStatus: "",
                    resignationReason: ""
                }
            }),
            qualification: user?.qualification.map((qualification) => {
                return {
                    qualification: qualification.qualification,
                    year: qualification.year,
                    month: qualification.month
                }
            }),
            other: {
                time: "",
                dependents: user?.dependents,
                spouse: user?.spouse,
            },
            desire: {
                applyreason: "",
                hope: ""
            },
            creationDate: initialDate
        }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rireki`, newRireki);
        if(res.data.error) message.error(res.data.message);
        message.success(res.data.message);
        navigate(`/members/resumes/rireki/detail/${res.data.rireki._id}`);
        setTitleModalOpen(false)
    }   

    useEffect(() => {
       user && getAllRirekis()
       user && getAllCareerSheets()
    },[user, pathname]);
    return (
        <>
            { path === "resumes" &&
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                        <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">履歴書・職務経歴書</p>
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">項目は応募済みの求人機関だけが閲覧できます</p>
                        <div className="flex items-center justify-center gap-4 w-full mt-4">
                            <button onClick={handleTitleModalOpen} className="bg-[#e9e9e9] hover:shadow-xl w-1/2 text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] px-2 lg:py-4 md:py-2 py-1 rounded-lg">履歴書を作成する</button>
                            <Link to={"/members/resumes/careersheets/new"} className="bg-[#e9e9e9] hover:shadow-xl w-1/2 text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] px-2 lg:py-4 md:py-2 py-1 rounded-lg">職務経歴書を作成する</Link>
                        </div>
                        <Link to={"/members/profile"} className=" lg:text-[1rem] py-1 md:text-sm text-xs duration-500 text-[#FF2A3B] hover:underline rounded-lg mt-2">プロフィールを見る</Link>
                    </div>
                    {rirekis?.length > 0 && 
                        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-8">
                            <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">履歴書</p>
                            <div className="flex flex-col items-start justify-start w-full mt-4 border-[#e7e7e7] border-b-[1px]">
                                {rirekis?.length !== 0 && rirekis?.map((rireki) => {
                                    return (
                                        <Link to={`/members/resumes/rireki/detail/${rireki?._id}`} className="lg:text-xl md:text-lg text-base font-bold text-[#343434] w-full border-[#e7e7e7] border-t-[1px] py-2">{rireki?.title}</Link>
                                    )
                                })}
                            </div>
                        </div>
                    }
                    {careerSheets?.length > 0 && 
                        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-8">
                            <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">職務経歴書</p>
                            <div className="flex flex-col items-start justify-start w-full mt-4 border-[#e7e7e7] border-b-[1px]">
                                {careerSheets?.length !== 0 && careerSheets?.map((careerSheet) => {
                                    return (
                                        <Link to={`/members/resumes/careersheets/detail/${careerSheet?._id}`} className="lg:text-xl md:text-lg text-base font-bold text-[#343434] w-full border-[#e7e7e7] border-t-[1px] py-2">{careerSheet?.title}</Link>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            }

            {
                titleModalOpen && 
                <Modal
                    open={titleModalOpen}
                    onCancel={() => setTitleModalOpen(false)}
                    footer={null}
                    width={1200}
                >
                    <div className="flex flex-col w-full h-full modal">
                        <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">履歴書の作成</p>
                        <div className="flex items-center justify-start gap-4 w-full mt-4 px-4 py-1">
                            <span className="lg:text-base md:text-sm text-xs text-[#343434]">履歴書名</span>
                            <span className="lg:text-base md:text-sm text-xs text-[#FF2A3B]">(必須)</span>
                            <div className="flex items-start justify-start gap-2 w-2/3">
                                <Input placeholder={`履歴書のタイトル`} value={resumeTitle} onChange={(e) => setResumeTitle(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-8 gap-4">
                            <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={() => setTitleModalOpen(false)}>キャンセル</button>
                            <button className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300" onClick={handleRireki}>履歴書を作成する</button>
                        </div>
                    </div>
                </Modal>
            }
            {
                pathname.split('/').includes("rireki") && pathname.split('/').includes("detail") && <Rireki />
            }
            {
                pathname.split('/').includes("rireki") && pathname.split('/').includes("edit") && <RirekiEdit />
            }
            {
                pathname.split('/').includes("careersheets") && <Careersheets />
            }
        </>
    )
}

export default Resumes;

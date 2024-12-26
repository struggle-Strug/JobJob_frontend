import { Input, message } from "antd";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import { PDFViewer } from "@react-pdf/renderer";
import PreviewCareer from "../PreviewCareer";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CareersheetsDetail = ({careerSheet, path}) => {
    const [title, setTitle] = useState("");
    const [workHistories, setWorkHistories] = useState(null);
    const navigate = useNavigate();

    const initialDate = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日`;

    const openPdf = () => {
        // Create a new window
        const newTab = window.open('', '_blank');
    
        // Check if the new window was created
        if (newTab) {
          // Create a container div in the new tab
          const container = newTab.document.createElement('div');
          container.style.width = '100%';
          container.style.height = '100vh';
          newTab.document.body.appendChild(container);
    
          // Render the PDFViewer in the new tab using createRoot
          const root = ReactDOM.createRoot(container);
          
          root.render(
            <PDFViewer style={{ width: '100vw', height: '100vh' }}>
                <PreviewCareer workHistories={workHistories}/>
            </PDFViewer>
          );
        } else {
            alert('Unable to open a new tab. Please check your browser settings.');
        }
    };
    const createCareerSheet =async () => {
        const careerData = {
            title: title,
            user: careerSheet?._id,
            name: workHistories?.name,
            creationDate: workHistories?.creationDate,
            selfPR: workHistories?.selfPR,
            qualification: workHistories?.qualifications,
            workHistories: workHistories?.workHistories
        }
        const resData = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/career`, careerData);
        if(resData.data.error) return message.error(resData.data.message);
        message.success(resData.data.message);
        navigate(`/members/resumes`);
    }

    const updateCareerSheet = async () => {
        const careerData = {
            title: title,
            user: careerSheet?.user,
            name: workHistories?.name,
            creationDate: workHistories?.creationDate,
            selfPR: workHistories?.selfPR,
            qualification: workHistories?.qualifications,
            workHistories: workHistories?.workHistories
        }
        const resData = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/career/update/${careerSheet?._id}`, careerData);
        if(resData.data.error) return message.error(resData.data.message);
        message.success(resData.data.message);
        navigate(`/members/resumes`);
    }

    useEffect(() => {
        const initialWorkHistories = {
            name: careerSheet?.name,
            user: careerSheet?.user ? careerSheet?.user : careerSheet?._id,
            creationDate: initialDate,
            selfPR: careerSheet?.selfPR,
            qualifications: careerSheet?.qualification,
            workHistories: careerSheet?.workHistories
        }
        setWorkHistories(initialWorkHistories);
        setTitle(careerSheet?.title ? careerSheet?.title : "");
    },[careerSheet])
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">職務経歴書の新規作成</p>
                <div className="flex items-center justify-center gap-4 w-full mt-4">
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-6">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">職務経歴書</p>
                <div className="flex items-start justify-center w-full mt-4">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434]">書類の名前</span>
                        <span className="lg:text-base md:text-sm text-xs text-[#343434]">(必須)</span>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 w-3/5">
                        <Input placeholder="〇〇用の職務経歴書" value={title} className="lg:text-base md:text-sm text-xs p-2" onChange={(e) => setTitle(e.target.value)}/>
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434]">※書類の名前は提出先の事業所には公開されません</p>
                    </div>
                </div>
                <div className="flex items-start justify-center w-full mt-6">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434]">書類の確認</span>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 w-3/5">
                        <button className="lg:text-base md:text-sm text-xs w-full text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-2 duration-300" onClick={openPdf}>プレビュー</button>
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434]">※書類に<span className="text-[#FF2A3B]">不備がないか</span>確認し、記入漏れの場合は プロフィールを編集しましょう</p>
                    </div>
                </div>
                {path == 'new' ?
                    (
                        <div className="flex items-start justify-center w-full mt-6 border-t-[1px] border-[#c4c4c4] pt-8">
                            <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-6 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={createCareerSheet}>作成する</button>
                        </div>
                    ) : (
                        <div className="flex items-start justify-center w-full mt-6 border-t-[1px] border-[#c4c4c4] pt-8">
                            <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-6 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={updateCareerSheet}>更新する</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CareersheetsDetail;
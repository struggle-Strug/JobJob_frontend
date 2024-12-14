import { useState } from "react";
import Private from "../../../components/Private";
import { Input } from "antd";

const WorkHistory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [generatedDivs, setGeneratedDivs] = useState([])
    const [companyName, setCompanyName] = useState("");

    const handleGenerate = () => {
        const newDiv = (
                <div className="flex items-center justify-center w-full mt-2">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs text-[#343434] font-bold">勤務先名</span>
                            <span className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 w-3/5">
                        <Input placeholder="勤務先名" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-3/4"/>
                    </div>
                </div>
        )
        setGeneratedDivs([...generatedDivs, newDiv])
    }
    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">職務経歴</p>
                    <div className="flex items-center justify-between w-full mt-2">
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
                        <button className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg" onClick={() => setIsOpen(!isOpen)}>非公開について</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
                {generatedDivs.map((div) => div)}
                <div className="text-center w-full mt-8">
                    <button onClick={handleGenerate} className="bg-[#fff8f8] text-[#FF2A3B] px-2 py-1 rounded-lg">職歴を追加する</button>
                </div>
            </div>

            {isOpen && <Private isOpen={isOpen} setIsOpen={setIsOpen}/>}
        </>
    )
}

export default WorkHistory;
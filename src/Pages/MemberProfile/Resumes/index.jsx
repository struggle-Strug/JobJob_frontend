import { Input, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Resumes = () => {
    const initialDate = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日`;
    const [resumeTitle, setResumeTitle] = useState(initialDate);
    const [titleModalOpen, setTitleModalOpen] = useState(false);


    const handleTitleModalOpen = () => {
        setTitleModalOpen(true);
    }


    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">履歴書・職務経歴書</p>
                    <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">項目は応募済みの求人機関だけが閲覧できます</p>
                    <div className="flex items-center justify-center gap-4 w-full mt-4">
                        <button onClick={handleTitleModalOpen} className="bg-[#e9e9e9] hover:shadow-xl w-1/2 text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] px-2 lg:py-4 md:py-2 py-1 rounded-lg">履歴書を作成する</button>
                        <button onClick={() => setTitleModalOpen(true)} className="bg-[#e9e9e9] hover:shadow-xl w-1/2 text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] px-2 lg:py-4 md:py-2 py-1 rounded-lg">職務経歴書を作成する</button>
                    </div>
                    <Link to={"/members/profile"} className=" lg:text-[1rem] py-1 md:text-sm text-xs duration-500 text-[#FF2A3B] hover:underline rounded-lg mt-2">プロフィールを見る</Link>
                </div>
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-8">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">履歴書</p>
                </div>
            </div>

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
                            <Link to={"/members/rireki"} className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300">履歴書を作成する</Link>
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}

export default Resumes;

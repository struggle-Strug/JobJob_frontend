import { useState } from "react";

const ProcessManagementPage = () => {
    const [type, setType] = useState("allOnGoings")
    return (
        <>
            <div className="w-full min-h-screen">
                <div className="grid grid-cols-5 w-full bg-white rounded-lg shadow-xl min-h-screen">
                    <div className="col-span-1 flex flex-col border-r-[1px]">
                        <p className="text-center text-sm text-[#343434] font-bold p-2 border-b-[1px]">選考中</p>
                        <div className={`flex justify-between ${type === "allOnGoings" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("allOnGoings")}>
                            <p className="text-center text-sm text-[#343434] p-2">すべて</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "applied" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("applied")}>
                            <p className="text-center text-sm text-[#343434] p-2">応募済</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "documents" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("documents")}>
                            <p className="text-center text-sm text-[#343434] p-2">書類選考中</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "meetingDate" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("meetingDate")}>
                            <p className="text-center text-sm text-[#343434] p-2">面接日設定済</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "meeting" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("meeting")}>
                            <p className="text-center text-sm text-[#343434] p-2">面接実施中</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "offerRecevied" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("offerRecevied")}>
                            <p className="text-center text-sm text-[#343434] p-2">内定済</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "offerAccepted" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("offerAccepted")}>
                            <p className="text-center text-sm text-[#343434] p-2">内定承諾済</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <p className="text-center text-sm text-[#343434] font-bold p-2 border-b-[1px]">選考済み</p>
                        <div className={`flex justify-between ${type === "allEnds" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("allEnds")}>
                            <p className="text-center text-sm text-[#343434] p-2">すべて</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "employed" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("employed")}>
                            <p className="text-center text-sm text-[#343434] p-2">入職済</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "notAccepted" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("notAccepted")}>
                            <p className="text-center text-sm text-[#343434] p-2">不採用</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "offerDeclined" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("offerDeclined")}>
                            <p className="text-center text-sm text-[#343434] p-2">内定辞退</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                        <div className={`flex justify-between ${type === "endProgress" && "font-bold"}  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}  onClick={() => setType("endProgress")}>
                            <p className="text-center text-sm text-[#343434] p-2">選考終了</p>
                            <p className="text-center text-sm text-[#343434] p-2">NN</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessManagementPage;
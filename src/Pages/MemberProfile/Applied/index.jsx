import { useState } from "react";

const Applied = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">応募済みの求人</p>
                <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">応募時の募集内容の確認や勤続支援金の申請が行えます</p>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-4">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">応募済みの求人はありません</p>
            </div>
        </div>
    )
}

export default Applied;
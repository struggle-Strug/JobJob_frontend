import { Input } from "antd";

const EducationEdit = () => {

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
                <div className="flex items-center justify-center w-full mt-2">
                    <div className="flex items-center justify-start gap-2 w-2/5">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434]">氏名</span>
                    </div>
                    <div className="flex items-center justify-start gap-2 w-3/5">
                    </div>
                </div>
            </div>
        </>
    )
}

const EducationEditEntry = (education, index) => {
    return (
        <div className="flex items-center justify-center w-full mt-2">
            <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">学歴{index + 1}</p>
            <div className="flex items-center justify-start gap-2 w-2/5">
                <span className="lg:text-base md:text-sm text-xs text-[#343434]">学校・学部・学科・専攻名</span>
            </div>
            <div className="flex items-center justify-start gap-2 w-3/5">
                <Input placeholder="学校・学部・学科・専攻名" value={""} onChange={() => {}} className="w-1/2"/>
            </div>
        </div>
    )
}

export default EducationEdit;
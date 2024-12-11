import { Link } from "react-router-dom";

const Resumes = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">履歴書・職務経歴書</p>
                <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">項目は応募済みの求人機関だけが閲覧できます</p>
                <div className="flex items-center justify-center gap-4 w-full mt-4">
                    <Link to={"/members/resumes/rirekisho"} className="bg-[#e9e9e9] hover:shadow-xl w-1/2 text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] px-2 lg:py-4 md:py-2 py-1 rounded-lg">履歴書を作成する</Link>
                    <Link to={"/members/resumes/shokumu"} className="bg-[#e9e9e9] hover:shadow-xl w-1/2 text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] px-2 lg:py-4 md:py-2 py-1 rounded-lg">職務経歴書を作成する</Link>
                </div>
                <Link to={"/members/profile"} className=" lg:text-[1rem] py-1 md:text-sm text-xs duration-500 text-[#FF2A3B] hover:underline rounded-lg mt-2">プロフィールを見る</Link>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-8">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">履歴書</p>
            </div>
        </div>
    )
}

export default Resumes;

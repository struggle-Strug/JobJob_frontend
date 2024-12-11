const Recent = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">最近見た求人</p>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-4">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">最近見た求人はありません</p>
            </div>
        </div>
    )
}

export default Recent;
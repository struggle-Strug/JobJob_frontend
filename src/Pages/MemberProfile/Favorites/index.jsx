const Favorites = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">気になる求人</p>
                <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">気になる求人に登録すると、その求人からスカウトが届きやすくなります。募集を休止している求人の場合は、募集再開時にメールにてお知らせをお送りいたします。</p>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-4">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">応募済みの求人はありません</p>
                <div className="flex items-center gap-4 bg-[#FAF3E3] rounded-lg p-4 mt-4 w-full">
                    <img src={"/assets/images/MyPage/favourite.png"} alt="気になる求人に登録する" className="lg:w-10 md:w-8 w-6" />
                    <div className="w-full">
                        <p className="lg:text-lg md:text-[1rem] text-sm font-bold text-[#343434]">気になる求人に登録する</p>
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">気になることが事業所に伝わり、通常の応募より内定率が1.7倍高いスカウトが届きやすくなります！</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites;
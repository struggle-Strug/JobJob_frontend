const CLTop = () => {
    return (
        <div className="w-full h-screen">
            <div className="flex flex-col items-start justify-start gap-4 w-full bg-white rounded-lg py-4 px-8 shadow-xl">
                <div className="w-full bg-[#a5a5a5] h-20">
                </div>
                <div className="flex flex-col items-start justify-start gap-2 border-b-[1px] border-[#e7e7e7] py-3">
                    <p className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">案内タイトル</p>
                    <p className="lg:text-base md:text-sm text-xs text-[#343434]">案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト</p>
                </div>
                <div className="flex flex-col items-start justify-start gap-2 border-b-[1px] border-[#e7e7e7] py-3">
                    <p className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">案内タイトル</p>
                    <p className="lg:text-base md:text-sm text-xs text-[#343434]">案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト案内テキスト</p>
                </div>
                <div className="flex flex-col items-start justify-start gap-2 border-b-[1px] border-[#e7e7e7] py-3">
                    <div className="grid grid-cols-5 w-full">
                        <div className="col-span-1 flex items-start justify-start">
                            <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">お知らせ</p>
                        </div>
                        <div className="col-span-4 flex flex-col items-start justify-start">
                            <p className="lg:text-sm text-xs text-[#343434]">YYYY/MM/DD　お知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトル</p>
                            <p className="lg:text-sm text-xs text-[#343434]">YYYY/MM/DD　お知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトル</p>
                            <p className="lg:text-sm text-xs text-[#343434]">YYYY/MM/DD　お知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトル</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 w-full">
                        <div className="col-span-1 flex items-start justify-start">
                            <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">その他
                            </p>
                        </div>
                        <div className="col-span-4 flex flex-col items-start justify-start">
                            <p className="lg:text-sm text-xs text-[#343434]">お問い合わせ　利用規約　リンク掲載のお願い</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CLTop;

import { Input } from "antd";
import { Link } from "react-router-dom";

const CustomerSignIn = () => {
    return (
        <div className="pt-16 pb-8 bg-[#EFEFEF] h-screen">
            <div className="max-w-[700px] mx-auto bg-white shadow-lg">
                <div className="text-center mt-4">
                    <h1 className="lg:text-xl md:text-lg text-base font-bold text-[#343434] pt-4">採用管理画面ログイン</h1>
                </div>
                <div className="flex items-center justify-center gap-4 px-8 mt-8">
                    <p className="w-1/4 lg:text-base md:text-sm text-xs text-[#343434] text-center">メールアドレス</p>
                    <Input className="w-3/4 h-10" />
                </div>
                <div className="flex items-center justify-center gap-4 px-8 mt-8">
                    <p className="w-1/4 lg:text-base md:text-sm text-xs text-[#343434] text-center">パスワード</p>
                    <Input className="w-3/4 h-10" />
                </div>
                <p className="lg:text-base md:text-sm text-xs text-[#FF2A3B] text-right hover:underline cursor-pointer px-8 mt-2">パスワードを設定していない、またはお忘れの方はこちら</p>
                <div className="flex items-center justify-center px-8 py-4 mt-4">
                    <button className="bg-red-600 hover:bg-red-200 text-white hover:text-red-500 rounded-sm lg:text-lg md:text-base text-sm lg:px-12 md:px-8 px-4 py-2 duration-300">ログイン</button>
                </div>
                <div className="text-center mt-4">
                    <p className="lg:text-base md:text-sm text-xs text-[#343434] pt-4">メールアドレスをお忘れの場合やログインができない場合は、</p>
                    <p className="lg:text-base md:text-sm text-xs text-[#343434]">support@job-medley.com または 0570-666-571 ※9:00-18:00（土日祝除く）</p>
                    <p className="lg:text-base md:text-sm text-xs text-[#343434] pb-4">までお問い合わせください。</p>
                </div>
            </div>
            <div className="max-w-[700px] mx-auto bg-white shadow-lg mt-8 p-4">
                <div className="text-center mt-4">
                    <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">まだご利用を開始されていない医院・事業所様はこちら</h1>
                </div>
                <div className="flex items-center justify-center px-8 py-4">
                    <Link to={"/customer/new"} className="bg-blue-600 hover:bg-blue-200 text-white hover:text-blue-500 rounded-sm lg:text-lg md:text-base text-sm lg:px-12 md:px-8 px-4 py-2 duration-300">求人掲載のお申し込み</Link>
                </div>
                <div className="text-center mt-4">
                    <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">お仕事をお探しの方はこちら</h1>
                </div>
                <div className="flex items-center justify-center px-8 py-4">
                    <Link to={"/members/sign_in"} className="bg-blue-600 hover:bg-blue-200 text-white hover:text-blue-500 rounded-sm lg:text-lg md:text-base text-sm lg:px-12 md:px-8 px-4 py-2 duration-300">求職者ログイン</Link>
                </div>
            </div>
        </div>
    )
}

export default CustomerSignIn;
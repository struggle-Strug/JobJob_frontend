import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="bg-[#EFEFEF] w-full h-auto flex items-center px-4">
                <div className="flex flex-col justify-center container py-8 lg:py-12">
                    <Link to={"/"} className="w-1/2 sm:w-1/3 lg:w-1/6">
                        <img 
                            src={"/assets/images/header/jobjob_logo 1.png"} 
                            alt="logo" 
                            className="hover:scale-105 duration-300"
                        />
                    </Link>
                    <p className="text-sm lg:text-lg mt-4 lg:mt-8 text-[#999999]">
                        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。 またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザー
                    </p>
                    <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-8 lg:gap-4">
                        <div className="sm:col-span-1 lg:col-span-2">
                            <div className="flex flex-col justify-start">
                                <p className="text-base lg:text-lg font-bold">JobJobについて</p>
                                <p className="text-sm lg:text-lg mt-2 lg:mt-4 py-1">ご利用ガイド</p>
                                <p className="text-sm lg:text-lg py-1">ご利用規約</p>
                                <p className="text-sm lg:text-lg py-1">外部送信ポリシー</p>
                                <p className="text-sm lg:text-lg py-1">勤続支援金について</p>
                                <p className="text-sm lg:text-lg py-1">ヘルプ</p>
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-2">
                            <div className="flex flex-col justify-start">
                                <p className="text-base lg:text-lg font-bold">採用担当者様へ</p>
                                <Link to={"/company"}>
                                    <p className="text-sm lg:text-lg mt-2 lg:mt-4 py-1">求人掲載をお考えの方へ</p>
                                </Link>
                                <p className="text-sm lg:text-lg py-1">リンク掲載について</p>
                                <p className="text-sm lg:text-lg py-1">採用担当者ログイン</p>
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-3">
                            <div className="flex flex-col justify-start">
                                <p className="text-base lg:text-lg font-bold">運営サイト</p>
                                <p className="text-sm lg:text-lg mt-2 lg:mt-4 py-1">ダミーテキストダミーテキスト</p>
                                <p className="text-sm lg:text-lg py-1">ダミーテキストダミーテキスト</p>
                                <p className="text-sm lg:text-lg py-1">ダミーテキストダミーテキスト</p>
                                <p className="text-sm lg:text-lg py-1">ダミーテキストダミーテキスト</p>
                                <p className="text-sm lg:text-lg py-1">ダミーテキストダミーテキスト</p>
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-3">
                            <div className="flex flex-col justify-start">
                                <p className="text-base lg:text-lg font-bold">お困りの方</p>
                                <div className="mt-2 lg:mt-4 ">
                                    <span className="text-sm lg:text-lg text-[#FF2A3B] font-bold border-2 border-[#FF2A3B] rounded-lg p-2">各種ご相談・お問い合わせ窓口</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs lg:text-sm mt-6 lg:mt-8 text-[#999999]">Copyright 2024 JobJob</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;


import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="bg-[#EFEFEF] w-full h-auto flex items-center">
                <div className="flex flex-col justify-center container py-12">
                    <Link to={"/"}>
                        <img src={"/assets/images/header/jobjob_logo 1.png"} alt="logo" />
                    </Link>
                    <p className="text-lg mt-8 text-[#999999]">あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。 またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザー</p>
                    <div className="flex justify-between mt-12">
                        <div className="flex flex-col justify-start">
                            <p className="text-lg font-bold">JobJobについて</p>
                            <p className="text-lg mt-4 py-1">ご利用ガイド</p>
                            <p className="text-lg py-1">ご利用規約</p>
                            <p className="text-lg py-1">外部送信ポリシー</p>
                            <p className="text-lg py-1">勤続支援金について</p>
                            <p className="text-lg py-1">ヘルプ</p>
                        </div>
                        <div className="flex flex-col justify-start">
                            <p className="text-lg font-bold">採用担当者様へ</p>
                            <p className="text-lg mt-4 py-1">求人掲載をお考えの方へ</p>
                            <p className="text-lg py-1">リンク掲載について</p>
                            <p className="text-lg py-1">採用担当者ログイン</p>
                        </div>
                        <div className="flex flex-col justify-start">
                            <p className="text-lg font-bold">運営サイト</p>
                            <p className="text-lg mt-4 py-1">ダミーテキストダミーテキスト</p>
                            <p className="text-lg py-1">ダミーテキストダミーテキスト</p>
                            <p className="text-lg py-1">ダミーテキストダミーテキスト</p>
                            <p className="text-lg py-1">ダミーテキストダミーテキスト</p>
                            <p className="text-lg py-1">ダミーテキストダミーテキスト</p>
                        </div>
                        <div className="flex flex-col justify-start">
                            <p className="text-lg font-bold">お困りの方</p>
                            <div className="mt-4 border-2 border-[#FF2A3B] rounded-lg p-2">
                                <p className="text-lg text-[#FF2A3B] font-bold">各種ご相談・お問い合わせ窓口</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm mt-8 text-[#999999]">Copyright 2024 JobJob</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const MyPage = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-start w-full h-full">
                <div className="flex items-center justify-start w-full bg-white rounded-lg p-4 shadow-xl">
                    <p className="text-2xl font-bold text-[#343434]">マイページ</p>
                </div>
                <div className="flex items-center justify-center gap-4 w-full bg-white rounded-lg py-4 px-8 mt-4 shadow-xl">
                    <div className="flex flex-col w-1/2">
                        <p className="text-lg font-bold text-[#FF2A3B]">ご希望の求人を探してみましょう！</p>
                        <p className="text-[1rem] text-[#343434] mt-2">思いつくキーワードで求人を検索してみましょう</p>
                    </div>
                    <div className="flex items-center justify-center w-1/2">
                        <Input 
                            placeholder="例: 市区町村 診療科目 特徴など" 
                            className="px-4 py-2 text-[1rem]" 
                            suffix={<SearchOutlined style={{ color: '#FF2A3B' }} />}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4 w-full bg-white rounded-lg py-4 px-4 mt-4 shadow-xl">
                    <p className="text-2xl font-bold text-[#343434]">新着求人メール</p>
                    <button className="text-center text-sm bg-gray-200 hover:bg-gray-100 text-[#FF2A3B] p-1 rounded-lg">もっと見る</button>
                </div>
                <div className="flex items-center justify-between gap-4 w-full bg-white rounded-lg py-4 px-4 mt-4 shadow-xl">
                    <p className="text-2xl font-bold text-[#343434]">ブロック中の企業・法人</p>
                    <button className="text-center text-sm bg-gray-200 hover:bg-gray-100 text-[#FF2A3B] p-1 rounded-lg">詳細を見る</button>
                </div>
            </div>
        </>
    )
}   

export default MyPage;
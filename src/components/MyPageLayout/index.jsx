import { Outlet, Link, useLocation } from "react-router-dom";

const MyPageLayout = () => {
    const location = useLocation();
    const isSelected = (path) => location.pathname === path;

    return (
        <div className="flex w-full bg-[#EFEFEF]">
            <div className="flex justify-center gap-4 w-full h-full rounded-lg container">
                <div className="flex flex-col h-full bg-white rounded-lg w-1/4 py-2 px-4">
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 duration-300
                            ${isSelected("/members/mypage") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/profile"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/members/profile") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            プロフィール
                        </p>
                    </Link>
                    <Link to={"/members/message"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/members/message") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            メッセージ
                        </p>
                    </Link>
                    <Link to={"/members/job_offers/apply"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/members/job_offers/apply") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            応募済み求人
                        </p>
                    </Link>
                    <Link to={"/members/job_offers/favorite"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/members/job_offers/favorite") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            気になる求人
                        </p>
                    </Link>
                    <Link to={"/members/job_offers/recent"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/members/job_offers/recent") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            最近見た求人
                        </p>
                    </Link>
                    <Link to={"/members/resumes"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/members/resumes") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            履歴書、職務経歴書
                        </p>
                    </Link>
                    <Link to={"/members/settings"} className="flex justify-start items-center gap-2 mt-4 mb-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/members/settings") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            設定
                        </p>
                    </Link>
                </div>
                <div className="flex h-full w-2/3">
                    <div className="h-full w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPageLayout;
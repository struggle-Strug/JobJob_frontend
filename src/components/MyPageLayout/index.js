import { Outlet, Link } from "react-router-dom";

const MyPageLayout = () => {
    const isSelected = true;
    return (
        <div className="flex w-full bg-[#EFEFEF]">
            <div className="flex items-center justify-center gap-4 w-full h-full rounded-lg container">
                <div className="flex flex-col h-full bg-white rounded-lg w-1/4 py-2 px-4">
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイページ
                        </p>
                    </Link>
                    <Link to={"/members/mypage"} className="flex justify-start items-center gap-2 my-4">
                        <p className={`flex justify-start text-black text-lg font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            マイ���ージ
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
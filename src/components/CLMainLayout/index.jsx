import { Outlet, Link, useLocation } from "react-router-dom";

const CLMainLayout = () => {
    const location = useLocation();
    const isSelected = (path) => location.pathname == path;

    return (
        <div className="flex w-full bg-[#EFEFEF] pt-16">
            <div className="flex justify-center gap-4 w-full h-full rounded-lg container">
                <div className="flex flex-col h-full bg-white rounded-lg w-1/4 py-2 px-4">
                    <Link to={"/customers"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 duration-300
                            ${isSelected("/customers") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            トップページ
                        </p>
                    </Link>
                    <Link to={"/customers/facility"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/customers/facility") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            施設・求人管理
                        </p>
                    </Link>
                    <Link to={"/customers/recruit/edit"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/customers/recruit/edit") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            選考管理

                        </p>
                    </Link>
                    <Link to={"/customers/picture"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/customers/picture") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            写真管理
                        </p>
                    </Link>
                    <Link to={"/customers/settings"} className="flex justify-start items-center gap-2 mt-4">
                        <p className={`flex justify-start text-black lg:text-lg md:text-base text-sm font-bold px-2
                            hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:font-medium hover:pl-2 hover:duration-300
                            ${isSelected("/customers/settings") ? 'text-red-500 border-l-4 border-red-500 font-medium pl-2 duration-300' : 'text-gray-700'}`}>
                            設定

                        </p>
                    </Link>
                    <img src="/assets/images/dashboard/Group 16.png" alt="banner" className="w-full mt-8" />
                    <img src="/assets/images/dashboard/Group 16.png" alt="banner" className="w-full mt-8" />
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

export default CLMainLayout;
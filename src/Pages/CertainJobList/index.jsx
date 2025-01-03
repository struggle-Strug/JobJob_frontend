import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getJobTypeKeyByValue } from "../../utils/getFunctions";
import { Prefectures } from "../../utils/constants/categories";

const CertainJobList = () => {
    const { pathname } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const path = pathname.split('/')[1];
    const type = searchParams.get('type');
    const JobType = getJobTypeKeyByValue(path);
    const isSelected = (v) => v === type;
    
    return (
        <>
            <div className="bg-[#EFEFEF]">
                <section className='max-w-[1100px] mx-auto bg-white rounded-lg lg:px-12 md:px-8 py-12'>
                    <p>
                        <span className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">{JobType}</span>
                        <span className="lg:text-base md:text-sm text-xs text-[#343434]">の</span>
                    </p>
                    <p className="lg:text-jg md:text-base text-md text-[#343434]">求人・転職・就職・アルバイト募集情報</p>
                </section>
                <section className='max-w-[1100px] mx-auto bg-white rounded-lg mt-4'>
                    <div className="grid grid-cols-3 w-full px-2">
                        <Link to={`/${path}/?type=1`} className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-4 duration-100 ${isSelected("1") ? "border-b-4 border-[#FF2A3B]" : ""}`}>
                            <img src="/assets/images/dashboard/gg_pin.png" alt="map" className="w-5 pt-0.5 " />
                            <p className="lg:text-md md:text-sm font-bold text-[#343434] duration-300">市区町村から選択</p>
                        </Link>
                        <Link to={`/${path}/?type=2`} className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-4 duration-100 ${isSelected("2") ? "border-b-4 border-[#FF2A3B]" : ""}`}>
                            <img src="/assets/images/dashboard/material-symbols_check-box-outline.png" alt="map" className="w-5 pt-0.5" />
                            <p className="lg:text-md md:text-sm font-bold text-[#343434] duration-300">雇用形態・給与から選択</p>
                        </Link>
                        <Link to={`/${path}/?type=3`} className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-4 duration-100 ${isSelected("3") ? "border-b-4 border-[#FF2A3B]" : ""}`}>
                            <img src="/assets/images/dashboard/mdi_tag-outline.png" alt="map" className="w-5 pt-0.5" />
                            <p className="lg:text-md md:text-sm font-bold text-[#343434] duration-300">特徴から選択</p>
                        </Link>
                    </div>
                    {type == "1" && 
                        <div className="grid grid-cols-7 w-full py-3">
                            <div className="col-span-1 flex flex-col justify-start items-center">
                                <div className="w-full px-4">
                                    <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">関東</p>
                                </div>
                                <div className="flex flex-col w-full px-4">
                                    {Object.keys(Prefectures.KANTO).map((prefecture, index) => {
                                        return (
                                            <>
                                                    <Link to={`/${path}/${Prefectures.KANTO[prefecture]}`} className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300">{prefecture}</Link>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start items-center">
                                <div className="w-full px-4">
                                    <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">関西</p>
                                </div>
                                <div className="flex flex-col w-full px-4">
                                    {Object.keys(Prefectures.KANSAI).map((prefecture, index) => {
                                        return (
                                            <>
                                                    <Link to={`/${path}/${Prefectures.KANSAI[prefecture]}`} className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300">{prefecture}</Link>
                                            </>
                                        )
                                    })} 
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start items-cente4">
                                <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">東海</p>
                                <div className="flex flex-col w-full px-4">
                                    {Object.keys(Prefectures.TOKAI).map((prefecture, index) => {
                                        return (
                                            <>
                                                    <Link to={`/${path}/${Prefectures.TOKAI[prefecture]}`} className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300">{prefecture}</Link>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start items-center">
                                <div className="w-full px-4">
                                    <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">北海道・東北</p>
                                </div>
                                <div className="flex flex-col w-full px-4">
                                    {Object.keys(Prefectures.HOKKAIDO_TOHOKU).map((prefecture, index) => {
                                        return (
                                            <>
                                                    <Link to={`/${path}/${Prefectures.HOKKAIDO_TOHOKU[prefecture]}`} className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300">{prefecture}</Link>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start items-center">
                                <div className="w-full px-4">
                                    <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">甲信越・北陸</p>
                                </div>
                                <div className="flex flex-col w-full px-4">
                                    {Object.keys(Prefectures.KOSHINETSU_HOKURIKU).map((prefecture, index) => {
                                        return (
                                            <>
                                                    <Link to={`/${path}/${Prefectures.KOSHINETSU_HOKURIKU[prefecture]}`} className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300">{prefecture}</Link>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start items-center">
                                <div className="w-full px-4">
                                    <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">中部・近畿</p>
                                </div>
                                <div className="flex flex-col w-full px-4">
                                    {Object.keys(Prefectures.CHUGOKU_SHIKOKU).map((prefecture, index) => {
                                        return (
                                            <>
                                                    <Link to={`/${path}/${Prefectures.CHUGOKU_SHIKOKU[prefecture]}`} className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300">{prefecture}</Link>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start items-center">
                                <div className="w-full px-4">
                                    <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">九州・沖縄</p>
                                </div>
                                <div className="flex flex-col w-full px-4">
                                    {Object.keys(Prefectures.KYUSHU_OKINAWA).map((prefecture, index) => {
                                        return (
                                            <>
                                                    <Link to={`/${path}/${Prefectures.KYUSHU_OKINAWA[prefecture]}`} className="lg:text-md md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300">{prefecture}</Link>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>                    
                    }
                    {type == "2" && 
                        <div className="w-full">
                            
                        </div>
                    }
                </section>
            </div>
        </>
    )
}

export default CertainJobList;
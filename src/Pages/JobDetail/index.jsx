import { Input } from "antd";
import { Link } from "react-router-dom";
import { getJobTypeKeyByValue, getPrefectureKeyByValue } from "../../utils/getFunctions";

const JobDetail = ({pref, employmentType, feature, JobType}) => {
    return (
        <>
           <div className="flex w-full h-auto px-4 bg-[#EFEFEF]">
                <div className="container flex items-center justify-between gap-8">
                    <div className="flex flex-col items-center justify-center w-2/3">
                        <div className="flex flex-col justify-center bg-white rounded-lg p-4 w-full shadow-xl">
                            <p className="text-lg font-bold text-gray-500">求人・転職・アルバイト情報</p>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <p className="lg:text-xl md:text-sm font-bold text-[#FF6B56]">{getPrefectureKeyByValue(pref)}</p>
                                    <p className="lg:text-xl md:text-sm font-bold text-[#343434]">の{JobType}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="lg:text-xl md:text-sm font-bold text-[#343434] ">該当件数</p>
                                    <p className="font-bold text-[#FF2A3B] lg:text-[1.7rem] md:text-[1.2rem] number">1234</p>
                                    <p className="lg:text-xl md:text-sm font-bold text-[#343434]">件</p>
                                </div>
                                <div className="flex items-center justify-between lg:px-8 md:px-2 lg:py-2 md:py-1 border-[#FF2A3B] border-2 rounded-lg gap-4">
                                    <button className="lg:text-[1rem] md:text-sm font-bold text-[#FF2A3B] hover:underline">都道府県を変更</button>
                                    <img src="/assets/images/dashboard/ep_arrow-right.png" alt="chevron-right" className="w-4" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">求人検索</p>
                        </div>
                        <div className="flex flex-col justify-center bg-white rounded-lg px-12 py-8 w-full shadow-xl mt-8">
                            <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg ">
                                <div className="flex items-center justify-between gap-1 ">
                                    <img src="/assets/images/dashboard/gg_pin.png" alt="map" className="w-5 pt-0.5" />
                                    <p className="lg:text-md md:text-sm font-bold text-[#343434]">市区町村から選択</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-down" className="w-4" />
                            </div>
                            <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4">
                                <div className="flex items-center justify-between gap-1 ">
                                    <img src="/assets/images/dashboard/ph_train-simple.png" alt="map" className="w-5 pt-0.5" />
                                    <p className="lg:text-md md:text-sm font-bold text-[#343434]">沿線から選択</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-down" className="w-4" />
                            </div>
                            <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4">
                                <div className="flex items-center justify-between gap-1 ">
                                    <img src="/assets/images/dashboard/material-symbols_check-box-outline.png" alt="map" className="w-5 pt-0.5" />
                                    <p className="lg:text-md md:text-sm font-bold text-[#343434]">雇用形態・給与から選択</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-down" className="w-4" />
                            </div>
                            <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4">
                                <div className="flex items-center justify-between gap-1 ">
                                    <img src="/assets/images/dashboard/mdi_tag-outline.png" alt="map" className="w-5 pt-0.5" />
                                    <p className="lg:text-md md:text-sm font-bold text-[#343434]">特徴から選択</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-down" className="w-4" />
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">東京都の介護職/ヘルパーの求人</p>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <img src="/assets/images/dashboard/flowbite_sort-outline.png" alt="map" className="w-5 pt-0.5" />
                            <div className="flex text-center py-2 px-8 bg-white rounded-lg ml-4">
                                <p className="lg:text-md md:text-sm bg-gradient-to-tr from-[#FF1812] to-[#FF5B02] bg-clip-text text-transparent text-md font-bold">おすすめ</p>
                            </div>
                            <div className="flex text-center py-2 px-8 bg-white rounded-lg ml-4">
                                <p className="lg:text-md md:text-sm text-[#343434] text-md font-bold">新着</p>
                            </div>
                            <div className="flex text-center py-2 px-4 bg-white rounded-lg ml-4">
                                <p className="lg:text-md md:text-sm text-[#343434] text-md font-bold">自宅からの距離</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-start w-full mt-8 ">
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl border-4 border-[#FF6B56]">
                                <div className="absolute top-0 left-0 bg-[#FF6B56] rounded-tl-2xl px-4 py-2 ml-[-0.25rem] mt-[-0.25rem]">
                                    <p className="text-sm font-bold text-white">注目求人</p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start w-full gap-4 px-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434]">給与</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">正職員 222,000円〜283,800円</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434]">住所</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">新宿区下落合四丁目9番15号</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <img src="/assets/images/dashboard/Vector.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#FF6B56]">気になる</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl border-4 border-[#FF6B56] mt-8">
                                <div className="absolute top-0 left-0 bg-[#FF6B56] rounded-tl-2xl px-4 py-2 ml-[-0.25rem] mt-[-0.25rem]">
                                    <p className="text-sm font-bold text-white">注目求人</p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキ���トダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start w-full gap-4 px-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434]">給与</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">正職員 222,000円〜283,800円</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="lg:text-sm md:text-xs font-bold text-[#343434]">住所</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">新宿区下落合四丁目9番15号</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-[#E7E7E7] rounded-lg py-2 text-white w-1/2">
                                        <img src="/assets/images/dashboard/mdi_heart.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#188CE0]">気になる済</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
                                <div className="absolute top-0 left-0 bg-[#FF6B56] rounded-tl-2xl px-4 py-2">
                                    <p className="text-sm font-bold text-white">new</p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-2">
                                    <div className="flex gap-4 h-full">
                                        <div className="flex flex-col justify-center w-2/3 h-full">
                                            <div className="flex items-center justify-start">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">給与</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">正職員 222,000円〜283,800円</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">仕事内容</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">一般民家を使用したデイサービスにて一般介護全般、清掃業務、記録、運営に関わる業務</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">応募要件</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">※運転免許必須　未経験・無資格可　安心して勤務するこが出来る教育体制が整っております。（初期教育もあり）</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">住所</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">新宿区下落合四丁目9番15号</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">勤続支援金{" "}&nbsp;&nbsp;正職員12,500円 ~ 16,000円</p>
                                            </div>
                                        </div>
                                        <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">職場の環境</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">未経験可</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">通所介護・デイサービス</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">社会保険完備</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">ボーナス賞与あり</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">交通費支給</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <img src="/assets/images/dashboard/Vector.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#FF6B56]">気になる</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
                                <div className="absolute top-0 left-0 bg-[#FF6B56] rounded-tl-2xl px-4 py-2">
                                    <p className="text-sm font-bold text-white">new</p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-2">
                                    <div className="flex gap-4 h-full">
                                        <div className="flex flex-col justify-center w-2/3 h-full">
                                            <div className="flex items-center justify-start">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">給与</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">正職員 222,000円〜283,800円</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">仕事内容</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">一般民家を使用したデイサービスにて一般介護全般、清掃業務、記録、運営に関わる業務</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">応募要件</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">※運転免許必須　未経験・無資格可　安心して勤務することが出来る教育体制が整っております。（初期教育もあり）</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">住所</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">新宿区下落合四丁目9番15号</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">勤続支援金{" "}&nbsp;&nbsp;正職員12,500円 ~ 16,000円</p>
                                            </div>
                                        </div>
                                        <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">職場の環境</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">未経験可</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">通所介護・デイサービス</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">社会保険完備</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6 rem] font-bold">ボーナス賞与あり</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">交通費支給</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-[#E7E7E7] rounded-lg py-2 text-white w-1/2">
                                        <img src="/assets/images/dashboard/mdi_heart.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#188CE0]">気になる済</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-2">
                                    <div className="flex gap-4 h-full">
                                        <div className="flex flex-col justify-center w-2/3 h-full">
                                            <div className="flex items-center justify-start">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">給与</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">正職員 222,000円〜283,800円</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">仕事内容</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">一般民家を使用したデイサービスにて一般介護全般、清掃業務、記録、運営に関わる業務</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">応募要件</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">※運転免許必須　未経験・無資格可　安心して勤務することが出来る教育体制が整っております。（初期教育もあり）</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">住所</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">新宿区下落合四丁目9番15号</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">勤続支援金{" "}&nbsp;&nbsp;正職員12,500円 ~ 16,000円</p>
                                            </div>
                                        </div>
                                        <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">職場の環境</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">未経験可</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">通所介護・デイサービス</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">社会保険完備</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">ボーナス賞与あり</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">交通費支給</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <img src="/assets/images/dashboard/Vector.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#FF6B56]">気になる</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
                                <div className="flex items-center justify-between w-full">
                                    <img src="/assets/images/dashboard/AdobeStock_569015666 1.png" alt="arrow-down" className="lg:w-full md:w-1/2"/>
                                    <div className="flex flex-col items-center justify-between p-4 w-full gap-8">
                                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">求人タイトルダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                        <p className="lg:text-sm md:text-xs text-[#343434]">求人内容ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-2">
                                    <div className="flex gap-4 h-full">
                                        <div className="flex flex-col justify-center w-2/3 h-full">
                                            <div className="flex items-center justify-start">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">給与</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">正職員 222,000円〜283,800円</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">仕事内容</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">一般民家を使用したデイサービスにて一般介護全般、清掃業務、記録、運営に関わる業務</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">応募要件</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">※運転免許必須　未経験・無資格可　安心して勤務することが出来る教育体制が整っております。（初期教育もあり）</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">住所</p>
                                                <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">新宿区下落合四丁目9番15号</p>
                                            </div>
                                            <div className="flex items-start justify-start mt-4">
                                                <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">勤続支援金{" "}&nbsp;&nbsp;正職員12,500円 ~ 16,000円</p>
                                            </div>
                                        </div>
                                        <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">職場の環境</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">未経験可</p>
                                            </div>
                                            <div className="inline-block text-center bg-[#F5BD2E] text-white m-1  px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">通所介護・デイサービス</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">社会保険完備</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">ボーナス賞与あり</p>
                                            </div>
                                            <div className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">交通費支給</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                                    <button className="flex items-center justify-center gap-2 bg-[#E7E7E7] rounded-lg py-2 text-white w-1/2">
                                        <img src="/assets/images/dashboard/mdi_heart.png" alt="eye" className="w-4 pt-0.5" />
                                        <p className="text-sm font-bold text-[#188CE0]">気になる済</p>
                                    </button>
                                    <button className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2">
                                        <p className="text-sm font-bold text-white">求人を見る</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white rounded-lg px-4 py-2 w-full mt-8 shadow-xl">
                            <div className="flex items-center justify-center w-full gap-20 mt-8">
                                <img src="/assets/images/dashboard/ep_arrow-left.png" alt="eye" className="w-4" />
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-black text-[1rem] font-bold number">1</p>
                                    <p className="text-[#999999] text-[1rem] font-bold number">2</p>
                                    <p className="text-[#999999] text-[1rem] font-bold number">3</p>
                                    <p className="text-[#999999] text-sm font-bold number">...</p>
                                    <p className="text-[#999999] text-[1rem] font-bold number">100</p>
                                </div>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="eye" className="w-4" />
                            </div>
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-[#343434] text-center mt-2">ご希望の条件の求人が登録されたときに、いち早くお知らせします。</p>
                            <button className="text-center w-full bg-[#FF6B56] text-white rounded-lg py-2 mt-4">
                                <p className="lg:text-sm md:text-xs font-bold">この条件で新着求人を受け取る</p>
                            </button>
                            <button className="text-center w-full bg-white text-[#FF6B56] border-2 border-[#FF6B56] rounded-lg py-2 mt-4">
                                <p className="text-sm font-bold">検索条件を変更する</p>
                            </button>
                            <div className="flex items-center justify-center w-full mt-8 gap-2">
                                <img src="/assets/images/dashboard/ic_round-search.png" alt="search" className="w-6" />
                                <Input placeholder="例:市区町村、診療科目、特徴など" className="w-full" />
                            </div>
                            <Link to={"/#"} className="flex items-center justify-start mt-2 pl-2">
                                <p className="lg:text-sm md:text-xs font-bold">地図から求人を選択する</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </Link>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">介護職/ヘルパーの特集から探す</p>
                        </div>
                        <div className="flex flex-col bg-white rounded-lg px-8 py-4 w-full mt-8 shadow-xl">
                            <div className="flex items-center justify-between w-full">
                                <p className="lg:text-[1rem] md:text-[0.8rem] font-bold">特集ダミーテキストダミーテキストダミーテキストの求人</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4">
                                <p className="text-[1rem] font-bold">特集ダミーテキストダミーテキストダミーテキストの求人</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4">
                                <p className="lg:text-[1rem] md:text-[0.8rem] font-bold">特集ダミーテキストダミーテキストダミーテキストの求人</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4">
                                <p className="lg:text-[1rem] md:text-[0.8rem] font-bold">特集ダミーテキストダミーテキストダミーテキストの求人</p>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full mt-8">
                            <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">介護職/ヘルパーについて</p>
                        </div>
                        <div className="flex flex-col bg-white rounded-lg px-12 py-6 w-full mt-8 shadow-xl">
                            <p className="lg:text-[1rem] md:text-[0.8rem]">あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。 またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーあのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。 またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザー</p>
                        </div>

                    </div>
                    <div className="flex h-full w-1/3">
                        <div className="flex flex-col items-center justify-start h-full w-full">
                            <div className="flex items-center justify-between bg-white rounded-lg lg:px-8 md:px-4 py-4 w-full shadow-xl">
                                <Link to={"/#"} className="lg:text-lg md:text-sm font-bold text-[#343434]">地図から求人を選択する</Link>
                                <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                            </div>
                            <img src="/assets/images/dashboard/Group 16.png" alt="banner" className="w-full mt-8" />
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm font-bold text-[#343434]">必ず役立つ仕事術</p>
                            </div>
                            <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 py-6 w-full mt-8 shadow-xl">
                                <div className="flex items-center justify-between w-full">
                                    <p className="lg:text-[1rem] md:text-[0.8rem]">ぴったりな仕事を探すには</p>
                                    <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                                </div>
                                <div className="flex items-center justify-between w-full mt-4">
                                    <p className="lg:text-[1rem] md:text-[0.8rem]">応募の仕方</p>
                                    <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                                </div>
                                <div className="flex items-center justify-between w-full mt-4">
                                    <p className="lg:text-[1rem] md:text-[0.8rem]">履歴書の書き方</p>
                                    <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                                </div>
                                <div className="flex items-center justify-between w-full mt-4">
                                    <p className="lg:text-[1rem] md:text-[0.8rem]">メッセージの書き方</p>
                                    <img src="/assets/images/dashboard/ep_arrow-right_black.png" alt="arrow-right" className="w-4 pt-0.5" />
                                </div>
                            </div>
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm text-[#343434] font-bold">人気のコラムランキング</p>
                            </div>
                            <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 py-6 w-full mt-8 shadow-xl">
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <img src="/assets/images/dashboard/Group 17.png" alt="arrow-right" />
                                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！</p>
                                </div>
                                <div className="flex items-center justify-between gap-2 w-full mt-4">
                                    <img src="/assets/images/dashboard/Group 17_2.png" alt="arrow-right" />
                                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！</p>
                                </div>
                                <div className="flex items-center justify-between gap-2 w-full mt-4">
                                    <img src="/assets/images/dashboard/Group 17_3.png" alt="arrow-right" />
                                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Link to={"/#"} className="flex items-center justify-center mt-4 border-2 border-[#FF6B56] rounded-lg py-2 lg:px-16 md:px-8 px-4">
                                        <p className="lg:text-[0.75rem] md:text-[0.6rem] text-[#FF6B56]">ランキングをもっと見る</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm text-[#343434] font-bold">会員登録がまだの方</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg py-6 w-full mt-8 shadow-xl">
                                <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] pb-2">
                                    <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">1.</p>
                                    <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">事務所からスカウトが届く</p>
                                </div>
                                <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] mt-2 pb-2">
                                    <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">2.</p>
                                    <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">希望にあった求人が届く</p>
                                </div>
                                <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] mt-2 pb-2">
                                    <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">3.</p>
                                    <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">会員限定機能が利用できる</p>
                                </div>
                                <Link to={"/members/register"} className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-tr from-[#FF1812] to-[#FF5B02] rounded-lg px-6 py-2">
                                    <img src="/assets/images/dashboard/mdi_account.png" alt="register" className="pt-0.5" />
                                    <p className="lg:text-lg md:text-sm text-white font-bold">無料で会員登録する</p>
                                </Link>
                            </div>
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm text-[#343434] font-bold">LINEでお問い合わせOK</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg px-6 py-6 w-full mt-8 shadow-xl">
                                <img src="/assets/images/dashboard/Rectangle 11.png" alt="line" className="w-full" />
                            </div>
                            <div className="flex items-center justify-start w-full mt-8">
                                <p className="lg:text-lg md:text-sm text-[#343434] font-bold">JobJob公式SNS</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-lg px-6 py-6 w-full mt-8 shadow-xl">
                                <img src="/assets/images/dashboard/Rectangle 11.png" alt="line" className="w-full" />
                            </div>
                        </div>

                    </div>
                </div>
           </div>
        </>
    )
}

export default JobDetail;
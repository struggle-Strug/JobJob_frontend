import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getEmploymentTypeKeyByValue, getJobTypeKeyByValue, getPrefectureKeyByValue } from "../../../utils/getFunctions";

const Profile = () => {
    const { user } = useAuth();
    const birthday = `${new Date(user?.birthday).getFullYear()}年${new Date(user?.birthday).getMonth() + 1}月${new Date(user?.birthday).getDate()}日`;
    const age = new Date().getFullYear() - new Date(user?.birthday).getFullYear();
    const prefecture = getPrefectureKeyByValue(user?.prefecture);
    const jobType = user?.jobType.map((job) => getJobTypeKeyByValue(job));
    const employmentType = user?.employmentType.map((type) => getEmploymentTypeKeyByValue(type));

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">プロフィール</p>
                <div className="flex items-center justify-start gap-2 w-full mt-2">
                    <span className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                    <p className="lg:text-sm md:text-xs text-xs text-[#343434]">項目は応募済みの求人機関だけが閲覧できます</p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
                <div className="flex items-center justify-between w-full">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">基本情報</p>
                    <Link to="/members/profile/edit/basic" className="bg-[#FF2A3B] lg:text-lg md:text-sm text-xs hover:shadow-[0_4px_10px_rgba(255,42,59,0.5)] duration-500 text-white px-2 py-1 rounded-lg">編集</Link>
                </div>
                <div className="flex flex-col w-full mt-6">
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">氏名</span>
                            <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.name}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">ふりがな</span>
                            <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.hiraganaName}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">生年月日</span>
                            <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{birthday}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">年齢</span>
                            <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{`${age}歳`}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">性別</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.gender}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">都道府県</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{prefecture}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">電話番号</span>
                            <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">メールアドレス</span>
                            <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.email}</p>
                        </div>
                    </div>
                    {
                        user?.qualification?.length > 0 &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-start justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">資格/取得年月</span>
                            </div>
                            <div className="flex flex-col items-start justify-start w-2/3">
                                {
                                    user?.qualification?.map(qualification => {
                                    return (
                                                <div className="flex item-start justify-between w-4/5">
                                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2 py-2">{qualification.qualification}</p>
                                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2 py-2">{qualification.year}-{qualification.month}</p>
                                                </div>    
                                            )
                                        })
                                }
                                </div>
                        </div>
                    }
                    {
                        user?.dependents !== "" &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">扶養家族</span>
                                <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.dependents}</p>
                            </div>
                        </div>

                    }
                    {
                        user?.spouse !== "" &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">配偶者</span>
                                <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.spouse}</p>
                            </div>
                        </div>

                    }
                    { user?.photo !=="" &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">顔写真</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <img src={user?.photo} alt="face" className="w-56"/>
                            </div>
                        </div>
                    }
                    {
                        user?.selfPR !== "" &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">自己PR</span>
                                <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.selfPR}</p>
                            </div>
                        </div>

                    }
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
                <div className="flex items-center justify-between w-full">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">学歴</p>
                    <Link to="/members/profile/edit/education" className="bg-[#FF2A3B] lg:text-lg md:text-sm text-xs hover:shadow-[0_4px_10px_rgba(255,42,59,0.5)] duration-500 text-white px-2 py-1 rounded-lg">編集</Link>
                </div>
                <div className="flex flex-col w-full mt-6">
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">最終学歴</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.lastEducation}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">学校名</span>
                            <span className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.schoolName}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">学部・学科</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.department}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">専攻</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.major}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">卒業年月</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.graduationDate}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">卒業区分</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.graduation}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg text-[#343434]">職務経歴</p>
                <div className="flex items-center justify-between w-full mt-2">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434]">
                        <span className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434]">経歴</span>
                        <span className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434] number pl-1">1</span>
                    </p>
                    <Link to="/members/profile/edit/work_history" className="bg-[#FF2A3B] lg:text-lg md:text-sm text-xs hover:shadow-[0_4px_10px_rgba(255,42,59,0.5)] duration-500 text-white px-2 py-1 rounded-lg">編集</Link>
                </div>
                {/* <div className="flex flex-col w-full mt-6">
                </div> */}
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
                <div className="flex items-center justify-between w-full">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">希望条件</p>
                    <Link to="/members/profile/edit/hope" className="bg-[#FF2A3B] lg:text-lg md:text-sm text-xs hover:shadow-[0_4px_10px_rgba(255,42,59,0.5)] duration-500 text-white px-2 py-1 rounded-lg">編集</Link>
                </div>
                <div className="flex flex-col w-full mt-6">
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">希望職種</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{jobType?.toString()}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">希望勤務地</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{prefecture}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">希望勤務形態</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{employmentType?.toString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile;
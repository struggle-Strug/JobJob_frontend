import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Profile = () => {
    const { user } = useAuth();
    const birthday = `${new Date(user?.birthday).getFullYear()}年${new Date(user?.birthday).getMonth() + 1}月${new Date(user?.birthday).getDate()}日`;
    const age = new Date().getFullYear() - new Date(user?.birthday).getFullYear();
    const jobTypes = user?.jobType.map(type => type.type);

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
                    <Link to="/members/profiles/edit/basic" className="bg-[#FF2A3B] lg:text-lg md:text-sm text-xs hover:shadow-[0_4px_10px_rgba(255,42,59,0.5)] duration-500 text-white px-2 py-1 rounded-lg">編集</Link>
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
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.prefecture}</p>
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
                                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{qualification.qualification}</p>
                                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{qualification.year}-{qualification.month}</p>
                                                </div>    
                                            )
                                        })
                                }
                                </div>
                        </div>
                    }
                    {
                        user?.dependents !== undefined &&
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
                        user?.spouse !== undefined &&
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
                    { user?.photo !== undefined &&
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
                        user?.selfPR !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">自己PR</span>
                                <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2 break-all">{user?.selfPR}</p>
                            </div>
                        </div>

                    }
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
                    <div className="flex items-center justify-between w-full">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">学歴</p>
                    <Link to="/members/profiles/edit/education" className="bg-[#FF2A3B] lg:text-lg md:text-sm text-xs hover:shadow-[0_4px_10px_rgba(255,42,59,0.5)] duration-500 text-white px-2 py-1 rounded-lg">編集</Link>
                </div>
                <div className="flex flex-col w-full mt-6">
                    {user?.lastEducation !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">最終学歴</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.lastEducation}</p>
                            </div>
                        </div>
                    }
                    {user?.schoolName !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">学校名</span>
                                <span className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">非公開</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.schoolName}</p>
                            </div>
                    </div>
                    }
                    {user?.department !== undefined &&
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">学部・学科</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.department}</p>
                            </div>
                        </div>
                    }
                    {user?.major !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">専攻</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.major}</p>
                            </div>
                        </div>
                    }
                    {user?.graduationDate !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">卒業年月</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.graduationDate}</p>
                            </div>
                        </div>
                    }
                    {user?.graduation !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">卒業区分</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.graduation}</p>
                            </div>
                        </div>
                    }
                </div>                                              
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
                <div className="flex items-center justify-between w-full mt-2">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">職務経歴</p>
                    <Link to="/members/profiles/edit/work_history" className="bg-[#FF2A3B] lg:text-lg md:text-sm text-xs hover:shadow-[0_4px_10px_rgba(255,42,59,0.5)] duration-500 text-white px-2 py-1 rounded-lg">編集</Link>
                </div>
                <div className="flex flex-col w-full mt-6">
                    {user?.workHistories.map((workHistory, index) => {
                        return (
                            <>
                                <div className="flex items-center justify-between w-full mt-2">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434]">
                                        <span className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434]">経歴</span>
                                        <span className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434] number pl-1">{index+1}</span>
                                    </p>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 mt-4">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">勤務先名</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workHistory.companyName}</p>
                                    </div>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">事業内容</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workHistory.contents}</p>
                                    </div>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">勤務開始</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workHistory.startDate}</p>
                                    </div>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">勤務終了</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workHistory.endDate}</p>
                                    </div>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">勤務形態</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workHistory.employmentType}</p>
                                    </div>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">職種</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workHistory.jobType}({workHistory.jobTypeDetail})</p>
                                    </div>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">仕事内容</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2 break-all">{workHistory.workContent}</p>
                                    </div>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">役職</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workHistory.officialPosition}</p>
                                    </div>
                                </div>
                                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 mb-4">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">給与</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workHistory.payType}{workHistory.amount}円</p>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
                <div className="flex items-center justify-between w-full">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">希望条件</p>
                    <Link to="/members/profiles/edit/desire" className="bg-[#FF2A3B] lg:text-lg md:text-sm text-xs hover:shadow-[0_4px_10px_rgba(255,42,59,0.5)] duration-500 text-white px-2 py-1 rounded-lg">編集</Link>
                </div>
                <div className="flex flex-col w-full mt-6">
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">希望職種</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{jobTypes}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">希望勤務地</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.desirePrefecture.length > 0 ? user?.desirePrefecture.map(prefecture => prefecture.toString()).join(", ") : user?.prefecture}</p>
                        </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                        <div className="flex items-center justify-start gap-2 w-1/3">
                            <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">希望勤務形態</span>
                        </div>
                        <div className="flex items-center justify-start w-2/3">
                            <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.employmentType?.toString()}</p>
                        </div>
                    </div>
                    {user?.employmentDate !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">希望入職時期</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.employmentDate}</p>
                            </div>
                        </div>
                    }
                    {user?.desireYearSalary !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">希望年収</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.desireYearSalary}万円</p>
                            </div>
                        </div>
                    }
                    {user?.feature !== undefined &&
                        <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                            <div className="flex items-center justify-start gap-2 w-1/3">
                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">こだわり条件</span>
                            </div>
                            <div className="flex items-center justify-start w-2/3">
                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{user?.feature?.toString()}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default Profile;
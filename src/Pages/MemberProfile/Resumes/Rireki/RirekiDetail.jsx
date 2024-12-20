import { useState } from "react";
import { Link } from "react-router-dom";

const RirekiDetail = ({rireki}) => {
    const [isBasicOpen, setIsBasicOpen] = useState(false);
    const [isEducationOpen, setIsEducationOpen] = useState(false);
    const [isCareerOpen, setIsCareerOpen] = useState(false);
    const [isQualificationOpen, setIsQualificationOpen] = useState(false);
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const [isMotivationOpen, setIsMotivationOpen] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);

    const birthday = `${new Date(rireki?.basic?.birthday).getFullYear()}年${new Date(rireki?.basic?.birthday).getMonth() + 1}月${new Date(rireki?.basic?.birthday).getDate()}日`;
    const age = new Date().getFullYear() - new Date(rireki?.basic?.birthday).getFullYear();

    
    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
                        履歴書の新規作成
                        <span className="lg:text-base md:text-sm text-xs text-[#343434] pl-1">({rireki?.title})</span>
                    </p>
                    <div className="flex items-center justify-between w-full mt-2">
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg py-4 px-6 shadow-xl mt-2">
                <div className="flex items-center justify-center w-full mt-2">
                    <button className="lg:text-lg md:text-base text-sm bg-[#f7f6f2] hover:bg-white text-[#FF2A3B] hover:text-black hover:shadow-2xl font-bold rounded-lg px-6 py-3 duration-300">プロフィールの情報を読み込む</button>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <button className="flex items-center justify-between w-full mt-4 border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsBasicOpen(!isBasicOpen)}>
                        <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">基本情報</span>
                            <span className="lg:text-sm md:text-xs text-xs text-[#343434]">氏名・生年月日・連絡先など</span>
                        </button>
                        <img 
                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isBasicOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 w-full px-4 overflow-hidden ${isBasicOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="mt-4">
                            <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                <div className="flex items-center justify-start gap-2 w-1/3">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">氏名</span>
                                </div>
                                <div className="flex items-center justify-start w-2/3">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{rireki?.basic?.name}</p>
                                </div>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 h-4"
                                />
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                <div className="flex items-center justify-start gap-2 w-1/3">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">ふりがな</span>
                                </div>
                                <div className="flex items-center justify-start w-2/3">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{rireki?.basic?.hiraganaName}</p>
                                </div>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 h-4"
                                />
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                <div className="flex items-center justify-start gap-2 w-1/3">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">生年月日</span>
                                </div>
                                <div className="flex items-center justify-start w-2/3">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{birthday}</p>
                                </div>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 h-4"
                                />
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                <div className="flex items-center justify-start gap-2 w-1/3">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">年齢</span>
                                </div>
                                <div className="flex items-center justify-start w-2/3">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{`${age}歳`}</p>
                                </div>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 h-4"
                                />
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                <div className="flex items-center justify-start gap-2 w-1/3">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">性別</span>
                                </div>
                                <div className="flex items-center justify-start w-2/3">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{rireki?.basic?.gender}</p>
                                </div>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 h-4"
                                />
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`}  className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                <div className="flex items-center justify-start gap-2 w-1/3">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">都道府県</span>
                                </div>
                                <div className="flex items-center justify-start w-2/3">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{rireki?.basic?.prefecture}</p>
                                </div>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 h-4"
                                />
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`}  className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                <div className="flex items-center justify-start gap-2 w-1/3">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">電話番号</span>
                                </div>
                                <div className="flex items-center justify-start w-2/3">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{rireki?.basic?.phoneNumber}</p>
                                </div>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 h-4"
                                />
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`}  className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                <div className="flex items-center justify-start gap-2 w-1/3">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">メールアドレス</span>
                                </div>
                                <div className="flex items-center justify-start w-2/3">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{rireki?.basic?.email}</p>
                                </div>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 h-4"
                                />
                            </Link>
                            { rireki?.basic?.photo !== undefined &&
                                <Link to={`/members/resumes/rireki/edit/basic/${rireki?._id}`}  className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                    <div className="flex items-center justify-start gap-2 w-1/3">
                                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">顔写真</span>
                                    </div>
                                    <div className="flex items-center justify-start w-2/3">
                                        <img src={rireki?.basic?.photo} alt="face" className="w-56"/>
                                    </div>
                                    <div className="flex items-center h-56">
                                        <img 
                                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                                            alt="arrow" 
                                            className="duration-300 h-4"
                                        />
                                    </div>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <button className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsEducationOpen(!isEducationOpen)}>
                        <button className="flex flex-col items-start justify-start gap-2 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">学歴</span>
                        </button>
                        <img 
                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isEducationOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 overflow-hidden w-full ${isEducationOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="mt-2 px-4">
                            {rireki?.education.map((education) => {
                                return (
                                    <>
                                        <p className="lg:text-sm md:text-xs text-xs font-bold text-[#343434] pb-2">学歴1</p>
                                        <Link to={`/members/resumes/rireki/edit/${rireki?._id}/education`}  className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                            <div className="flex items-center justify-start gap-2 w-2/5">
                                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">学校・学部・学科・専攻名</span>
                                            </div>
                                            <div className="flex items-center justify-start w-3/5">
                                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{education?.schoolName_department_major}</p>
                                            </div>
                                            <img 
                                                src={'/assets/images/top/ep_arrow-right_red.png'} 
                                                alt="arrow" 
                                                className="duration-300 h-4"
                                            />
                                        </Link>
                                        <Link to={`/members/resumes/rireki/edit/education/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                            <div className="flex items-center justify-start gap-2 w-2/5">
                                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">入学年月</span>
                                            </div>
                                            <div className="flex items-center justify-start w-3/5">
                                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{education?.admissionDate === "" ? "未登録" : education?.admissionDate}</p>
                                            </div>
                                            <img 
                                                src={'/assets/images/top/ep_arrow-right_red.png'} 
                                                alt="arrow" 
                                                className="duration-300 h-4"
                                            />
                                        </Link>
                                        {education?.graduationDate !== undefined &&
                                            <Link to={`/members/resumes/rireki/edit/education/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                                <div className="flex items-center justify-start gap-2 w-2/5">
                                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">卒業年月</span>
                                                </div>
                                                <div className="flex items-center justify-start w-3/5">
                                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{education?.graduationDate}</p>
                                                </div>
                                                <img 
                                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                                    alt="arrow" 
                                                    className="duration-300 h-4"
                                                />
                                            </Link>
                                        }
                                    </>
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <button className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsCareerOpen(!isCareerOpen)}>
                        <button className="flex flex-col items-start justify-start gap-2 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">職歴</span>
                        </button>
                        <img 
                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isCareerOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 overflow-hidden w-full ${isCareerOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="mt-2 px-4">
                            {rireki?.workhistory?.map((workhistory, index) => {
                                return (
                                    <>
                                        <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] pb-2">職歴{index + 1}</p>
                                        <Link to={`/members/resumes/rireki/edit/work_history/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                            <div className="flex items-center justify-start gap-2 w-2/5">
                                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">勤務先名</span>
                                            </div>
                                            <div className="flex items-center justify-start w-3/5">
                                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workhistory.companyName}</p>
                                            </div>
                                            <img 
                                                src={'/assets/images/top/ep_arrow-right_red.png'} 
                                                alt="arrow" 
                                                className="duration-300 h-4"
                                            />
                                        </Link>
                                        <Link to={`/members/resumes/rireki/edit/work_history/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                            <div className="flex items-center justify-start gap-2 w-2/5">
                                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">業務開始年月</span>
                                            </div>
                                            <div className="flex items-center justify-start w-3/5">
                                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workhistory.startDate.split('-')[0] + "年" + workhistory.startDate.split('-')[1] + "月"}入職</p>
                                            </div>
                                            <img 
                                                src={'/assets/images/top/ep_arrow-right_red.png'} 
                                                alt="arrow" 
                                                className="duration-300 h-4"
                                            />
                                        </Link>
                                        <Link to={`/members/resumes/rireki/edit/work_history/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                                            <div className="flex items-center justify-start gap-2 w-2/5">
                                                <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">勤務終了年月</span>
                                            </div>
                                            <div className="flex items-center justify-start w-3/5">
                                                <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{workhistory.endDate.split('-')[0] + "年" + workhistory.endDate.split('-')[1] + "月"}退職</p>
                                            </div>
                                            <img 
                                                src={'/assets/images/top/ep_arrow-right_red.png'} 
                                                alt="arrow" 
                                                className="duration-300 h-4"
                                            />
                                        </Link>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <button className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsQualificationOpen(!isQualificationOpen)}>
                        <button className="flex flex-col items-start justify-start gap-2 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">免許・資格</span>
                        </button>
                        <img 
                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isQualificationOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 overflow-hidden w-full ${isQualificationOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="mt-2 px-4">
                            <Link to={`/members/resumes/rireki/edit/qualification/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 items-center">
                                <div className="flex items-center justify-start gap-2 w-2/5">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">資格/取得年月</span>
                                </div>
                                <div className="flex flex-col items-center justify-start w-full">
                                    {rireki?.qualification?.map(qualification => (
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                                        {qualification.qualification}{" "}{"取得年月:" + qualification.year + "/" + qualification.month}
                                    </p>
                                    ))}
                                </div>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-6"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <button className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsOtherOpen(!isOtherOpen)}>
                        <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">その他</span>
                            <span className="lg:text-sm md:text-xs text-xs text-[#343434]">通勤時間・扶養家族数・配偶者</span>
                        </button>
                        <img 
                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isOtherOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 overflow-hidden w-full ${isOtherOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="mt-2 px-4">
                            <Link to={`/members/resumes/rireki/edit/other/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 items-center">
                                <div className="flex items-center justify-start gap-2 w-2/5">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">通勤時間</span>
                                </div>
                                <div className="flex flex-col items-center justify-start w-full">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                                        {rireki?.other?.time === "" ? "未登録" : rireki?.other?.time}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-6"
                                    />
                                </div>
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/other/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 items-center">
                                <div className="flex items-center justify-start gap-2 w-2/5">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">扶養家族数</span>
                                </div>
                                <div className="flex flex-col items-center justify-start w-full">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                                        {rireki?.other?.dependents}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-6"
                                    />
                                </div>
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/other/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 items-center">
                                <div className="flex items-center justify-start gap-2 w-2/5">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">配偶者</span>
                                </div>
                                <div className="flex flex-col items-center justify-start w-full">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                                        {rireki?.other?.spouse}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-6"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <button className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsMotivationOpen(!isMotivationOpen)}>
                        <div className="flex flex-col items-start justify-start gap-2 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">志望動機・本人希望</span>
                        </div>
                        <img 
                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isMotivationOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 overflow-hidden w-full ${isMotivationOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="mt-2 px-4">
                            <Link to={`/members/resumes/rireki/edit/desire/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 items-center">
                                <div className="flex items-center justify-start gap-2 w-2/5">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">志望動機</span>
                                </div>
                                <div className="flex flex-col items-center justify-start w-full">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                                        {rireki?.desire?.applyreason === "" ? "未登録" : rireki?.desire?.applyreason}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-6"
                                    />
                                </div>
                            </Link>
                            <Link to={`/members/resumes/rireki/edit/desire/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 items-center">
                                <div className="flex items-center justify-start gap-2 w-2/5">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">本人希望</span>
                                </div>
                                <div className="flex flex-col items-center justify-start w-full">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                                        {rireki?.desire?.hope === "" ? "未登録" : rireki?.desire?.hope}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-6"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <button className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsDateOpen(!isDateOpen)}>
                        <button className="flex flex-col items-start justify-start gap-2 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">履歴書の作成日</span>
                        </button>
                        <img 
                            src={'/assets/images/top/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isDateOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 overflow-hidden w-full ${isDateOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="mt-2 px-4">
                            <Link to={`/members/resumes/rireki/edit/date/${rireki?._id}`} className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 items-center">
                                <div className="flex items-center justify-start gap-2 w-2/5">
                                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">履歴書の作成日</span>
                                </div>
                                <div className="flex flex-col items-center justify-start w-full">
                                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                                        {rireki?.creationDate}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-6"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default RirekiDetail;
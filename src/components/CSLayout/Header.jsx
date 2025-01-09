import { Link } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import { MdOutlineKey } from "react-icons/md";
const Header = ({ user, isAuthenticated }) => {
    return (
        <header>
            <div className="bg-[#EFEFEF] w-full h-20 flex items-center px-4">
                {isAuthenticated ? (
                    <>
                        <div className="flex items-center justify-between container h-full">
                            <div className="flex items-center gap-4 justify-between">
                                <Link to={"/"}>
                                    <img src={"/assets/images/header/jobjob_logo 1.png"} alt="logo" />
                                </Link>
                                <p className="lg:text-md md:text-sm text-xs font-bold text-[#188CE0]">求人広告掲載（無料）</p>
                            </div>
                            <Link to={"/members/mypage"} className="flex flex-col items-center bg-gradient-to-tr from-[#FF1610] to-[#FF5B01] rounded-full px-3 py-[0.45rem] hover:scale-105 hover:shadow-2xl duration-300">
                                <LiaUserCircleSolid className="w-8 h-8 text-white"/>
                                <p className="lg:text-[0.8rem] md:text-[0.7rem] text-xs font-bold text-white ">{user.name}</p>
                            </Link>
                        </div>
                    </>
                    ) : (
                        <div className="flex items-center justify-between container">
                            <div className="flex items-center gap-4 justify-between">
                                <Link to={"/"}>
                                    <img src={"/assets/images/header/jobjob_logo 1.png"} alt="logo" />
                                </Link>
                                <p className="lg:text-md md:text-sm text-xs font-bold text-[#188CE0]">求人広告掲載（無料）</p>
                            </div>
                            <div className="flex items-center gap-8 justify-between">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex flex-col items-center bg-white rounded-lg px-5 py-2">
                                        <img src={"/assets/images/header/mdi_heart-outline.png"} alt="気になる" className="w-6"/>
                                        <p className="text-sm font-bold text-[#FF2A3B]">気になる</p>
                                    </div>
                                    <div className="flex flex-col items-center bg-white rounded-lg p-2">
                                        <img src={"/assets/images/header/mingcute_time-line.png"} alt="最近見た求人" className="w-6"/>
                                        <p className="lg:text-sm md:text-xs text-xs font-bold text-[#FF2A3B]">最近見た求人</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <Link to={"/members/sign_in"} className="flex flex-col items-center bg-white rounded-lg px-4 py-2 hover:scale-105 hover:shadow-2xl duration-300">
                                        <MdOutlineKey className="w-6 h-6 text-[#FF2A3B]" />
                                        <p className="lg:text-sm md:text-xs text-xs font-bold text-[#FF2A3B]">ログイン</p>
                                    </Link>
                                    <Link to={"/members/sign_up"} className="flex flex-col items-center bg-gradient-to-tr from-[#FF1610] to-[#FF5B01] rounded-lg px-4 py-[0.45rem] hover:scale-105 hover:shadow-2xl duration-300">
                                        <img src={"/assets/images/header/Group 2.png"} alt="register" className="w-6"/>
                                        <p className="lg:text-sm md:text-xs text-xs font-bold text-white ">会員登録</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </header>
    )
}

export default Header;
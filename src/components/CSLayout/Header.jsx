import { Link } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import { MdOutlineKey } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";

const Header = ({ user, isAuthenticated }) => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes)); // Ensure we parse it as an array
    } else {
      setLikes([]);
      localStorage.setItem("likes", JSON.stringify([]));
    }
  }, []);
  return (
    <header>
      <div className="bg-[#EFEFEF] w-full min-h-[5rem] flex items-center px-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center justify-between container h-full w-full">
              <div className="flex items-center gap-2 lg:gap-4 justify-between">
                <Link to={"/"}>
                  <img
                    src={"/assets/images/header/jobjob_logo 1.png"}
                    alt="logo"
                    className="hover:scale-105 duration-300"
                  />
                </Link>
                <p className="lg:text-md md:text-sm text-xs font-bold text-[#188CE0] whitespace-nowrap">
                  求人広告掲載（無料）
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 lg:gap-4">
                <Link
                  to={"/members/job_offers/favorite"}
                  className="flex flex-col items-center bg-white rounded-lg px-3 lg:px-5 py-2 hover:scale-[1.05] hover:shadow-xl duration-300"
                >
                  <div className="flex w-full relative justify-center">
                    <img
                      src={"/assets/images/header/mdi_heart-outline.png"}
                      alt="気になる"
                      className="w-5 lg:w-6"
                    />
                    <span className="bg-[#FF2A3B] rounded-full text-white text-xs p-1 absolute right-0 top-0 number">
                      +{likes.length}
                    </span>
                  </div>
                  <p className="text-xs lg:text-sm font-bold text-[#FF2A3B] whitespace-nowrap">
                    気になる
                  </p>
                </Link>
                <Link
                  to={"/members/job_offers/favorite"}
                  className="flex flex-col items-center bg-white rounded-lg p-2 hover:scale-[1.05] hover:shadow-xl duration-300"
                >
                  <img
                    src={"/assets/images/header/mingcute_time-line.png"}
                    alt="最近見た求人"
                    className="w-5 lg:w-6"
                  />
                  <p className="text-xs lg:text-sm font-bold text-[#FF2A3B] whitespace-nowrap">
                    最近見た求人
                  </p>
                </Link>
                <Link
                  to={"/members/mypage"}
                  className="flex flex-col items-center bg-gradient-to-tr from-[#FF1610] to-[#FF5B01] rounded-full px-2 lg:px-3 py-[0.45rem] hover:scale-105 hover:shadow-2xl duration-300"
                >
                  <LiaUserCircleSolid className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  <p className="text-xs lg:text-[0.8rem] font-bold text-white whitespace-nowrap">
                    マイページ
                  </p>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between container w-full">
            <div className="flex items-center gap-2 lg:gap-4 justify-between">
              <Link to={"/"}>
                <img
                  src={"/assets/images/header/jobjob_logo 1.png"}
                  alt="logo"
                  className="max-w-[120px] md:max-w-full hover:scale-105 duration-300"
                />
              </Link>
              <p className="lg:text-md md:text-sm text-xs font-bold text-[#188CE0] whitespace-nowrap">
                求人広告掲載（無料）
              </p>
            </div>
            <div className="flex items-center gap-2 lg:gap-8 justify-between">
              <div className="hidden sm:flex items-center justify-between gap-2">
                <Link
                  to={"/members/job_offers/favorite"}
                  className="flex flex-col items-center bg-white rounded-lg px-3 lg:px-5 py-2 hover:scale-[1.05] hover:shadow-xl duration-300"
                >
                  <div className="flex w-full relative justify-center">
                    <img
                      src={"/assets/images/header/mdi_heart-outline.png"}
                      alt="気になる"
                      className="w-5 lg:w-6"
                    />
                    <span className="bg-[#FF2A3B] rounded-full text-white text-xs p-1 absolute right-0 top-0 number">
                      +{likes.length}
                    </span>
                  </div>
                  <p className="text-xs lg:text-sm font-bold text-[#FF2A3B] whitespace-nowrap">
                    気になる
                  </p>
                </Link>
                <Link
                  to={"/members/job_offers/favorite"}
                  className="flex flex-col items-center bg-white rounded-lg p-2 hover:scale-[1.05] hover:shadow-xl duration-300"
                >
                  <img
                    src={"/assets/images/header/mingcute_time-line.png"}
                    alt="最近見た求人"
                    className="w-5 lg:w-6"
                  />
                  <p className="text-xs lg:text-sm font-bold text-[#FF2A3B] whitespace-nowrap">
                    最近見た求人
                  </p>
                </Link>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Link
                  to={"/members/sign_in"}
                  className="flex flex-col items-center bg-white rounded-lg px-2 lg:px-4 py-2 hover:scale-105 hover:shadow-2xl duration-300"
                >
                  <MdOutlineKey className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF2A3B]" />
                  <p className="text-xs lg:text-sm font-bold text-[#FF2A3B] whitespace-nowrap">
                    ログイン
                  </p>
                </Link>
                <Link
                  to={"/members/sign_up"}
                  className="flex flex-col items-center bg-gradient-to-tr from-[#FF1610] to-[#FF5B01] rounded-lg px-2 lg:px-4 py-[0.45rem] hover:scale-105 hover:shadow-2xl duration-300"
                >
                  <img
                    src={"/assets/images/header/Group 2.png"}
                    alt="register"
                    className="w-5 lg:w-6"
                  />
                  <p className="text-xs lg:text-sm font-bold text-white whitespace-nowrap">
                    会員登録
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

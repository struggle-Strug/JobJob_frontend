import { useState } from "react";

const Setting = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
  return (
    <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">設定</p>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-4">
                <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
                    <button className="flex items-center justify-between w-full mt-4 border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                        <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">通知</span>
                        </button>
                        <img 
                            src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isNotificationOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 w-full px-4 overflow-hidden ${isNotificationOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
                    <button className="flex items-center justify-between w-full mt-4 border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                        <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">メールアドレス</span>
                        </button>
                        <img 
                            src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isNotificationOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 w-full px-4 overflow-hidden ${isNotificationOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
                    <button className="flex items-center justify-between w-full mt-4 border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                        <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">パスワード</span>
                        </button>
                        <img 
                            src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isNotificationOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 w-full px-4 overflow-hidden ${isNotificationOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
                    <button className="flex items-center justify-between w-full mt-4 border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                        <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">退会申請</span>
                        </button>
                        <img 
                            src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300 ${!isNotificationOpen ? "rotate-90" : "-rotate-90"}`}
                        />
                    </button>
                    <div className={`duration-300 w-full px-4 overflow-hidden ${isNotificationOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
                    <button className="flex items-center justify-between w-full mt-4 border-t-[1px] border-[#c2c2c2] p-4 px-2" onClick={handleLogout}>
                        <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">ログアウト</span>
                        </button>
                        <img 
                            src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                            alt="arrow" 
                            className={`duration-300`}
                        />
                    </button>
                </div>
            </div>
    </div>
  );
};

export default Setting;

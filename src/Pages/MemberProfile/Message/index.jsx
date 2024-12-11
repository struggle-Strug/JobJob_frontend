import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Message = () => {
    const location = useLocation();
    const isSelected = (path) => location.pathname === path;
    const [showUnreplied, setShowUnreplied] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [showHidden, setShowHidden] = useState(false);

    const onClickUnreplied = () => {
        setShowUnreplied(true);
        setShowAll(false);
        setShowHidden(false);
    }

    const onClickAll = () => {
        setShowUnreplied(false);
        setShowHidden(false);
        setShowAll(true);
    }

    const onClickHidden = () => {
        setShowUnreplied(false);
        setShowAll(false);
        setShowHidden(true);
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">メッセージ</p>
            </div>
            <div className="flex flex-col items-center w-full bg-white rounded-t-lg p-4 shadow-xl mt-4">
                <div className="flex justify-center w-3/5">
                    <div className="flex items-center justify-between w-full">
                        <button className={`lg:text-sm md:text-xs text-xs font-bold text-[#343434] hover:text-[#FF2A3B] duration-300 ${isSelected("/members/message/unreplied") ? 'text-[#FF2A3B]' : ''}`} onClick={onClickUnreplied}>未返信</button>
                        <button className={`lg:text-sm md:text-xs text-xs font-bold text-[#343434] hover:text-[#FF2A3B] duration-300 ${isSelected("/members/message/all") ? 'text-[#FF2A3B]' : ''}`} onClick={onClickAll}>すべて</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-full bg-white rounded-b-lg p-4 shadow-xl border-t-[1px] border-[#dadada]">
                {showUnreplied && 
                    <>
                        <div className="flex flex-col items-start justify-center w-full">
                            <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">メッセージはありません</p>
                        </div>
                    </>
                }
                {showAll &&
                    <>
                        <div className="flex flex-col items-start justify-center w-full">
                            <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]"></p>
                        </div>
                    </> 
                }
                {showHidden && 
                    <>
                        <div className="flex flex-col items-start justify-center w-full">
                            <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">非表示にしたメッセージはありません</p>
                        </div>
                    </>
                }
            </div>
            <div className="flex items-center justify-center w-full bg-white rounded-lg px-4 py-6 shadow-xl mt-4">
                <button className="lg:text-sm md:text-xs text-xs text-[#FF2A3B] duration-300 py-1 px-2 bg-[#fae8e9] hover:bg-[#ffbfc4] rounded-lg" onClick={onClickHidden}>非表示にしたメッセージを見る</button>
            </div>
            
        </div>

    )
}

export default Message;
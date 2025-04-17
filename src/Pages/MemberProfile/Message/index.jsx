"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const Message = () => {
  const { user } = useAuth();
  const [showUnreplied, setShowUnreplied] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [unRepliedMessages, setUnRepliedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  const onClickUnreplied = () => {
    setShowUnreplied(true);
    setShowAll(false);
    setShowHidden(false);
  };

  const onClickAll = () => {
    setShowUnreplied(false);
    setShowHidden(false);
    setShowAll(true);
  };

  const onClickHidden = () => {
    setShowUnreplied(false);
    setShowAll(false);
    setShowHidden(true);
  };

  const getMyMessages = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/message/user/${user?._id}`
    );
    setAllMessages(res.data.messages);
    setUnRepliedMessages(
      res.data.messages.filter(
        (message) =>
          message.content[message.content.length - 1].sender !== user?._id
      )
    );
  };

  useEffect(() => {
    document.title = "メッセージ | JobJob (ジョブジョブ)";
    getMyMessages();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
        <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
          メッセージ
        </p>
      </div>
      <div className="flex flex-col items-center w-full bg-white rounded-t-lg p-4 shadow-xl mt-4">
        <div className="flex justify-center w-3/5">
          <div className="flex items-center justify-between w-full">
            <div className="relative">
              <button
                className={`lg:text-sm md:text-xs text-xs font-bold text-[#343434] hover:text-[#FF2A3B] duration-300 ${
                  showUnreplied ? "text-[#FF2A3B]" : ""
                }`}
                onClick={onClickUnreplied}
              >
                未返信
              </button>
              {showUnreplied && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#FF2A3B]"></div>
              )}
            </div>
            <div className="relative">
              <button
                className={`lg:text-sm md:text-xs text-xs font-bold text-[#343434] hover:text-[#FF2A3B] duration-300 ${
                  showAll ? "text-[#FF2A3B]" : ""
                }`}
                onClick={onClickAll}
              >
                すべて
              </button>
              {showAll && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#FF2A3B]"></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full bg-white rounded-b-lg p-4 shadow-xl border-t-[1px] border-[#dadada]">
        {showUnreplied && (
          <>
            <div className="flex flex-col items-start justify-center w-full">
              {unRepliedMessages?.length > 0 ? (
                <>
                  {unRepliedMessages.map((message, index) => {
                    return (
                      <Link
                        to={`/members/message/${message.message_id}`}
                        key={index}
                        className="flex items-center justify-start w-full border-[1px] border-[#e7e7e7] rounded-lg bg-slate-100 px-2 hover:px-4 py-1 hover:cursor-pointer duration-300"
                      >
                        <img
                          src={
                            message?.facility_id?.photo || "/placeholder.svg"
                          }
                          alt=""
                          className="h-14 rounded-lg mr-2"
                        />
                        <div className="flex flex-col">
                          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434] hover:text-[#FF2A3B] duration-300 w-full">
                            {message?.facility_id?.name}
                          </p>
                          <p className=" text-xs text-[#858585] line-clamp-2 mt-2">
                            {
                              message?.content[message?.content?.length - 1]
                                ?.message
                            }
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
                  メッセージはありません
                </p>
              )}
            </div>
          </>
        )}
        {showAll && (
          <>
            <div className="flex flex-col items-start justify-center w-full">
              {allMessages?.length > 0 ? (
                <>
                  {allMessages?.map((message, index) => {
                    return (
                      <Link
                        to={`/members/message/${message.message_id}`}
                        key={index}
                        className="flex items-center w-full border-[1px] border-[#e7e7e7] rounded-lg bg-slate-100 px-2 hover:px-4 py-1 hover:cursor-pointer duration-300"
                      >
                        <img
                          src={
                            message?.facility_id?.photo || "/placeholder.svg"
                          }
                          alt=""
                          className="h-14 rounded-lg mr-2"
                        />
                        <div className="flex flex-col">
                          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434] hover:text-[#FF2A3B] duration-300 w-full">
                            {message?.facility_id?.name}
                          </p>
                          <p className=" text-xs text-[#858585] line-clamp-2 mt-2">
                            {
                              message?.content[message?.content?.length - 1]
                                ?.message
                            }
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
                  メッセージはありません
                </p>
              )}
            </div>
          </>
        )}
        {showHidden && (
          <>
            <div className="flex flex-col items-start justify-center w-full">
              <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
                非表示にしたメッセージはありません
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-full bg-white rounded-lg px-4 py-6 shadow-xl mt-4">
        <div className="relative">
          <button
            className={`lg:text-sm md:text-xs text-xs ${
              showHidden ? "text-[#FF2A3B]" : "text-[#FF2A3B]"
            } duration-300 py-1 px-2 bg-[#fae8e9] hover:bg-[#ffbfc4] rounded-lg`}
            onClick={onClickHidden}
          >
            非表示にしたメッセージを見る
          </button>
          {showHidden && (
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF2A3B]"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;

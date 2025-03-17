import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { message as antdMessage } from "antd";
import MessageDetails from "./MessageDetails";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [selectId, setSelectedId] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState("");
  const [status, setStatus] = useState("all");
  const getMessages = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/message/company`
    );
    if (response.data.error) return antdMessage.error(response.data.message);
    setMessages(response.data.messages);
  };

  useEffect(() => {
    if (selectId !== "") {
      const foundMessage = messages.find((_, idx) => idx === selectId);
      setSelectedMessageId(foundMessage._id);
    }
  }, [selectId]);

  useEffect(() => {
    document.title = "メッセージ | JobJob (ジョブジョブ)";
    window.scrollTo({ top: 0, behavior: "smooth" });
    getMessages();
  }, []);
  return (
    <>
      <div className="grid grid-cols-4 bg-white min-h-screen rounded-lg shadow-xl p-4">
        <div className="col-sapn-1 border-r-[1px] px-2">
          <div className="flex items-start gap-2 p-2">
            <button
              className={`text-xs ${
                status === "all"
                  ? "text-black font-bold underline"
                  : "text-[#343434]"
              }`}
              onClick={() => setStatus("all")}
            >
              すべて
            </button>
            <button
              className={`text-xs ${
                status === "unread"
                  ? "text-black font-bold underline"
                  : "text-[#343434]"
              }`}
              onClick={() => setStatus("unread")}
            >
              未読
            </button>
            <button
              className={`text-xs ${
                status === "unreply"
                  ? "text-black font-bold underline"
                  : "text-[#343434]"
              }`}
              onClick={() => setStatus("unreply")}
            >
              未返信
            </button>
          </div>
          <div className="border-t-[1px] pt-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col border-b-[1px] p-2 rounded-lg cursor-pointer duration-300 ${
                  selectId === index ? "bg-[#d6d6d6]" : "bg-transparent"
                }`}
                onClick={() => setSelectedId(index)}
              >
                <div className="flex items-start gap-4">
                  <p>
                    <span className="text-xs font-bold">応募者名:</span>
                    <span className="text-xs">{message.user_id.name}</span>
                  </p>
                  <p>
                    <span className="text-xs font-bold">応募者ID:</span>
                    <span className="text-xs">{message.user_id.member_id}</span>
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <p>
                    <span className="text-xs font-bold">年齢:</span>
                    <span className="text-xs">
                      {new Date().getFullYear() -
                        message.user_id.birthday.split("-")[0]}
                    </span>
                  </p>
                  <p>
                    <span className="text-xs font-bold">性別:</span>
                    <span className="text-xs">{message.user_id.gender}</span>
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <p>
                    <span className="text-xs font-bold">施設名:</span>
                    <span className="text-xs">{message.facility_id.name}</span>
                  </p>
                  <p>
                    <span className="text-xs font-bold">職種:</span>
                    <span className="text-xs">
                      {message.facility_id.job_type[0]}
                    </span>
                  </p>
                </div>
                <p className="text-xs break-words line-clamp-2 mt-2">
                  {message.content[message.content.length - 1].message}
                </p>
                <p className="text-xs break-words line-clamp-2 mt-2">
                  {moment(
                    message.content[message.content.length - 1]?.date
                  ).format("YYYY/MM/DD HH:mm")}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3">
          <MessageDetails id={selectedMessageId} />
        </div>
      </div>
    </>
  );
};

export default Message;

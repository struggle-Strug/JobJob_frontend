import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getJobValueByKey } from "../../../utils/getFunctions";
import MemberDetailModal from "../ProcessManagementPage/MemberDetailModal";
import { Button, Upload, message as Message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { GoPaperclip } from "react-icons/go";

const MessageDetails = ({ id }) => {
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");

  const getMessage = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/message/company/${id}`
    );
    if (res.data.error) return Message.error(res.data.message);
    setMessage(res.data.messageDetails);
  };

  const beforeUpload = () => {
    return false;
  };

  const handleChange = (info) => {
    let updatedFileList = [...info.fileList];
    setFileList(updatedFileList);

    // Provide feedback on upload status
    info.fileList.forEach((file) => {
      if (file.status === "done") {
        Message.success(`${file.name} file uploaded successfully`);
      } else if (file.status === "error") {
        Message.error(`${file.name} file upload failed.`);
      }
    });
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      return;
    }

    const formData = new FormData();

    // Append multiple files
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj); // Ensure correct file object
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/file/multi`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Message.success("ファイルアップロード成功!");
      return response.data.files; // Assuming API returns an array of URLs
    } catch (error) {
      Message.error("ファイルアップロードに失敗しました");
    }
  };

  const sendMessage = async () => {
    const files = await handleUpload();
    const messageData = {
      message_id: message?.message_id,
      message: content,
      sender: message.second,
      recevier: message?.first,
      files: files,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/message/send`,
      messageData
    );
    if (res.data.error) return Message.error(res.data.message);
    await getMessage();
    setFileList([]);
    setContent("");
  };

  useEffect(() => {
    getMessage();
  }, [id]);
  return (
    <>
      {!message ? (
        <div className="text-center">メッセージがありません</div>
      ) : (
        <div className="px-4 w-full">
          <div className="fixed top-16 bg-white z-10 p-4 w-[calc(60%-50px)]">
            <div className="flex items-start gap-4">
              <p>
                <span className="lg:text-lg md:text-sm text-xs font-bold">
                  施設名:
                </span>
                <span className="lg:text-lg md:text-sm text-xs">
                  {message?.facility_id.name}
                </span>
              </p>
              <p>
                <span className="lg:text-lg md:text-sm text-xs font-bold">
                  職種:
                </span>
                <span className="lg:text-lg md:text-sm text-xs">
                  {message?.facility_id.job_type[0]}
                </span>
              </p>
            </div>
            <div className="flex justify-between w-full mt-4">
              <div className="flex items-start gap-4">
                <p>
                  <span className="lg:text-sm text-xs font-bold">
                    応募者名:
                  </span>
                  <span className="lg:text-sm text-xs">
                    {message?.user_id.name}
                  </span>
                </p>
                <p>
                  <span className="lg:text-sm text-xs font-bold">
                    応募者ID:
                  </span>
                  <span className="lg:text-sm text-xs">
                    {message?.user_id.member_id}
                  </span>
                </p>
              </div>
              <Link
                to={`/${getJobValueByKey(message.jobpost_id.type)}/details/${
                  message.jobPost_id
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:text-sm text-xs font-bold text-[#343434] hover:text-[#FF2A3B] hover:underline duration-300"
              >
                求人を確認
              </Link>
            </div>
            <div className="flex justify-between w-full mt-4">
              <div className="flex items-start gap-4">
                <p>
                  <span className="lg:text-sm text-xs font-bold">年齢:</span>
                  <span className="lg:text-sm text-xs">
                    {new Date().getFullYear() -
                      message?.user_id.birthday.split("-")[0]}
                  </span>
                </p>
                <p>
                  <span className="lg:text-sm text-xs font-bold">性別:</span>
                  <span className="lg:text-sm text-xs">
                    {message?.user_id.gender}
                  </span>
                </p>
              </div>
              <button
                className="lg:text-sm text-xs font-bold text-[#343434] hover:text-[#FF2A3B] hover:underline duration-300"
                onClick={() => setUserProfileModal(true)}
              >
                プロフィールを確認
              </button>
            </div>
          </div>
          <div className="mt-32 p-2 border-t-[1px]">
            {message?.content?.map((contentMessage, index) => {
              return (
                <>
                  <div
                    className={`flex flex-col ${
                      contentMessage.sender === message.first
                        ? "items-start"
                        : "items-end"
                    } mt-4`}
                  >
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-center bg-[#e7e7e7] rounded-lg">
                        {contentMessage?.message !== "" && (
                          <pre className="text-sm text-[#343434] p-4 leading-relaxed">
                            {contentMessage?.message}
                          </pre>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {contentMessage?.files.length > 0 &&
                        contentMessage?.files?.map((file, index) => {
                          return (
                            <a
                              key={index}
                              href={`${
                                process.env.REACT_APP_API_URL
                              }/api/v1/file/download/${file.fileUrl
                                .split("/")
                                .pop()}`}
                              className="text-xs hover:text-[#FF2A3B] duration-300 mt-1"
                              download={file.fileName}
                            >
                              {file.fileName}
                            </a>
                          );
                        })}
                    </div>
                  </div>
                </>
              );
            })}
            <div className="fixed bottom-4 z-10 w-full max-w-2xl mx-auto mt-8 textarea">
              <Upload
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="bg-[#e7e7e7] p-2 rounded-full hover:text-[#FF2A3B] duration-300 hover:cursor-pointer">
                    <GoPaperclip className="h-4 w-4" />
                  </div>
                  <p className="text-xs">
                    ※添付ファイルは送信先の事業所には公開されません
                  </p>
                </div>
              </Upload>
              <TextArea
                placeholder="返信を書いてください"
                className="bg-background mt-2"
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-center mt-8">
                <Button
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8"
                  onClick={sendMessage}
                >
                  送信する
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MemberDetailModal
        open={userProfileModal}
        onCancel={() => setUserProfileModal(false)}
        memberData={message?.user_id}
      />
    </>
  );
};

export default MessageDetails;

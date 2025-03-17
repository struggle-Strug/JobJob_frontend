import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getJobTypeValue } from "../../../utils/getFunctions";
import { JobType } from "../../../utils/constants/categories";
import { useAuth } from "../../../context/AuthContext";
import TextArea from "antd/es/input/TextArea";
import { GoPaperclip } from "react-icons/go";
import { Button, Upload, message as Message } from "antd";
const MessageDetail = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState({});
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");
  const { pathname } = useLocation();
  const message_id = pathname.split("/").pop();
  const jobType = getJobTypeValue(JobType, message?.jobpost_id?.type);

  const getMessage = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/message/detail/${message_id}`
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error("Failed to fetch message data:", err);
    }
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
      sender: user?._id,
      recevier: message?.second,
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
  console.log(user?._id);

  useEffect(() => {
    document.title = "メッセージ詳細";
    getMessage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            {message?.facility_id?.name}({message?.jobpost_id?.type})
          </p>
          <Link
            to={`/${jobType}/details/${message?.jobPost_id}`}
            className="hover:underline hover:text-[#FF2A3B] duration-300 text-[#343434] text-xs mt-1"
          >
            求人を確認する
          </Link>
        </div>
        <div className="flex flex-col w-full bg-white rounded-t-lg p-4 shadow-xl mt-4">
          <div className="flex flex-col items-end">
            <div className="flex flex-col">
              <p className="text-sm text-center bg-[#FF2A3B] rounded-t-lg py-1">
                応募
              </p>
              <div className="flex justify-center bg-[#FF5564] rounded-b-lg">
                <pre className="text-sm text-[#343434] p-4 leading-relaxed">
                  {message?.content?.[0].message}
                </pre>
              </div>
            </div>
          </div>
          {message?.content
            ?.filter((_, index) => index !== 0)
            ?.map((message, index) => {
              return (
                <>
                  <div
                    className={`flex flex-col ${
                      message.sender == user?._id ? "items-end" : "items-start"
                    } mt-4`}
                  >
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-center bg-[#e7e7e7] rounded-lg">
                        {message?.message !== "" && (
                          <pre className="text-sm text-[#343434] p-4 leading-relaxed">
                            {message?.message}
                          </pre>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {message?.files.length > 0 &&
                        message?.files?.map((file, index) => {
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
          <div className="w-full max-w-2xl mx-auto mt-8 textarea">
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
    </>
  );
};

export default MessageDetail;

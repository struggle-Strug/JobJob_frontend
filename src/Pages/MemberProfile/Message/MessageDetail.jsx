"use client";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getJobTypeValue } from "../../../utils/getFunctions";
import { JobType } from "../../../utils/constants/categories";
import { useAuth } from "../../../context/AuthContext";
import TextArea from "antd/es/input/TextArea";
import { GoPaperclip } from "react-icons/go";
import { Button, Upload, message as antMessage } from "antd";
import SkeletonGroup from "../../../components/SkeletonGroup";

const MessageDetail = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const message_id = pathname.split("/").pop();

  // Use useMemo to avoid recalculating on every render
  const jobType = useMemo(() => {
    return message?.jobpost_id?.type
      ? getJobTypeValue(JobType, message.jobpost_id.type)
      : "";
  }, [message?.jobpost_id?.type]);

  // Use useCallback for functions to prevent unnecessary re-renders
  const getMessage = useCallback(async () => {
    if (!message_id) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/message/detail/${message_id}`
      );
      setMessage(res.data.message);
    } catch {
      message.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [message_id]);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    // Feedback is now handled by the Upload component's built-in status
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      return [];
    }

    const formData = new FormData();

    // Append multiple files
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
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
      antMessage.success("ファイルアップロード完了!");
      return response.data.files || []; // Return empty array as fallback
    } catch (error) {
      antMessage.error("ファイルアップロードに失敗しました");
      return [];
    }
  };

  const sendMessage = async () => {
    if (!content.trim() && fileList.length === 0) {
      antMessage.warning("メッセージまたはファイルを入力してください");
      return;
    }

    if (!message?.message_id || !user?._id) {
      antMessage.error("送信に必要な情報が不足しています");
      return;
    }

    setIsSubmitting(true);

    try {
      const files = await handleUpload();

      const messageData = {
        message_id: message.message_id,
        message: content,
        sender: user._id,
        recevier: message.second,
        files: files,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/message/send`,
        messageData
      );

      if (res.data.error) {
        antMessage.error(res.data.message || "メッセージの送信に失敗しました");
        return;
      }

      antMessage.success("メッセージを送信しました");
      await getMessage();
      setFileList([]);
      setContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
      antMessage.error("メッセージの送信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.title = "メッセージ詳細";
    getMessage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [getMessage]);

  // Render message bubbles based on sender
  const renderMessageBubble = (messageItem, index) => {
    const isCurrentUser = messageItem.sender === user?._id;

    return (
      <div
        key={index}
        className={`flex flex-col ${
          isCurrentUser ? "items-end" : "items-start"
        } mt-4`}
        aria-label={isCurrentUser ? "自分のメッセージ" : "相手のメッセージ"}
      >
        <div className="flex flex-col">
          <div
            className={`flex justify-center rounded-lg ${
              isCurrentUser ? "bg-[#f0f0f0]" : "bg-[#e7e7e7]"
            }`}
          >
            {messageItem?.message && (
              <pre className="text-sm text-[#343434] p-4 leading-relaxed whitespace-pre-wrap break-words max-w-[80vw] md:max-w-[60vw]">
                {messageItem.message}
              </pre>
            )}
          </div>
        </div>
        {messageItem?.files?.length > 0 && (
          <div className="flex flex-col gap-1 mt-1">
            {messageItem.files.map((file, fileIndex) => (
              <a
                key={fileIndex}
                href={`${
                  process.env.REACT_APP_API_URL
                }/api/v1/file/download/${file.fileUrl.split("/").pop()}`}
                className="text-xs hover:text-[#FF2A3B] duration-300 flex items-center gap-1"
                download={file.fileName}
                aria-label={`添付ファイル: ${file.fileName}`}
              >
                <GoPaperclip className="h-3 w-3" />
                {file.fileName}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <SkeletonGroup isLoading={loading}>
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
          <h1 className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            {message?.facility_id?.name || "読み込み中..."}
            {message?.jobpost_id?.type && `(${message.jobpost_id.type})`}
          </h1>
          {message?.jobPost_id && (
            <Link
              to={`/${jobType}/${message.jobPost_id}`}
              className="hover:underline hover:text-[#FF2A3B] duration-300 text-[#343434] text-xs mt-1"
            >
              求人を確認する
            </Link>
          )}
        </div>

        {/* Message Thread */}
        <div className="flex flex-col w-full bg-white rounded-t-lg p-4 shadow-xl mt-4">
          {/* Initial Application Message */}
          {message?.content?.[0] && (
            <div className="flex flex-col items-end">
              <div className="flex flex-col">
                <p className="text-sm text-center bg-[#FF2A3B] rounded-t-lg py-1 text-white">
                  応募
                </p>
                <div className="flex justify-center bg-[#FF5564] rounded-b-lg">
                  <pre className="text-sm text-[#343434] p-4 leading-relaxed whitespace-pre-wrap break-words max-w-[80vw] md:max-w-[60vw]">
                    {message.content[0].message}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Conversation Messages */}
          {message?.content
            ?.filter((_, index) => index !== 0)
            ?.map(renderMessageBubble)}

          {/* Reply Form */}
          <div className="w-full max-w-2xl mx-auto mt-8">
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleChange}
              multiple
              maxCount={5}
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={1000}
            />

            <div className="flex justify-center mt-8">
              <Button
                className="bg-rose-500 hover:bg-rose-600 text-white px-8"
                onClick={sendMessage}
                loading={isSubmitting}
                disabled={
                  isSubmitting || (!content.trim() && fileList.length === 0)
                }
              >
                送信する
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SkeletonGroup>
  );
};

export default MessageDetail;

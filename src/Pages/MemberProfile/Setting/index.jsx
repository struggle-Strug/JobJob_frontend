import { Input, Modal, Radio, message } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Setting = () => {
  const { user } = useAuth();
  const [notificaionEmail, setNotificationEmail] = useState(false);
  const [messageSetting, setMessageSetting] = useState(false);
  const [newJobSetting, setNewJobSetting] = useState(false);
  const [recommendJobSetting, setRecommendJobSetting] = useState(false);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleNotification = async () => {
    const newNotificationSetting = {
      notificationEmail: notificaionEmail,
      message: messageSetting,
      newJob: newJobSetting,
      recommendJob: recommendJobSetting,
    };

    const resData = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/membersetting/notification/${user?._id}`,
      newNotificationSetting
    );
    if (resData.data.error) {
      message.error(resData.data.message);
    } else {
      message.success(resData.data.message);
      setNotificationEmail(resData.data.setting.notificationEmail);
      setMessageSetting(resData.data.setting.message);
      setNewJobSetting(resData.data.setting.newJob);
      setRecommendJobSetting(resData.data.setting.recommendJob);
    }
  };

  const handleEmail = async () => {
    const resData = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/membersetting/email/${user?._id}`,
      { email: email }
    );
    if (resData.data.error) {
      message.error(resData.data.message);
    } else {
      message.success(resData.data.message);
      setEmail(resData.data.email);
    }
  };

  const handlePassword = async () => {
    if (newPassword !== confirmPassword) {
      message.error("新しいパスワードと確認用パスワードが一致しません");
      return;
    }
    const resData = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/membersetting/password/${user?._id}`,
      { currentPassword: currentPassword, newPassword: newPassword }
    );
    if (resData.data.error) {
      message.error(resData.data.message);
    } else {
      message.success(resData.data.message);
      setNotificationEmail(resData.data.setting.notificationEmail);
      setMessageSetting(resData.data.setting.message);
      setNewJobSetting(resData.data.setting.newJob);
      setRecommendJobSetting(resData.data.setting.recommendJob);
    }
  };

  const handleStopService = async () => {
    setIsNotificationOpen(false);
    setIsEmailOpen(false);
    setIsPasswordOpen(false);
    setIsWithdrawalOpen(false);

    const newSetting = {
      notificationEmail: false,
      message: false,
      newJob: false,
      recommendJob: false,
    };
    const resData = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/membersetting/stop/${user?._id}`,
      newSetting
    );
    if (resData.data.error) {
      message.error(resData.data.message);
    } else {
      message.success(resData.data.message);
      setNotificationEmail(false);
    }
  };

  const handleDeleteAccount = async () => {
    const resData2 = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/rireki/delete/${user?._id}`
    );
    const resData3 = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/career/delete/${user?._id}`
    );
    const resData = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/delete/${user?._id}`
    );
    if (resData.data.error || resData2.data.error || resData3.data.error) {
      message.error(resData.data.message);
    } else {
      message.success("ジョブジョブからの退会を停止しました");
      handleLogout();
    }
  };

  useEffect(() => {
    document.title = "設定 | JobJob (ジョブジョブ)";
    setNotificationEmail(user?.setting.notificationEmail);
    setMessageSetting(user?.setting.message);
    setNewJobSetting(user?.setting.newJob);
    setRecommendJobSetting(user?.setting.recommendJob);
    setEmail(user?.email);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user]);
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            設定
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-4">
          <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
            <button
              className="flex items-center justify-between w-full mt-4 border-t-[1px] border-[#c2c2c2] p-4 px-2"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">
                  通知
                </span>
              </button>
              <img
                src={"/assets/images/companytop/ep_arrow-right_red.png"}
                alt="arrow"
                className={`duration-300 ${
                  !isNotificationOpen ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
          </div>
          <div
            className={`duration-300 w-full overflow-hidden bg-[#f7f6f2] rounded-lg ${
              isNotificationOpen ? "opacity-100 px-4 py-5" : "max-h-0 opacity-0"
            }`}
          >
            <p className="lg:text-base md:text-sm text-xs text-[#343434] pb-4 border-b-[1px] border-[#e2e2e2]">
              ジョブジョブからのお知らせなど、各種通知の受信設定ができます。
            </p>
            <div className="flex flex-col items-start pt-3 pb-4">
              <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
                登録メールアドレスへの通知メールの設定
              </p>
              <div className="px-3 py-2 mt-4 bg-white rounded-t-lg w-full border-b-[1px] border-[#e2e2e2]">
                <Radio
                  checked={notificaionEmail}
                  onChange={() => setNotificationEmail(true)}
                >
                  <p
                    className={`lg:text-sm text-xs font-bold ${
                      notificaionEmail ? "text-[#343434]" : "text-[#FF2A3B]"
                    }`}
                  >
                    受け取る
                  </p>
                </Radio>
              </div>
              <div className="px-3 py-2 bg-white rounded-b-lg w-full">
                <Radio
                  checked={!notificaionEmail}
                  onChange={() => setNotificationEmail(false)}
                >
                  <p
                    className={`lg:text-sm text-xs font-bold ${
                      !notificaionEmail ? "text-[#343434]" : "text-[#FF2A3B]"
                    }`}
                  >
                    受け取らない
                  </p>
                </Radio>
              </div>
              <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] mt-4">
                メッセージ ON/OFF
              </p>
              <div className="px-3 py-2 mt-4 bg-white rounded-t-lg w-full border-b-[1px] border-[#e2e2e2]">
                <Radio
                  checked={messageSetting}
                  onChange={() => setMessageSetting(true)}
                >
                  <p
                    className={`lg:text-sm text-xs font-bold ${
                      messageSetting ? "text-[#343434]" : "text-[#FF2A3B]"
                    }`}
                  >
                    受け取る
                  </p>
                </Radio>
              </div>
              <div className="px-3 py-2 bg-white rounded-b-lg w-full">
                <Radio
                  checked={!messageSetting}
                  onChange={() => setMessageSetting(false)}
                >
                  <p
                    className={`lg:text-sm text-xs font-bold ${
                      !messageSetting ? "text-[#343434]" : "text-[#FF2A3B]"
                    }`}
                  >
                    受け取らない
                  </p>
                </Radio>
              </div>
              <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] mt-4">
                新着求人 ON/OFF
              </p>
              <div className="px-3 py-2 mt-4 bg-white rounded-t-lg w-full border-b-[1px] border-[#e2e2e2]">
                <Radio
                  checked={newJobSetting}
                  onChange={() => setNewJobSetting(true)}
                >
                  <p
                    className={`lg:text-sm text-xs font-bold ${
                      newJobSetting ? "text-[#343434]" : "text-[#FF2A3B]"
                    }`}
                  >
                    受け取る
                  </p>
                </Radio>
              </div>
              <div className="px-3 py-2 bg-white rounded-b-lg w-full">
                <Radio
                  checked={!newJobSetting}
                  onChange={() => setNewJobSetting(false)}
                >
                  <p
                    className={`lg:text-sm text-xs font-bold ${
                      !newJobSetting ? "text-[#343434]" : "text-[#FF2A3B]"
                    }`}
                  >
                    受け取らない
                  </p>
                </Radio>
              </div>
              <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] mt-4">
                おすすめ求人・お役立ち情報 ON/OFF
              </p>
              <div className="px-3 py-2 mt-4 bg-white rounded-t-lg w-full border-b-[1px] border-[#e2e2e2]">
                <Radio
                  checked={recommendJobSetting}
                  onChange={() => setRecommendJobSetting(true)}
                >
                  <p
                    className={`lg:text-sm text-xs font-bold ${
                      recommendJobSetting ? "text-[#343434]" : "text-[#FF2A3B]"
                    }`}
                  >
                    受け取る
                  </p>
                </Radio>
              </div>
              <div className="px-3 py-2 bg-white rounded-b-lg w-full">
                <Radio
                  checked={!recommendJobSetting}
                  onChange={() => setRecommendJobSetting(false)}
                >
                  <p
                    className={`lg:text-sm text-xs font-bold ${
                      !recommendJobSetting ? "text-[#343434]" : "text-[#FF2A3B]"
                    }`}
                  >
                    受け取らない
                  </p>
                </Radio>
              </div>
            </div>
            <div className="w-full flex justify-center items-center gap-6 mt-4 border-t-[1px] border-[#c2c2c2] pt-4">
              <button
                onClick={handleNotification}
                className="lg:text-base md:text-sm text-xs bg-[#FF2A3B] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
              >
                通知設定を変更する
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
            <button
              className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2"
              onClick={() => setIsEmailOpen(!isEmailOpen)}
            >
              <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">
                  メールアドレス
                </span>
              </button>
              <img
                src={"/assets/images/companytop/ep_arrow-right_red.png"}
                alt="arrow"
                className={`duration-300 ${
                  !isEmailOpen ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
          </div>
          <div
            className={`duration-300 w-full overflow-hidden bg-[#f7f6f2] rounded-lg ${
              isEmailOpen ? "opacity-100 px-4 py-5" : "max-h-0 opacity-0"
            }`}
          >
            <p className="lg:text-sm text-xs text-[#343434] font-bold">
              現在のメールアドレス
              <span className="text-[#343434] font-normal">
                (ログイン時に使用するアドレス)
              </span>
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              {user?.email}
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-medium pt-4">
              新しいメールアドレス
            </p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 mt-2"
            />
            {email == user?.email && (
              <p className="lg:text-sm text-xs text-[#FF2A3B] font-medium mt-1">
                登録済みのメールアドレスです
              </p>
            )}
            <div className="w-full flex justify-center items-center mt-4">
              <button
                onClick={handleEmail}
                className="lg:text-base md:text-sm text-xs bg-[#e22434] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
              >
                メールアドレスを変更する
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
            <button
              className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2"
              onClick={() => setIsPasswordOpen(!isPasswordOpen)}
            >
              <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">
                  パスワード
                </span>
              </button>
              <img
                src={"/assets/images/companytop/ep_arrow-right_red.png"}
                alt="arrow"
                className={`duration-300 ${
                  !isPasswordOpen ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
          </div>
          <div
            className={`duration-300 w-full overflow-hidden bg-[#f7f6f2] rounded-lg ${
              isPasswordOpen ? "opacity-100 px-4 py-5" : "max-h-0 opacity-0"
            }`}
          >
            <p className="lg:text-sm text-xs text-[#343434] font-medium">
              現在のパスワード
            </p>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="h-10 mt-2"
            />
            <p className="lg:text-sm text-xs text-[#343434] font-medium mt-2">
              新しいパスワード
            </p>
            <Input
              type="password"
              value={newPassword}
              placeholder="8文字以上"
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-10 mt-2"
            />
            <p className="lg:text-sm text-xs text-[#343434] font-medium mt-2">
              新しいパスワード(確認)
            </p>
            <Input
              type="password"
              value={confirmPassword}
              placeholder="8文字以上"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-10 mt-2"
            />
            <div className="w-full flex justify-center items-center mt-4">
              <button
                onClick={handlePassword}
                className="lg:text-base md:text-sm text-xs bg-[#e22434] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
              >
                パスワードを変更する
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
            <button
              className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2"
              onClick={() => setIsWithdrawalOpen(!isWithdrawalOpen)}
            >
              <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">
                  退会申請
                </span>
              </button>
              <img
                src={"/assets/images/companytop/ep_arrow-right_red.png"}
                alt="arrow"
                className={`duration-300 ${
                  !isWithdrawalOpen ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
          </div>
          <div
            className={`duration-300 w-full overflow-hidden bg-[#f7f6f2] rounded-lg ${
              isWithdrawalOpen ? "opacity-100 px-4 py-5" : "max-h-0 opacity-0"
            }`}
          >
            <p className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] pb-4 border-b-[1px] border-[#e2e2e2] text-center">
              退会される前にご確認ください
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-bold mt-4">
              退会される場合
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              退会された場合、すべての会員向け機能のご利用ができなくなります。プロフィールやメッセージなどの各種情報は削除されると
              <span className="text-[#FF2A3B]">
                もとに戻すことはできません。
              </span>
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-bold mt-4">
              削除される情報の一例
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              ・入力したすべての
              <span>
                <Link
                  to={"/members/profiles"}
                  className="text-[#FF2A3B] hover:underline"
                >
                  プロフィール
                </Link>
              </span>
              や
              <span>
                <Link
                  to={"/members/profiles/edit/work_history"}
                  className="text-[#FF2A3B] hover:underline"
                >
                  職務経歴
                </Link>
              </span>
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              ・
              <span>
                <Link
                  to={"/members/resumes"}
                  className="text-[#FF2A3B] hover:underline"
                >
                  自己PR
                </Link>
              </span>
              として記載した文章
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              ・設定した
              <span>
                <Link
                  to={"/members/profiles/edit/desire"}
                  className="text-[#FF2A3B] hover:underline"
                >
                  こだわりの条件
                </Link>
              </span>
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              ・個別にカスタマイズされた各種設定
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              <Link
                to={"/members/settings"}
                className="text-[#FF2A3B] hover:underline pl-4"
              >
                各種通知の受信設定
              </Link>
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              ・メッセージ
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              <Link
                to={"/members/message"}
                className="text-[#FF2A3B] hover:underline pl-4"
              >
                メッセージを見る
              </Link>
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              ・参加中のキャンペーンの報酬受け取り権利
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              ・
              <Link
                to={"/members/job_offers/apply"}
                className="text-[#FF2A3B] hover:underline"
              >
                応募履歴
              </Link>
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-2">
              ・
              <Link
                to={"/members/job_offers/favorite"}
                className="text-[#FF2A3B] hover:underline"
              >
                気になるをした求人
              </Link>
            </p>
            <p className="lg:text-sm text-xs text-[#343434] font-normal mt-4">
              転職活動を終えたり休止したりといった理由でジョブジョブからの連絡が不要になった場合は、以下のボタンから
              <span className="text-[#FF2A3B]">
                登録情報を残したままジョブジョブの利用を停止することができます。
              </span>
              次回の転職活動時に再入力の必要がないため、退会せずに登録情報を残しておくことをおすすめします
              <span className="text-[#FF2A3B]">
                もとに戻すことはできません。
              </span>
            </p>
            <div className="w-full flex justify-center items-center mt-4">
              <button
                onClick={handleStopService}
                className="lg:text-base md:text-sm text-xs bg-[#FF2A3B] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
              >
                ジョブジョブからの連絡を停止する
              </button>
            </div>
            <div className="w-full flex justify-center items-center gap-6 mt-4 border-t-[1px] border-[#c2c2c2] pt-4">
              <Link
                to={"/members/profiles"}
                className="lg:text-base md:text-sm text-xs bg-[#FF2A3B] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
              >
                マイページトップへ戻る
              </Link>
              <button
                onClick={() => setDeleteAccountModal(true)}
                className="lg:text-base md:text-sm text-xs bg-white text-[#e22434] rounded-lg px-4 py-3 hover:text-black hover:shadow-xl duration-300"
              >
                退会へ進む
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full hover:px-4 duration-300">
            <button
              className="flex items-center justify-between w-full border-t-[1px] border-[#c2c2c2] p-4 px-2"
              onClick={handleLogout}
            >
              <button className="flex flex-col items-start justify-start gap-1 w-2/5">
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-black">
                  ログアウト
                </span>
              </button>
              <img
                src={"/assets/images/companytop/ep_arrow-right_red.png"}
                alt="arrow"
                className={`duration-300`}
              />
            </button>
          </div>
        </div>
      </div>
      {
        <Modal
          open={deleteAccountModal}
          onCancel={() => setDeleteAccountModal(false)}
          footer={null}
          width={400}
          className="modal"
        >
          <p className="text-center lg:text-lg md:text-base text-sm font-bold text-[#343434]">
            本当に退会します、よろしいですか？
          </p>
          <p className="lg:text-base md:text-sm text-xs font-normal text-[#343434] mt-4">
            退会されると入力したプロフィールや受け取ったメッセージなどはすべて削除されます。
          </p>
          <div className="border-t-[1px] border-[#c2c2c2] pt-4 mt-4 flex flex-col items-start justify-start gap-2">
            <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
              退会せずに利用停止する
            </p>
            <button
              onClick={handleStopService}
              className="lg:text-base md:text-sm text-xs bg-[#FF2A3B] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300 w-full"
            >
              ジョブジョブからの連絡を停止する
            </button>
          </div>
          <div className="border-t-[1px] border-[#c2c2c2] pt-4 mt-4">
            <p className="text-left lg:text-base md:text-sm text-xs font-bold text-[#343434]">
              登録情報の削除を承諾して退会する
            </p>
            <div className="flex items-center justify-center mt-2">
              <button
                onClick={handleDeleteAccount}
                className="lg:text-base md:text-sm text-xs bg-[#EFEFEF] text-[#e22434] rounded-lg px-4 py-3 hover:text-black hover:shadow-xl duration-300"
              >
                退会する
              </button>
            </div>
          </div>
        </Modal>
      }
    </>
  );
};

export default Setting;

import { Input } from "antd";

const Step6 = ({
  setPhoneNumber,
  setEmail,
  setPassword,
  setPasswordConfirm,
}) => {
  const onChangePhoneNumber = (value) => {
    setPhoneNumber(value.target.value);
  };
  const onChangeEmail = (value) => {
    setEmail(value.target.value);
  };
  const onChangePassword = (value) => {
    setPassword(value.target.value);
  };
  const onChangePasswordConfirm = (value) => {
    setPasswordConfirm(value.target.value);
  };
  return (
    <>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p className="lg:text-lg md:text-base text-sm">電話番号</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-3/5">
          <div className="flex flex-col px-2">
            <div className="duration-300 overflow-hidden">
              <div className="flex justify-start gap-4">
                <Input
                  placeholder="電話番号"
                  className="w-1/2 py-2"
                  onChange={onChangePhoneNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p className="lg:text-lg md:text-base text-sm">メールアドレス</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-3/5">
          <div className="flex flex-col px-2">
            <div className="duration-300 overflow-hidden">
              <div className="flex justify-start gap-4">
                <Input
                  type="email"
                  placeholder="メールアドレス"
                  className="w-1/2 py-2"
                  onChange={onChangeEmail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p className="lg:text-lg md:text-base text-sm">パスワード</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-3/5">
          <div className="flex flex-col px-2">
            <div className="duration-300 overflow-hidden">
              <div className="flex justify-start gap-4">
                <Input
                  type="password"
                  placeholder="PASSWORD"
                  className="w-1/2 py-2"
                  onChange={onChangePassword}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p className="lg:text-lg md:text-base text-sm">パスワード(確認)</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-3/5">
          <div className="flex flex-col px-2">
            <div className="duration-300 overflow-hidden">
              <div className="flex justify-start gap-4">
                <Input
                  type="password"
                  placeholder="PASSWORD(確認)"
                  className="w-1/2 py-2"
                  onChange={onChangePasswordConfirm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step6;

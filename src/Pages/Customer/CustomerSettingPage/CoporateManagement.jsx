import axios from "axios";
import { Button, Input, message, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const CoporateManagement = () => {
  const { customer } = useAuth();
  const [users, setUsers] = useState([]);
  const [addUserModal, setAddUserModal] = useState(false);
  const [contactPersonSei, setContactPersonSei] = useState("");
  const [contactPersonMei, setContactPersonMei] = useState("");
  const [huriganaContactPersonSei, setHuriganaContactPersonSei] = useState("");
  const [huriganaContactPersonMei, setHuriganaContactPersonMei] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Table columns
  const columns = [
    {
      title: "メールアドレス",
      dataIndex: "email",
      key: "email",
      width: 600,
    },
    {
      title: "操作",
      key: "actions",
      align: "center", // Center-align the column title and content
      render: (_, record) => (
        <div className="flex justify-center">
          {" "}
          {/* Center the button in the cell */}
          <Button
            className="text-white text-sm bg-[#FF2A3B] px-4 py-2 rounded-lg"
            disabled={data?.length === 1}
            onClick={() => handleDelete(record.id)}
          >
            削除
          </Button>
        </div>
      ),
      width: 120,
    },
  ];

  const data = users?.map((user) => ({
    key: user._id,
    id: user._id,
    email: user.email,
  }));

  const handleAdd = async () => {
    if ((contactPersonSei || contactPersonMei) === "")
      return message.error("担当者名を入力してください");
    if (phoneNumber === "") return message.error("電話番号を入力してください");
    if (email === "") return message.error("メールアドレスを入力してください");
    if (password === "") return message.error("パスワードを入力してください");
    if (password !== confirmPassword)
      return message.error("パスワードが一致しません");

    const newCustomer = {
      contactPerson: `${contactPersonSei} ${contactPersonMei}`,
      huriganaContactPerson: `${huriganaContactPersonSei} ${huriganaContactPersonMei}`,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/customers/users`,
      newCustomer
    );
    if (response.data.error) return message.error(response.data.message);
    message.success("ユーザー追加成功");
    setContactPersonSei("");
    setContactPersonMei("");
    setHuriganaContactPersonSei("");
    setHuriganaContactPersonMei("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAddUserModal(false);
    getUsers();
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/customers/users/${id}`
    );
    if (response.data.error) return message.error(response.data.message);
    message.success("ユーザー削除成功");
    getUsers();
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/customers/users`
      );
      if (response.data.error) return message.error(response.data.message);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    document.title = "ユーザー管理";
    getUsers();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="flex flex-col bg-white min-h-screen p-8 rounded-lg">
        <p className="text-left text-xl font-bold text-[#343434] p-4">
          ユーザー管理
        </p>
        <div className="flex justify-center text-[#FF2A3B]">
          <Button
            className="text-white text-base bg-[#FF2A3B] px-8 py-5 rounded-lg"
            onClick={() => setAddUserModal(true)}
          >
            ユーザー追加
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 20,
            position: ["bottomCenter"], // Center the pagination at the bottom
          }}
          bordered
          size="middle"
          className="[&_.ant-table-cell]:!whitespace-nowrap mt-8"
        />
      </div>

      <Modal
        open={addUserModal}
        onCancel={() => setAddUserModal(false)}
        footer={null}
        width={800}
        className="modal"
      >
        <div className="border-r-[1px] border-b-[1px] border-[#EFEFEF] m-8">
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-start">
              <p className="text-sm font-bold text-[#343434]">法人名・貴社名</p>
            </div>
            <div className="w-3/4 p-4">
              <p className="text-sm font-bold text-[#343434]">
                {customer?.companyName}
              </p>
            </div>
          </div>
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-start">
              <p className="text-sm font-bold text-[#343434]">
                <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                  必須
                </span>
                担当者氏名
              </p>
            </div>
            <div className="w-3/4 p-4">
              <div className="w-full flex items-center gap-6">
                <Input
                  placeholder="山田"
                  className="w-1/2 h-10"
                  value={contactPersonSei}
                  onChange={(e) => setContactPersonSei(e.target.value)}
                />
                <Input
                  placeholder="太郎"
                  className="w-1/2 h-10"
                  value={contactPersonMei}
                  onChange={(e) => setContactPersonMei(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
              <p className="text-sm font-bold text-[#343434]">
                担当者氏名(フリガナ)
              </p>
            </div>
            <div className="w-3/4 p-4 flex items-center gap-6">
              <Input
                placeholder="ヤマダ"
                className="w-1/2 h-10"
                value={huriganaContactPersonSei}
                onChange={(e) => setHuriganaContactPersonSei(e.target.value)}
              />
              <Input
                placeholder="タロウ"
                className="w-1/2 h-10"
                value={huriganaContactPersonMei}
                onChange={(e) => setHuriganaContactPersonMei(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
              <p className="text-sm font-bold text-[#343434]">
                <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                  必須
                </span>
                電話番号
              </p>
            </div>
            <div className="w-3/4 p-4 flex flex-col items-start">
              <Input
                placeholder="03-1234-5678"
                className="w-full h-10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
              <p className="text-sm font-bold text-[#343434]">
                <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                  必須
                </span>
                メールアドレス
              </p>
            </div>
            <div className="w-3/4 p-4">
              <Input
                placeholder="jobjob@example.com"
                className="w-full h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
              <p className="text-sm font-bold text-[#343434]">
                <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                  必須
                </span>
                パスワード
              </p>
            </div>
            <div className="w-3/4 p-4">
              <Input
                type="password"
                className="w-full h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
              <p className="text-sm font-bold text-[#343434]">
                <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                  必須
                </span>
                パスワード
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(確認)
              </p>
            </div>
            <div className="w-3/4 p-4">
              <Input
                type="password"
                className="w-full h-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="text-white text-sm bg-[#FF2A3B] px-8 py-4 rounded-lg"
            onClick={handleAdd}
          >
            登録
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CoporateManagement;

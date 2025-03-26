import React, { useState } from "react";
import { Row, Col, Input, Select, message } from "antd";
import { Prefectures } from "../../../utils/constants/categories/prefectures.js";
import { Municipalities } from "../../../utils/constants/categories/municipalities.js";
import { useAuth } from "../../../context/AuthContext.js";
import axios from "axios";
import { useEffect } from "react";

const { Option, OptGroup } = Select;

// スタイルオブジェクトの定義
const inputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
};

const selectStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
};

const cellStyle = {
  border: "0.5px solid #c5c5c5",
  padding: 1,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  paddingLeft: 2,
};

const formCellStyle = {
  border: "0.5px solid #c5c5c5",
};

const CoporateInformation = () => {
  const { customer } = useAuth();
  // 各入力項目用の state 変数の定義
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [postalCode, setPostalCode] = useState(""); // 郵便番号
  const [prefecture, setPrefecture] = useState(""); // 都道府県
  const [municipality, setMunicipality] = useState(""); // 市区町村
  const [address, setAddress] = useState(""); // 町名・番地
  const [buildingName, setBuildingName] = useState(""); // 建物名
  const [firstName, setFirstName] = useState(""); // 担当者氏名（名）
  const [lastName, setLastName] = useState(""); // 担当者氏名（姓）
  const [firstNameFurigana, setFirstNameFurigana] = useState(""); // 担当者氏名(フリガナ)（名）
  const [lastNameFurigana, setLastNameFurigana] = useState(""); // 担当者氏名(フリガナ)（姓）
  const [phoneNumber, setPhoneNumber] = useState(""); // 電話番号

  // 数字のみの入力を許容するハンドラ
  const handleNumericInput = (value, setter, fieldName) => {
    if (/^\d*$/.test(value)) {
      setter(value);
    } else {
      message.error(`${fieldName}は数字のみ入力してください`);
    }
  };

  // 送信ボタン押下時のハンドラ（中身は未実装）
  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      companyName: customer?.companyName,
      postalCode: postalCode,
      prefecture: prefecture,
      municipality: municipality,
      address: address,
      buildingName: buildingName,
      contactPerson: `${firstName} ${lastName}`, // Correct way to concatenate variables
      contactPersonHurigana: `${firstNameFurigana} ${lastNameFurigana}`,
      phoneNumber: phoneNumber,
    };

    try {
      let response;

      if (alreadyRegistered) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/company`,
          companyData
        );
        if (response.data.error) return message.error(response.data.message);
        message.success("法人情報を更新しました。");
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/company`,
          companyData
        );
        if (response.data.error) return message.error(response.data.message);
        message.success("法人情報を登録しました。");
      }
    } catch (err) {
      console.error(err);
      message.error("エラーが発生しました。");
    }
  };

  const getCompanyInfo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/company/`
    );
    if (response.data.error) return message.error(response.data.message);
    setAlreadyRegistered(true);
    setPostalCode(response.data.company.postalCode);
    setPrefecture(response.data.company.prefecture);
    setMunicipality(response.data.company.municipality);
    setAddress(response.data.company.address);
    setBuildingName(response.data.company.buildingName);
    setFirstName(response.data.company.contactPerson.split(" ")[0]);
    setLastName(response.data.company.contactPerson.split(" ")[1]);
    setFirstNameFurigana(
      response.data.company.contactPersonHurigana.split(" ")[0]
    );
    setLastNameFurigana(
      response.data.company.contactPersonHurigana.split(" ")[1]
    );
    setPhoneNumber(response.data.company.phoneNumber);
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Row className="bg-[#ffffff] rounded-lg p-3 ">
        {/* セクションタイトル */}
        <Col span={24} className="font-black text-lg ">
          法人情報
        </Col>

        <Col span={24} className="p-6">
          {/* 法人名・貴社名表示 */}
          <Row>
            <Col span={5} className="font-bold">
              法人名・貴社名
            </Col>
            <Col span={19}>
              <p className="pl-3 pr-3 pb-3">{customer?.companyName}</p>
              <p className="p-3">
                ※法人名・貴社名を変更する場合は、
                <a
                  href="/contact"
                  style={{ textDecoration: "underline", color: "-webkit-link" }}
                >
                  お問い合わせ
                </a>
                ください
              </p>
            </Col>
          </Row>

          {/* 住所入力エリア */}
          <Row className="mt-8">
            {/* 郵便番号 */}
            <Col
              span={8}
              style={{ ...cellStyle, borderRight: "0.5px", borderBottom: 0 }}
              className="font-bold"
            >
              郵便番号
            </Col>
            <Col span={4} style={{ ...cellStyle, borderBottom: 0 }}>
              必須
            </Col>
            <Col
              span={12}
              style={{ ...cellStyle, borderLeft: "0.5px", borderBottom: 0 }}
            >
              <Input
                style={inputStyle}
                placeholder="郵便番号"
                value={postalCode}
                onChange={(e) =>
                  handleNumericInput(e.target.value, setPostalCode, "郵便番号")
                }
              />
            </Col>

            {/* 都道府県 */}
            <Col
              span={8}
              style={{ ...cellStyle, borderRight: "0.5px", borderBottom: 0 }}
              className="font-bold"
            >
              都道府県
            </Col>
            <Col span={4} style={{ ...cellStyle, borderBottom: 0 }}>
              必須
            </Col>
            <Col
              span={12}
              style={{ ...cellStyle, borderLeft: "0.5px", borderBottom: 0 }}
            >
              <Select
                style={selectStyle}
                placeholder="都道府県"
                value={prefecture || undefined}
                onChange={(value) => {
                  setPrefecture(value);
                  setMunicipality(""); // 都道府県が変更されたら市区町村をリセット
                }}
              >
                {Object.keys(Prefectures).map((region) => (
                  <OptGroup label={region} key={region}>
                    {Object.keys(Prefectures[region]).map((prefName) => (
                      <Option value={prefName} key={prefName}>
                        {prefName}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </Col>

            {/* 市区町村 */}
            <Col
              span={8}
              style={{ ...cellStyle, borderRight: "0.5px", borderBottom: 0 }}
              className="font-bold"
            >
              市区町村
            </Col>
            <Col span={4} style={{ ...cellStyle, borderBottom: 0 }}>
              必須
            </Col>
            <Col
              span={12}
              style={{ ...cellStyle, borderLeft: "0.5px", borderBottom: 0 }}
            >
              <Select
                style={selectStyle}
                placeholder="市区町村"
                value={municipality || undefined}
                onChange={(value) => setMunicipality(value)}
                disabled={!prefecture} // 都道府県未選択時は無効にする
              >
                {prefecture &&
                  Municipalities[prefecture] &&
                  Municipalities[prefecture].map((city) => (
                    <Option value={city} key={city}>
                      {city}
                    </Option>
                  ))}
              </Select>
            </Col>

            {/* 町名・番地 */}
            <Col
              span={8}
              style={{ ...cellStyle, borderRight: "0.5px", borderBottom: 0 }}
              className="font-bold"
            >
              町名・番地
            </Col>
            <Col span={4} style={{ ...cellStyle, borderBottom: 0 }}>
              必須
            </Col>
            <Col
              span={12}
              style={{ ...cellStyle, borderLeft: "0.5px", borderBottom: 0 }}
            >
              <Input
                style={inputStyle}
                placeholder="町名・番地"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>

            {/* 建物名 */}
            <Col
              span={8}
              style={{ ...cellStyle, borderRight: "0.5px" }}
              className="font-bold"
            >
              建物名
            </Col>
            <Col span={4} style={cellStyle}></Col>
            <Col span={12} style={{ ...cellStyle, borderLeft: "0.5px" }}>
              <Input
                style={inputStyle}
                placeholder="建物名"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
              />
            </Col>
          </Row>

          {/* 担当者情報入力エリア */}
          <Row className="mt-6" style={formCellStyle}>
            {/* 担当者氏名 */}
            <Col span={7} className="bg-[#f5f5f5] p-5" style={formCellStyle}>
              <p>
                <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                  必須
                </span>
                <span className="font-bold">担当者氏名</span>
              </p>
            </Col>
            <Col span={17} className="p-5" style={formCellStyle}>
              <p className="text-[red]">
                ※ジョブメドレー運営事務所および応募者との連絡先となります。応募者に提示可能な連絡先をご入力ください。求人??には掲載されません。
              </p>
              <Row className="pt-2 pb-2">
                <Col span={10}>
                  <Input
                    placeholder="山田"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
                <Col span={10} className="ml-2">
                  <Input
                    placeholder="太郎"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>

            {/* 担当者氏名(フリガナ) */}
            <Col span={7} className="bg-[#f5f5f5] p-5" style={formCellStyle}>
              <p>
                <span className="font-bold">担当者氏名(フリガナ)</span>
              </p>
            </Col>
            <Col span={17} className="p-5" style={formCellStyle}>
              <Row className="pt-2 pb-2">
                <Col span={10}>
                  <Input
                    placeholder="ヤマダ"
                    value={lastNameFurigana}
                    onChange={(e) => setLastNameFurigana(e.target.value)}
                  />
                </Col>
                <Col span={10} className="ml-2">
                  <Input
                    placeholder="タロウ"
                    value={firstNameFurigana}
                    onChange={(e) => setFirstNameFurigana(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>

            {/* 電話番号 */}
            <Col span={7} className="bg-[#f5f5f5] p-5" style={formCellStyle}>
              <p>
                <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                  必須
                </span>
                <span className="font-bold">電話番号</span>
              </p>
            </Col>
            <Col span={17} className="p-5" style={formCellStyle}>
              <p className="text-[red]">
                ※ジョブメドレー運営事務所および応募者との連絡先となります。応募者に提示可能な連絡先をご入力ください。求人??には掲載されません。
              </p>
              <Row className="pt-2 pb-2">
                <Col span={24}>
                  <Input
                    placeholder="0123456789"
                    value={phoneNumber}
                    onChange={(e) =>
                      handleNumericInput(
                        e.target.value,
                        setPhoneNumber,
                        "電話番号"
                      )
                    }
                  />
                </Col>
              </Row>
              <p>
                ※応募が来た場合に、この連絡先が開示されます。求職者に開示可能な連絡先をご入力ください。
              </p>
            </Col>
          </Row>

          {/* 送信ボタン */}
          <div className="flex items-center justify-center m-8">
            <button
              type="submit"
              className="inline-block px-4 py-2 font-bold text-blue-600 bg-blue-100 rounded-lg border relative"
              style={{ border: "2px solid #aaaaaa" }}
            >
              上記の内容で情報を保存する
            </button>
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default CoporateInformation;

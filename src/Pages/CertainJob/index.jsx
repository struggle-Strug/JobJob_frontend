import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getPrefectureKeyByValue,
  getEmploymentTypeKeyByValue,
  getFeatureKeyByValue,
  getJobTypeKeyByValue,
  getAllEmploymentValues,
  getAllFeatureValues,
} from "../../utils/getFunctions";
import {
  EmploymentType,
  Features,
  Prefectures,
  JobType as jobType,
} from "../../utils/constants/categories";
import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";

const CertainJob = () => {
  const { pathname } = useLocation();
  const [type, setType] = useState("1");
  const [pref, setPref] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [hourlySalary, setHourlySalary] = useState("");
  const [feature, setFeature] = useState("");

  const navigate = useNavigate();
  const path = pathname.split("/")[1];
  const JobType = getJobTypeKeyByValue(path);
  const isSelected = (v) => v === type;
  const notFound = pathname
    .split("/")
    .filter((item) => item !== "")
    .some(
      (item) =>
        getJobTypeKeyByValue(item) === null &&
        getPrefectureKeyByValue(item) === null &&
        getEmploymentTypeKeyByValue(item) === null &&
        getFeatureKeyByValue(item) === null
    );

  const monthlySalaryOptions = [
    { value: "", label: "指定なし" },
    { value: "180000", label: "18" },
    { value: "200000", label: "20" },
    { value: "250000", label: "25" },
    { value: "300000", label: "30" },
    { value: "1600", label: "40" },
    { value: "500000", label: "50" },
    { value: "600000", label: "60" },
    { value: "700000", label: "70" },
    { value: "800000", label: "80" },
    { value: "900000", label: "90" },
    { value: "1000000", label: "100" },
  ];

  const hourlySalaryOptions = [
    { value: "", label: "指定なし" },
    { value: "800", label: "800" },
    { value: "1000", label: "1000" },
    { value: "1200", label: "1200" },
    { value: "1400", label: "1400" },
    { value: "1600", label: "1600" },
    { value: "1800", label: "1800" },
    { value: "2000", label: "2000" },
    { value: "3000", label: "3000" },
    { value: "4000", label: "4000" },
    { value: "5000", label: "5000" },
  ];

  useEffect(() => {
    if (path !== "") {
      const link =
        `/${path}` +
        (pref !== "" ? `/${pref}` : "") +
        (employmentType !== "" ? `/${employmentType}` : "") +
        (feature !== "" ? `/${feature}` : "");

      // Only navigate if the link is different
      if (window.location.pathname !== link) {
        navigate(link);
      }
      console.log(link);
    }
  }, [pref, employmentType, feature]);

  useEffect(() => {
    const employmentTypeOrFeature =
      pathname.split("/")[pathname.split("/").length - 1];

    if (getAllEmploymentValues().includes(employmentTypeOrFeature)) {
      setEmploymentType(employmentTypeOrFeature);
    }
    if (getAllFeatureValues().includes(employmentTypeOrFeature)) {
      setFeature(employmentTypeOrFeature);
      pathname.split("/").length === 4 &&
        setEmploymentType(pathname.split("/")[2]);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // useEffect(() => {
  //   if (notFound) {
  //     navigate("/404");
  //   }

  // }, []);

  const renderPrefectureSection = (region, prefectures) => (
    <div className="col-span-1 flex flex-col justify-start items-center">
      <div className="w-full px-2 lg:px-4">
        <p className="text-xs lg:text-base font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-2 lg:py-3">
          {region}
        </p>
      </div>
      <div className="flex flex-col w-full px-2 lg:px-4">
        {Object.keys(prefectures).map((prefecture, index) => (
          <button
            key={index}
            className="text-xs lg:text-md text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
            onClick={() => setPref(prefectures[prefecture])}
          >
            {prefecture}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <BreadCrumb />
      {!pathname.includes("pref") && (
        <div className="bg-[#EFEFEF]">
          <section className="container bg-white rounded-lg px-8 lg:px-12 py-6 lg:py-12">
            <p className="flex flex-wrap gap-1 items-end">
              {feature !== "" && (
                <>
                  <span className="text-base lg:text-xl font-bold text-[#343434]">
                    {getFeatureKeyByValue(feature)}
                  </span>
                  <span className="text-xs lg:text-base text-[#343434]">
                    の
                  </span>
                </>
              )}
              {employmentType !== "" && (
                <>
                  <span className="text-base lg:text-xl font-bold text-[#343434]">
                    {getEmploymentTypeKeyByValue(employmentType)}
                  </span>
                  <span className="text-xs lg:text-base text-[#343434]">
                    の
                  </span>
                </>
              )}
              <span className="text-base lg:text-xl font-bold text-[#343434]">
                {JobType}
              </span>
              <span className="text-xs lg:text-base text-[#343434]">の</span>
            </p>
            <p className="text-sm lg:text-lg text-[#343434]">
              求人・転職・就職・アルバイト募集情報
            </p>
          </section>

          <section className="container bg-white rounded-lg mt-4">
            <div className="grid grid-cols-3 w-full px-2">
              <button
                onClick={() => setType("1")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  isSelected("1") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <img
                  src="/assets/images/dashboard/gg_pin.png"
                  alt="map"
                  className="w-4 lg:w-5 pt-0.5"
                />
                <p className="text-xs lg:text-md font-bold text-[#343434] duration-300 ml-1">
                  市区町村から選択
                </p>
              </button>
              <button
                onClick={() => setType("2")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  isSelected("2") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <img
                  src="/assets/images/dashboard/material-symbols_check-box-outline.png"
                  alt="map"
                  className="w-4 lg:w-5 pt-0.5"
                />
                <p className="text-xs lg:text-md font-bold text-[#343434] duration-300 ml-1">
                  雇用形態・給与から選択
                </p>
              </button>
              <button
                onClick={() => setType("3")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  isSelected("3") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <img
                  src="/assets/images/dashboard/mdi_tag-outline.png"
                  alt="map"
                  className="w-4 lg:w-5 pt-0.5"
                />
                <p className="text-xs lg:text-md font-bold text-[#343434] duration-300 ml-1">
                  特徴から選択
                </p>
              </button>
            </div>

            {type === "1" && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full py-3 gap-4 px-4">
                {renderPrefectureSection("関東", Prefectures.KANTO)}
                {renderPrefectureSection("関西", Prefectures.KANSAI)}
                {renderPrefectureSection("東海", Prefectures.TOKAI)}
                {renderPrefectureSection(
                  "北海道・東北",
                  Prefectures.HOKKAIDO_TOHOKU
                )}
                {renderPrefectureSection(
                  "甲信越・北陸",
                  Prefectures.KOSHINETSU_HOKURIKU
                )}
                {renderPrefectureSection(
                  "中部・近畿",
                  Prefectures.CHUGOKU_SHIKOKU
                )}
                {renderPrefectureSection(
                  "九州・沖縄",
                  Prefectures.KYUSHU_OKINAWA
                )}
              </div>
            )}

            {type === "2" && (
              <div className="w-full p-4 lg:p-6">
                <div className="mb-6">
                  <p className="text-sm lg:text-base text-[#343434] font-bold mb-4">
                    雇用形態
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {Object.keys(EmploymentType).map(
                      (employmentTypeKey, index) => (
                        <Checkbox
                          key={index}
                          onChange={() =>
                            setEmploymentType(EmploymentType[employmentTypeKey])
                          }
                          checked={
                            employmentType === EmploymentType[employmentTypeKey]
                          }
                        >
                          <span className="text-xs lg:text-sm">
                            {employmentTypeKey}
                          </span>
                        </Checkbox>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm lg:text-base text-[#343434] font-bold mb-4">
                    給与
                  </p>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs lg:text-sm font-bold text-[#343434]">
                        月給
                      </span>
                      <Select
                        options={monthlySalaryOptions}
                        onChange={(value) => setMonthlySalary(value)}
                        value={monthlySalary}
                        className="w-32 lg:w-40"
                      />
                      <span className="text-xs lg:text-sm text-[#343434]">
                        万円以上
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs lg:text-sm font-bold text-[#343434]">
                        時給
                      </span>
                      <Select
                        options={hourlySalaryOptions}
                        onChange={(value) => setHourlySalary(value)}
                        value={hourlySalary}
                        className="w-32 lg:w-40"
                      />
                      <span className="text-xs lg:text-sm text-[#343434]">
                        円以上
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold text-xs lg:text-lg duration-500 text-[#FF2A3B] hover:text-[#343434] px-4 lg:px-12 py-2 lg:py-4 rounded-lg">
                    検索する
                  </button>
                </div>
              </div>
            )}

            {type === "3" && (
              <div className="w-full p-4 lg:p-6">
                {[
                  { title: "休日の特徴", features: Features.HOLIDAY },
                  { title: "勤務時間の特徴", features: Features.WORKING_HOURS },
                  { title: "アクセスの特徴", features: Features.ACCESS },
                  { title: "仕事内容の特徴", features: Features.DESCRIPTION },
                  {
                    title: "給与・待遇・福利厚生の特徴",
                    features: Features.SALARY_BENEFITS_WELFARE,
                  },
                  {
                    title: "サービス形態の特徴",
                    features: Features.SERVICE_TYPES,
                  },
                  {
                    title: "教育体制・教育の特徴",
                    features: Features.EDUCATION,
                  },
                  {
                    title: "診療科目の特徴",
                    features: Features.MEDICAL_DEPARTMENT,
                  },
                ].map((section, index) => (
                  <div key={index} className="mb-6">
                    <p className="text-sm lg:text-base text-[#343434] font-bold mb-4">
                      {section.title}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {Object.keys(section.features).map((featureKey, idx) => (
                        <Checkbox
                          key={idx}
                          onChange={() =>
                            setFeature(section.features[featureKey])
                          }
                          checked={feature === section.features[featureKey]}
                        >
                          <span className="text-xs lg:text-sm">
                            {featureKey}
                          </span>
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default CertainJob;

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getEmploymentTypeKeyByValue,
  getFeatureKeyByValue,
  getJobTypeKeyByValue,
  getJobValueByKey,
} from "../../utils/getFunctions";
import {
  Descriptions,
  EmploymentType,
  Facilities,
  Features,
  Prefectures,
  JobType as jobType,
} from "../../utils/constants/categories";
import { Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import axios from "axios";
import { message } from "antd";
import { useAuth } from "../../context/AuthContext";

const CertainJob = () => {
  const { pathname } = useLocation();
  const [type, setType] = useState("1");
  const [pref, setPref] = useState("");
  const [employmentType, setEmploymentType] = useState([]);
  const [monthlySalary, setMonthlySalary] = useState("");
  const [hourlySalary, setHourlySalary] = useState("");
  const [feature, setFeature] = useState([]);
  const { user, likes, setLikes } = useAuth();
  const [filters, setFilters] = useState({
    pref: "",
    employmentType: [],
    monthlySalary: "",
    hourlySalary: "",
    feature: [],
  });

  const [toggleMedical, setToggleMedical] = useState(false);
  const [toggleDentist, setToggleDentist] = useState(false);
  const [toggleNursing, setToggleNursing] = useState(false);
  const [toggleChildcare, setToggleChildcare] = useState(false);
  const [toggleRehabilitation, setToggleRehabilitation] = useState(false);
  const [toggleOther, setToggleOther] = useState(false);
  const [toggleHealthcare, setToggleHealthcare] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const path = pathname.split("/")[1];
  const JobType = getJobTypeKeyByValue(path);
  const isSelected = (v) => v === type;
  const params = new URLSearchParams(location.search);
  const [jobTypeNumbers, setJobTypeNumbers] = useState([]);
  const [jobPostsNumbersByFacility, setJobPOstsNumbersByFacility] = useState();

  const isMuniSelected = pathname.endsWith("/select/muni");
  const isEmploymentSelected = pathname.endsWith("/select/employmentType");
  const isFeatureSelected = pathname.endsWith("/select/feature");
  const isPrefSelected = pathname.endsWith("/select/pref");

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

  const getJobTypeNumbers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/number`
    );
    if (response.data.error) return message.error(response.data.message);
    setJobTypeNumbers(response.data.JobPostsNumbers);
  };

  const getJobTypeNumbersByFacility = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/numberByNumber`,
      { type: JobType }
    );
    if (response.data.error) return message.error(response.data.message);
    setJobPOstsNumbersByFacility(response.data.numbers);
  };

  useEffect(() => {
    getJobTypeNumbers();
    getJobTypeNumbersByFacility();
  }, []);

  const renderMeshLink01 = (jobType) => {
    return Object.keys(Facilities).map((facility, index) => {
      return (
        <Link
          key={index} // Add a unique key when mapping
          to={`/${getJobValueByKey(jobType)}/${Facilities[facility]}`}
          className="col-span-1 flex items-start justify-between w-full border-b-[1px] border-[#e7e7e7] lg:text-sm md:text-xs text-[0.6rem] text-[#188CE0] py-2 font-bold px-2 hover:px-6 duration-300 group"
        >
          <p className="py-1">
            {facility}の{jobType}
            <span className="text-[#343434] text-xs">
              (
              {jobPostsNumbersByFacility
                ? jobPostsNumbersByFacility[facility]
                : 0}
              )
            </span>
          </p>
          <div className="flex items-center">
            <img
              src={"/assets/images/companytop/ep_arrow-right_red.png"}
              alt="arrow"
              className="duration-300 w-4"
            />
          </div>
        </Link>
      );
    });
  };

  const renderMeshLink02 = (category, toggle, setToggle) => (
    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-2 px-2">
      <div className="w-full gap-2">
        <p
          className="text-base text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
          onClick={() => setToggle(!toggle)}
        >
          <span>{category}</span>
          <img
            src={"/assets/images/companytop/ep_arrow-right_red.png"}
            alt="arrow"
            className={`duration-300 ${!toggle ? "rotate-90" : "-rotate-90"}`}
          />
        </p>
      </div>
      <div
        className={`duration-300 overflow-hidden ${
          toggle ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col w-full pt-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
            {Object.keys(jobType[category]).map((job, index) => {
              return (
                <Link
                  key={index}
                  to={`/${getJobValueByKey(job)}`}
                  className="col-span-1 flex items-start justify-between w-full lg:text-sm md:text-xs text-[0.6rem] text-[#188CE0] py-2 font-bold px-2 hover:underline duration-300 group"
                >
                  <p>
                    {job}
                    <span className="text-[#343434] text-xs">
                      ({jobTypeNumbers?.[job]})
                    </span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const handleSearch = () => {
    const url = `/${path}/search?filters=${encodeURIComponent(
      JSON.stringify(filters)
    )}`;
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmploymentTypeChange = (employmentTypeValue) => {
    setEmploymentType(
      (prev) =>
        prev.includes(employmentTypeValue)
          ? prev.filter((type) => type !== employmentTypeValue) // Remove if already selected
          : [...prev, employmentTypeValue] // Add if not selected
    );
  };

  const handleFeatureChange = (feature) => {
    setFeature(
      (prev) =>
        prev.includes(getFeatureKeyByValue(feature))
          ? prev.filter((type) => type !== getFeatureKeyByValue(feature)) // Remove if already selected
          : [...prev, getFeatureKeyByValue(feature)] // Add if not selected
    );
  };

  const handleOnChangePref = (p) => {
    if (pathname.split("/")[2] === "search") {
      // ✅ Update filters first
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, pref: p };

        // ✅ Navigate using the updated filters
        const url = `/${path}/search?filters=${encodeURIComponent(
          JSON.stringify(updatedFilters)
        )}`;
        navigate(url);
      });
    } else {
      const url = `/${path}/${p}`;
      navigate(url);
    }
  };

  const getConditionUrl = (filterName, value) => {
    const defaultFilters = {
      pref: "",
      employmentType: [],
      monthlySalary: "",
      hourlySalary: "",
      feature: [],
    };
    // 配列で管理するフィルターの場合
    if (filterName === "employmentType" || filterName === "feature") {
      defaultFilters[filterName] = [value];
    } else {
      defaultFilters[filterName] = value;
    }
    return `/${path}/search?filters=${encodeURIComponent(
      JSON.stringify(defaultFilters)
    )}`;
  };

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0"); // Get the current month with leading zero
    document.title = `【${year}年${month}月最新】${JobType}の求人・転職・募集 | JobJob (ジョブジョブ)`;
    setFilters({
      employmentType: employmentType,
      monthlySalary: monthlySalary,
      hourlySalary: hourlySalary,
      feature: feature,
    });
  }, [employmentType, feature, monthlySalary, hourlySalary]);

  useEffect(() => {
    const savedFilters = params.get("filters")
      ? JSON.parse(decodeURIComponent(params.get("filters")))
      : {
          pref: "",
          employmentType: [],
          hourlySalary: "",
          monthlySalary: "",
          feature: [],
        };

    setFilters(savedFilters);

    const isEmptyFilters =
      savedFilters.pref === "" &&
      savedFilters.employmentType.length === 0 &&
      savedFilters.hourlySalary === "" &&
      savedFilters.monthlySalary === "" &&
      savedFilters.feature.length === 0;

    if (isEmptyFilters) {
      const url = `/${path}`;
      if (window.location.pathname !== url) {
        navigate(url);
      } else {
        navigate(`/${path}/select/pref`);
      }
    } else {
      const url = `/${path}/search?filters=${encodeURIComponent(
        JSON.stringify(savedFilters)
      )}`;
      if (window.location.pathname !== url) {
        navigate(url);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []); // ✅ Make sure it runs when the search query updates

  const renderPrefectureSection = (region, prefectures) => (
    <div className="col-span-1 flex flex-col justify-start items-center">
      <div className="w-full px-2 lg:px-4">
        <p className="text-xs lg:text-base font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-2 lg:py-3">
          {region}
        </p>
      </div>
      <div className="flex flex-col w-full px-2 lg:px-4">
        {Object.keys(prefectures).map((prefecture, index) => (
          <a
            key={index}
            className="text-xs lg:text-md text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
            href={`/${getJobValueByKey(JobType)}/${prefectures[prefecture]}`}
            aria-label={prefecture} // Added aria-label based on prefecture name
          >
            {prefecture}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <BreadCrumb />
      {(!pathname.includes("pref") || isPrefSelected) && (
        <div className="bg-[#EFEFEF]">
          {pathname.split("/")[2] === "search" ? (
            <section className="container bg-white rounded-lg px-8 lg:px-12 py-6 lg:py-12">
              <p className="text-sm font-bold lg:text-lg text-[#343434]">
                <span className="lg:text-2xl text-base">{JobType}</span>
                の検索結果
                {filters?.feature.length > 0 && (
                  <>
                    <span className="text-base lg:text-xl font-bold text-[#343434]">
                      ({filters.feature.join("/")}/
                    </span>
                  </>
                )}
                {filters?.employmentType.length > 0 && (
                  <>
                    <span className="text-base lg:text-xl font-bold text-[#343434]">
                      {filters.employmentType.join("/")})
                    </span>
                  </>
                )}
              </p>
            </section>
          ) : (
            <section className="container bg-white rounded-lg px-8 lg:px-12 py-6 lg:py-12">
              <p className="flex flex-wrap gap-1 items-end">
                <span className="text-base lg:text-xl font-bold text-[#343434]">
                  {JobType}
                </span>
                <span className="text-xs lg:text-base text-[#343434]">の</span>
              </p>
              <p className="text-sm lg:text-lg text-[#343434]">
                求人・転職・就職・アルバイト募集情報
              </p>
            </section>
          )}

          <section className="container bg-white rounded-lg mt-4">
            <div className="grid grid-cols-3 w-full px-2">
              <Link
                to={`/${path}/select/pref`}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  isPrefSelected ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <img
                  src="/assets/images/dashboard/gg_pin.png"
                  alt="map"
                  className="w-4 lg:w-5 pt-0.5"
                />
                <p className="text-xs lg:text-md font-bold text-[#343434] duration-300 ml-1">
                  都道府県から選択
                </p>
              </Link>
              <Link
                to={`/${path}/select/employmentType`}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  isEmploymentSelected ? "border-b-4 border-[#FF2A3B]" : ""
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
              </Link>
              <Link
                to={`/${path}/select/feature`}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  isFeatureSelected ? "border-b-4 border-[#FF2A3B]" : ""
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
              </Link>
            </div>

            {isPrefSelected && (
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

            {isEmploymentSelected && (
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
                            handleEmploymentTypeChange(employmentTypeKey)
                          }
                          checked={employmentType.includes(employmentTypeKey)}
                          className="relative" // 右側に十分な余白を確保
                        >
                          <span className="text-xs lg:text-sm mr-5">
                            {employmentTypeKey}
                          </span>
                          <span className="absolute right-5 top-0 bottom-0 border-l border-slate-200"></span>
                          <a
                            href={getConditionUrl(
                              "employmentType",
                              employmentTypeKey
                            )} // リンク先URLを指定
                            className="absolute right-0 top-1/2 transform -translate-y-1/2"
                          >
                            <img
                              src="/assets/images/dashboard/ep_arrow-right_black.png"
                              alt="arrow-down"
                              className="w-4"
                            />
                          </a>
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
                  <button
                    className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold text-xs lg:text-lg duration-500 text-[#FF2A3B] hover:text-[#343434] px-4 lg:px-12 py-2 lg:py-4 rounded-lg"
                    onClick={handleSearch}
                  >
                    検索する
                  </button>
                </div>
              </div>
            )}

            {isFeatureSelected && (
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
                            handleFeatureChange(section.features[featureKey])
                          }
                          checked={feature.includes(
                            getFeatureKeyByValue(section.features[featureKey])
                          )}
                          className="relative" // 右側に十分な余白を確保
                        >
                          <span className="text-xs lg:text-sm">
                            {featureKey}
                          </span>
                          {/* 縦線 */}
                          <span className="absolute right-5 top-0 bottom-0 border-l border-slate-200"></span>
                          {/* チェブロンをリンクに */}
                          <a
                            href={getConditionUrl(
                              "feature",
                              getFeatureKeyByValue(section.features[featureKey])
                            )} // リンク先URLを指定
                            className="absolute right-0 top-1/2 transform -translate-y-1/2"
                          >
                            <img
                              src="/assets/images/dashboard/ep_arrow-right_black.png"
                              alt="arrow-down"
                              className="w-4"
                            />
                          </a>
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <button
                    className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold text-xs lg:text-lg duration-500 text-[#FF2A3B] hover:text-[#343434] px-4 lg:px-12 py-2 lg:py-4 rounded-lg"
                    onClick={handleSearch}
                  >
                    検索する
                  </button>
                </div>
              </div>
            )}
          </section>
          <div className="flex container w-full justify-between gap-8">
            <div className="flex flex-col w-2/3">
              <div className="  rounded-lg px-12 py-6 mt-8 shadow-xl bg-white">
                <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                  {JobType}について
                </p>
                <pre className="lg:text-[1rem] md:text-[0.8rem] mt-4">
                  {Descriptions[JobType]}
                </pre>
              </div>
              <div className="flex flex-col gap-2 rounded-lg px-12 py-6 mt-8 shadow-xl bg-white">
                <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                  施設形態から{JobType}の求人を探す
                </p>
                <div className="flex flex-col mt-4 border-t-[1px] border-[#e7e7e7]">
                  {renderMeshLink01(JobType)}
                </div>
              </div>
              <div className="  rounded-lg px-12 py-6 mt-8 shadow-xl bg-white">
                <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                  職種から求人を探す
                </p>
                <div className="w-full mt-4">
                  {renderMeshLink02("医科", toggleMedical, setToggleMedical)}
                  {renderMeshLink02("歯科", toggleDentist, setToggleDentist)}
                  {renderMeshLink02("介護", toggleNursing, setToggleNursing)}
                  {renderMeshLink02(
                    "保育",
                    toggleChildcare,
                    setToggleChildcare
                  )}
                  {renderMeshLink02(
                    "リハビリ／代替医療",
                    toggleRehabilitation,
                    setToggleRehabilitation
                  )}
                  {renderMeshLink02("その他", toggleOther, setToggleOther)}
                  {renderMeshLink02(
                    "ヘルスケア／美容",
                    toggleHealthcare,
                    setToggleHealthcare
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/3">
              <div className="flex flex-col items-center justify-start h-full w-full mt-8">
                <img
                  src="/assets/images/dashboard/Group 16.png"
                  alt="banner"
                  className="w-full"
                />
                <div className="flex items-center justify-start w-full mt-8">
                  <p className="lg:text-lg md:text-sm font-bold text-[#343434]">
                    必ず役立つ仕事術
                  </p>
                </div>
                <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 py-6 w-full mt-8 shadow-xl">
                  <div className="flex items-center justify-between w-full">
                    <p className="lg:text-[1rem] md:text-[0.8rem]">
                      ぴったりな仕事を探すには
                    </p>
                    <img
                      src="/assets/images/dashboard/ep_arrow-right_black.png"
                      alt="arrow-right"
                      className="w-4 pt-0.5"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full mt-4">
                    <p className="lg:text-[1rem] md:text-[0.8rem]">
                      応募の仕方
                    </p>
                    <img
                      src="/assets/images/dashboard/ep_arrow-right_black.png"
                      alt="arrow-right"
                      className="w-4 pt-0.5"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full mt-4">
                    <p className="lg:text-[1rem] md:text-[0.8rem]">
                      履歴書の書き方
                    </p>
                    <img
                      src="/assets/images/dashboard/ep_arrow-right_black.png"
                      alt="arrow-right"
                      className="w-4 pt-0.5"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full mt-4">
                    <p className="lg:text-[1rem] md:text-[0.8rem]">
                      メッセージの書き方
                    </p>
                    <img
                      src="/assets/images/dashboard/ep_arrow-right_black.png"
                      alt="arrow-right"
                      className="w-4 pt-0.5"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-start w-full mt-8">
                  <p className="lg:text-lg md:text-sm text-[#343434] font-bold">
                    人気のコラムランキング
                  </p>
                </div>
                <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 py-6 w-full mt-8 shadow-xl">
                  <div className="flex items-center justify-between gap-2 w-full">
                    <img
                      src="/assets/images/dashboard/Group 17.png"
                      alt="arrow-right"
                    />
                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">
                      失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 w-full mt-4">
                    <img
                      src="/assets/images/dashboard/Group 17_2.png"
                      alt="arrow-right"
                    />
                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">
                      失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 w-full mt-4">
                    <img
                      src="/assets/images/dashboard/Group 17_3.png"
                      alt="arrow-right"
                    />
                    <p className="lg:text-[0.75rem] md:text-[0.6rem] font-bold text-[#343434]">
                      失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Link
                      to={"/#"}
                      className="flex items-center justify-center mt-4 border-2 border-[#FF6B56] rounded-lg py-2 lg:px-16 md:px-8 px-4"
                    >
                      <p className="lg:text-[0.75rem] md:text-[0.6rem] text-[#FF6B56]">
                        ランキングをもっと見る
                      </p>
                    </Link>
                  </div>
                </div>
                {user == null && (
                  <>
                    <div className="flex items-center justify-start w-full mt-8">
                      <p className="lg:text-lg md:text-sm text-[#343434] font-bold">
                        会員登録がまだの方
                      </p>
                    </div>
                    <div className="flex flex-col items-center bg-white rounded-lg py-6 w-full mt-8 shadow-xl">
                      <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] pb-2">
                        <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">
                          1.
                        </p>
                        <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">
                          事務所からスカウトが届く
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] mt-2 pb-2">
                        <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">
                          2.
                        </p>
                        <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">
                          希望にあった求人が届く
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] mt-2 pb-2">
                        <p className="lg:text-[1rem] md:text-[0.7rem] font-bold text-[#999999] number pt-0.5">
                          3.
                        </p>
                        <p className="lg:text-[1rem] md:text-[0.7rem] text-[#343434]">
                          会員限定機能が利用できる
                        </p>
                      </div>
                      <Link
                        to={"/members/sign_up"}
                        className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-tr from-[#FF1812] to-[#FF5B02] rounded-lg px-6 py-2 hover:scale-105 duration-300"
                      >
                        <img
                          src="/assets/images/dashboard/mdi_account.png"
                          alt="register"
                          className="pt-0.5"
                        />
                        <p className="lg:text-lg md:text-sm text-white font-bold">
                          無料で会員登録する
                        </p>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertainJob;

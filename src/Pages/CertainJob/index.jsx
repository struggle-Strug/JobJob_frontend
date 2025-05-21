"use client";

import { Checkbox, Select, Skeleton, message } from "antd";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import MeshLink02 from "../../components/MeshLink02";
import NewJobs from "../../components/NewJobs";
import { useAuth } from "../../context/AuthContext";
import {
  Descriptions,
  EmploymentType,
  Facilities,
  Features,
  Prefectures,
} from "../../utils/constants/categories";
import {
  getEmploymentTypeKeyByValue,
  getFeatureKeyByValue,
  getFeatureValueByKey,
  getJobTypeKeyByValue,
  getJobValueByKey,
} from "../../utils/getFunctions";
import JobPosts from "../../components/JobPosts";

// Default filters state
const DEFAULT_FILTERS = {
  pref: "",
  employmentType: [],
  hourlySalary: "",
  monthlySalary: "",
  feature: [],
  muni: "",
  page: 1,
  features: [],
};

const CertainJob = () => {
  const { pathname } = useLocation();
  const [type, setType] = useState(1);
  const [employmentType, setEmploymentType] = useState([]);
  const [monthlySalary, setMonthlySalary] = useState("");
  const [hourlySalary, setHourlySalary] = useState("");
  const [feature, setFeature] = useState([]);
  const [jobData, setJobData] = useState({
    jobPosts: [],
    isLoading: false,
  });

  const { user } = useAuth();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Loading states
  const [isJobTypeNumbersLoading, setIsJobTypeNumbersLoading] = useState(true);
  const [
    isJobTypeNumbersByFacilityLoading,
    setIsJobTypeNumbersByFacilityLoading,
  ] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const path = useMemo(() => pathname.split("/")[1], [pathname]);
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const JobType = useMemo(() => getJobTypeKeyByValue(path), [path]);
  const isPrefSelected = useMemo(
    () => pathname.endsWith("/select/pref"),
    [pathname]
  );

  // Memoize job type numbers
  const [jobTypeNumbers, setJobTypeNumbers] = useState({});
  const [jobTypeNumbersByFacility, setJobTypeNumbersByFacility] = useState({});

  // Memoize options for selects
  const monthlySalaryOptions = useMemo(
    () => [
      { value: "", label: "指定なし" },
      { value: "180000", label: "18" },
      { value: "200000", label: "20" },
      { value: "250000", label: "25" },
      { value: "300000", label: "30" },
      { value: "400000", label: "40" },
      { value: "500000", label: "50" },
      { value: "600000", label: "60" },
      { value: "700000", label: "70" },
      { value: "800000", label: "80" },
      { value: "900000", label: "90" },
      { value: "1000000", label: "100" },
    ],
    []
  );

  const hourlySalaryOptions = useMemo(
    () => [
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
    ],
    []
  );

  // URL generation functions
  const makeLink = useCallback(
    ({ pref, employment, feature }) => {

      // 1) pathname を分解して base と filter セグメントを得る
      const parts = pathname.split("/").filter(Boolean);
      const base = parts[0]; // e.g. "dr"
      const filters = parts.slice(1); // ["pref1","employment2",...]

      // 2) 既存セグメントを初期化
      let curPref = "";
      let curEmp = "";
      let curFeat = "";

      // 3) 名前ベースで振り分け
      filters.forEach((seg) => {
        if (/^pref\d+$/.test(seg)) {
          curPref = seg;
        } else if (/^employment\d+$/.test(seg)) {
          curEmp = seg;
        } else if (/^feature\d+$/.test(seg)) {
          curFeat = seg;
        }
      });

      // 4) undefined は「変更なし」、'' は「クリア」、それ以外は上書き
      const newPref = pref !== undefined ? pref : curPref;
      const newEmp = employment !== undefined ? employment : curEmp;
      const newFeat = feature !== undefined ? feature : curFeat;
      // 5) 空文字・null・undefined は除去して、常に [pref, employment, feature] の順で組み立て
      const segs = [newPref, newEmp, newFeat].filter((v) => v);

      return `/${base}/${segs.join("/")}`;
    },
    [pathname]
  );

  const getPrefLink = useCallback(
    (p) => {
      // 他のフィルターが一つでも設定されているかをチェック
      const hasOtherFilters =
        filters.pref !== "" ||
        filters.employmentType.length > 0 ||
        filters.monthlySalary !== "" ||
        filters.hourlySalary !== "" ||
        filters.feature.length > 0;

      // 他のフィルターがあれば検索モードへ
      if (hasOtherFilters) {
        const updated = { ...filters, pref: p };
        return `/${path}/search?filters=${encodeURIComponent(
          JSON.stringify(updated)
        )}`;
      }

      // パスベースフィルター中か判定
      const rel = pathname.replace(`/${path}`, "");
      const segs = rel.split("/").filter(Boolean);
      const isPathFilter = segs.length > 0 && !pathname.includes("/search");
      if (isPathFilter) {
        // makeLink を使って階層付き URL を生成
        return makeLink({ pref: p });
      }

      // それ以外はシンプルに /{path}/{pref}
      return `/${path}/${p}`;
    },
    [filters, path, pathname, makeLink]
  );

  const getConditionUrl = useCallback(
    (filterName, value) => {
      const defaultFilters = { ...DEFAULT_FILTERS };
      // 配列で管理するフィルターの場合
      if (filterName === "employmentType" || filterName === "feature") {
        defaultFilters[filterName] = [value];
      } else {
        defaultFilters[filterName] = value;
      }
      return `/${path}/search?filters=${encodeURIComponent(
        JSON.stringify(defaultFilters)
      )}`;
    },
    [path]
  );

  // API calls
  const getJobTypeNumbers = useCallback(async () => {
    setIsJobTypeNumbersLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/number`
      );
      if (response.data.error) {
        message.error(response.data.message);
        return;
      }

      // Convert array to object for O(1) lookups
      const numbersObj = {};
      response.data.JobPostsNumbers.forEach((item) => {
        if (typeof item === "object") {
          Object.keys(item).forEach((key) => {
            numbersObj[key] = item[key];
          });
        }
      });

      setJobTypeNumbers(numbersObj);
    } catch (error) {
      console.error("Error fetching job type numbers:", error);
    } finally {
      setIsJobTypeNumbersLoading(false);
    }
  }, []);

  const getJobTypeNumbersByFacility = useCallback(async () => {
    setIsJobTypeNumbersByFacilityLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/numberByFacility`,
        {
          type: JobType,
        }
      );
      if (response.data.error) {
        message.error(response.data.message);
        return;
      }

      // Convert to object if it's an array
      const numbersObj = Array.isArray(response.data.numbers)
        ? response.data.numbers.reduce((acc, item) => {
            if (typeof item === "object") {
              Object.keys(item).forEach((key) => {
                acc[key] = item[key];
              });
            }
            return acc;
          }, {})
        : response.data.numbers;

      setJobTypeNumbersByFacility(numbersObj);
    } catch (error) {
      console.error("Error fetching job type numbers by facility:", error);
      message.error("施設別求人数の取得に失敗しました");
    } finally {
      setIsJobTypeNumbersByFacilityLoading(false);
    }
  }, [JobType]);


  console.log(filters)

  // Event handlers
  const handleSearch = useCallback(() => {
    console.log("click")
    console.log(filters)
    const url = `/${path}/search?filters=${encodeURIComponent(
      JSON.stringify(filters)
    )}`;
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate, path, filters]);

  const handleEmploymentTypeChange = useCallback((employmentTypeValue) => {
    setEmploymentType(
      (prev) =>
        prev.includes(employmentTypeValue)
          ? prev.filter((type) => type !== employmentTypeValue) // Remove if already selected
          : [...prev, employmentTypeValue] // Add if not selected
    );
  }, []);

  const handleFeatureChange = useCallback((featureValue) => {
    setFeature(
      (prev) =>
        prev.includes(getFeatureKeyByValue(featureValue))
          ? prev.filter((type) => type !== getFeatureKeyByValue(featureValue)) // Remove if already selected
          : [...prev, getFeatureKeyByValue(featureValue)] // Add if not selected
    );
  }, []);

  // Render helpers
  const renderMeshLink01 = useCallback(
    (jobType) => {
      return Object.keys(Facilities).map((facility, index) => {
        const count = jobTypeNumbersByFacility[facility] || 0;

        return (
          <Link
            aria-label={`${facility}の${jobType}`}
            key={index}
            to={`/${getJobValueByKey(jobType)}/${Facilities[facility]}`}
            className="col-span-1 flex items-start justify-between w-full border-b-[1px] border-[#e7e7e7] lg:text-sm md:text-xs text-[0.6rem] text-[#188CE0] py-2 font-bold px-2 hover:px-6 duration-300 group"
          >
            <p className="py-1">
              {facility}の{jobType}
              <span className="text-[#343434] text-xs">
                {isJobTypeNumbersByFacilityLoading ? (
                  <Skeleton.Button
                    active
                    size="small"
                    style={{
                      width: 30,
                      height: 16,
                      display: "inline-block",
                      marginLeft: 4,
                    }}
                  />
                ) : (
                  `(${count})`
                )}
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
    },
    [jobTypeNumbersByFacility, isJobTypeNumbersByFacilityLoading]
  );

  const renderPrefectureSection = useCallback(
    (region, prefectures) => (
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
              href={getPrefLink(prefectures[prefecture])}
              className="text-xs lg:text-md text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
              aria-label={prefecture}
            >
              {prefecture}
            </a>
          ))}
        </div>
      </div>
    ),
    [getPrefLink]
  );

  // Effects
  useEffect(() => {
    // Set page title
    document.title = `${JobType}の求人・転職・就職・アルバイト募集 | JobJob`;

    // Fetch data in parallel
    Promise.all([getJobTypeNumbers(), getJobTypeNumbersByFacility()]).then(
      () => {
        // Data loaded
      }
    );
  }, [JobType, getJobTypeNumbers, getJobTypeNumbersByFacility]);

  useEffect(() => {
    if (!filters.pref) {
      setType(1);
    }
  }, [filters.pref, location.search]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      employmentType: employmentType,
      monthlySalary: monthlySalary,
      hourlySalary: hourlySalary,
      feature: feature,
    }));
  }, [employmentType, feature, monthlySalary, hourlySalary]);

  useEffect(() => {
    const relative = pathname.replace(`/${path}`, "");
    const segments = relative.split("/").filter(Boolean);
    const isPathFilter =
      segments.length > 0 && !pathname.startsWith(`/${path}/search`);

    if (isPathFilter) {
      // パスベースのフィルターURLなので、トップへのリダイレクトはせず
      const parts = pathname.split("/");
      const employmentType = parts.find((part) =>
        part.startsWith("employment")
      );
      const condition = parts.find((part) => part.startsWith("condition"));
      setFilters((prev) => ({
        ...prev,
        employmentType: employmentType
          ? [getEmploymentTypeKeyByValue(employmentType)]
          : [],
        feature: condition ? [getFeatureKeyByValue(condition)] : [],
      }));

      // Also update the UI state to match the URL filters
      if (employmentType) {
        setEmploymentType(
          employmentType ? [getEmploymentTypeKeyByValue(employmentType)] : []
        );
      }
      if (condition) {
        setFeature(condition ? [getFeatureKeyByValue(condition)] : []);
      }

      return;
    }

    const savedFilters = params.get("filters")
      ? JSON.parse(decodeURIComponent(params.get("filters")))
      : DEFAULT_FILTERS;

    setFilters(savedFilters);

    // Also update the UI state to match the URL filters
    setEmploymentType(savedFilters.employmentType || []);
    setFeature(savedFilters.feature || []);
    setMonthlySalary(savedFilters.monthlySalary || "");
    setHourlySalary(savedFilters.hourlySalary || "");

    const isEmptyFilters =
      savedFilters.pref === "" &&
      savedFilters.employmentType.length === 0 &&
      savedFilters.hourlySalary === "" &&
      savedFilters.monthlySalary === "" &&
      savedFilters.feature.length === 0;

    if (isEmptyFilters && pathname !== `/${path}`) {
      navigate(`/${path}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, location.search, params, path, navigate]);

  // Render content immediately without waiting for API data
  return (
    <>
      <BreadCrumb />
      {(!pathname.includes("pref") || isPrefSelected) && (
        <div className="bg-[#EFEFEF]">
          {pathname.split("/")[2] === "search" ? (
            <section className="container bg-white rounded-lg px-8 lg:px-12 py-6 lg:py-12">
              <p className="text-sm font-bold lg:text-lg text-[#343434]">
                <span className="lg:text-2xl text-base">{JobType}</span>
                {filters?.employmentType.length > 0 && (
                  <>
                    <span className="text-base lg:text-xl font-bold text-[#343434]">
                      ({filters.employmentType.join("/")})
                    </span>
                  </>
                )}
                {filters?.feature.length > 0 && (
                  <>
                    <span className="text-base lg:text-xl font-bold text-[#343434]">
                      ({filters.feature.join("/")})
                    </span>
                  </>
                )}
                の検索結果
              </p>
            </section>
          ) : (
            <section className="container bg-white rounded-lg px-8 lg:px-12 py-6 lg:py-12">
              <p className="flex flex-wrap gap-1 items-end">
                <span className="lg:text-xl font-bold text-base">
                  {JobType}
                </span>
                {filters?.employmentType.length > 0 && (
                  <>
                    <span className="text-base lg:text-xl font-bold text-[#343434]">
                      ({filters.employmentType.join("/")})
                    </span>
                  </>
                )}
                {filters?.feature.length > 0 && (
                  <>
                    <span className="text-base lg:text-xl font-bold text-[#343434]">
                      ({filters.feature.join("/")})
                    </span>
                  </>
                )}
                <span className="text-xs lg:text-base text-[#343434]">の</span>
              </p>
              <p className="text-sm lg:text-lg text-[#343434]">
                求人・転職・就職・アルバイト募集情報
              </p>
            </section>
          )}

          <section className="container bg-white rounded-lg mt-4">
            <div className="grid grid-cols-3 w-full px-2">
              <button
                onClick={() => setType(1)}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  type === 1 ? "border-b-4 border-[#FF2A3B]" : ""
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
              </button>
              <button
                onClick={() => setType(2)}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  type === 2 ? "border-b-4 border-[#FF2A3B]" : ""
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
                onClick={() => setType(3)}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 lg:py-4 duration-100 ${
                  type === 3 ? "border-b-4 border-[#FF2A3B]" : ""
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

            {type === 1 && (
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

            {type === 2 && (
              <div className="w-full p-4 lg:p-6">
                <div className="mb-6">
                  <p className="text-sm lg:text-base text-[#343434] font-bold mb-4">
                    雇用形態
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
                          <Link
                            to={makeLink({
                              employment: EmploymentType[employmentTypeKey],
                            })}
                            onClick={(e) => {
                              e.preventDefault();
                              setType(1);
                              navigate(
                                makeLink({
                                  employment: EmploymentType[employmentTypeKey],
                                })
                              );
                            }}
                            aria-label={employmentTypeKey}
                            className="
                                      absolute inset-y-0 right-0 
                                      flex items-center px-3 
                                      cursor-pointer 
                                      bg-[#ffeeee]
                                      hover:bg-[#ffdddd] transition-colors rounded-r
                                    "
                          >
                            <img
                              src="/assets/images/dashboard/ep_arrow-right_black.png"
                              alt="arrow-down"
                              className="w-4"
                            />
                          </Link>
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

            {type === 3 && (
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
                  {
                    title: "応募要件の特徴",
                    features: Features.APPLY_REQUIREMENTS,
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
                          <span className="text-xs lg:text-sm mr-5">
                            {featureKey}
                          </span>
                          {/* チェブロンをリンクに */}
                          <Link
                            aria-label={featureKey}
                            to={makeLink({
                              feature: getFeatureValueByKey(featureKey),
                            })}
                            onClick={(e) => {
                              e.preventDefault();
                              setType(1);
                              navigate(
                                makeLink({
                                  feature: getFeatureValueByKey(featureKey),
                                })
                              );
                            }}
                            className="
                                      absolute inset-y-0 right-0 
                                      flex items-center px-3 
                                      cursor-pointer 
                                      bg-[#ffeeee]
                                      hover:bg-[#ffdddd] transition-colors rounded-r
                                    "
                          >
                            <img
                              src="/assets/images/dashboard/ep_arrow-right_black.png"
                              alt="arrow-down"
                              className="w-4"
                            />
                          </Link>
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
              <div className="rounded-lg px-6 py-4 mt-8 shadow-xl bg-white">
                <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                  {JobType}について
                </p>
                <pre className="lg:text-[1rem] md:text-[0.8rem] mt-4">
                  {Descriptions[JobType]}
                </pre>
              </div>
              <div className="flex flex-col gap-2 rounded-lg px-6 py-4 mt-8 shadow-xl bg-white">
                <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                  施設形態から{JobType}の求人を探す
                </p>
                <div className="flex flex-col mt-4 border-t-[1px] border-[#e7e7e7]">
                  {renderMeshLink01(JobType)}
                </div>
              </div>
              <div className="rounded-lg px-6 py-4 mt-8 shadow-xl bg-white">
                <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                  職種から求人を探す
                </p>
                <div className="w-full mt-4">
                  <MeshLink02 category="医科" />
                  <MeshLink02 category="歯科" />
                  <MeshLink02 category="介護" />
                  <MeshLink02 category="保育" />
                  <MeshLink02 category="リハビリ／代替医療" />
                  <MeshLink02 category="その他" />
                  <MeshLink02 category="ヘルスケア／美容" />
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
          <NewJobs />
          <JobPosts
            jobType={JobType}
            employmentType={filters?.employmentType}
            feature={filters?.feature}
            monthlySalary={filters?.monthlySalary}
            hourlySalary={filters?.hourlySalary}
            path={path}
          />
        </div>
      )}
    </>
  );
};

export default CertainJob;

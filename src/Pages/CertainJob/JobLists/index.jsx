import { Checkbox, Input, Modal, Select } from "antd";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import {
  getFeatureKeyByValue,
  getJobTypeKeyByValue,
  getPrefectureKeyByValue,
  getJobValueByKey
} from "../../../utils/getFunctions";
import { useEffect, useState } from "react";
import {
  EmploymentType,
  Features,
  Municipalities,
  Prefectures,
  SmallDescriptions,
} from "../../../utils/constants/categories";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../../components/Loading";
import BreadCrumb from "../../../components/BreadCrumb";
import Pagination from "../../../components/Pagination";

const JobLists = () => {
  const { user, likes, setLikes } = useAuth();
  const { pathname } = useLocation();
  const [pref, setPref] = useState("");
  const [muni, setMuni] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [hourlySalary, setHourlySalary] = useState("");
  const [feature, setFeature] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [jobPosts, setJobPosts] = useState([]);
  const [allJobPostsNum, setAllJobPostsNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    pref: "",
    muni: "",
    employmentType: [],
    monthlySalary: "",
    hourlySalary: "",
    feature: [],
    page: 1,
  });
  const [updatedFilters, setUpdatedFilters] = useState({
    pref: "",
    muni: "",
    employmentType: [],
    monthlySalary: "",
    hourlySalary: "",
    feature: [],
    page: 1,
  });
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const path = pathname.split("/")[1];
  const JobType = getJobTypeKeyByValue(path);


  const isMuniModalOpen = pathname.endsWith("/modal/muni");
  const isEmploymentTypeModalOpen = pathname.endsWith("/modal/employmentType");
  const isFeatureModalOpen = pathname.endsWith("/modal/feature");
  const isPrefModalOpen = pathname.endsWith("/modal/pref");

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
          >
            {prefecture}
          </a>
        ))}
      </div>
    </div>
  );

  const renderMunicipalitiesSection = (prefecture) => (
    <>
      <div className="flex flex-wrap w-full px-2 lg:px-4">
        <p className="text-lg text-[#343434] font-bold">{prefecture}</p>
        <div className=" border-t-[1px] border-[#bdbdbd] mt-4">
          {Municipalities[prefecture]?.map((muni, index) => (
            <button
              key={index}
              className="lg:w-1/4 sm:w-1/2 text-xs lg:text-md text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] text-center py-1 lg:py-[0.5rem] duration-300"
              onClick={() => handleOnChangeMuni(muni)}
            >
              {muni}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const getJobPosts = async () => {
    try {
      setIsLoading(true); // Set loading before fetching data
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/filter`,
        {
          ...updatedFilters,
          JobType: JobType,
          pref: getPrefectureKeyByValue(pref),
          muni: muni || "",
        }
      );

      if (!response.data || !response.data.jobposts) {
        console.error("Job posts not found in response");
        setJobPosts([]); // Set empty array if response is not valid
      } else {
        setJobPosts(response.data.jobposts);
        setTotalPages(Math.ceil(response.data.allJobPostsNumbers / 30));
        setAllJobPostsNum(response.data.allJobPostsNumbers);
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setIsLoading(false); // Stop loading after fetching data
    }
  };

  const handleLike = (id) => {
    let newLikes = Array.isArray(likes) ? [...likes] : [];

    if (newLikes.includes(id)) {
      newLikes = newLikes.filter((like) => like !== id);
    } else {
      newLikes.push(id);
    }

    localStorage.setItem("likes", JSON.stringify(newLikes));
    setLikes(newLikes);
  };

  const handleSearch = () => {
    setFilters(updatedFilters);
    const url = `/${path}/search?filters=${encodeURIComponent(
      JSON.stringify(updatedFilters)
    )}`;
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Ensure job posts are fetched immediately
    getJobPosts();
  };

  // 指定のフィルター条件のみを含むURLを生成するヘルパー関数
const getConditionUrl = (filterName, value) => {
  const defaultFilters = {
    pref: "",
    muni: "",
    employmentType: [],
    monthlySalary: "",
    hourlySalary: "",
    feature: [],
    page: 1,
  };
  // 配列型のフィルターの場合
  if (filterName === "employmentType" || filterName === "feature") {
    defaultFilters[filterName] = [value];
  } else {
    defaultFilters[filterName] = value;
  }
  return `/${path}/search?filters=${encodeURIComponent(
    JSON.stringify(defaultFilters)
  )}`;
};


  const handleOnChangeMuni = (m) => {
    setMuni(m);
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, muni: m };

      // Navigate only after state update
      navigate(
        `/${path}/search?filters=${encodeURIComponent(
          JSON.stringify(updatedFilters)
        )}`
      );
      return updatedFilters;
    });
  };

  const handleOnChangePage = (p) => {
    setPage(p);
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, page: p };

      // Navigate only after state update
      navigate(
        `/${path}/search?filters=${encodeURIComponent(
          JSON.stringify(updatedFilters)
        )}`
      );
      return updatedFilters;
    });
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

  const handleCloseModal = () => {
    const newPath = location.pathname.replace(/\/modal\/[^/]+$/, "");
    navigate(`${newPath}${location.search}`);
  }
  

  
  

  useEffect(() => {
    const newFilters = {
      pref: pref,
      muni: muni,
      employmentType: employmentType,
      monthlySalary: monthlySalary,
      hourlySalary: hourlySalary,
      feature: feature,
      page: page,
    };

    setUpdatedFilters(newFilters);
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pref, muni, page]);

  useEffect(() => {
    const newFilters = {
      pref: pref,
      muni: muni,
      employmentType: employmentType,
      monthlySalary: monthlySalary,
      hourlySalary: hourlySalary,
      feature: feature,
      page: page,
    };

    setUpdatedFilters(newFilters);
  }, [employmentType, feature, monthlySalary, hourlySalary]);

  useEffect(() => {
    if (updatedFilters?.pref && updatedFilters?.pref.trim() !== "") {
      getJobPosts();
    }
  }, [filters]); // Depend on updatedFilters, not filters

  useEffect(() => {
    document.title = "求人一覧";
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes)); // Ensure we parse it as an array
    } else {
      setLikes([]);
      localStorage.setItem("likes", JSON.stringify([]));
    }
    if (pathname.split("/")[2] === "search") {
      const savedFilters = params.get("filters")
        ? JSON.parse(decodeURIComponent(params.get("filters")))
        : {
            pref: "",
            muni: "",
            page: 1,
            employmentType: [],
            hourlySalary: "",
            monthlySalary: "",
            feature: [],
          };

      setFilters(savedFilters);
      setUpdatedFilters(savedFilters);
      setPref(savedFilters?.pref);
      setMuni(savedFilters?.muni);
      setPage(savedFilters?.page);
      setEmploymentType(savedFilters?.employmentType);
      setFeature(savedFilters?.feature);
      setHourlySalary(savedFilters?.hourlySalary);
      setMonthlySalary(savedFilters?.monthlySalary);

      const isEmptyFilters =
        savedFilters.pref === "" &&
        savedFilters.muni === "" &&
        savedFilters.page === 1 &&
        savedFilters.employmentType.length === 0 &&
        savedFilters.hourlySalary === "" &&
        savedFilters.monthlySalary === "" &&
        savedFilters.feature.length === 0;

      if (isEmptyFilters) {
        const url = `/${path}`;
        if (window.location.pathname !== url) {
          navigate(url);
        }
      } else {
        const url = `/${path}/search?filters=${encodeURIComponent(
          JSON.stringify(savedFilters)
        )}`;
        if (window.location.pathname !== url) {
          navigate(url);
        }
      }
    } else {
      setPref(pathname.split("/")[2]);
      setFilters({ ...filters, pref: pathname.split("/")[2] });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb />
      <div className="flex w-full px-4 bg-[#EFEFEF]">
        <div className="container flex justify-between gap-8">
          <div className="flex flex-col items-center justify-start w-2/3">
            <div className="flex flex-col justify-center bg-white rounded-lg p-4 w-full shadow-xl">
              <p className="text-lg font-bold text-gray-500">
                求人・転職・アルバイト情報
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <p className="lg:text-xl md:text-sm font-bold text-[#FF6B56]">
                    {getPrefectureKeyByValue(pref)}
                  </p>
                  <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
                    の{JobType}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="lg:text-xl md:text-sm font-bold text-[#343434] ">
                    該当件数
                  </p>
                  <p className="font-bold text-[#FF2A3B] lg:text-[1.7rem] md:text-[1.2rem] number">
                    {allJobPostsNum}
                  </p>
                  <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
                    件
                  </p>
                </div>
                <div className="flex items-center justify-between lg:px-8 md:px-2 lg:py-2 md:py-1 border-[#FF2A3B] border-2 rounded-lg gap-4">
                  <Link
                    className="lg:text-[1rem] md:text-sm font-bold text-[#FF2A3B] hover:underline"
                    to={`${pathname}/modal/pref?filters=${encodeURIComponent(JSON.stringify(filters))}`}
                  >
                    都道府県を変更
                  </Link>
                  <img
                    src="/assets/images/dashboard/ep_arrow-right.png"
                    alt="chevron-right"
                    className="w-4"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start w-full mt-8">
              <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                求人検索
              </p>
            </div>
            <div className="flex flex-col justify-center bg-white rounded-lg px-12 py-8 w-full shadow-xl mt-8">
              <Link
                className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg hover:px-12 duration-300 cursor-pointer"
                to={`${pathname}/modal/muni?filters=${encodeURIComponent(JSON.stringify(filters))}`}
              >
                <div className="flex items-center justify-between gap-1">
                  <img
                    src="/assets/images/dashboard/gg_pin.png"
                    alt="map"
                    className="w-5 pt-0.5"
                  />
                  <p className="lg:text-md md:text-sm font-bold text-[#343434]">
                    市区町村から選択
                  </p>
                </div>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-down"
                  className="w-4"
                />
              </Link>
              <div className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer">
                <div className="flex items-center justify-between gap-1 ">
                  <img
                    src="/assets/images/dashboard/ph_train-simple.png"
                    alt="map"
                    className="w-5 pt-0.5"
                  />
                  <p className="lg:text-md md:text-sm font-bold text-[#343434]">
                    沿線から選択
                  </p>
                </div>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-down"
                  className="w-4"
                />
              </div>
              <Link
                className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer"
                to={`${pathname}/modal/employmentType?filters=${encodeURIComponent(JSON.stringify(filters))}`}
              >
                <div className="flex items-center justify-between gap-1 ">
                  <img
                    src="/assets/images/dashboard/material-symbols_check-box-outline.png"
                    alt="map"
                    className="w-5 pt-0.5"
                  />
                  <p className="lg:text-md md:text-sm font-bold text-[#343434]">
                    雇用形態・給与から選択
                  </p>
                </div>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-down"
                  className="w-4"
                />
              </Link>
              <Link
                className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer"
                to={`${pathname}/modal/feature?filters=${encodeURIComponent(JSON.stringify(filters))}`}
              >
                <div className="flex items-center justify-between gap-1 ">
                  <img
                    src="/assets/images/dashboard/mdi_tag-outline.png"
                    alt="map"
                    className="w-5 pt-0.5"
                  />
                  <p className="lg:text-md md:text-sm font-bold text-[#343434]">
                    特徴から選択
                  </p>
                </div>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-down"
                  className="w-4"
                />
              </Link>
            </div>
            <div className="flex items-center justify-start w-full mt-8">
              <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                {getPrefectureKeyByValue(pref)}の{JobType}の求人
              </p>
            </div>
            <div className="flex flex-col items-center justify-start w-full mt-8 ">
              {jobPosts?.map((jobpost) => {
                return (
                  <div
                    key={jobpost.jobpost_id}
                    className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8 cursor-pointer hover:scale-[1.02] duration-300"
                  >
                    <div
                      onClick={() =>
                        navigate(`/${path}/details/${jobpost.jobpost_id}`)
                      }
                    >
                      <div className="flex md:flex-col lg:flex-row items-start justify-between w-full">
                        {jobpost?.picture?.length === 0 ? (
                          <img
                            src={"/assets/images/noimage.png"}
                            alt="arrow-down"
                            className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"
                          />
                        ) : (
                          <img
                            src={`${jobpost.picture[0]}`}
                            alt="arrow-down"
                            className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"
                          />
                        )}
                        <div className="flex flex-col items-start justify-between p-4 w-full gap-8">
                          <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
                            {jobpost.facility_id.name}の{jobpost.type}求人(
                            {jobpost.employment_type[0]})
                          </p>
                          <p className="lg:text-sm md:text-xs text-[#343434]">
                            {jobpost.sub_title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full gap-4 px-2 mt-2">
                        <div className="flex gap-4 h-full">
                          <div className="flex flex-col justify-center w-2/3 h-full">
                            <div className="flex items-center justify-start">
                              <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                                給与
                              </p>
                              <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">
                                {jobpost.employment_type} {jobpost.salary_type}{" "}
                                {jobpost.salary_min}円〜{jobpost.salary_max}円
                              </p>
                            </div>
                            <div className="flex items-start justify-start mt-4">
                              <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                                仕事内容
                              </p>
                              <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-2">
                                <pre>{jobpost.work_content}</pre>
                              </p>
                            </div>
                            <div className="flex items-start justify-start mt-4">
                              <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                                応募要件
                              </p>
                              <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-2">
                                {jobpost.qualification_content}{" "}
                                {jobpost.qualification_welcome}
                              </p>
                            </div>
                            <div className="flex items-start justify-start mt-4">
                              <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                                住所
                              </p>
                              <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-2">
                                {jobpost.facility_id.access_text}
                              </p>
                            </div>
                          </div>
                          <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
                            {[
                              ...jobpost.work_item,
                              ...jobpost.service_subject,
                              ...jobpost.service_type,
                              ...jobpost.treatment_type,
                              ...jobpost.work_time_type,
                              ...jobpost.rest_type,
                            ]
                              .slice(0, 10)
                              .map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg"
                                  >
                                    <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">
                                      {item}
                                    </p>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                      <button
                        className={`flex items-center justify-center gap-2 rounded-lg py-2 text-white ${
                          likes.includes(jobpost.jobpost_id)
                            ? "bg-[#E7E7E7]"
                            : "border-2 border-[#FF6B56] bg-whtie"
                        }  w-1/2 hover:bg-[#FF6B56]/20 hover:scale-105 duration-300`}
                        onClick={() => handleLike(jobpost.jobpost_id)}
                      >
                        <img
                          src={`${
                            likes.includes(jobpost.jobpost_id)
                              ? "/assets/images/dashboard/mdi_heart.png"
                              : "/assets/images/dashboard/Vector.png"
                          }`}
                          alt="eye"
                          className="w-4 pt-0.5"
                        />
                        <p
                          className={`text-sm font-bold ${
                            likes.includes(jobpost.jobpost_id)
                              ? "text-[#188CE0]"
                              : "text-[#FF6B56]"
                          }`}
                        >
                          {likes.includes(jobpost.jobpost_id)
                            ? "気になる済"
                            : "気になる"}
                        </p>
                      </button>
                      <Link
                        to={`/${path}/details/${jobpost.jobpost_id}`}
                        className="flex items-center justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2"
                      >
                        <p className="text-sm font-bold text-white">
                          求人を見る
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col bg-white rounded-lg px-4 py-2 w-full shadow-xl">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handleOnChangePage}
              />
              <p className="lg:text-[1rem] md:text-[0.8rem] text-[#343434] text-center mt-2">
                ご希望の条件の求人が登録されたときに、いち早くお知らせします。
              </p>
              <button className="text-center w-full bg-[#FF6B56] text-white rounded-lg py-2 mt-4">
                <p className="lg:text-sm md:text-xs font-bold">
                  この条件で新着求人を受け取る
                </p>
              </button>
              <button className="text-center w-full bg-white text-[#FF6B56] border-2 border-[#FF6B56] rounded-lg py-2 mt-4">
                <p className="text-sm font-bold">検索条件を変更する</p>
              </button>
              <div className="flex items-center justify-center w-full mt-8 gap-2">
                <img
                  src="/assets/images/dashboard/ic_round-search.png"
                  alt="search"
                  className="w-6"
                />
                <Input
                  placeholder="例:市区町村、診療科目、特徴など"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-start w-full mt-8">
              <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                {JobType}について
              </p>
            </div>
            <div className="flex flex-col bg-white rounded-lg px-12 py-6 w-full mt-8 shadow-xl">
              <pre className="lg:text-[1rem] md:text-[0.8rem]">
                {SmallDescriptions[JobType]}
              </pre>
            </div>
          </div>
          <div className="flex h-full w-1/3">
            <div className="flex flex-col items-center justify-start h-full w-full">
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
                  <p className="lg:text-[1rem] md:text-[0.8rem]">応募の仕方</p>
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
      {
        <Modal
          open={isPrefModalOpen}
          onCancel={() => handleCloseModal()}
          footer={null}
          width={1000}
          height={800}
          className="modal"
        >
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
            {renderPrefectureSection("中部・近畿", Prefectures.CHUGOKU_SHIKOKU)}
            {renderPrefectureSection("九州・沖縄", Prefectures.KYUSHU_OKINAWA)}
          </div>
        </Modal>
      }
      {
        <Modal
          open={isEmploymentTypeModalOpen}
          onCancel={() => handleCloseModal()}
          footer={null}
          width={1000}
          height={800}
          className="modal"
        >
          <div className="w-full">
            <div className="w-full p-6">
              <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">
                雇用形態
              </p>
              <div className="flex items-center justify-start desire gap-4 mt-4">
  {Object.keys(EmploymentType).map((employmentTypeKey, index) => {
    return (
      <Checkbox
  key={index}
  onChange={() => handleEmploymentTypeChange(employmentTypeKey)}
  checked={employmentType.includes(employmentTypeKey)}
  className="relative"  // 右側に十分な余白を確保
>
  {employmentTypeKey}
  {/* 縦線 */}
  <span className="absolute right-5 top-1 bottom-1 border-l border-gray-400"></span>
  {/* チェブロンをリンクに */}
  <a
    href={getConditionUrl("employmentType", employmentTypeKey)} // リンク先URLを指定
    className="absolute right-0 top-1/2 transform -translate-y-1/2"
  >
    <img
      src="/assets/images/dashboard/ep_arrow-right_black.png"
      alt="arrow-down"
      className="w-4"
    />
  </a>
</Checkbox>




    );
  })}
</div>
            </div>
            <div className="w-full p-6">
              <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">
                給与
              </p>
              <div className="flex items-center justify-start desire gap-2 mt-4">
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
                  月給
                </span>
                <div className="flex items-end w-1/4 gap-2">
                  <Select
                    options={monthlySalaryOptions}
                    onChange={(value) => setMonthlySalary(value)}
                    value={monthlySalary}
                    className="h-10"
                  />
                  <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                    万円以上
                  </span>
                </div>
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
                  時給
                </span>
                <div className="flex items-end w-1/4 gap-2">
                  <Select
                    options={hourlySalaryOptions}
                    onChange={(value) => setHourlySalary(value)}
                    value={hourlySalary}
                    className="h-10"
                  />
                  <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                    円以上
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] lg:px-12 md:px-8 px-4 lg:py-4 md:py-2 py-1 rounded-lg my-6"
                onClick={handleSearch}
              >
                検索する
              </button>
            </div>
          </div>
        </Modal>
      }
      {
        <Modal
          open={isFeatureModalOpen}
          onCancel={() => handleCloseModal()}
          footer={null}
          width={1000}
          height={800}
          className="modal"
        >
          <div className="w-full p-4 lg:p-6 desireEmployment">
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
                    onChange={() => handleFeatureChange(section.features[featureKey])}
                    checked={feature.includes(
                      getFeatureKeyByValue(section.features[featureKey])
                    )}
                    className="relative" // 右側に十分な余白を確保
                  >
                    <span className="text-xs lg:text-sm">{featureKey}</span>
                    <span className="absolute right-5 top-1 bottom-1 border-l border-gray-400"></span>
                    <a
                      href={getConditionUrl(
                        "feature",
                        getFeatureKeyByValue(section.features[featureKey])
                      )}
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
        </Modal>
      }
      {
        <Modal
          open={isMuniModalOpen}
          onCancel={() => handleCloseModal()}
          footer={null}
          width={1000}
          height={800}
          className="modal"
        >
          <div className="w-full py-3 gap-4 px-4">
            {renderMunicipalitiesSection(getPrefectureKeyByValue(pref))}
          </div>
        </Modal>
      }
    </>
  );
};

export default JobLists;

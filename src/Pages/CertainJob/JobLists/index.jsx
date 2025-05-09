"use client";

import { Checkbox, Input, Modal, Select, message } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getFeatureKeyByValue,
  getJobTypeKeyByValue,
  getPrefectureKeyByValue,
} from "../../../utils/getFunctions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EmploymentType,
  Features,
  Municipalities,
  Prefectures,
  SmallDescriptions,
} from "../../../utils/constants/categories";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import BreadCrumb from "../../../components/BreadCrumb";
import Pagination from "../../../components/Pagination";
import {
  getMunicipalityById,
  municipalitiesWithIds,
} from "../../../utils/getMuniId";
import { getPrefCodeByName } from "../../../utils/getPref";
import NewJobs from "../../../components/NewJobs";
import NearByJobs from "../../../components/NearByJobs";

const JobLists = () => {
  const { user, likes, setLikes } = useAuth();
  const { pathname } = useLocation();
  const { muniId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialRenderRef = useRef(true);

  // UI loading states
  const [loadedSections, setLoadedSections] = useState({
    header: false,
    filters: false,
    sidebar: false,
    jobList: false,
    pagination: false,
    description: false,
  });

  // Job cards loading state
  const [visibleJobCards, setVisibleJobCards] = useState([]);

  // Main state
  const [filters, setFilters] = useState({
    pref: "",
    muni: "",
    employmentType: [],
    monthlySalary: "",
    hourlySalary: "",
    feature: [],
    page: 1,
  });

  const [jobData, setJobData] = useState({
    jobPosts: [],
    totalPages: 0,
    allJobPostsNum: null, // Use null instead of 0 to indicate "not loaded yet"
    isLoading: true, // Start with loading true
  });

  const [modalType, setModalType] = useState(null);

  // Temporary filter states for modals
  const [tempEmploymentTypes, setTempEmploymentTypes] = useState([]);
  const [tempFeatures, setTempFeatures] = useState([]);
  const [tempMonthlySalary, setTempMonthlySalary] = useState("");
  const [tempHourlySalary, setTempHourlySalary] = useState("");

  // Path and route information
  const path = pathname.split("/")[1];
  const JobType = useMemo(() => getJobTypeKeyByValue(path), [path]);

  const segments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );
  const currentEmploymentCode = useMemo(
    () => segments.find((seg) => /^employment\d+$/.test(seg)) || "",
    [segments]
  );
  const currentFeatureCode = useMemo(
    () => segments.find((seg) => /^feature\d+$/.test(seg)) || "",
    [segments]
  );
  const currentMuniCode = useMemo(
    () => segments.find((seg) => /^muni\d+$/.test(seg)) || "",
    [segments]
  );

  // Options for salary selects
  const monthlySalaryOptions = useMemo(
    () => [
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

  // Modal handlers
  const openModal = useCallback((type) => setModalType(type), []);
  const closeModal = useCallback(() => setModalType(null), []);

  const openPrefModal = useCallback(() => openModal("pref"), [openModal]);
  const openMuniModal = useCallback(() => {
    if (!filters.pref) {
      message.error("都道府県を選択してください");
      return;
    }
    openModal("muni");
  }, [filters.pref, openModal]);

  const openEmploymentModal = useCallback(() => {
    setTempEmploymentTypes(filters.employmentType);
    setTempMonthlySalary(filters.monthlySalary);
    setTempHourlySalary(filters.hourlySalary);
    openModal("employment");
  }, [
    filters.employmentType,
    filters.monthlySalary,
    filters.hourlySalary,
    openModal,
  ]);

  const openFeatureModal = useCallback(() => {
    setTempFeatures(filters.feature);
    openModal("feature");
  }, [filters.feature, openModal]);

  // Progressive loading of UI sections
  useEffect(() => {
    // Add CSS for animations
    if (!document.getElementById("progressive-loading-styles")) {
      const style = document.createElement("style");
      style.id = "progressive-loading-styles";
      style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.2s ease-in-out forwards;
      }
    `;
      document.head.appendChild(style);
    }

    // Load critical sections immediately
    setLoadedSections((prev) => ({
      ...prev,
      header: true,
      filters: true,
      sidebar: true,
      jobList: true,
    }));

    // Load less critical sections with minimal delay
    setTimeout(() => {
      setLoadedSections((prev) => ({
        ...prev,
        pagination: true,
        description: true,
      }));
    }, 50);
  }, []);

  // Progressive loading of job cards
  useEffect(() => {
    if (jobData.jobPosts.length > 0 && !jobData.isLoading) {
      setVisibleJobCards([]);

      // Load first 5 cards immediately
      const initialBatch = Array.from(
        { length: Math.min(5, jobData.jobPosts.length) },
        (_, i) => i
      );
      setVisibleJobCards(initialBatch);

      // Load remaining cards in batches
      if (jobData.jobPosts.length > 5) {
        const loadRemainingCards = () => {
          const remainingCards = Array.from(
            { length: jobData.jobPosts.length },
            (_, i) => i
          ).filter((i) => i >= 5);

          // Load all remaining cards with a small delay
          setTimeout(() => {
            setVisibleJobCards((prev) => [...prev, ...remainingCards]);
          }, 100);
        };

        loadRemainingCards();
      }
    }
  }, [jobData.jobPosts, jobData.isLoading]);

  // Fetch job posts
  const getJobPosts = useCallback(async () => {
    try {
      setJobData((prev) => ({ ...prev, isLoading: true }));

      const muniObj = getMunicipalityById(currentMuniCode);
      const muniName = muniObj ? muniObj.name : "";
      const muniToSend = filters.muni || muniName;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/filter`,
        {
          ...filters,
          JobType: JobType,
          pref: getPrefectureKeyByValue(filters.pref),
          muni: muniToSend || "",
        }
      );

      if (!response.data || !response.data.jobposts) {
        setJobData((prev) => ({
          ...prev,
          jobPosts: [],
          totalPages: 0,
          allJobPostsNum: 0,
          isLoading: false,
        }));
      } else {
        setJobData({
          jobPosts: response.data.jobposts,
          totalPages: Math.ceil(response.data.allJobPostsNumbers / 30),
          allJobPostsNum: response.data.allJobPostsNumbers,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
      message.error("求人情報の取得に失敗しました");
      setJobData((prev) => ({ ...prev, isLoading: false }));
    }
  }, [JobType, currentMuniCode, filters]);

  // Handle like/favorite toggle
  const handleLike = useCallback(
    (id) => {
      let newLikes = Array.isArray(likes) ? [...likes] : [];

      if (newLikes.includes(id)) {
        newLikes = newLikes.filter((like) => like !== id);
      } else {
        newLikes.push(id);
      }

      localStorage.setItem("likes", JSON.stringify(newLikes));
      setLikes(newLikes);
    },
    [likes, setLikes]
  );

  // Handle search with current filters
  const handleSearch = useCallback(() => {
    // Apply temporary filters if modal is open
    let updatedFilters = { ...filters };

    if (modalType === "employment") {
      updatedFilters = {
        ...updatedFilters,
        employmentType: tempEmploymentTypes,
        monthlySalary: tempMonthlySalary,
        hourlySalary: tempHourlySalary,
      };
    } else if (modalType === "feature") {
      updatedFilters = {
        ...updatedFilters,
        feature: tempFeatures,
      };
    }

    const muniObj = getMunicipalityById(currentMuniCode);
    const muniName = muniObj ? muniObj.name : "";
    const muniToSend = updatedFilters.muni || muniName;

    const filtersToApply = {
      ...updatedFilters,
      muni: muniToSend || updatedFilters.muni,
      employmentType: currentEmploymentCode
        ? [
            Object.entries(EmploymentType).find(
              ([, code]) => code === currentEmploymentCode
            )?.[0],
          ]
        : updatedFilters.employmentType,
      feature: currentFeatureCode
        ? [
            Object.values(Features)
              .flatMap((group) => Object.entries(group))
              .find(([, code]) => code === currentFeatureCode)?.[0],
          ]
        : updatedFilters.feature,
      page: 1, // Reset page on new search
    };

    setFilters(filtersToApply);
    closeModal();

    const url = `/${path}/search?filters=${encodeURIComponent(
      JSON.stringify(filtersToApply)
    )}`;
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    currentEmploymentCode,
    currentFeatureCode,
    currentMuniCode,
    filters,
    modalType,
    navigate,
    path,
    tempEmploymentTypes,
    tempFeatures,
    tempMonthlySalary,
    tempHourlySalary,
    closeModal,
  ]);

  // Build path for filter navigation
  const buildPathFilter = useCallback(
    ({
      pref: newPref,
      muni: newMuni,
      employment: newEmploymentCode,
      feature: newFeatureCode,
    }) => {
      const isSearch = pathname.includes("/search");

      if (isSearch) {
        // Search mode - update JSON filters
        const sp = new URLSearchParams(location.search);
        let current = {};

        if (sp.has("filters")) {
          try {
            current = JSON.parse(decodeURIComponent(sp.get("filters")));
          } catch {
            current = {};
          }
        }

        // Update filters
        if (newPref !== undefined) current.pref = newPref;
        if (newMuni !== undefined) current.muni = newMuni;

        // Convert employment code to label
        if (newEmploymentCode) {
          const label = Object.entries(EmploymentType).find(
            ([, code]) => code === newEmploymentCode
          )?.[0];
          current.employmentType = label ? [label] : [];
        }

        // Convert feature code to label
        if (newFeatureCode) {
          const flat = Object.values(Features).reduce(
            (a, g) => ({ ...a, ...g }),
            {}
          );
          const label = Object.entries(flat).find(
            ([, code]) => code === newFeatureCode
          )?.[0];
          current.feature = label ? [label] : [];
        }

        // Reset page
        current.page = 1;

        // Return new search URL
        return `/${path}/search?filters=${encodeURIComponent(
          JSON.stringify(current)
        )}`;
      } else {
        // Drill-down mode - build path segments
        const segs = [];

        if (newPref) segs.push(newPref);

        if (newMuni) {
          if (/^muni\d+$/.test(newMuni)) {
            segs.push(newMuni);
          } else {
            const obj = municipalitiesWithIds.find((m) => m.name === newMuni);
            if (obj) segs.push(obj.id);
          }
        }

        if (newEmploymentCode) segs.push(newEmploymentCode);
        if (newFeatureCode) segs.push(newFeatureCode);

        return `/${path}/${segs.join("/")}`;
      }
    },
    [location.search, path, pathname]
  );

  // Handle page change
  const handleOnChangePage = useCallback(
    (p) => {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, page: p };

        navigate(
          `/${path}/search?filters=${encodeURIComponent(
            JSON.stringify(updatedFilters)
          )}`
        );

        return updatedFilters;
      });
    },
    [navigate, path]
  );

  // Handle employment type checkbox change
  const handleEmploymentTypeChange = useCallback((employmentTypeValue) => {
    setTempEmploymentTypes((prev) => {
      const currentTypes = [...prev];
      return currentTypes.includes(employmentTypeValue)
        ? currentTypes.filter((type) => type !== employmentTypeValue)
        : [...currentTypes, employmentTypeValue];
    });
  }, []);

  // Handle feature checkbox change
  const handleFeatureChange = useCallback((feature) => {
    setTempFeatures((prev) => {
      const featureKey = getFeatureKeyByValue(feature);
      const currentFeatures = [...prev];
      return currentFeatures.includes(featureKey)
        ? currentFeatures.filter((type) => type !== featureKey)
        : [...currentFeatures, featureKey];
    });
  }, []);

  // Handle salary changes
  const handleSalaryChange = useCallback((type, value) => {
    if (type === "monthlySalary") {
      setTempMonthlySalary(value);
    } else if (type === "hourlySalary") {
      setTempHourlySalary(value);
    }
  }, []);

  // Initialize filters from URL or path segments
  useEffect(() => {
    if (!initialRenderRef.current) return;
    initialRenderRef.current = false;

    // Set document title
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    document.title = `【${year}年${month}月最新】${getPrefectureKeyByValue(
      filters.pref
    )}の${JobType}の求人・転職・募集 | JobJob (ジョブジョブ)`;

    // Initialize likes from localStorage
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    } else {
      setLikes([]);
      localStorage.setItem("likes", JSON.stringify([]));
    }

    // Handle search path
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

      // Redirect if filters are empty
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
      // Handle path segments
      const segments = pathname.split("/");
      if (segments[2] === "city" && muniId) {
        const muni = getMunicipalityById(pathname.split("/")[3]);
        if (muni) {
          setFilters((prev) => ({
            ...prev,
            pref: getPrefCodeByName(muni.prefecture),
          }));
        }
      } else if (segments[2]) {
        setFilters((prev) => ({
          ...prev,
          pref: segments[2],
        }));
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [JobType, muniId, navigate, params, path, pathname, setLikes]);

  // Handle municipality ID from URL
  useEffect(() => {
    if (muniId) {
      const muni = getMunicipalityById(muniId);

      if (muni) {
        setFilters((prev) => ({
          ...prev,
          pref: getPrefCodeByName(muni.prefecture),
          muni: muni.name,
        }));
      }
    }
  }, [muniId]);

  // Fetch job posts when filters change
  useEffect(() => {
    // Only close modal and fetch if not in a modal selection process
    if (!modalType) {
      if (filters.pref) {
        getJobPosts();
      }
    }
  }, [modalType, filters, getJobPosts]);

  // Initial data fetch on component mount
  useEffect(() => {
    if (initialRenderRef.current && filters.pref) {
      getJobPosts();
    }
  }, []);

  // Render prefecture section for modal
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
              className="text-xs lg:text-md text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
              href={buildPathFilter({
                pref: prefectures[prefecture],
                muni: currentMuniCode,
                employment: currentEmploymentCode,
                feature: currentFeatureCode,
              })}
              aria-label={`都道府県：${prefecture}`}
            >
              {prefecture}
            </a>
          ))}
        </div>
      </div>
    ),
    [
      buildPathFilter,
      currentEmploymentCode,
      currentFeatureCode,
      currentMuniCode,
    ]
  );

  // Render municipalities section for modal
  const renderMunicipalitiesSection = useCallback(
    (prefecture) => (
      <div className="flex flex-wrap w-full px-2 lg:px-4">
        <p className="text-lg text-[#343434] font-bold">{prefecture}</p>
        <div className="border-t-[1px] border-[#bdbdbd] mt-4 flex flex-wrap">
          {Municipalities[prefecture]?.map((municipality, index) => (
            <a
              aria-label={municipality}
              key={index}
              href={buildPathFilter({
                pref: filters.pref,
                muni: municipality,
                employment: currentEmploymentCode,
                feature: currentFeatureCode,
              })}
              className="lg:w-1/4 sm:w-1/2 text-xs lg:text-md text-[#343434]
                     hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd]
                     text-center py-1 lg:py-[0.5rem] duration-300"
            >
              {municipality}
            </a>
          ))}
        </div>
      </div>
    ),
    [buildPathFilter, currentEmploymentCode, currentFeatureCode, filters.pref]
  );

  // Render job card with progressive loading
  const renderJobCard = useCallback(
    (jobpost, index) => {
      const isLoaded = visibleJobCards.includes(index);

      if (!isLoaded) {
        return (
          <div
            key={`skeleton-${jobpost.jobpost_id || index}`}
            className="flex flex-col bg-white rounded-2xl p-4 w-full shadow-xl mt-8 animate-pulse"
          >
            <div className="flex md:flex-col lg:flex-row items-start justify-between w-full">
              <div className="md:w-full lg:w-1/2 aspect-video bg-gray-200 rounded-lg"></div>
              <div className="flex flex-col items-start justify-between p-4 w-full gap-8">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        );
      }

      return (
        <div
          key={jobpost.jobpost_id}
          className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8 cursor-pointer hover:scale-[1.02] duration-300 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            onClick={() => navigate(`/${path}/details/${jobpost.jobpost_id}`)}
          >
            <div className="flex md:flex-col lg:flex-row items-start justify-between w-full">
              {jobpost?.picture?.length === 0 ? (
                <img
                  src={"/assets/images/noimage.png"}
                  alt="No image available"
                  className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"
                  loading="lazy"
                />
              ) : (
                <img
                  src={`${jobpost.picture[0]}`}
                  alt={`${jobpost.facility_id.name} image`}
                  className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"
                  loading="lazy"
                />
              )}
              <div className="flex flex-col items-start justify-between p-4 w-full gap-8">
                <Link
                  to={`/${path}/details/${jobpost.jobpost_id}`}
                  className="lg:text-xl md:text-sm font-bold text-[#343434] hover:underline"
                >
                  {jobpost.facility_id.name}の{jobpost.type}求人(
                  {jobpost.employment_type[0]})
                </Link>
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
                      {jobpost.salary_min}円〜
                      {jobpost.salary_max}円
                    </p>
                  </div>
                  <div className="flex items-start justify-start mt-4">
                    <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                      仕事内容
                    </p>
                    <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-2 whitespace-pre-line">
                      {jobpost.work_content}
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
                      {jobpost.facility_id.prefecture}{" "}
                      {jobpost.facility_id.city} {jobpost.facility_id.village}{" "}
                      {jobpost.facility_id.building}{" "}
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
                    .map((item, index) => (
                      <div
                        key={index}
                        className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg"
                      >
                        <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">
                          {item}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
            <button
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-white ${
                likes.includes(jobpost.jobpost_id)
                  ? "bg-[#E7E7E7]"
                  : "border-2 border-[#FF6B56] bg-white"
              } w-1/2 hover:bg-[#FF6B56]/20 hover:scale-105 duration-300`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(jobpost.jobpost_id);
              }}
            >
              <img
                src={`${
                  likes.includes(jobpost.jobpost_id)
                    ? "/assets/images/dashboard/mdi_heart.png"
                    : "/assets/images/dashboard/Vector.png"
                }`}
                alt="Favorite icon"
                className="w-4 pt-0.5"
              />
              <p
                className={`text-sm font-bold ${
                  likes.includes(jobpost.jobpost_id)
                    ? "text-[#188CE0]"
                    : "text-[#FF6B56]"
                }`}
              >
                {likes.includes(jobpost.jobpost_id) ? "気になる済" : "気になる"}
              </p>
            </button>
            <Link
              to={`/${path}/details/${jobpost.jobpost_id}`}
              className="flex items-center justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2"
            >
              <p className="text-sm font-bold text-white">求人を見る</p>
            </Link>
          </div>
        </div>
      );
    },
    [handleLike, likes, navigate, path, visibleJobCards]
  );

  // Render skeleton for a section
  const renderSectionSkeleton = useCallback(
    (height = "100px") => (
      <div
        className="animate-pulse bg-gray-100 rounded-lg w-full"
        style={{ height }}
      >
        {/* Placeholder for section */}
      </div>
    ),
    []
  );

  return (
    <>
      <BreadCrumb />
      <div className="w-full px-4 bg-[#EFEFEF]">
        <div className="container flex justify-between gap-8">
          <div className="flex flex-col items-center justify-start w-2/3">
            {/* Header Section - High Priority */}
            {loadedSections.header ? (
              <div className="flex flex-col justify-center bg-white rounded-lg p-4 w-full shadow-xl animate-fadeIn">
                <h1 className="text-lg">
                  <span className="font-bold">
                    {getPrefectureKeyByValue(filters.pref)}
                  </span>
                  {filters.muni && (
                    <span className="font-bold">{filters.muni}</span>
                  )}
                  <span className="font-bold">,{JobType}</span>
                  <span>の求人・転職・アルバイト情報</span>
                </h1>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <p className="lg:text-xl md:text-sm font-bold text-[#343434] ">
                      該当件数
                    </p>
                    {jobData.allJobPostsNum === null ? (
                      <div className="flex items-center">
                        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded mx-2"></div>
                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
                          件
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="font-bold text-[#FF2A3B] lg:text-[1.7rem] md:text-[1.2rem] number ml-2">
                          {jobData.allJobPostsNum}
                        </p>
                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
                          件
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between lg:px-8 md:px-2 lg:py-2 md:py-1 border-[#FF2A3B] border-2 rounded-lg gap-4">
                    <button
                      className="lg:text-[1rem] md:text-sm font-bold text-[#FF2A3B] hover:underline"
                      onClick={openPrefModal}
                    >
                      {!filters.pref ? "都道府県を変更" : "都道府県を選択"}
                    </button>
                    <img
                      src="/assets/images/dashboard/ep_arrow-right.png"
                      alt="chevron-right"
                      className="w-4"
                    />
                  </div>
                </div>
              </div>
            ) : (
              renderSectionSkeleton("120px")
            )}

            {/* Filters Section - Medium Priority */}
            {loadedSections.filters ? (
              <div className="flex flex-col justify-center bg-white rounded-lg px-12 py-8 w-full shadow-xl mt-8 animate-fadeIn">
                <button
                  className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer"
                  onClick={(e) => {
                    if (!getPrefectureKeyByValue(filters.pref)) {
                      e.preventDefault();
                      message.error("都道府県を選択してください");
                    } else {
                      openMuniModal();
                    }
                  }}
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
                </button>

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
                <button
                  className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer"
                  onClick={openEmploymentModal}
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
                </button>
                <button
                  className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer"
                  onClick={openFeatureModal}
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
                </button>
              </div>
            ) : (
              renderSectionSkeleton("300px")
            )}

            {/* Job Listings - Progressive Loading */}
            {loadedSections.jobList ? (
              <div className="flex flex-col items-center justify-start w-full">
                {jobData.isLoading ? (
                  // Show skeleton loaders while initial data is loading
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col bg-white rounded-2xl p-4 w-full shadow-xl mt-8 animate-pulse"
                      >
                        <div className="flex md:flex-col lg:flex-row items-start justify-between w-full">
                          <div className="md:w-full lg:w-1/2 aspect-video bg-gray-200 rounded-lg"></div>
                          <div className="flex flex-col items-start justify-between p-4 w-full gap-8">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                        <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                ) : jobData.jobPosts.length === 0 ? (
                  <div className="w-full py-8 text-center text-gray-500 bg-white rounded-lg mt-8 animate-fadeIn">
                    該当する求人が見つかりませんでした
                  </div>
                ) : (
                  // Render job cards with progressive loading
                  jobData.jobPosts.map((jobpost, index) =>
                    renderJobCard(jobpost, index)
                  )
                )}
              </div>
            ) : (
              renderSectionSkeleton("400px")
            )}

            {/* Pagination Section - Lower Priority */}
            {loadedSections.pagination ? (
              <div className="flex flex-col bg-white rounded-lg px-4 py-2 w-full shadow-xl mt-8 animate-fadeIn">
                <Pagination
                  currentPage={filters.page}
                  totalPages={jobData.totalPages}
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
            ) : (
              renderSectionSkeleton("200px")
            )}

            {/* Description Section - Lowest Priority */}
            {loadedSections.description ? (
              <div className="flex flex-col bg-white rounded-lg px-8 py-6 w-full mt-8 shadow-xl animate-fadeIn">
                <p className="lg:text-2xl md:text-xl font-bold text-[#343434]">
                  {JobType}について
                </p>
                <pre className="lg:text-[1rem] md:text-[0.8rem]">
                  {SmallDescriptions[JobType]}
                </pre>
              </div>
            ) : (
              renderSectionSkeleton("150px")
            )}
          </div>

          {/* Sidebar - Medium Priority */}
          <div className="flex h-full w-1/3">
            {loadedSections.sidebar ? (
              <div className="flex flex-col items-center justify-start h-full w-full animate-fadeIn">
                <img
                  src="/assets/images/dashboard/Group 16.png"
                  alt="banner"
                  className="w-full"
                  loading="lazy"
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
            ) : (
              <div className="w-full">
                {renderSectionSkeleton("200px")}
                <div className="mt-8">{renderSectionSkeleton("300px")}</div>
                <div className="mt-8">{renderSectionSkeleton("200px")}</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom sections with lowest priority */}
        {loadedSections.description && (
          <>
            <div
              className="mt-8 animate-fadeIn"
              style={{ animationDelay: "500ms" }}
            >
              <NewJobs />
            </div>

            {/* <div
              className="mt-8 animate-fadeIn"
              style={{ animationDelay: "600ms" }}
            >
              <NearByJobs jobType={JobType} path={path} />
            </div> */}
          </>
        )}
      </div>

      {/* Modals */}
      <Modal
        open={modalType === "pref"}
        onCancel={closeModal}
        footer={null}
        width={1000}
        height={800}
        className="modal"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full py-3 gap-4 px-4">
          {renderPrefectureSection("関東", Prefectures.KANTO)}
          {renderPrefectureSection("関西", Prefectures.KANSAI)}
          {renderPrefectureSection("東海", Prefectures.TOKAI)}
          {renderPrefectureSection("北海道・東北", Prefectures.HOKKAIDO_TOHOKU)}
          {renderPrefectureSection(
            "甲信越・北陸",
            Prefectures.KOSHINETSU_HOKURIKU
          )}
          {renderPrefectureSection("中部・近畿", Prefectures.CHUGOKU_SHIKOKU)}
          {renderPrefectureSection("九州・沖縄", Prefectures.KYUSHU_OKINAWA)}
        </div>
      </Modal>

      <Modal
        open={modalType === "employment"}
        onCancel={closeModal}
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
              {Object.keys(EmploymentType).map((employmentTypeKey, index) => (
                <Checkbox
                  key={index}
                  onChange={() => handleEmploymentTypeChange(employmentTypeKey)}
                  checked={tempEmploymentTypes.includes(employmentTypeKey)}
                  className="relative"
                >
                  {employmentTypeKey}
                  <a
                    href={buildPathFilter({
                      pref: filters.pref,
                      muni: currentMuniCode,
                      employment: `employment${index + 1}`,
                      feature: currentFeatureCode,
                    })}
                    aria-label={`雇用形態：${employmentTypeKey}`}
                    className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer bg-[#ffcaca] hover:bg-[#ffaaaa] transition-colors rounded-r"
                  >
                    <img
                      src="/assets/images/dashboard/ep_arrow-right_black.png"
                      alt="arrow-right"
                      className="w-4 transition-transform hover:translate-x-1"
                    />
                  </a>
                </Checkbox>
              ))}
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
                  onChange={(value) =>
                    handleSalaryChange("monthlySalary", value)
                  }
                  value={tempMonthlySalary}
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
                  onChange={(value) =>
                    handleSalaryChange("hourlySalary", value)
                  }
                  value={tempHourlySalary}
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

      <Modal
        open={modalType === "feature"}
        onCancel={closeModal}
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
                    onChange={() =>
                      handleFeatureChange(section.features[featureKey])
                    }
                    checked={tempFeatures.includes(
                      getFeatureKeyByValue(section.features[featureKey])
                    )}
                    className="relative"
                  >
                    <span className="text-xs lg:text-sm">{featureKey}</span>
                    <a
                      href={buildPathFilter({
                        pref: filters.pref,
                        muni: currentMuniCode,
                        employment: currentEmploymentCode,
                        feature: `feature${idx + 1}`,
                      })}
                      aria-label={`特徴：${featureKey}`}
                      className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer bg-[#ffcaca] hover:bg-[#ffaaaa] transition-colors rounded-r"
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

      <Modal
        open={modalType === "muni"}
        onCancel={closeModal}
        footer={null}
        width={1000}
        height={800}
        className="modal"
      >
        <div className="w-full py-3 gap-4 px-4">
          {renderMunicipalitiesSection(getPrefectureKeyByValue(filters.pref))}
        </div>
      </Modal>
    </>
  );
};

export default JobLists;

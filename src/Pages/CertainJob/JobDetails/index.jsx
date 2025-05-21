"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { message, Carousel, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { Facilities } from "../../../utils/constants/categories/facilities";
import { useAuth } from "../../../context/AuthContext";
import NotFound from "../../NotFound";
import NewJobs from "../../../components/NewJobs";
import BlurryLoader from "../../../components/SkeletonGroup";
import NearByJobs from "../../../components/NearByJobs";
import MeshLink02 from "../../../components/MeshLink02";

const JobDetails = () => {
  const { user, likes, setLikes } = useAuth();
  const [jobPost, setJobPost] = useState(null);
  const [allFacilityJobPosts, setAllFacilityJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const { pathname } = useLocation();
  const job_type = pathname.split("/")[1];
  const jobpost_id = pathname.split("/")[2];
  const carouselRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoize job mapping to avoid unnecessary re-calculation
  const jobMapping = useMemo(
    () => ({
      医師: "/dr",
      薬剤師: "/ph",
      "看護師/准看護師": "/nan",
      助産師: "/mw",
      保健師: "/phn",
      看護助手: "/nuas",
      診療放射線技師: "/mrt",
      臨床検査技師: "/clt",
      "管理栄養士/栄養士": "/rdn",
      "公認心理師/臨床心理士": "/cp",
      医療ソーシャルワーカー: "/msw",
      歯科医師: "/de",
      歯科衛生士: "/dh",
      歯科技工士: "/dt",
      歯科助手: "/deas",
      "介護職/ヘルパー": "/cwh",
      生活相談員: "/lc",
      ケアマネジャー: "/cm",
      "管理職（介護）": "/mp",
      サービス提供責任者: "/sp",
      生活支援員: "/lsw",
      福祉用具専門相談員: "/wesc",
      児童発達支援管理責任者: "/cdsm",
      保育士: "/chil",
      幼稚園教諭: "/kt",
      保育補助: "/ca",
      "児童指導員/指導員": "/cii",
      理学療法士: "/pt",
      言語聴覚士: "/st",
      作業療法士: "/ot",
      視能訓練士: "/ort",
      "調理師/調理スタッフ": "/ccs",
      美容師: "/hai",
      理容師: "/bar",
      ネイリスト: "/naar",
      アイリスト: "/el",
      "エステティシャン/セラピスト": "/et",
      美容部員: "/bcm",
      インストラクター: "/ins",
    }),
    []
  );

  // Fetch job post data
  const getJobPost = useCallback(async () => {
    if (!jobpost_id) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/user/${jobpost_id}`
      );
      setJobPost(response.data.jobpost);
    } catch (error) {
      console.error("Error fetching job post:", error);
      message.error("求人情報の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [jobpost_id]);

  // Fetch all job posts from the same facility
  const getFacilityJobPosts = useCallback(async (facilityId) => {
    if (!facilityId) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/facility/${facilityId}`
      );
      setAllFacilityJobPosts(
        response.data.jobposts.filter(
          (jobpost) => jobpost.allowed === "allowed"
        )
      );
    } catch (error) {
      console.error("Error fetching facility job posts:", error);
      message.error("施設の求人情報の取得中にエラーが発生しました");
    }
  }, []);

  // Handle carousel navigation
  const handleCarouselChange = useCallback((current) => {
    setCurrentSlide(current);
  }, []);

  // Navigate to previous slide
  const goToPrevSlide = useCallback(() => {
    if (!jobPost?.picture?.length) return;

    const newIndex =
      (currentSlide - 1 + jobPost.picture.length) % jobPost.picture.length;
    if (carouselRef.current) {
      carouselRef.current.goTo(newIndex);
      setCurrentSlide(newIndex);
    }
  }, [currentSlide, jobPost?.picture?.length]);

  // Navigate to next slide
  const goToNextSlide = useCallback(() => {
    if (!jobPost?.picture?.length) return;

    const newIndex = (currentSlide + 1) % jobPost.picture.length;
    if (carouselRef.current) {
      carouselRef.current.goTo(newIndex);
      setCurrentSlide(newIndex);
    }
  }, [currentSlide, jobPost?.picture?.length]);

  // Open image modal
  const openImageModal = useCallback((imageUrl) => {
    setModalImage(imageUrl);
    setIsModalVisible(true);
  }, []);

  // Update recently viewed jobs in localStorage
  const updateRecentlyViewed = useCallback(() => {
    if (!jobPost?.jobpost_id) return;

    try {
      const storedRecents = localStorage.getItem("recents");
      const newRecents = storedRecents ? JSON.parse(storedRecents) : [];

      // Remove existing entry if present
      const filteredRecents = newRecents.filter(
        (id) => id !== jobPost.jobpost_id
      );

      // Add to beginning and limit to 10 entries
      filteredRecents.unshift(jobPost.jobpost_id);
      const limitedRecents = filteredRecents.slice(0, 10);

      localStorage.setItem("recents", JSON.stringify(limitedRecents));
    } catch (error) {
      console.error("Error updating recently viewed jobs:", error);
    }
  }, [jobPost?.jobpost_id]);

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

  // Initial data fetch
  useEffect(() => {
    getJobPost();
  }, [getJobPost]);

  // Fetch facility job posts when job post data is available
  useEffect(() => {
    if (jobPost?.facility_id?.facility_id) {
      getFacilityJobPosts(jobPost.facility_id.facility_id);
    }
  }, [jobPost?.facility_id?.facility_id, getFacilityJobPosts]);

  // Update document title
  useEffect(() => {
    if (!jobPost?.facility_id) return;

    const year = new Date().getFullYear();
    document.title = `【${year}年最新】${jobPost?.facility_id.name}の${jobPost?.type}の求人(${jobPost?.employment_type}) ${jobPost?.facility_id.prefecture}${jobPost?.facility_id.city} | JobJob (ジョブジョブ)`;
  }, [jobPost]);

  // Update recently viewed jobs and scroll to top
  useEffect(() => {
    updateRecentlyViewed();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [jobPost?.jobpost_id, updateRecentlyViewed]);

  if (!jobPost && !loading) {
    return <NotFound />;
  }

  return (
    <BlurryLoader isLoading={loading}>
      <div className="flex flex-col w-full px-4 bg-[#EFEFEF]">
        <div className="container flex flex-col md:flex-row items-stretch justify-between p-4 bg-white rounded-lg">
          <div className="relative w-full md:w-2/3">
            {jobPost?.picture?.length > 0 ? (
              <>
                <Carousel
                  ref={carouselRef}
                  dots={false}
                  afterChange={handleCarouselChange}
                  effect="fade"
                  lazyLoad="ondemand"
                >
                  {jobPost.picture.map((photoUrl, index) => (
                    <div key={index} onClick={() => openImageModal(photoUrl)}>
                      <img
                        src={photoUrl.url || "/assets/images/noimage.png"}
                        alt={`${jobPost?.type}の求人写真-${index + 1}`}
                        className="w-full aspect-video object-cover rounded-t-xl cursor-pointer"
                      />
                    </div>
                  ))}
                </Carousel>

                <div className="absolute top-2 right-2 bg-[#fdfcf9] text-black text-xs px-2 py-1 rounded-xl z-10 border border-[#ddccc9]">
                  {currentSlide + 1}/{jobPost.picture.length}
                </div>

                <div className="flex flex-col w-full bg-[#fdfcf9] rounded-b-xl border border-[#ddccc9]">
                  <div className="flex items-center justify-between w-full h-11">
                    <button
                      onClick={goToPrevSlide}
                      className="bg-transparent text-[#FF6B56] border-r border-[#ddccc9] p-2 w-11 h-11 flex items-center justify-center"
                      aria-label="前の写真を表示"
                      type="button"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 13L5.27083 8L11 3"
                          stroke="#FF6B56"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <p className="text-sm text-[#343434] line-clamp-1">
                      {jobPost?.picture &&
                        jobPost.picture[currentSlide].description}
                    </p>
                    <button
                      onClick={goToNextSlide}
                      className="bg-transparent text-[#FF6B56] border-l border-[#ddccc9] p-2 w-11 h-11 flex items-center justify-center"
                      aria-label="次の写真を表示"
                      type="button"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 13L10.7292 8L5 3"
                          stroke="#FF6B56"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full">
                <img
                  src="/assets/images/noimage.png"
                  alt="画像なし"
                  className="w-full aspect-video object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col items-start justify-between p-4 w-full md:w-1/3 gap-4 mt-4 md:mt-0">
            <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
              {jobPost?.facility_id?.name || ""}
              <span className="text-sm text-[#343434] block md:inline">
                の{jobPost?.type || ""}求人({jobPost?.employment_type || ""})
              </span>
            </p>

            <div className="flex-grow"></div>

            <div className="flex flex-col w-full items-center gap-4 mt-6">
              <Link
                to={`/${job_type}/apply/${jobPost?.jobpost_id}`}
                className="flex items-center gap-2 justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-full"
              >
                <p className="lg:text-base text-sm font-bold text-white">
                  応募画面に進む
                </p>
                <div className="bg-white text-center rounded-lg p-1">
                  <p className="text-xs text-[#FF6B56]">
                    最短1分！ <br /> すぐできます
                  </p>
                </div>
              </Link>
              <button
                className="flex items-center justify-center gap-2 bg-white rounded-lg py-3 text-white border-2 border-[#FF6B56] w-full hover:bg-[#FF6B56]/20 hover:scale-105 duration-300"
                aria-label="気になるボタン"
                onClick={() => handleLike(jobPost?.jobpost_id)}
              >
                <img
                  src={`${
                    likes.includes(jobPost?.jobpost_id)
                      ? "/assets/images/dashboard/mdi_heart.png"
                      : "/assets/images/dashboard/Vector.png"
                  }`}
                  alt="Favorite icon"
                  className="w-4 pt-0.5"
                />
                <p
                  className={`text-base font-bold ${
                    likes.includes(jobPost?.jobpost_id)
                      ? "text-[#188CE0]"
                      : "text-[#FF6B56]"
                  }`}
                >
                  {likes.includes(jobPost?.jobpost_id)
                    ? "気になる済"
                    : "気になる"}
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className="container flex flex-col md:flex-row items-start gap-4 justify-between rounded-lg mt-4">
          <div className="flex flex-col w-full md:w-2/3">
            {/* Job description section */}
            <div className="flex flex-col bg-white p-4 rounded-lg">
              <p className="lg:text-lg font-bold text-sm text-[#343434]">
                {jobPost?.sub_title || ""}
              </p>
              <pre className="font-bold text-sm text-[#343434]">
                {jobPost?.sub_description || ""}
              </pre>
            </div>

            {/* Job details section */}
            <div className="flex flex-col bg-white px-4 rounded-lg mt-4">
              <p className="lg:text-lg text-sm text-[#343434] font-bold py-6 border-b-[1px] border-[#e7e7e7]">
                募集内容
              </p>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  募集職種
                </p>
                <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">
                  {jobPost?.type || ""}
                </p>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  仕事内容
                </p>
                <pre className="flex flex-col lg:text-base text-sm text-[#343434] py-6 w-4/5 overflow-auto whitespace-pre-wrap break-words">
                  <div className="inline-block items-start justify-start gap-2 w-4/5">
                    {jobPost?.work_item.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg"
                        >
                          <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {jobPost?.work_content}
                </pre>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  診療科目・
                  <br />
                  サービス形態{" "}
                </p>
                <div className="inline-block items-start justify-start gap-2 w-4/5 py-6">
                  {jobPost?.service_subject
                    ?.concat(jobPost?.service_type || [])
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
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  給与
                </p>
                <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">
                  {`【${jobPost?.employment_type || ""}】 ${
                    jobPost?.salary_type || ""
                  } ${jobPost?.salary_min || 0}円〜${
                    jobPost?.salary_max || 0
                  }円`}
                </p>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  給与の備考
                </p>
                <div className="lg:text-base text-sm text-[#343434] py-6 w-4/5 overflow-auto">
                  <pre className="whitespace-pre-wrap break-words">
                    {jobPost?.salary_remarks || ""}
                  </pre>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  待遇
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="inline-block items-start justify-start gap-2">
                    {jobPost?.treatment_type?.map((item, index) => (
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
                  <div className="lg:text-base text-sm text-[#343434] mt-4 overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">
                      {jobPost?.treatment_content || ""}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  長期休暇・特別休暇
                </p>
                <div className="lg:text-base text-sm text-[#343434] py-6 w-4/5 overflow-auto">
                  <pre className="whitespace-pre-wrap break-words">
                    {jobPost?.special_content || ""}
                  </pre>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  教育体制・研修
                </p>
                <div className="inline-block items-start justify-start gap-2 w-4/5 py-6">
                  {jobPost?.education_content?.map((item, index) => (
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
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  勤務時間
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="inline-block items-start justify-start gap-2">
                    {jobPost?.work_time_type?.map((item, index) => (
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
                  <div className="lg:text-base text-sm text-[#343434] mt-4 overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">
                      {jobPost?.work_time_content || ""}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  休日
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="inline-block items-start justify-start gap-2">
                    {jobPost?.rest_type?.map((item, index) => (
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
                  <div className="lg:text-base text-sm text-[#343434] mt-4 overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">
                      {jobPost?.rest_content || ""}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  応募要件
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="inline-block items-start justify-start gap-2">
                    {jobPost?.qualification_type
                      ?.concat(jobPost?.qualification_other || [])
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
                  <div className="lg:text-base text-sm text-[#343434] mt-4 overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">
                      {jobPost?.qualification_content || ""}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  歓迎要件
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="lg:text-base text-sm text-[#343434] overflow-auto">
                    <pre className="whitespace-pre-wrap break-words">
                      {jobPost?.qualification_welcome || ""}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start">
                <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                  選考プロセス
                </p>
                <div className="lg:text-base text-sm text-[#343434] py-6 w-4/5 overflow-auto">
                  <pre className="whitespace-pre-wrap break-words">
                    {jobPost?.process || ""}
                  </pre>
                </div>
              </div>
            </div>

            {/* Photo gallery section */}
            <div className="flex flex-col bg-white p-4 rounded-lg mt-8">
              <p className="lg:text-lg font-bold text-sm text-[#343434]">
                写真
              </p>
              <div className="grid grid-cols-3 gap-2 py-4">
                {jobPost?.picture?.length > 0 &&
                  jobPost?.picture?.map((item, index) => (
                    <img
                      key={index}
                      src={item.url || "/assets/images/noimage.png"}
                      alt={`${jobPost?.type}の求人写真-${index + 1}`}
                      className="col-span-1 aspect-[2/1] object-cover rounded-lg cursor-pointer"
                      onClick={() => openImageModal(item.url)}
                    />
                  ))}
              </div>
            </div>

            {/* Facility information section */}
            <div className="flex flex-col bg-white px-4 rounded-lg mt-8">
              <p className="lg:text-lg font-bold text-sm text-[#343434] border-b-[1px] py-6 border-[#e7e7e7]">
                事業所情報
              </p>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  法人・施設名
                </p>
                <Link
                  to={`/facility/${jobPost?.facility_id?.facility_id}`}
                  className="lg:text-base text-sm text-[#FF2A3B] hover:underline w-4/5"
                >
                  {jobPost?.facility_id?.name || ""}
                </Link>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  募集職種
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <Link
                    to={`${jobMapping[jobPost?.type] || "#"}`}
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                  >
                    {jobPost?.type || ""}({jobPost?.employment_type || ""})
                  </Link>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  施設紹介
                </p>
                <div className="lg:text-base text-sm text-[#343434] w-4/5 overflow-auto">
                  <pre className="whitespace-pre-wrap break-words">
                    {jobPost?.facility_id?.introduction || ""}
                  </pre>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  アクセス
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <div className="inline-block items-start justify-start gap-2">
                    {jobPost?.facility_id?.access?.map((item, index) => (
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
                  <p className="lg:text-base text-sm text-[#343434] mt-1">
                    {jobPost?.facility_id?.prefecture || ""}
                    {jobPost?.facility_id?.city || ""}
                    {jobPost?.facility_id?.village || ""}
                    {jobPost?.facility_id?.building || ""}
                  </p>
                  <div className="w-full py-4 aspect-square">
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        `${jobPost?.facility_id?.prefecture || ""} ${
                          jobPost?.facility_id?.city || ""
                        } ${jobPost?.facility_id?.village || ""} ${
                          jobPost?.facility_id?.building || ""
                        }`
                      )}&output=embed`}
                    />
                  </div>
                  <p className="lg:text-base text-sm text-[#343434] mt-1">
                    {jobPost?.facility_id?.access_text || ""}
                  </p>
                  <Link
                    to={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${jobPost?.facility_id?.prefecture || ""} ${
                        jobPost?.facility_id?.city || ""
                      } ${jobPost?.facility_id?.village || ""} ${
                        jobPost?.facility_id?.building || ""
                      }`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline mt-1 border-[1px] border-[#FF2A3B] py-1 px-2 rounded-lg"
                  >
                    Google Mapsで見る
                  </Link>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  設立年月
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  {jobPost?.facility_id?.establishment_date?.split("-")[0] ||
                    ""}
                  年
                  {jobPost?.facility_id?.establishment_date?.split("-")[1] ||
                    ""}
                  月
                </p>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  施設
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <Link
                    to={`/${
                      Facilities[jobPost?.facility_id?.facility_genre] || "#"
                    }`}
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                  >
                    {jobPost?.facility_id?.facility_genre || ""}
                  </Link>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  営業時間
                </p>
                <div className="lg:text-base text-sm text-[#343434] w-4/5 overflow-auto">
                  <pre className="whitespace-pre-wrap break-words">
                    {jobPost?.facility_id?.service_time || ""}
                  </pre>
                </div>
              </div>
              <div className="flex items-start justify-start py-6">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  休日
                </p>
                <div className="lg:text-base text-sm text-[#343434] w-4/5 overflow-auto">
                  <pre className="whitespace-pre-wrap break-words">
                    {jobPost?.facility_id?.rest_day || ""}
                  </pre>
                </div>
              </div>
            </div>
            <div className="rounded-lg px-6 py-4 mt-8 shadow-xl bg-white w-full">
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

          {/* Sidebar */}
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

        <div
          className="mt-8 animate-fadeIn"
          style={{ animationDelay: "600ms" }}
        >
          <NearByJobs
            path={job_type}
            jobType={jobPost?.type}
            pref={jobPost?.facility_id?.prefecture}
            muni={jobPost?.facility_id?.city}
            jobpost_id={jobPost?.jobpost_id}
          />
        </div>
        <NewJobs />

        {/* Image Modal */}
        <Modal
          open={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
          width={800}
          centered
          closeIcon={
            <CloseOutlined
              style={{
                backgroundColor: "#fff",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
          }
        >
          <img
            src={modalImage || "/placeholder.svg"}
            alt="拡大画像"
            style={{ width: "100%", objectFit: "contain", maxHeight: "80vh" }}
          />
        </Modal>
      </div>
    </BlurryLoader>
  );
};

export default JobDetails;

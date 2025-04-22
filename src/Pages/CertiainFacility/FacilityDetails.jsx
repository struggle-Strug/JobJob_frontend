"use client";

import { message, Carousel, Spin } from "antd";
import axios from "axios";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getJobValueByKey } from "../../utils/getFunctions";
import { Facilities } from "../../utils/constants/categories";
import NotFound from "../NotFound";
import { useAuth } from "../../context/AuthContext";

// Job type to URL path mapping
const JOB_MAPPING = {
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
};

// Component for facility photo carousel
const FacilityPhotoCarousel = ({ photos = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef();

  const handlePrevSlide = useCallback(() => {
    if (!photos.length) return;
    const newIndex = (currentSlide - 1 + photos.length) % photos.length;
    carouselRef.current?.goTo(newIndex, false);
    setCurrentSlide(newIndex);
  }, [currentSlide, photos.length]);

  const handleNextSlide = useCallback(() => {
    if (!photos.length) return;
    const newIndex = (currentSlide + 1) % photos.length;
    carouselRef.current?.goTo(newIndex, false);
    setCurrentSlide(newIndex);
  }, [currentSlide, photos.length]);

  return (
    <div className="relative w-full">
      <Carousel
        ref={carouselRef}
        dots={false}
        beforeChange={(_, next) => setCurrentSlide(next)}
      >
        {photos.length > 0 ? (
          photos.map((photoUrl, index) => (
            <div key={index}>
              <img
                src={photoUrl || "/placeholder.svg"}
                alt={`facility-photo-${index + 1}`}
                className="w-full aspect-video object-cover rounded-t-xl"
              />
            </div>
          ))
        ) : (
          <div>
            <img
              src="/assets/images/noimage.png"
              alt="no-image"
              className="w-full aspect-video object-cover rounded-t-xl"
            />
          </div>
        )}
      </Carousel>

      {photos.length > 0 && (
        <div className="absolute top-2 right-2 bg-[#fdfcf9] text-black text-xs px-2 py-1 rounded-xl z-10 border border-[#ddccc9]">
          {currentSlide + 1}/{photos.length}
        </div>
      )}

      <div className="flex items-center justify-between w-full bg-[#fdfcf9] h-11 rounded-b-xl border border-[#ddccc9]">
        <button
          onClick={handlePrevSlide}
          className="bg-transparent text-[#FF6B56] border-r border-[#ddccc9] p-2 w-11 h-11 flex items-center justify-center"
          aria-label="前の写真を表示"
        >
          <svg
            className="h-[13px]"
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
            ></path>
          </svg>
        </button>
        <button
          onClick={handleNextSlide}
          className="bg-transparent text-[#FF6B56] border-l border-[#ddccc9] p-2 w-11 h-11 flex items-center justify-center"
          aria-label="次の写真を表示"
        >
          <svg
            className="h-[13px]"
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
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Component for job post card
const JobPostCard = ({ jobPost, facility }) => {
  return (
    <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8">
      <div className="flex md:flex-col lg:flex-row items-start justify-between w-full">
        {jobPost.picture.length === 0 ? (
          <img
            src="/assets/images/noimage.png"
            alt={`${jobPost.type}の求人`}
            className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"
          />
        ) : (
          <img
            src={jobPost.picture[0] || "/placeholder.svg"}
            alt={`${jobPost.type}の求人`}
            className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"
          />
        )}
        <div className="flex flex-col items-start justify-between p-4 w-full gap-8">
          <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
            {facility?.name}の{jobPost.type}求人
          </p>
          <p className="lg:text-sm md:text-xs text-[#343434] line-clamp-2">
            {jobPost.sub_title}
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
                {jobPost.employment_type} {jobPost.salary_type}{" "}
                {jobPost.salary_min}円〜{jobPost.salary_max}円
              </p>
            </div>
            <div className="flex items-start justify-start mt-4">
              <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                仕事内容
              </p>
              <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-2">
                <span className="whitespace-pre-wrap overflow-hidden line-clamp-2">
                  {jobPost.work_content}
                </span>
              </p>
            </div>
            <div className="flex items-start justify-start mt-4">
              <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                応募要件
              </p>
              <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-2">
                {jobPost.qualification_content} {jobPost.qualification_welcome}
              </p>
            </div>
            <div className="flex items-start justify-start mt-4">
              <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                住所
              </p>
              <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-2">
                {facility.prefecture} {facility.city} {facility.village}{" "}
                {facility.building} {facility.access_text}
              </p>
            </div>
          </div>

          <div className="inline-block items-start justify-start gap-2 w-1/3 h-full">
            {[
              ...jobPost.work_item,
              ...jobPost.service_subject,
              ...jobPost.service_type,
              ...jobPost.treatment_type,
              ...jobPost.work_time_type,
              ...jobPost.rest_type,
            ].map((item, index) => (
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

      <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
        <button
          className="flex items-center justify-center gap-2 bg-white rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2 hover:bg-[#FF6B56]/20 hover:scale-105 duration-300"
          aria-label="気になるボタン"
        >
          <img
            src="/assets/images/dashboard/Vector.png"
            alt=""
            className="w-4 pt-0.5"
          />
          <p className="text-sm font-bold text-[#FF6B56]">気になる</p>
        </button>
        <Link
          to={`/${getJobValueByKey(jobPost.type)}/details/${
            jobPost.jobpost_id
          }`}
          className="flex items-center justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2"
        >
          <p className="text-sm font-bold text-white">求人を見る</p>
        </Link>
      </div>
    </div>
  );
};

// Main component
const FacilityDetails = () => {
  const { pathname } = useLocation();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const facility_id = useMemo(() => pathname.split("/")[3], [pathname]);

  const getFacility = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/facility/user/${facility_id}`
      );

      if (response.data.error) {
        setError(response.data.message);
        message.error(response.data.message);
        return;
      }

      setFacility(response.data.facility);
    } catch (err) {
      console.error("Error fetching facility data:", err);
      setError("施設情報の取得に失敗しました");
      message.error("施設情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [facility_id]);

  useEffect(() => {
    getFacility();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [getFacility]);

  useEffect(() => {
    if (facility?.name) {
      document.title = `${facility.name}の求人・採用・アクセス情報 | JobJob (ジョブジョブ)`;
    }
  }, [facility?.name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !facility) {
    return <NotFound />;
  }

  return (
    <div className="flex w-full px-4 bg-[#EFEFEF] pt-5">
      <div className="container flex justify-between gap-8">
        <div className="flex flex-col items-start justify-start w-full lg:w-2/3">
          <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-6 w-full shadow-xl hover:scale-[1.02] duration-300">
            <FacilityPhotoCarousel photos={facility.photo} />

            <div className="flex flex-col items-start justify-start p-4 w-full h-full gap-4">
              <p className="lg:text-xl md:text-sm text-[#343434]">
                <span className="lg:text-2xl md:text-xl font-bold">
                  {facility.name}
                </span>
                <span className="text-base">の求人情報</span>
              </p>
              <div>
                <p className="lg:text-sm md:text-xs text-[#343434]">
                <span style={{ marginRight: 5 }}>{facility.postal_code}</span>
                  {facility.prefecture}
                  {facility.city}
                  {facility.village}
                  {facility.building}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg flex flex-col w-full px-4 py-2 mt-8">
            <p className="text-xs font-bold text-[#343434]">募集中の求人</p>
            <p className="text-xs font-bold text-[#343434]">
              <span className="text-[#FF2A3B] number">
                {facility.jobPosts.length}
              </span>
              <span>件</span>
            </p>
          </div>

          {facility.jobPosts?.map((jobpost, index) => (
            <JobPostCard key={index} jobPost={jobpost} facility={facility} />
          ))}

          <div className="flex flex-col bg-white px-4 rounded-lg mt-8 w-full">
            <p className="lg:text-lg font-bold text-sm text-[#343434] border-b-[1px] py-6 border-[#e7e7e7]">
              事業所情報
            </p>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                法人・施設名
              </p>
              <p className="lg:text-base text-sm text-[#343434] w-4/5">
                {facility.name}
              </p>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                募集職種
              </p>
              <div className="flex flex-col items-start justify-start w-4/5">
                {facility.jobPosts?.map((jobPost, index) => (
                  <Link
                    key={index}
                    to={`${JOB_MAPPING[jobPost?.type] || "#"}`}
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                  >
                    {jobPost?.type}({jobPost?.employment_type})
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                施設紹介
              </p>
              <div className="lg:text-base text-sm text-[#343434] w-4/5">
                <span className="whitespace-pre-wrap block">
                  {facility.introduction}
                </span>
              </div>
            </div>
            
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                アクセス
              </p>
              <div className="flex flex-col items-start justify-start w-4/5">
                <div className="inline-block items-start justify-start gap-2">
                  {facility.access?.map((item, index) => (
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
                <span style={{ marginRight: 5 }}>{facility.postal_code}</span>
                  {facility.prefecture}
                  {facility.city}
                  {facility.village}
                  {facility.building}
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
                      `${facility.prefecture}${facility.city}${facility.village}${facility.building}`
                    )}&output=embed`}
                  ></iframe>
                </div>
                <p className="lg:text-base text-sm text-[#343434] mt-1">
                  {facility.access_text}
                </p>
                <Link
                  to={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${facility.prefecture}${facility.city}${facility.village}${facility.building}`
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
                {facility.establishment_date?.split("-")[0]}年
                {facility.establishment_date?.split("-")[1]}月
              </p>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                施設
              </p>
              <div className="flex flex-col items-start justify-start w-4/5">
                <Link
                  to={`/${Facilities[facility.facility_genre] || "#"}`}
                  className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                >
                  {facility.facility_genre}
                </Link>
              </div>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                営業時間
              </p>
              <p className="lg:text-base text-sm text-[#343434] w-4/5">
                <span className="whitespace-pre-wrap block">
                  {facility.service_time}
                </span>
              </p>
            </div>
            <div className="flex items-start justify-start py-6">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                休日
              </p>
              <p className="lg:text-base text-sm text-[#343434] w-4/5">
                <span className="whitespace-pre-wrap block">
                  {facility.rest_day}
                </span>
              </p>
            </div>
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
  );
};

export default FacilityDetails;
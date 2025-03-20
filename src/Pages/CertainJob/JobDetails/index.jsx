import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { message } from "antd";
import { Facilities } from "../../../utils/constants/categories/facilities";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/AuthContext";

const JobDetails = () => {
  const { user } = useAuth();
  const [jobPost, setJobPost] = useState(null);
  const [allFacilityJobPosts, setAllFacilityJobPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const job_type = pathname.split("/")[1];
  const jobpost_id = pathname.split("/")[3];
  const jobMapping = {
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

  const getJobPost = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobpost_id}`
    );
    setJobPost(response.data.jobpost);
  };

  const getFacilityJobPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/facility/${jobPost?.facility_id.facility_id}`
      );
      setAllFacilityJobPosts(
        response.data.jobposts.filter(
          (jobpost) => jobpost.allowed === "allowed"
        )
      );
    } catch {
      message.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (jobPost?.facility_id) {
      getFacilityJobPosts();
    }
  }, [jobPost?.facility_id]);

  useEffect(() => {
    document.title = "求人詳細";
    if (jobpost_id !== undefined) {
      getJobPost();
    }
  }, []);

  useEffect(() => {
    if (!jobPost?.jobpost_id) return; // Prevent running if jobpost_id is undefined

    let storedRecents = localStorage.getItem("recents");
    let newRecents = storedRecents ? JSON.parse(storedRecents) : [];

    // Avoid duplicates and ensure max length of 10
    if (!newRecents.includes(jobPost.jobpost_id)) {
      newRecents.unshift(jobPost.jobpost_id); // Add to the beginning
      if (newRecents.length > 10) {
        newRecents.pop(); // Remove the oldest entry if limit exceeds 10
      }
      localStorage.setItem("recents", JSON.stringify(newRecents));
    } else {
      // If the jobpost_id is already in recents, move it to the front
      newRecents = newRecents.filter((id) => id !== jobPost.jobpost_id);
      newRecents.unshift(jobPost.jobpost_id);
      localStorage.setItem("recents", JSON.stringify(newRecents));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [jobPost?.jobpost_id]); // Re-run when jobPost ID changes

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col w-full px-4 bg-[#EFEFEF]">
      <div className="container flex items-stretch justify-between p-4 bg-white rounded-lg">
        {jobPost?.picture.length === 0 ? (
          <img
            src={"/assets/images/noimage.png"}
            alt={jobPost?.sub_title}
            className="w-2/3 object-cover rounded-lg"
          />
        ) : (
          <img
            src={jobPost?.picture[0]}
            alt={jobPost?.sub_title}
            className="w-2/3 aspect-[2/1] object-cover rounded-lg"
          />
        )}

        <div className="flex flex-col items-start justify-between p-4 w-1/3 gap-4">
          <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
            {jobPost?.facility_id.name}
            <span className="text-sm text-[#343434]">
              の{jobPost?.type}求人({jobPost?.employment_type})
            </span>
          </p>

          {/* Flex-grow ensures content stretches to fill available space */}
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
            <button className="flex items-center justify-center gap-2 bg-white rounded-lg py-3 text-white border-2 border-[#FF6B56] w-full hover:bg-[#FF6B56]/20 hover:scale-105 duration-300">
              <img
                src="/assets/images/dashboard/Vector.png"
                alt="eye"
                className="w-4 pt-0.5"
              />
              <p className="lg:text-base text-sm font-bold text-[#FF6B56]">
                気になる
              </p>
            </button>
          </div>
        </div>
      </div>

      <div className="container flex items-start gap-4 justify-between rounded-lg mt-4">
        <div className="flex flex-col w-2/3">
          <div className="flex flex-col bg-white p-4 rounded-lg">
            <p className="lg:text-lg font-bold text-sm text-[#343434]">
              {jobPost?.sub_title}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: jobPost?.sub_description }}
              className="p-2 lg:text-base text-sm mt-8 text-[#343434]"
            />
          </div>
          <div className="flex flex-col bg-white px-4 rounded-lg mt-4">
            <p className="lg:text-lg text-sm text-[#343434] font-bold py-6 border-b-[1px] border-[#e7e7e7]">
              募集内容
            </p>
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                募集職種
              </p>
              <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">
                {jobPost?.type}
              </p>
            </div>
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                仕事内容
              </p>
              <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">
                <pre>{jobPost?.work_content}</pre>
              </p>
            </div>
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                診療科目・
                <br />
                サービス形態{" "}
              </p>
              <div className="inline-block items-start justify-start gap-2 w-4/5 py-6">
                {jobPost?.service_subject
                  .concat(jobPost?.service_type)
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
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                給与
              </p>
              <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">{`【${jobPost?.employment_type}】 ${jobPost?.salary_type} ${jobPost?.salary_min}円〜${jobPost?.salary_max}円`}</p>
            </div>
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                給与の備考
              </p>
              <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">
                <pre>{jobPost?.salary_remarks}</pre>
              </p>
            </div>
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                教育体制・研修
              </p>
              <div className="inline-block items-start justify-start gap-2 w-4/5 py-6">
                {jobPost?.education_content.map((item, index) => {
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
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                勤務時間
              </p>
              <div className="flex flex-col w-4/5 py-6">
                <div className="inline-block items-start justify-start gap-2">
                  {jobPost?.work_time_type.map((item, index) => {
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
                <p className="lg:text-base text-sm text-[#343434] mt-4">
                  <pre>{jobPost?.work_time_content}</pre>
                </p>
              </div>
            </div>
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                休日
              </p>
              <div className="flex flex-col w-4/5 py-6">
                <div className="inline-block items-start justify-start gap-2">
                  {jobPost?.rest_type.map((item, index) => {
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
                <p className="lg:text-base text-sm text-[#343434] mt-4">
                  <pre>{jobPost?.rest_content}</pre>
                </p>
              </div>
            </div>
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                応募要件
              </p>
              <div className="flex flex-col w-4/5 py-6">
                <div className="inline-block items-start justify-start gap-2">
                  {jobPost?.qualification_type
                    .concat(jobPost?.qualification_other)
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
                <p className="lg:text-base text-sm text-[#343434] mt-4">
                  <pre>{jobPost?.qualification_content}</pre>
                </p>
              </div>
            </div>
            <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                歓迎要件
              </p>
              <div className="flex flex-col w-4/5 py-6">
                <p className="lg:text-base text-sm text-[#343434]">
                  <pre>{jobPost?.qualification_welcome}</pre>
                </p>
              </div>
            </div>
            <div className="flex items-start justify-start">
              <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">
                選考プロセス
              </p>
              <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">
                <pre>{jobPost?.process}</pre>
              </p>
            </div>
          </div>
          <div className="flex flex-col bg-white p-4 rounded-lg mt-8">
            <p className="lg:text-lg font-bold text-sm text-[#343434]">写真</p>
            <div className="flex items-start justify-start gap-2 py-4">
              {jobPost?.picture?.length > 0 &&
                jobPost?.picture?.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={item}
                      alt="jobpost"
                      className="w-1/3 aspect-[2/1] object-cover rounded-lg"
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col bg-white px-4 rounded-lg mt-8">
            <p className="lg:text-lg font-bold text-sm text-[#343434] border-b-[1px] py-6 border-[#e7e7e7]">
              事業所情報
            </p>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                法人・施設名
              </p>
              <Link
                to={`/facility/details/${jobPost?.facility_id.facility_id}`}
                className="lg:text-base text-sm text-[#FF2A3B] hover:underline w-4/5"
              >
                {jobPost?.facility_id.name}
              </Link>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                募集職種
              </p>
              <div className="flex flex-col items-start, justify-start w-4/5">
                {allFacilityJobPosts?.map((jobPost, index) => {
                  return (
                    <Link
                      key={index}
                      to={`${jobMapping[jobPost?.type]}`}
                      className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                    >
                      {jobPost?.type}({jobPost?.employment_type})
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                施設紹介
              </p>
              <p className="lg:text-base text-sm text-[#343434] w-4/5">
                <pre>{jobPost?.facility_id.introduction}</pre>
              </p>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                アクセス
              </p>
              <div className="flex flex-col items-start justify-start w-4/5">
                <div className="inline-block items-start justify-start gap-2">
                  {jobPost?.facility_id.access.map((item, index) => {
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
                <p className="lg:text-base text-sm text-[#343434] mt-1">
                  {jobPost?.facility_id.prefecture}
                  {jobPost?.facility_id.city}
                  {jobPost?.facility_id.village}
                  {jobPost?.facility_id.building}
                </p>
                <div className="w-full py-4 aspect-square">
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${jobPost?.facility_id.prefecture}${jobPost?.facility_id.city}${jobPost?.facility_id.village}${jobPost?.facility_id.building}&output=embed`}
                  ></iframe>
                </div>
                <p className="lg:text-base text-sm text-[#343434] mt-1">
                  {jobPost?.facility_id.access_text}
                </p>
                <Link
                  to={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${jobPost?.facility_id.prefecture}${jobPost?.facility_id.city}${jobPost?.facility_id.village}${jobPost?.facility_id.building}`
                  )}`}
                  target="_blank"
                  className="lg:text-base text-sm text-[#FF2A3B] hover:underline mt-1 border-[1px] border-[#FF2A3B] py-1 px-2 rounded-lg"
                >
                  Google Mapsで見る
                </Link>
              </div>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                設立年月日
              </p>
              <p className="lg:text-base text-sm text-[#343434] w-4/5">
                {jobPost?.facility_id.establishment_date.split("-")[0]}年
                {jobPost?.facility_id.establishment_date.split("-")[1]}日
              </p>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                施設
              </p>
              <div className="flex flex-col items-start justify-start w-4/5">
                <Link
                  to={`/${Facilities[jobPost?.facility_id.facility_genre]}`}
                  className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                >
                  {jobPost?.facility_id.facility_genre}
                </Link>
              </div>
            </div>
            <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                営業時間
              </p>
              <p className="lg:text-base text-sm text-[#343434] w-4/5">
                <pre>{jobPost?.facility_id.service_time}</pre>
              </p>
            </div>
            <div className="flex items-start justify-start py-6">
              <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                休日
              </p>
              <p className="lg:text-base text-sm text-[#343434] w-4/5">
                <pre>{jobPost?.facility_id.rest_day}</pre>
              </p>
            </div>
            <div className="flex items-center justify-between w-full gap-4 px-8 pb-6 my-6">
              <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-4 text-white border-2 border-[#FF6B56] w-full hover:bg-[#FF6B56]/20 hover:scale-105 duration-300">
                <img
                  src="/assets/images/dashboard/Vector.png"
                  alt="eye"
                  className="w-4 pt-0.5"
                />
                <p className="lg:text-base text-sm font-bold text-[#FF6B56]">
                  気になる
                </p>
              </button>
              <Link
                to={`/${job_type}/apply/${jobPost?.jobpost_id}`}
                className="flex items-center gap-2 justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-full"
              >
                <p className="lg:text-base text-sm font-bold text-white">
                  応募画面に進む
                </p>
                <div className="bg-white text-center rounded-lg p-1">
                  <p className="text-xs text-[#FF6B56]">
                    最短1分！
                    <br />
                    すぐできます
                  </p>
                </div>
              </Link>
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

export default JobDetails;

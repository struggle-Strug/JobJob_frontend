"use client";

import { Link } from "react-router-dom";
import { PiStethoscope } from "react-icons/pi";
import { LiaToothSolid } from "react-icons/lia";
import { MdWheelchairPickup, MdOutlineKey } from "react-icons/md";
import { FaHandsHoldingChild, FaChildReaching } from "react-icons/fa6";
import { GiHairStrands } from "react-icons/gi";
import axios from "axios";
import { message } from "antd";
import { useState, useEffect, useMemo, memo } from "react";
import { useAuth } from "../../context/AuthContext";

// Component for category headers
const CategoryHeader = memo(({ icon: Icon, title, description }) => (
  <div className="flex items-center justify-start lg:px-6 md:px-4 px-3 lg:pt-10 pt-6 text-[#FF2A3B] gap-2">
    <Icon className="lg:h-12 lg:w-12 md:h-10 md:w-10 h-8 w-8" />
    <div className="flex flex-col text-[#343434]">
      <p className="lg:text-xl md:text-lg text-base font-bold">{title}</p>
      <p className="lg:text-sm md:text-xs text-xs">{description}</p>
    </div>
  </div>
));

// Component for job type links
const JobTypeLink = memo(({ to, label, count }) => (
  <Link
    to={to}
    className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#188CE0] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group"
  >
    <p>
      {label}
      <span className="text-[#343434] text-xs">({count || 0})</span>
    </p>
    <div className="flex items-center">
      <img
        src="/assets/images/companytop/ep_arrow-right_red.png"
        alt="arrow"
        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
      />
    </div>
  </Link>
));

// Component for facility type links
const FacilityLink = memo(({ to, label }) => (
  <Link
    to={to}
    className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#188CE0] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group"
  >
    <p>{label}</p>
    <div className="flex items-center">
      <img
        src="/assets/images/companytop/ep_arrow-right_red.png"
        alt="arrow"
        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
      />
    </div>
  </Link>
));

// Component for area links
const AreaLinks = memo(({ jobType, prefectures }) => (
  <div className="flex flex-col mt-2">
    {Object.entries(prefectures).map(([region, prefs]) => (
      <div key={region}>
        <p className="lg:text-base text-xs font-semibold">{region}</p>
        <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
          {prefs.map(({ id, name }) => (
            <span key={id}>
              <Link
                to={`/${jobType}/pref${id}`}
                className="lg:text-sm md:text-xs text-xs font-semibold text-[#188CE0] hover:underline"
              >
                {name}
              </Link>
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
));

const Top = () => {
  const { user } = useAuth();
  const [jobTypeNumbers, setJobTypeNumbers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title =
      "全国の医療・介護・保育の求人サイト | JobJob (ジョブジョブ)";

    const getJobTypeNumbers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/jobpost/number`
        );

        if (response.data.error) {
          message.error(response.data.message);
          return;
        }

        // Convert array to object for easier lookup
        const numbersObj = response.data.JobPostsNumbers.reduce((acc, curr) => {
          acc[curr.name] = curr.count;
          return acc;
        }, {});

        setJobTypeNumbers(numbersObj);
      } catch (error) {
        console.error("Failed to fetch job numbers:", error);
        message.error("求人数の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    getJobTypeNumbers();
  }, []);

  // Prefectures data - memoized to prevent recreation on each render
  const prefecturesByRegion = useMemo(
    () => ({
      関東: [
        { id: 1, name: "東京都" },
        { id: 2, name: "神奈川県" },
        { id: 3, name: "埼玉県" },
      ],
      関西: [
        { id: 8, name: "大阪府" },
        { id: 9, name: "兵庫県" },
        { id: 10, name: "京都府" },
      ],
      その他: [
        { id: 14, name: "愛知県" },
        { id: 40, name: "福岡県" },
        { id: 18, name: "北海道" },
      ],
    }),
    []
  );

  // Job categories data - memoized
  const jobCategories = useMemo(
    () => [
      {
        icon: PiStethoscope,
        title: "医科",
        description:
          "看護師/准看護師・薬剤師・看護助手・臨床検査技師　他13職種",
        jobs: [
          { to: "/dr", label: "医師", key: "医師" },
          { to: "/ph", label: "薬剤師", key: "薬剤師" },
          { to: "/nan", label: "看護師/准看護師", key: "看護師/准看護師" },
          { to: "/mw", label: "助産師", key: "助産師" },
          { to: "/phn", label: "保健師", key: "保健師" },
          { to: "/nuas", label: "看護助手", key: "看護助手" },
          { to: "/nan", label: "看護師/准看護師", key: "看護師/准看護師" },
          { to: "/mrt", label: "診療放射線技師", key: "診療放射線技師" },
          { to: "/clt", label: "臨床検査技師", key: "臨床検査技師" },
          { to: "/rdn", label: "管理栄養士/栄養士", key: "管理栄養士/栄養士" },
          {
            to: "/cp",
            label: "公認心理師/臨床心理士",
            key: "公認心理師/臨床心理士",
          },
          {
            to: "/msw",
            label: "医療ソーシャルワーカー",
            key: "医療ソーシャルワーカー",
          },
          { to: "/rs", label: "登録販売者", key: "登録販売者" },
          { to: "/mor", label: "医療事務/受付", key: "医療事務/受付" },
          {
            to: "/ctc",
            label: "治験コーディネーター",
            key: "治験コーディネーター",
          },
          {
            to: "/sad",
            label: "営業/管理部門/その他",
            key: "営業/管理部門/その他",
          },
          { to: "/diaf", label: "調剤事務", key: "調剤事務" },
          { to: "/cdm", label: "臨床開発モニター", key: "臨床開発モニター" },
          { to: "/mr", label: "MR", key: "MR" },
          { to: "/mrp", label: "MS（医薬品卸）", key: "MS_医薬品卸" },
        ],
      },
      {
        icon: LiaToothSolid,
        title: "歯科",
        description: "歯科医師・歯科衛生士・歯科技工士・歯科助手",
        jobs: [
          { to: "/de", label: "歯科医師", key: "歯科医師" },
          { to: "/dh", label: "歯科衛生士", key: "歯科衛生士" },
          { to: "/dt", label: "歯科技工士", key: "歯科技工士" },
          { to: "/deas", label: "歯科助手", key: "歯科助手" },
        ],
      },
      {
        icon: MdWheelchairPickup,
        title: "介護",
        description:
          "介護職/ヘルパー・生活相談員・サービス提供責任者・ケアマネジャー　他14職種",
        jobs: [
          { to: "/cwh", label: "介護職/ヘルパー", key: "介護職/ヘルパー" },
          { to: "/lc", label: "生活相談員", key: "生活相談員" },
          { to: "/cm", label: "ケアマネジャー", key: "ケアマネジャー" },
          { to: "/mp", label: "管理職（介護）", key: "管理職_介護" },
          { to: "/sp", label: "サービス提供責任者", key: "サービス提供責任者" },
          { to: "/lsw", label: "生活支援員", key: "生活支援員" },
          {
            to: "/wesc",
            label: "福祉用具専門相談員",
            key: "福祉用具専門相談員",
          },
          {
            to: "/cdsm",
            label: "児童発達支援管理責任者",
            key: "児童発達支援管理責任者",
          },
          {
            to: "/smm",
            label: "サービス管理責任者",
            key: "サービス管理責任者",
          },
          { to: "/cii", label: "児童指導員/指導員", key: "児童指導員/指導員" },
          { to: "/nan", label: "看護師/准看護師", key: "看護師/准看護師" },
          { to: "/rdn", label: "管理栄養士/栄養士", key: "管理栄養士/栄養士" },
          {
            to: "/ccs",
            label: "調理師/調理スタッフ",
            key: "調理師/調理スタッフ",
          },
          {
            to: "/nctd",
            label: "介護タクシー/ドライバー",
            key: "介護タクシー/ドライバー",
          },
          { to: "/mor", label: "医療事務/受付", key: "医療事務/受付" },
          {
            to: "/sado",
            label: "営業/管理部門/その他",
            key: "営業/管理部門/その他",
          },
          { to: "/nca", label: "介護事務", key: "介護事務" },
          { to: "/css", label: "相談支援専門員", key: "相談支援専門員" },
        ],
      },
      {
        icon: FaHandsHoldingChild,
        title: "保育",
        description:
          "保育士・幼稚園教諭・児童発達支援管理責任者・保育補助　他5職種",
        jobs: [
          { to: "/chil", label: "保育士", key: "保育士" },
          { to: "/kt", label: "幼稚園教諭", key: "幼稚園教諭" },
          { to: "/ca", label: "保育補助", key: "保育補助" },
          { to: "/cii", label: "児童指導員/指導員", key: "児童指導員/指導員" },
          {
            to: "/cdsm",
            label: "児童発達支援管理責任者",
            key: "児童発達支援管理責任者",
          },
          { to: "/nan", label: "看護師/准看護師", key: "看護師/准看護師" },
          { to: "/rdn", label: "管理栄養士/栄養士", key: "管理栄養士/栄養士" },
          {
            to: "/ccs",
            label: "調理師/調理スタッフ",
            key: "調理師/調理スタッフ",
          },
          {
            to: "/acsw",
            label: "放課後児童支援員/学童指導員",
            key: "放課後児童支援員/学童指導員",
          },
        ],
      },
      {
        icon: FaChildReaching,
        title: "リハビリ／代替医療",
        description: "理学療法士・作業療法士・柔道整復師・鍼灸師　他4職種",
        jobs: [
          { to: "/pt", label: "理学療法士", key: "理学療法士" },
          { to: "/st", label: "言語聴覚士", key: "言語聴覚士" },
          { to: "/ot", label: "作業療法士", key: "作業療法士" },
          { to: "/ort", label: "視能訓練士", key: "視能訓練士" },
          { to: "/jt", label: "柔道整復師", key: "柔道整復師" },
          {
            to: "/amst",
            label: "あん摩マッサージ指圧師",
            key: "あん摩マッサージ指圧師",
          },
          { to: "/acu", label: "鍼灸師", key: "鍼灸師" },
          { to: "/chir", label: "整体師", key: "整体師" },
        ],
      },
      {
        icon: GiHairStrands,
        title: "ヘルスケア／美容",
        description:
          "美容師・理容師・エステティシャン/セラピスト・インストラクター　他3職種",
        jobs: [
          { to: "/hai", label: "美容師", key: "美容師" },
          { to: "/bar", label: "理容師", key: "理容師" },
          { to: "/naar", label: "ネイリスト", key: "ネイリスト" },
          { to: "/el", label: "アイリスト", key: "アイリスト" },
          {
            to: "/et",
            label: "エステティシャン/セラピスト",
            key: "エステティシャン/セラピスト",
          },
          { to: "/bcm", label: "美容部員", key: "美容部員" },
          { to: "/ins", label: "インストラクター", key: "インストラクター" },
        ],
      },
    ],
    []
  );

  // Facility types data - memoized
  const facilityTypes = useMemo(
    () => [
      [
        { to: "/hospital", label: "病院" },
        { to: "/relaxation", label: "代替医療・リラクゼーション" },
        { to: "/nursing-station", label: "訪問看護ステーション" },
        { to: "/Others", label: "その他（企業・学校等）" },
      ],
      [
        { to: "/Clinic", label: "診療所" },
        { to: "/welfare", label: "介護・福祉事業所" },
        { to: "/nursery", label: "保育園・幼稚園" },
      ],
      [
        { to: "/dental", label: "歯科診療所・技工所" },
        { to: "/pharmacy", label: "薬局・ドラッグストア" },
        { to: "/Beauty", label: "美容・サロン・ジム" },
      ],
    ],
    []
  );

  // Popular job types for area search - memoized
  const popularJobTypes = useMemo(
    () => [
      { type: "nan", label: "看護師/准看護師" },
      { type: "dh", label: "歯科衛生士" },
      { type: "cwh", label: "介護職/ヘルパー" },
      { type: "chil", label: "保育士" },
      { type: "pt", label: "理学療法士" },
    ],
    []
  );

  // Render job category section
  const renderJobCategory = (category, index) => (
    <div className="flex flex-col w-full" key={`category-${index}`}>
      <CategoryHeader
        icon={category.icon}
        title={category.title}
        description={category.description}
      />
      <div className="flex flex-col w-full pt-6 px-6">
        {/* Group jobs in rows of 4 */}
        {chunk(category.jobs, 4).map((jobGroup, groupIndex) => (
          <div
            className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2"
            key={`group-${groupIndex}`}
          >
            {jobGroup.map((job, jobIndex) => (
              <JobTypeLink
                key={`job-${jobIndex}`}
                to={job.to}
                label={job.label}
                count={jobTypeNumbers[job.key]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // Helper function to chunk array into groups
  const chunk = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  };

  return (
    <>
      <div className="bg-[#EFEFEF]">
        {/* Hero Section */}
        <section className="container pt-4 bg-white rounded-lg px-4">
          <div className="grid grid-cols-2">
            <div className="col-span-1 flex flex-col justify-center items-center">
              <h1 className="text-[#343434] font-bold lg:text-xl md:text-base text-sm">
                日本最大級の
              </h1>
              <h1 className="text-[#343434] font-bold lg:text-xl md:text-base text-sm">
                医療・介護・保育・美容の求人サイト
              </h1>
              <img
                src="/assets/images/dashboard/jobjob_logo 1.png"
                alt="logo"
                className="w-3/5 mt-4"
              />
              {!user && (
                <div className="flex items-center gap-4 mt-4">
                  <Link
                    to="/members/sign_up"
                    className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-tr from-[#FF1812] to-[#FF5B02] rounded-lg px-6 py-2 hover:scale-105 duration-300"
                  >
                    <img
                      src="/assets/images/dashboard/mdi_account.png"
                      alt="register"
                      className="pt-0.5"
                    />
                    <p className="lg:text-lg md:text-sm text-white font-bold">
                      会員登録する
                    </p>
                  </Link>
                  <Link
                    to="/members/sign_in"
                    className="flex items-center justify-center gap-2 mt-4 border-2 border-[#FF2A3B] rounded-lg px-6 py-[6px] hover:scale-105 duration-300"
                  >
                    <MdOutlineKey className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF2A3B]" />
                    <p className="lg:text-lg md:text-sm text-[#FF2A3B] font-bold">
                      ログイン
                    </p>
                  </Link>
                </div>
              )}
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center">
              <img
                src="/assets/images/dashboard/AdobeStock_569015666 11.png"
                alt="fv"
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Job Categories Section */}
        <section className="container mt-3 px-4 bg-white rounded-md">
          {jobCategories.map(renderJobCategory)}
        </section>

        {/* Popular Areas Section */}
        <section className="container lg:mt-3 mt-2 lg:px-10 md:px-6 px-4 bg-white rounded-md pt-8 pb-8">
          <p className="lg:text-xl md:text-lg text-base font-bold">
            注目職種を人気エリアから探す
          </p>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-2">
            {popularJobTypes.map((jobType, index) => (
              <div
                key={index}
                className="col-span-1 flex flex-col justify-center items-start"
              >
                <p className="lg:text-lg md:text-base text-sm w-full font-semibold border-b-[1px] border-[#e7e7e7] py-2">
                  {jobType.label}
                </p>
                <AreaLinks
                  jobType={jobType.type}
                  prefectures={prefecturesByRegion}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Facility Types Section */}
        <section className="container lg:mt-3 mt-2 lg:px-10 md:px-6 px-4 bg-white rounded-md pt-8 pb-8">
          <p className="lg:text-xl md:text-lg text-base font-bold">
            施設ジャンルから探す
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 pt-4">
            {facilityTypes.map((column, colIndex) => (
              <div
                key={`facility-col-${colIndex}`}
                className="col-span-1 flex flex-col"
              >
                {column.map((facility, facIndex) => (
                  <FacilityLink
                    key={`facility-${colIndex}-${facIndex}`}
                    to={facility.to}
                    label={facility.label}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Keyword Search Section */}
        <section className="container lg:mt-3 mt-2 lg:px-10 md:px-6 px-4 bg-white rounded-md pt-8">
          <p className="lg:text-xl md:text-lg text-base font-bold">
            キーワードから探す
          </p>
          <div className="flex justify-center w-full">
            <Link
              to="#"
              className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#188CE0] hover:text-[#343434] lg:px-12 md:px-8 px-4 lg:py-4 md:py-2 py-1 rounded-lg my-6"
            >
              キーワードをもっと見る
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Top;

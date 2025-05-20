"use client";

import { Link } from "react-router-dom";
import { PiStethoscope } from "react-icons/pi";
import { LiaToothSolid } from "react-icons/lia";
import { MdWheelchairPickup } from "react-icons/md";
import { FaHandsHoldingChild, FaChildReaching } from "react-icons/fa6";
import { GiHairStrands } from "react-icons/gi";
import { MdOutlineKey } from "react-icons/md";
import axios from "axios";
import { message } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import NewJobs from "../../components/NewJobs";

// Component for job category links
const JobTypeLink = ({ to, jobType, count }) => (
  <div className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
    <Link to={to} className="text-[#188CE0]" aria-label={`${jobType} jobs`}>
      <p>
        {jobType}
        <span className="text-[#343434] text-xs">({count || 0})</span>
      </p>
    </Link>
    <div className="flex items-center">
      <img
        src="/assets/images/companytop/ep_arrow-right_red.png"
        alt="arrow"
        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
      />
    </div>
  </div>
);

// Component for facility type links
const FacilityLink = ({ to, facilityType }) => (
  <div className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
    <Link
      to={to}
      className="text-[#188CE0]"
      aria-label={`${facilityType} facilities`}
    >
      <p>{facilityType}</p>
    </Link>
    <div className="flex items-center">
      <img
        src="/assets/images/companytop/ep_arrow-right_red.png"
        alt="arrow"
        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
      />
    </div>
  </div>
);

// Component for prefecture links
const PrefectureLinks = ({ jobCode, prefectures, regionName }) => {
  return (
    <>
      <p className="lg:text-base text-xs font-semibold">{regionName}</p>
      <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
        {prefectures.map(({ code, name }) => (
          <span key={code}>
            <Link
              to={`/${jobCode}/pref${code}`}
              className="lg:text-sm md:text-xs text-xs font-semibold text-[#188CE0] hover:underline"
              aria-label={`${name} jobs`}
            >
              {name}
            </Link>
          </span>
        ))}
      </div>
    </>
  );
};

// Component for category header with icon
const CategoryHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center justify-start lg:px-6 md:px-4 px-3 lg:pt-10 pt-6 text-[#FF2A3B] gap-2">
    <Icon className="lg:h-12 lg:w-12 md:h-10 md:w-10 h-8 w-8" />
    <div className="flex flex-col text-[#343434]">
      <p className="lg:text-xl md:text-lg text-base font-bold">{title}</p>
      <p className="lg:text-sm md:text-xs text-xs">{subtitle}</p>
    </div>
  </div>
);

// Component for job category section
const JobCategorySection = ({ jobTypes, jobTypeNumbers, categoryConfig }) => {
  const { icon, title, subtitle } = categoryConfig;

  // Group job types into rows based on the number of columns
  const jobTypesInRows = useMemo(() => {
    const result = [];
    const itemsPerRow = 4; // Adjust based on your grid layout

    for (let i = 0; i < Object.keys(jobTypes).length; i += itemsPerRow) {
      result.push(Object.entries(jobTypes).slice(i, i + itemsPerRow));
    }

    return result;
  }, [jobTypes]);

  return (
    <div className="flex flex-col w-full">
      <CategoryHeader icon={icon} title={title} subtitle={subtitle} />

      <div className="flex flex-col w-full pt-6 px-6">
        {jobTypesInRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2"
          >
            {row.map(([jobName, jobCode]) => (
              <JobTypeLink
                key={jobCode}
                to={`/${jobCode}`}
                jobType={jobName}
                count={jobTypeNumbers?.[jobName]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for popular job areas section
const PopularJobAreas = ({ jobTypes }) => {
  const popularJobs = [
    {
      title: "看護師/准看護師",
      code: "nan",
      regions: [
        {
          name: "関東",
          prefectures: [
            { code: 1, name: "東京都" },
            { code: 2, name: "神奈川県" },
            { code: 3, name: "埼玉県" },
          ],
        },
        {
          name: "関西",
          prefectures: [
            { code: 8, name: "大阪府" },
            { code: 9, name: "兵庫県" },
            { code: 10, name: "京都府" },
          ],
        },
        {
          name: "その他",
          prefectures: [
            { code: 14, name: "愛知県" },
            { code: 40, name: "福岡県" },
            { code: 18, name: "北海道" },
          ],
        },
      ],
    },
    {
      title: "歯科衛生士",
      code: "dh",
      regions: [
        {
          name: "関東",
          prefectures: [
            { code: 1, name: "東京都" },
            { code: 2, name: "神奈川県" },
            { code: 3, name: "埼玉県" },
          ],
        },
        {
          name: "関西",
          prefectures: [
            { code: 8, name: "大阪府" },
            { code: 9, name: "兵庫県" },
            { code: 10, name: "京都府" },
          ],
        },
        {
          name: "その他",
          prefectures: [
            { code: 14, name: "愛知県" },
            { code: 40, name: "福岡県" },
            { code: 18, name: "北海道" },
          ],
        },
      ],
    },
    {
      title: "介護職/ヘルパー",
      code: "cwh",
      regions: [
        {
          name: "関東",
          prefectures: [
            { code: 1, name: "東京都" },
            { code: 2, name: "神奈川県" },
            { code: 3, name: "埼玉県" },
          ],
        },
        {
          name: "関西",
          prefectures: [
            { code: 8, name: "大阪府" },
            { code: 9, name: "兵庫県" },
            { code: 10, name: "京都府" },
          ],
        },
        {
          name: "その他",
          prefectures: [
            { code: 14, name: "愛知県" },
            { code: 40, name: "福岡県" },
            { code: 18, name: "北海道" },
          ],
        },
      ],
    },
    {
      title: "保育士",
      code: "chil",
      regions: [
        {
          name: "関東",
          prefectures: [
            { code: 1, name: "東京都" },
            { code: 2, name: "神奈川県" },
            { code: 3, name: "埼玉県" },
          ],
        },
        {
          name: "関西",
          prefectures: [
            { code: 8, name: "大阪府" },
            { code: 9, name: "兵庫県" },
            { code: 10, name: "京都府" },
          ],
        },
        {
          name: "その他",
          prefectures: [
            { code: 14, name: "愛知県" },
            { code: 40, name: "福岡県" },
            { code: 18, name: "北海道" },
          ],
        },
      ],
    },
    {
      title: "理学療法士",
      code: "pt",
      regions: [
        {
          name: "関東",
          prefectures: [
            { code: 1, name: "東京都" },
            { code: 2, name: "神奈川県" },
            { code: 3, name: "埼玉県" },
          ],
        },
        {
          name: "関西",
          prefectures: [
            { code: 8, name: "大阪府" },
            { code: 9, name: "兵庫県" },
            { code: 10, name: "京都府" },
          ],
        },
        {
          name: "その他",
          prefectures: [
            { code: 14, name: "愛知県" },
            { code: 40, name: "福岡県" },
            { code: 18, name: "北海道" },
          ],
        },
      ],
    },
  ];

  return (
    <section className="container lg:mt-3 mt-2 lg:px-10 md:px-6 px-4 bg-white rounded-md pt-8 pb-8">
      <p className="lg:text-xl md:text-lg text-base font-bold">
        注目職種を人気エリアから探す
      </p>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-2">
        {popularJobs.map((job) => (
          <div
            key={job.code}
            className="col-span-1 flex flex-col justify-center items-start"
          >
            <p className="lg:text-lg md:text-base text-sm w-full font-semibold border-b-[1px] border-[#e7e7e7] py-2">
              {job.title}
            </p>
            <div className="flex flex-col mt-2">
              {job.regions.map((region, index) => (
                <div key={index}>
                  <PrefectureLinks
                    jobCode={job.code}
                    prefectures={region.prefectures}
                    regionName={region.name}
                  />
                  {index < job.regions.length - 1 && <div className="pt-2" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Component for facility types section
const FacilityTypesSection = () => {
  const facilityTypes = [
    [
      { type: "病院", path: "/hospital" },
      { type: "代替医療・リラクゼーション", path: "/relaxation" },
      { type: "訪問看護ステーション", path: "/nursing-station" },
      { type: "その他（企業・学校等）", path: "/Others" },
    ],
    [
      { type: "診療所", path: "/Clinic" },
      { type: "介護・福祉事業所", path: "/welfare" },
      { type: "保育園・幼稚園", path: "/nursery" },
    ],
    [
      { type: "歯科診療所・技工所", path: "/dental" },
      { type: "薬局・ドラッグストア", path: "/pharmacy" },
      { type: "美容・サロン・ジム", path: "/Beauty" },
    ],
  ];

  return (
    <section className="container lg:mt-3 mt-2 lg:px-10 md:px-6 px-4 bg-white rounded-md pt-8 pb-8">
      <p className="lg:text-xl md:text-lg text-base font-bold">
        施設ジャンルから探す
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 pt-4">
        {facilityTypes.map((column, colIndex) => (
          <div key={colIndex} className="col-span-1 flex flex-col">
            {column.map((facility, index) => (
              <FacilityLink
                key={facility.path}
                to={facility.path}
                facilityType={facility.type}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const Top = () => {
  const { user } = useAuth();
  const [jobTypeNumbers, setJobTypeNumbers] = useState([]);

  // Define category configurations
  const categoryConfigs = {
    medical: {
      icon: PiStethoscope,
      title: "医科",
      subtitle: "看護師/准看護師・薬剤師・看護助手・臨床検査技師　他13職種",
    },
    dental: {
      icon: LiaToothSolid,
      title: "歯科",
      subtitle: "歯科医師・歯科衛生士・歯科技工士・歯科助手",
    },
    nursing: {
      icon: MdWheelchairPickup,
      title: "介護",
      subtitle:
        "介護職/ヘルパー・生活相談員・サービス提供責任者・ケアマネジャー　他14職種",
    },
    childcare: {
      icon: FaHandsHoldingChild,
      title: "保育",
      subtitle: "保育士・幼稚園教諭・児童発達支援管理責任者・保育補助　他5職種",
    },
    rehabilitation: {
      icon: FaChildReaching,
      title: "リハビリ／代替医療",
      subtitle: "理学療法士・作業療法士・柔道整復師・鍼灸師　他4職種",
    },
    beauty: {
      icon: GiHairStrands,
      title: "ヘルスケア／美容",
      subtitle:
        "美容師・理容師・エステティシャン/セラピスト・インストラクター　他3職種",
    },
  };

  // Define job types by category
  const jobTypesByCategory = useMemo(
    () => ({
      medical: {
        医師: "dr",
        薬剤師: "ph",
        "看護師/准看護師": "nan",
        助産師: "mw",
        保健師: "phn",
        看護助手: "nuas",
        診療放射線技師: "mrt",
        臨床検査技師: "clt",
        臨床工学技士: "ce",
        "管理栄養士/栄養士": "rdn",
        "公認心理師/臨床心理士": "cp",
        医療ソーシャルワーカー: "msw",
        登録販売者: "rs",
        "医療事務/受付": "mor",
        治験コーディネーター: "ctc",
        "営業/管理部門/その他": "sad",
        調剤事務: "diaf",
        臨床開発モニター: "cdm",
        MR: "mr",
        "MS（医薬品卸）": "mrp",
      },
      dental: {
        歯科医師: "de",
        歯科衛生士: "dh",
        歯科技工士: "dt",
        歯科助手: "deas",
      },
      nursing: {
        "介護職/ヘルパー": "cwh",
        生活相談員: "lc",
        ケアマネジャー: "cm",
        "管理職（介護）": "mp",
        サービス提供責任者: "sp",
        生活支援員: "lsw",
        福祉用具専門相談員: "wesc",
        児童発達支援管理責任者: "cdsm",
        サービス管理責任者: "smm",
        "児童指導員/指導員": "cii",
        "看護師/准看護師": "nan",
        "管理栄養士/栄養士": "rdn",
        "調理師/調理スタッフ": "ccs",
        "介護タクシー/ドライバー": "nctd",
        "医療事務/受付": "mor",
        "営業/管理部門/その他": "sado",
        介護事務: "nca",
        相談支援専門員: "css",
      },
      childcare: {
        保育士: "chil",
        幼稚園教諭: "kt",
        保育補助: "ca",
        "児童指導員/指導員": "cii",
        児童発達支援管理責任者: "cdsm",
        "看護師/准看護師": "nan",
        "管理栄養士/栄養士": "rdn",
        "調理師/調理スタッフ": "ccs",
        "放課後児童支援員/学童指導員": "acsw",
      },
      rehabilitation: {
        理学療法士: "pt",
        言語聴覚士: "st",
        作業療法士: "ot",
        視能訓練士: "ort",
        柔道整復師: "jt",
        あん摩マッサージ指圧師: "amst",
        鍼灸師: "acu",
        整体師: "chir",
      },
      beauty: {
        美容師: "hai",
        理容師: "bar",
        ネイリスト: "naar",
        アイリスト: "el",
        "エステティシャン/セラピスト": "et",
        美容部員: "bcm",
        インストラクター: "ins",
      },
    }),
    []
  );

  const getJobTypeNumbers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/number`
      );
      if (response.data.error) return message.error(response.data.message);
      setJobTypeNumbers(response.data.JobPostsNumbers);
    } catch (error) {
      console.error("Error fetching job numbers:", error);
      message.error("求人数の取得に失敗しました");
    }
  };

  useEffect(() => {
    document.title =
      "全国の医療・介護・保育の求人サイト | JobJob (ジョブジョブ)";
    getJobTypeNumbers();
  }, []);

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
                <div className="flex items-center jus gap-4 mt-4">
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

        {/* Job Categories Sections */}
        <section className="container mt-3 px-4 bg-white rounded-md">
          {/* Medical Jobs */}
          <JobCategorySection
            jobTypes={jobTypesByCategory.medical}
            jobTypeNumbers={jobTypeNumbers}
            categoryConfig={categoryConfigs.medical}
          />

          {/* Dental Jobs */}
          <JobCategorySection
            jobTypes={jobTypesByCategory.dental}
            jobTypeNumbers={jobTypeNumbers}
            categoryConfig={categoryConfigs.dental}
          />

          {/* Nursing Jobs */}
          <JobCategorySection
            jobTypes={jobTypesByCategory.nursing}
            jobTypeNumbers={jobTypeNumbers}
            categoryConfig={categoryConfigs.nursing}
          />

          {/* Childcare Jobs */}
          <JobCategorySection
            jobTypes={jobTypesByCategory.childcare}
            jobTypeNumbers={jobTypeNumbers}
            categoryConfig={categoryConfigs.childcare}
          />

          {/* Rehabilitation Jobs */}
          <JobCategorySection
            jobTypes={jobTypesByCategory.rehabilitation}
            jobTypeNumbers={jobTypeNumbers}
            categoryConfig={categoryConfigs.rehabilitation}
          />

          {/* Beauty Jobs */}
          <JobCategorySection
            jobTypes={jobTypesByCategory.beauty}
            jobTypeNumbers={jobTypeNumbers}
            categoryConfig={categoryConfigs.beauty}
          />
        </section>

        {/* Popular Job Areas Section */}
        <PopularJobAreas jobTypes={jobTypesByCategory} />

        {/* Facility Types Section */}
        <FacilityTypesSection />

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

        {/* New Jobs Section */}
        <NewJobs />
      </div>
    </>
  );
};

export default Top;

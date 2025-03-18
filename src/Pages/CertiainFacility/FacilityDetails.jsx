import { message } from "antd";
import axios from "axios";
import { useEffect, useState, React } from "react";
import { Link, useLocation } from "react-router-dom";
import { getJobValueByKey } from "../../utils/getFunctions";
import { Facilities } from "../../utils/constants/categories";

const FacilityDetails = () => {
  const { pathname } = useLocation();
  const [facility, setFacility] = useState(null);
  const facility_id = pathname.split("/")[3];
  const jobMapping = {
    "医師": "/dr",
    "薬剤師": "/ph",
    "看護師/准看護師": "/nan",
    "助産師": "/mw",
    "保健師": "/phn",
    "看護助手": "/nuas",
    "診療放射線技師": "/mrt",
    "臨床検査技師": "/clt",
    "管理栄養士/栄養士": "/rdn",
    "公認心理師/臨床心理士": "/cp",
    "医療ソーシャルワーカー": "/msw",
    "歯科医師": "/de",
    "歯科衛生士": "/dh",
    "歯科技工士": "/dt",
    "歯科助手": "/deas",
    "介護職/ヘルパー": "/cwh",
    "生活相談員": "/lc",
    "ケアマネジャー": "/cm",
    "管理職（介護）": "/mp",
    "サービス提供責任者": "/sp",
    "生活支援員": "/lsw",
    "福祉用具専門相談員": "/wesc",
    "児童発達支援管理責任者": "/cdsm",
    "保育士": "/chil",
    "幼稚園教諭": "/kt",
    "保育補助": "/ca",
    "児童指導員/指導員": "/cii",
    "理学療法士": "/pt",
    "言語聴覚士": "/st",
    "作業療法士": "/ot",
    "視能訓練士": "/ort",
    "調理師/調理スタッフ": "/ccs",
    "美容師": "/hai",
    "理容師": "/bar",
    "ネイリスト": "/naar",
    "アイリスト": "/el",
    "エステティシャン/セラピスト": "/et",
    "美容部員": "/bcm",
    "インストラクター": "/ins",
  };

  const getFacility = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/${facility_id}`
    );
    if (response.data.error) return message.error(response.data.message);
    setFacility(response.data.facility);
  };

  useEffect(() => {
    getFacility();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="flex w-full px-4 bg-[#EFEFEF]">
        <div className="container flex justify-between gap-8">
          <div className="flex flex-col items-start justify-start w-2/3">
            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-6 w-full shadow-xl hover:scale-[1.02] duration-300">
              {facility?.photo?.length === 0 ? (
                <img
                  src={"/assets/images/noimage.png"}
                  alt="arrow-down"
                  className="w-full rounded-lg aspect-video object-cover "
                />
              ) : (
                <img
                  src={facility?.photo}
                  alt="arrow-down"
                  className="w-full rounded-lg aspect-video object-cover "
                />
              )}
              <div className="flex flex-col items-start justify-start p-4 w-full h-full gap-4">
                <p className="lg:text-xl md:text-sm text-[#343434]">
                  <span className="lg:text-2xl md:text-xl font-bold">
                    {facility?.name}
                  </span>
                  <span className="text-base">の求人情報</span>
                </p>
                <div>
                  <p className="lg:text-sm md:text-xs text-[#343434]">
                    {facility?.prefecture}
                    {facility?.city}
                    {facility?.village}
                    {facility?.building}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg flex flex-col w-full px-4 py-2 mt-8">
              <p className="text-xs font-bold text-[#343434]">募集中の求人</p>
              <p className="text-xs font-bold text-[#343434]">
                <span className="text-[#FF2A3B] number">
                  {facility?.jobPosts.length}
                </span>
                <span>件</span>
              </p>
            </div>
            {facility?.jobPosts?.map((jobpost, index) => {
              return (
                <div
                  key={index}
                  className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8"
                >
                  <div className="flex md:flex-col lg:flex-row items-start justify-between w-full">
                    {jobpost.picture.length === 0 ? (
                      <img
                        src={"/assets/images/noimage.png"}
                        alt="arrow-down"
                        className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={`${jobpost.picture}`}
                        alt="arrow-down"
                        className="md:w-full lg:w-1/2 aspect-video object-cover rounded-lg"
                      />
                    )}
                    <div className="flex flex-col items-start justify-between p-4 w-full gap-8">
                      <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
                        {facility?.name}の{jobpost.type}求人
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
                          <p className="lg:text-sm md:text-xs text-[#343434] w-5/6 line-clamp-4">
                            <pre>{jobpost.work_content}</pre>
                          </p>
                        </div>
                        <div className="flex items-start justify-start mt-4">
                          <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                            応募要件
                          </p>
                          <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">
                            {jobpost.qualification_content}{" "}
                            {jobpost.qualification_welcome}
                          </p>
                        </div>
                        <div className="flex items-start justify-start mt-4">
                          <p className="lg:text-sm md:text-xs font-bold text-[#343434] w-1/6">
                            住所
                          </p>
                          <p className="lg:text-sm md:text-xs text-[#343434] w-5/6">
                            {jobpost.facility_id.access_text}
                          </p>
                        </div>
                        <div className="flex items-start justify-start mt-4">
                          <p className="lg:text-sm md:text-xs font-bold text-[#FF2A3B]">
                            勤続支援金 &nbsp;&nbsp;正職員12,500円 ~ 16,000円
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
                        ].map((item, index) => {
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
                  <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                    <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2 hover:bg-[#FF6B56]/20 hover:scale-105 duration-300">
                      <img
                        src="/assets/images/dashboard/Vector.png"
                        alt="eye"
                        className="w-4 pt-0.5"
                      />
                      <p className="text-sm font-bold text-[#FF6B56]">
                        気になる
                      </p>
                    </button>
                    <Link
                      to={`/${getJobValueByKey(jobpost.type)}/details/${
                        jobpost.jobpost_id
                      }`}
                      className="flex items-center justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-1/2"
                    >
                      <p className="text-sm font-bold text-white">求人を見る</p>
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-col bg-white px-4 rounded-lg mt-8 w-full">
              <p className="lg:text-lg font-bold text-sm text-[#343434] border-b-[1px] py-6 border-[#e7e7e7]">
                事業所情報
              </p>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  法人・施設名
                </p>
                {facility?.name}
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  募集職種
                </p>
                <div className="flex flex-col items-start, justify-start w-4/5">
                  {facility?.jobPosts?.map((jobPost, index) => {
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
                  <pre>{facility?.introduction}</pre>
                </p>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  郵便番号
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  <pre>{facility?.postal_code}</pre>
                </p>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  アクセス
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <div className="inline-block items-start justify-start gap-2">
                    {facility?.access.map((item, index) => {
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
                    {facility?.prefecture}
                    {facility?.city}
                    {facility?.village}
                    {facility?.building}
                  </p>
                  <div className="w-full py-4 aspect-square">
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps?q=${facility?.prefecture}${facility?.city}${facility?.village}${facility?.building}&output=embed`}
                    ></iframe>
                  </div>
                  <p className="lg:text-base text-sm text-[#343434] mt-1">
                    {facility?.access_text}
                  </p>
                  <Link
                    to={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${facility?.prefecture}${facility?.city}${facility?.village}${facility?.building}`
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
                  {facility?.establishment_date.split("-")[0]}年
                  {facility?.establishment_date.split("-")[1]}月
                </p>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  施設
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <Link
                    to={`/${Facilities[facility?.facility_genre]}`}
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                  >
                    {facility?.facility_genre}
                  </Link>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  営業時間
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  <pre>{facility?.service_time}</pre>
                </p>
              </div>
              <div className="flex items-start justify-start py-6">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  休日
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  <pre>{facility?.rest_day}</pre>
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-full w-1/3"></div>
        </div>
      </div>
    </>
  );
};

export default FacilityDetails;

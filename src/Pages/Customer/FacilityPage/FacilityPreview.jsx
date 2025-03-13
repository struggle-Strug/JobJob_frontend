import { Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { getJobValueByKey } from "../../../utils/getFunctions";
import { Facilities } from "../../../utils/constants/categories";

const FacilityPreview = ({ open, onCancel, data }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="modal"
    >
      {/* <div className="min-h-screen bg-white p-6 rounded-lg">
        <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
          施設プレビュー
        </p>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">施設名</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.name}</p>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">郵便番号</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.postal_code}</p>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">都道府県</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.prefecture}</p>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">市区町村</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.city}</p>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">町名・番地</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.village}</p>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">建物名</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.building}</p>
        </div>
        <div className="flex items-start mt-4">
          <div className="flex items-center justify-start gap-1 w-1/5">
            <span className="lg:text-sm text-xs text-[#343434]">施設写真</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <img src={data?.photo} alt="facilityPhoto" className="w-20" />
          </div>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">施設紹介</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.introduction}</p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">アクセス</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.access.join(",")}</p>
        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/5">アクセス(住所)</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.access_text}</p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">施設ジャンル</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.facility_genre}</p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">設立年月日</p>
          <div className="flex justify-start items-end w-4/5">
            <p className="lg:text-sm text-xs w-1/5">
              {data?.establishment_date.split("-")[0]}年
              {data?.establishment_date.split("-")[1]}月
            </p>
          </div>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">営業時間</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.service_time}</p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">休日</p>
          <p className="lg:text-sm text-xs w-4/5">{data?.rest_day}</p>
        </div>
      </div> */}
      <div className="flex w-full p-8">
        <div className="container flex justify-between gap-8">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-6 w-full shadow-2xl hover:scale-[1.02] duration-300">
              <img
                src={data?.photo}
                alt="arrow-down"
                className="w-full rounded-lg aspect-video object-cover "
              />
              <div className="flex flex-col items-start justify-start p-4 w-full h-full gap-4">
                <p className="lg:text-xl md:text-sm text-[#343434]">
                  <span className="lg:text-2xl md:text-xl font-bold">
                    {data?.name}
                  </span>
                  <span className="text-base">の求人情報</span>
                </p>
                <div>
                  <p className="lg:text-sm md:text-xs text-[#343434]">
                    {data?.prefecture}
                    {data?.city}
                    {data?.village}
                    {data?.building}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-white px-4 rounded-lg mt-8 w-full">
              <p className="lg:text-lg font-bold text-sm text-[#343434] border-b-[1px] py-6 border-[#e7e7e7]">
                事業所情報
              </p>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  法人・施設名
                </p>
                <Link
                  to={`/facility/${data?.facility_id}`}
                  className="lg:text-base text-sm text-[#FF2A3B] hover:underline w-4/5"
                >
                  {data?.name}
                </Link>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  募集職種
                </p>
                <div className="flex flex-col items-start, justify-start w-4/5">
                  {data?.jobPosts?.map((jobPost, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/${getJobValueByKey(jobPost.type)}/details/${
                          jobPost?.jobpost_id
                        }`}
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
                  <pre>{data?.introduction}</pre>
                </p>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  アクセス
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <div className="inline-block items-start justify-start gap-2">
                    {data?.access.map((item, index) => {
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
                    {data?.prefecture}
                    {data?.city}
                    {data?.village}
                    {data?.building}
                  </p>
                  <div className="w-full py-4 aspect-square">
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps?q=${data?.prefecture}${data?.city}${data?.village}${data?.building}&output=embed`}
                    ></iframe>
                  </div>
                  <p className="lg:text-base text-sm text-[#343434] mt-1">
                    {data?.access_text}
                  </p>
                  <Link
                    to={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${data?.prefecture}${data?.city}${data?.village}${data?.building}`
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
                  {data?.establishment_date.split("-")[0]}年
                  {data?.establishment_date.split("-")[1]}日
                </p>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  施設
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <Link
                    to={`/${Facilities[data?.facility_genre]}`}
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                  >
                    {data?.facility_genre}
                  </Link>
                </div>
              </div>
              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  営業時間
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  <pre>{data?.service_time}</pre>
                </p>
              </div>
              <div className="flex items-start justify-start py-6">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  休日
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  <pre>{data?.rest_day}</pre>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FacilityPreview;

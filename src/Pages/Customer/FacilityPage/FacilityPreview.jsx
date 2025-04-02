import { Modal, Carousel } from "antd";
import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { getJobValueByKey } from "../../../utils/getFunctions";
import { Facilities } from "../../../utils/constants/categories";

// カスタムアローコンポーネント（次へ）
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        right: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* ここにアイコンなど矢印の内容を入れる */}
      </div>
    </div>
  );
};

// カスタムアローコンポーネント（前へ）
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        left: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* ここにアイコンなど矢印の内容を入れる */}
      </div>
    </div>
  );
};

const FacilityPreview = ({ open, onCancel, data }) => {
  // Carousel の設定にカスタムアローを追加
  const carouselSettings = {
    arrows: true,
    infinite: true,
    dots: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  useEffect(() => {
    console.log("FacilityPreview data:", data);
  }, [data]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="modal"
    >
      <div className="flex w-full p-8">
        <div className="container flex justify-between gap-8">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-6 w-full shadow-2xl hover:scale-[1.02] duration-300">
              {/* Carousel を追加 */}
              <div style={{ width: "100%", height: "300px" }}>
                <Carousel {...carouselSettings}>
                  {data?.photo &&
                    data.photo.map((photoUrl, index) => (
                      <div key={index}>
                        <img
                          src={photoUrl}
                          alt={`facility-photo-${index}`}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>

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
                <div className="flex flex-col items-start justify-start w-4/5">
                  {data?.jobPosts?.map((jobPost, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/${getJobValueByKey(jobPost.type)}/details/${jobPost?.jobpost_id}`}
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
                          className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg"
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

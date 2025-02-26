import { Modal } from "antd";
import React from "react";

const FacilityPreview = ({ open, onCancel, data }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="modal"
    >
      <div className="min-h-screen bg-white p-6 rounded-lg">
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
      </div>
    </Modal>
  );
};

export default FacilityPreview;

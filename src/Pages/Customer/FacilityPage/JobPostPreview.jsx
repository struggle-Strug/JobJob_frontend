import { Modal } from "antd";
import React from "react";

const JobPostPreview = ({ open, onCancel, data }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="modal"
    >
      <div className="w-full min-h-screen flex flex-col p-4 bg-white rounded-lg mb-8">
        <h1 className="lg:text-2xl md:text-base text-sm font-bold">求人編集</h1>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            募集職種<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-3/4">
            <p className="lg:text-sm text-xs text-[#343434] w-3/4">
              {data?.type}
            </p>
          </div>
        </div>
        <div className="flex items-start mt-4">
          <div className="flex items-center justify-start gap-1 w-1/4">
            <span className="lg:text-sm text-xs text-[#343434] w-3/4">
              写真
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto w-3/4">
  {data?.picture?.map((pic, index) => (
    <img
      key={index}
      src={pic}
      alt="jobPostPhoto"
      className="w-20 flex-shrink-0"
    />
  ))}
</div>

        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            訴求文タイトル
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.sub_title}
          </p>
        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            訴求文<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: data?.sub_description }}
            className=" w-3/4"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">
            仕事内容（選択）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.work_item.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">
            仕事内容<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.work_content}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">診療科目</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.service_subject.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">サービス形態</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.service_type.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            雇用形態<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-3/4">
            <p className="lg:text-sm text-xs text-[#343434]">
              {data?.employment_type.join(",")}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            給与体系<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-3/4">
            <p className="lg:text-sm text-xs text-[#343434]">
              {data?.salary_type}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            給与下限・上限
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start w-3/4">
            <p className="lg:text-sm text-xs text-[#343434] w-1/4">
              {data?.salary_min}
            </p>

            <span className="mx-2">~</span>
            <p className="lg:text-sm text-xs text-[#343434] w-1/4">
              {data?.salary_max}
            </p>
          </div>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">給与備考</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.salary_remarks}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">想定年収</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.expected_income}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">待遇（選択）</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.treatment_type.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">待遇</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.treatment_content}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">勤務時間・休憩時間（選択）</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.work_time_type.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">
            勤務時間・休憩時間
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.work_time_content}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">休日（選択）</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.rest_type.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">
            休日<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.rest_content}
          </p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">長期休暇・特別休暇</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.special_content}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">教育体制・教育</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.education_content.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">
            応募要件（資格）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.qualification_type.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">応募要件（他条件）</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.qualification_other.join(",")}
          </p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">応募要件（テキスト）</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.qualification_content}
          </p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">歓迎要件</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.qualification_welcome}
          </p>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">
            選考プロセス
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <pre className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.process}
          </pre>
        </div>
      </div>
    </Modal>
  );
};

export default JobPostPreview;

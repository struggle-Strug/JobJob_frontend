import React from "react";
import { useState } from "react";
import { Checkbox, Input, message, Radio, Select, Upload } from "antd";
import {
  EmploymentType,
  Features,
  JobType,
  Paysystems,
  Qualifications,
} from "../../../utils/constants/categories";
import { getBase64 } from "../../../utils/getBase64";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddJobPost = () => {
  const { customer } = useAuth();
  const [facility, setFacility] = useState(null);
  const [jobPostType, setJobPostType] = useState("");
  const [jobPostTypeDetail, setJobPostTypeDetail] = useState("");
  const [jobPostPicture, setJobPostPicture] = useState([]);
  const [jobPostSubTitle, setJobPostSubTitle] = useState("");
  const [jobPostSubDescription, setJobPostSubDescription] = useState("");
  const [jobPostWorkItem, setJobPostWorkItem] = useState([]);
  const [jobPostWorkContent, setJobPostWorkContent] = useState("");
  const [jobPostServiceSubject, setJobPostServiceSubject] = useState([]);
  const [jobPostServiceType, setJobPostServiceType] = useState([]);
  const [jobPostEmploymentType, setJobPostEmploymentType] = useState([]);
  const [jobPostSalaryType, setJobPostSalaryType] = useState("");
  const [jobPostSalaryMax, setJobPostSalaryMax] = useState(0);
  const [jobPostSalaryMin, setJobPostSalaryMin] = useState(0);
  const [jobPostSalaryRemarks, setJobPostSalaryRemarks] = useState("");
  const [jobPostExpectedIncome, setJobPostExpectedIncome] = useState(0);
  const [jobPostTreatmentType, setJobPostTreatmentType] = useState([]);
  const [jobPostTreatmentContent, setJobPostTreatmentContent] = useState("");
  const [jobPostWorkTimeType, setJobPostWorkTimeType] = useState([]);
  const [jobPostWorkTimeContent, setJobPostWorkTimeContent] = useState("");
  const [jobPostRestType, setJobPostRestType] = useState([]);
  const [jobPostRestContent, setJobPostRestContent] = useState("");
  const [jobPostSpecialContent, setJobPostSpecialContent] = useState("");
  const [jobPostEducationContent, setJobPostEducationContent] = useState("");
  const [jobPostQualificationType, setJobPostQualificationType] = useState([]);
  const [jobPostQualificationOther, setJobPostQualificationOther] =
    useState("");
  const [jobPostQualificationContent, setJobPostQualificationContent] =
    useState("");
  const [jobPostQualificationWelcome, setJobPostQualificationWelcome] =
    useState("");
  const [jobPostProcess, setJobPostProcess] = useState(`
        1：応募フォームよりご応募ください
        ↓
        2：採用担当より面接日程の調整などの連絡をさせていただきます
        ↓
        3：面接実施
        ↓
        4：採用決定のご連絡
        ↓
        5：入職手続きを進めます

        ※応募から内定までは平均1週間～1か月ほどになります。
        ※在職中で今すぐ転職が難しい方も調整のご相談が可能です。
    `);

  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const facilityId = pathname.split("/")[3];

  const jobTypesOptions = [
    {
      label: "選択する",
      value: "",
    },
    ...Object.keys(JobType).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  const jobTypeDetailOptions = (jobType) => {
    return [
      {
        label: "選択する",
        value: "",
      },
      ...Object.keys(JobType[jobType]).map((type) => ({
        value: type,
        label: type,
      })),
    ];
  };

  const workItemOptions = Object.keys(Features.DESCRIPTION).map((workItem) => ({
    value: workItem,
    label: workItem,
  }));

  const serviceSubjectOptions = Object.keys(Features.MEDICAL_DEPARTMENT).map(
    (serviceSubject) => ({
      value: serviceSubject,
      label: serviceSubject,
    })
  );

  const serviceTypeOptions = Object.keys(Features.SERVICE_TYPES).map(
    (serviceType) => ({
      value: serviceType,
      label: serviceType,
    })
  );

  const employmentTypeOptions = Object.keys(EmploymentType).map(
    (employmentType) => ({
      value: employmentType,
      label: employmentType,
    })
  );

  const salaryTypeOptions = Object.keys(Paysystems).map((salaryType) => ({
    value: salaryType,
    label: salaryType,
  }));

  const jobPostTreatmentTypeOptions = Object.keys(
    Features.SALARY_BENEFITS_WELFARE
  ).map((treatmentType) => ({
    value: treatmentType,
    label: treatmentType,
  }));

  const jobPostWorkTimeTypeOptions = Object.keys(Features.WORKING_HOURS).map(
    (workTimeType) => ({
      value: workTimeType,
      label: workTimeType,
    })
  );

  const jobPostRestTypeOptions = Object.keys(Features.HOLIDAY).map(
    (restType) => ({
      value: restType,
      label: restType,
    })
  );

  const jobPostEducationTypeOptions = Object.keys(Features.EDUCATION).map(
    (educationType) => ({
      value: educationType,
      label: educationType,
    })
  );

  const jobPostQualificationTypeOptions = Object.keys(
    Qualifications.REQUIRED
  ).map((qualificationType) => ({
    value: qualificationType,
    label: qualificationType,
  }));

  const jobPostQualificationOtherOptions = Object.keys(
    Qualifications.OTHERS
  ).map((qualificationOther) => ({
    value: qualificationOther,
    label: qualificationOther,
  }));

  const beforeUpload = () => {
    return false;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = (info) => {
    let updatedFileList = [...info.fileList];

    // Limit the number of files to 1
    if (updatedFileList.length > 1) {
      updatedFileList = updatedFileList.slice(-1);
    }

    setJobPostPicture(updatedFileList);

    // Provide feedback on upload status
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleUpload = async () => {
    if (jobPostPicture.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("file", jobPostPicture[0].originFileObj); // Use the correct file object

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("写真アップロード完了!");
      return response.data.fileUrl;
    } catch (error) {
      message.error("写真アップロード失敗");
    }
  };

  const handleSubmit = async () => {
    if (jobPostTypeDetail === "")
      return message.error("募集職種を選択してください。");
    if (jobPostSubTitle === "")
      return message.error("訴求文タイトルを入力してください。");
    if (jobPostSubDescription === "")
      return message.error("訴求文を入力してください。");
    if (jobPostWorkItem.length === 0)
      return message.error("仕事内容を選択してください。");
    if (jobPostWorkContent === "")
      return message.error("仕事内容を入力してください。");
    if (jobPostEmploymentType.length === 0)
      return message.error("雇用形態を選択してください。");
    if (jobPostSalaryType === "")
      return message.error("給与体系を入力してください。");
    if (jobPostSalaryMin === 0 || jobPostSalaryMax === 0)
      return message.error("給与下限・上限を入力してください。");
    if (jobPostWorkTimeContent === "")
      return message.error("勤務時間・休憩時間を入力してください。");
    if (jobPostRestContent === "")
      return message.error("休日を入力してください。");
    if (jobPostQualificationType.length === 0)
      return message.error("応募要件（資格）を選択してください。");
    if (jobPostProcess === "")
      return message.error("選考プロセスを入力してください。");
    const pictureUrl = await handleUpload();

    const JobPostData = {
      facility_id: facility.facility_id,
      customer_id: customer.customer_id,
      type: jobPostTypeDetail,
      picture: pictureUrl,
      sub_title: jobPostSubTitle,
      sub_description: jobPostSubDescription,
      work_item: jobPostWorkItem,
      work_content: jobPostWorkContent,
      service_subject: jobPostServiceSubject,
      service_type: jobPostServiceType,
      employment_type: jobPostEmploymentType,
      salary_type: jobPostSalaryType,
      salary_min: jobPostSalaryMin,
      salary_max: jobPostSalaryMax,
      salary_remarks: jobPostSalaryRemarks,
      expected_income: jobPostExpectedIncome,
      treatment_type: jobPostTreatmentType,
      treatment_content: jobPostTreatmentContent,
      work_time_type: jobPostWorkTimeType,
      work_time_content: jobPostWorkTimeContent,
      rest_type: jobPostRestType,
      rest_content: jobPostRestContent,
      special_content: jobPostSpecialContent,
      education_content: jobPostEducationContent,
      qualification_type: jobPostQualificationType,
      qualification_other: jobPostQualificationOther,
      qualification_content: jobPostQualificationContent,
      qualification_welcome: jobPostQualificationWelcome,
      process: jobPostProcess,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost`,
      JobPostData
    );
    if (response.data.error) message.error(response.data.error);
    message.success("求人を登録しました");
    setJobPostType("");
    setJobPostTypeDetail("");
    setJobPostPicture([]);
    setJobPostSubTitle("");
    setJobPostSubDescription("");
    setJobPostWorkItem([]);
    setJobPostWorkContent("");
    setJobPostServiceSubject([]);
    setJobPostServiceType([]);
    setJobPostEmploymentType([]);
    setJobPostSalaryType("");
    setJobPostSalaryMin(0);
    setJobPostSalaryMax(0);
    setJobPostSalaryRemarks("");
    setJobPostExpectedIncome(0);
    setJobPostTreatmentType([]);
    setJobPostTreatmentContent("");
    setJobPostWorkTimeType([]);
    setJobPostWorkTimeContent("");
    setJobPostRestType([]);
    setJobPostRestContent("");
    setJobPostSpecialContent("");
    setJobPostEducationContent("");
    setJobPostQualificationType([]);
    setJobPostQualificationOther("");
    setJobPostQualificationContent("");
    setJobPostQualificationWelcome("");
    setJobPostProcess("");
    navigate("/customers/facility");
  };

  const getFacility = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/${facilityId}`
    );
    if (response.data.error) message.error(response.data.error);
    setFacility(response.data.facility);
  };

  useEffect(() => {
    getFacility();
  }, []);
  return (
    <>
      <div className="w-full min-h-screen bg-white rounded-lg shadow-xl p-4">
        <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
          求人を新規登録
        </p>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            募集職種
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-3/4">
            <Select
              placeholder="職種"
              options={jobTypesOptions}
              value={jobPostType}
              onChange={(value) => setJobPostType(value)}
              className="w-1/3"
            />
            {jobPostType && (
              <Select
                placeholder="職種"
                options={jobTypeDetailOptions(jobPostType)}
                value={jobPostTypeDetail}
                onChange={(value) => setJobPostTypeDetail(value)}
                className="w-1/3"
              />
            )}
          </div>
        </div>
        <div className="flex items-start mt-4">
          <div className="flex items-center justify-start gap-1 w-1/5">
            <span className="lg:text-sm text-xs text-[#343434]">写真</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Upload
              name="avatar"
              listType="picture-card"
              fileList={jobPostPicture}
              onPreview={handlePreview}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <div className="flex items-center justify-center aspect-square w-32 cursor-pointer flex-col rounded-lg border border-dashed bg-light-gray p-3">
                <PlusOutlined />
                <div className="mt-4 text-center">Upload</div>
              </div>
            </Upload>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            訴求文タイトル
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <Input
            value={jobPostSubTitle}
            onChange={(e) => setJobPostSubTitle(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            訴求文<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostSubDescription}
            onChange={(e) => setJobPostSubDescription(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">
            仕事内容（選択）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <Checkbox.Group
            options={workItemOptions}
            onChange={(value) => setJobPostWorkItem(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            仕事内容
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostWorkContent}
            onChange={(e) => setJobPostWorkContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">診療科目</p>
          <Checkbox.Group
            options={serviceSubjectOptions}
            value={jobPostServiceSubject}
            onChange={(value) => setJobPostServiceSubject(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">サービス形態</p>
          <Checkbox.Group
            options={serviceTypeOptions}
            value={jobPostServiceType}
            onChange={(value) => setJobPostServiceType(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            雇用形態
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-4/5">
            <Radio.Group
              options={employmentTypeOptions}
              value={jobPostEmploymentType}
              onChange={(e) => setJobPostEmploymentType(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            給与体系
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-4/5">
            <Radio.Group
              options={salaryTypeOptions}
              value={jobPostSalaryType}
              onChange={(e) => setJobPostSalaryType(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            給与下限・上限
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start w-4/5">
            <Input
              value={jobPostSalaryMin}
              onChange={(e) => setJobPostSalaryMin(e.target.value)}
              className="w-1/4"
            />
            <span className="mx-2">~</span>
            <Input
              value={jobPostSalaryMax}
              onChange={(e) => setJobPostSalaryMax(e.target.value)}
              className="w-1/4"
            />
          </div>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">給与備考</p>
          <div className="flex items-center justify-start w-4/5">
            <TextArea
              value={jobPostSalaryRemarks}
              onChange={(e) => setJobPostSalaryRemarks(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">想定年収</p>
          <Input
            value={jobPostExpectedIncome}
            onChange={(e) => setJobPostExpectedIncome(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">待遇（選択）</p>
          <Checkbox.Group
            options={jobPostTreatmentTypeOptions}
            value={jobPostTreatmentType}
            onChange={(value) => setJobPostTreatmentType(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">待遇</p>
          <TextArea
            value={jobPostTreatmentContent}
            onChange={(e) => setJobPostTreatmentContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">勤務時間・休憩時間（選択）</p>
          <Checkbox.Group
            options={jobPostWorkTimeTypeOptions}
            value={jobPostWorkTimeType}
            onChange={(value) => setJobPostWorkTimeType(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            勤務時間・休憩時間
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostWorkTimeContent}
            onChange={(e) => setJobPostWorkTimeContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">休日（選択）</p>
          <Checkbox.Group
            options={jobPostRestTypeOptions}
            value={jobPostRestType}
            onChange={(value) => setJobPostRestType(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            休日<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostRestContent}
            onChange={(e) => setJobPostRestContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">長期休暇・特別休暇</p>
          <TextArea
            value={jobPostSpecialContent}
            onChange={(e) => setJobPostSpecialContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">教育体制・教育</p>
          <Checkbox.Group
            options={jobPostEducationTypeOptions}
            value={jobPostEducationContent}
            onChange={(value) => setJobPostEducationContent(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">
            応募要件（資格）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <Checkbox.Group
            options={jobPostQualificationTypeOptions}
            value={jobPostQualificationType}
            onChange={(value) => setJobPostQualificationType(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">応募要件（他条件）</p>
          <Checkbox.Group
            options={jobPostQualificationOtherOptions}
            value={jobPostQualificationOther}
            onChange={(value) => setJobPostQualificationOther(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">応募要件（テキスト）</p>
          <TextArea
            value={jobPostQualificationContent}
            onChange={(e) => setJobPostQualificationContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">歓迎要件</p>
          <TextArea
            value={jobPostQualificationWelcome}
            onChange={(e) => setJobPostQualificationWelcome(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            選考プロセス
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostProcess}
            onChange={(e) => setJobPostProcess(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-center justify-center w-full mt-8 gap-4 border-t-[1px] border-[#e7e7e7] pt-4">
          <Link
            to={"/customers/facility"}
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
          >
            キャンセル
          </Link>
          <button
            className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
            onClick={handleSubmit}
          >
            求人を登録する
          </button>
        </div>
      </div>
    </>
  );
};

export default AddJobPost;

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  EmploymentType,
  Features,
  JobType,
  Paysystems,
  Qualifications,
} from "../../../utils/constants/categories";
import axios from "axios";
import { message, Input, Select, Radio, Checkbox, Upload, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../utils/getBase64";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import EditorComponent from "../../../components/EditorComponent";
import Loading from "../../../components/Loading";

const JobPostEdit = () => {
  const { customer } = useAuth();
  const [jobPost, setJobPost] = useState(null);
  const [jobPostType, setJobPostType] = useState("");
  const [jobPostTypeDetail, setJobPostTypeDetail] = useState("");
  const [jobPostPicture, setJobPostPicture] = useState([]);
  const [jobPostPictureUrl, setJobPostPictureUrl] = useState("");
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
  const [jobPostProcess, setJobPostProcess] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState("");
  const [loading, setLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const jobPostId = pathname.split("/").pop();

  const editorStyle = {
    width: "80%",
  };

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

  const getJobPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobPostId}`
      );
      setJobPost(response.data.jobpost);
      setJobPostType(
        Object.keys(JobType.医科).includes(response.data.jobpost.type)
          ? "医科"
          : Object.keys(JobType.歯科).includes(response.data.jobpost.type)
          ? "歯科"
          : Object.keys(JobType.薬剤師).includes(response.data.jobpost.type)
          ? "薬剤師"
          : Object.keys(JobType.看護婦).includes(response.data.jobpost.type)
          ? "看護婦"
          : Object.keys(JobType.診療放射線技師).includes(
              response.data.jobpost.type
            )
          ? "診療放射線技師"
          : Object.keys(JobType.診療放射線技師).includes(
              response.data.jobpost.type
            )
          ? "診療放射線技師"
          : ""
      );
      setJobPostTypeDetail(response.data.jobpost.type);
      setJobPostPictureUrl(response.data.jobpost.picture);
      setJobPostSubTitle(response.data.jobpost.sub_title);
      setJobPostSubDescription(response.data.jobpost.sub_description);
      setJobPostWorkItem(response.data.jobpost.work_item);
      setJobPostWorkContent(response.data.jobpost.work_content);
      setJobPostServiceSubject(response.data.jobpost.service_subject);
      setJobPostServiceType(response.data.jobpost.service_type);
      setJobPostEmploymentType(response.data.jobpost.employment_type);
      setJobPostSalaryType(response.data.jobpost.salary_type);
      setJobPostSalaryMin(response.data.jobpost.salary_min);
      setJobPostSalaryMax(response.data.jobpost.salary_max);
      setJobPostSalaryRemarks(response.data.jobpost.salary_remarks);
      setJobPostExpectedIncome(response.data.jobpost.expected_income);
      setJobPostTreatmentType(response.data.jobpost.treatment_type);
      setJobPostTreatmentContent(response.data.jobpost.treatment_content);
      setJobPostWorkTimeType(response.data.jobpost.work_time_type);
      setJobPostWorkTimeContent(response.data.jobpost.work_time_content);
      setJobPostRestType(response.data.jobpost.rest_type);
      setJobPostRestContent(response.data.jobpost.rest_content);
      setJobPostSpecialContent(response.data.jobpost.special_content);
      setJobPostEducationContent(response.data.jobpost.education_content);
      setJobPostQualificationType(response.data.jobpost.qualification_type);
      setJobPostQualificationOther(response.data.jobpost.qualification_other);
      setJobPostQualificationContent(
        response.data.jobpost.qualification_content
      );
      setJobPostQualificationWelcome(
        response.data.jobpost.qualification_welcome
      );
      setJobPostProcess(response.data.jobpost.process);
    } catch (error) {
      console.error("Error fetching facility data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  console.log(jobPost);

  const handleSave = async () => {
    const pictureUrl = await handleUpload();
    const JobPostData = {
      facility_id: jobPost.facility_id.facility_id,
      customer_id: jobPost.customer_id.customer_id,
      type: jobPostTypeDetail,
      picture: pictureUrl ? pictureUrl : jobPostPictureUrl,
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

    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobPostId}`,
      JobPostData
    );
    if (response.data.error) message.error(response.data.error);
    message.success("求人を更新しました");
    navigate("/customers/facility");
  };

  const handleRequestAllow = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobPostId}/pending`
    );
    if (response.data.error) message.error(response.data.error);
    setSuccessModalOpen(true);
  };

  useEffect(() => {
    document.title = "求人編集";
    getJobPost();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col p-4 bg-white rounded-lg mb-8">
        <h1 className="lg:text-2xl md:text-base text-sm font-bold">求人編集</h1>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            募集職種<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
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
            {jobPostPicture.length == 0 && (
              <img
                src={jobPostPictureUrl}
                alt="施設写真"
                className="w-32 h-32 rounded-lg"
              />
            )}
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
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            訴求文<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <EditorComponent
            editorValue={jobPostSubDescription}
            onEditorChange={(value) => setJobPostSubDescription(value)}
            editorStyle={editorStyle}
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">
            仕事内容（選択）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <Checkbox.Group
            options={workItemOptions}
            value={jobPostWorkItem}
            onChange={(value) => setJobPostWorkItem(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            仕事内容<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
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
            雇用形態<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
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
            給与体系<span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
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
          <TextArea
            value={jobPostSalaryRemarks}
            onChange={(e) => setJobPostSalaryRemarks(e.target.value)}
            className="w-4/5"
          />
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
          <button className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300">
            プレビュー
          </button>
          <button
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            onClick={handleSave}
          >
            下書き保存
          </button>
          <button
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            onClick={handleRequestAllow}
          >
            掲載を申請する
          </button>
        </div>
      </div>

      <Modal
        open={successModalOpen}
        onCancel={() => setSuccessModalOpen(false)}
        footer={null}
        width={600}
        className="modal"
      >
        <div className="flex flex-col">
          <p className="text-lg font-bold text-[#343434] pl-4">
            求人の掲載申請が完了しました。
          </p>
          <p className="text-sm text-[#343434] mt-4">
            ※内容の確認と公開までに即日～2営業日程度かかる場合がございます。
          </p>
          <p className="text-sm text-[#343434]">
            ※掲載された内容を事務局により修正される場合がございます。
          </p>
          <Link
            to="/customers/facility"
            className="text-center text-blue-500 mt-4"
          >
            求人一覧へ戻る
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default JobPostEdit;

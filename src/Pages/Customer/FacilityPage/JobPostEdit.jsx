"use client";

import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditorComponent from "../../../components/EditorComponent";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/AuthContext";
import {
  EmploymentType,
  Features,
  JobType,
  Paysystems,
  Qualifications,
} from "../../../utils/constants/categories";
import { getBase64 } from "../../../utils/getBase64";
import ImageEditModal from "./ImageEditModal";
import JobPostPreview from "./JobPostPreview";
import PhotoSelectModal from "./PhotoSelectModal";

const JobPostEdit = () => {
  const { customer } = useAuth();
  const [jobPost, setJobPost] = useState(null);
  const [jobPostType, setJobPostType] = useState("");
  const [jobPostTypeDetail, setJobPostTypeDetail] = useState("");
  const [jobPostPicture, setJobPostPicture] = useState([]);
  const [jobPostPictureUrl, setJobPostPictureUrl] = useState([]);
  const [jobPostSubTitle, setJobPostSubTitle] = useState("");
  const [jobPostSubDescription, setJobPostSubDescription] = useState("");
  const [jobPostWorkItem, setJobPostWorkItem] = useState([]);
  const [jobPostWorkContent, setJobPostWorkContent] = useState("");
  const [jobPostServiceSubject, setJobPostServiceSubject] = useState([]);
  const [jobPostServiceType, setJobPostServiceType] = useState([]);
  const [jobPostEmploymentType, setJobPostEmploymentType] = useState("");
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
  const [status, setStatus] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [photoSelectModalVisible, setPhotoSelectModalVisible] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Add state for image editing
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const jobPostId = pathname.split("/").pop();

  const previewData = {
    type: jobPostTypeDetail,
    // jobPostPicture は、既にアップロード済みの場合は url、まだの場合は preview を使用
    picture: jobPostPicture.map((item) => item.url || item.preview),
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

  const editorStyle = {
    width: "80%",
  };

  const jobTypesOptions = [
    { label: "選択する", value: "" },
    ...Object.keys(JobType).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  const jobTypeDetailOptions = (jobType) => {
    return [
      { label: "選択する", value: "" },
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

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Handle the edited image save
  const handleEditSave = (croppedImage) => {
    const { file, preview } = croppedImage;

    // Create a new file entry with the cropped image
    const newFile = {
      uid: `${Date.now()}`,
      name: file.name || "cropped-image.jpg",
      status: "done",
      originFileObj: file,
      preview: preview,
      url: preview, // Add url for consistency with PhotoSelectModal
    };

    // Check if adding this would exceed the limit
    if (jobPostPicture.length >= 10) {
      message.error("最大10枚までしか選択できません");
      return;
    }

    // Add only the edited image to the file list
    setJobPostPicture((prev) => [...prev, newFile]);
    setEditModalVisible(false);
    setCurrentImage(null);
  };

  // Remove a file from the list
  const handleRemove = (file) => {
    const newFileList = jobPostPicture.filter((item) => item.uid !== file.uid);
    setJobPostPicture(newFileList);
  };

  // 複数ファイルアップロード対応の実装
  const handleUpload = async () => {
    // 新規画像と既存画像に分ける
    const newImages = jobPostPicture.filter((pic) => pic.originFileObj);
    const existingImages = jobPostPicture.filter((pic) => !pic.originFileObj);

    let uploadedFileUrls = [];
    let uploadedFiles = [];

    if (newImages.length > 0) {
      const formData = new FormData();
      newImages.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/file/multi`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        message.success("写真のアップロードが完了しました");
        uploadedFileUrls = response.data.files.map((item) => item.fileUrl);
        uploadedFiles = response.data.files;
      } catch (error) {
        message.error("写真アップロード失敗");
        return { fileUrls: [], files: [] };
      }
    }

    // 既存画像のURLを抽出（重複している可能性がないか確認）
    const existingUrls = existingImages.map((image) => image.url);

    // 両方を統合して返す
    return {
      fileUrls: [...uploadedFileUrls, ...existingUrls],
      files: uploadedFiles,
    };
  };

  const getJobPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobPostId}`
      );
      const jobData = response.data.jobpost;
      setJobPost(jobData);
      setJobPostType(
        Object.keys(JobType.医科).includes(jobData.type)
          ? "医科"
          : Object.keys(JobType.歯科).includes(jobData.type)
          ? "歯科"
          : Object.keys(JobType.介護).includes(jobData.type)
          ? "介護"
          : Object.keys(JobType.保育).includes(jobData.type)
          ? "保育"
          : Object.keys(JobType["リハビリ／代替医療"]).includes(jobData.type)
          ? "リハビリ／代替医療"
          : Object.keys(JobType.その他).includes(jobData.type)
          ? "その他"
          : Object.keys(JobType["ヘルスケア／美容"]).includes(jobData.type)
          ? "ヘルスケア／美容"
          : ""
      );
      setJobPostTypeDetail(jobData.type);
      setJobPostPictureUrl(jobData.picture);
      setJobPostSubTitle(jobData.sub_title);
      setJobPostSubDescription(jobData.sub_description);
      setJobPostWorkItem(jobData.work_item);
      setJobPostWorkContent(jobData.work_content);
      setJobPostServiceSubject(jobData.service_subject);
      setJobPostServiceType(jobData.service_type);
      setJobPostEmploymentType(
        typeof jobData.employment_type === "string"
          ? jobData.employment_type
          : Array.isArray(jobData.employment_type) &&
            jobData.employment_type.length > 0
          ? jobData.employment_type[0]
          : ""
      );

      setJobPostSalaryType(jobData.salary_type);
      setJobPostSalaryMin(jobData.salary_min);
      setJobPostSalaryMax(jobData.salary_max);
      setJobPostSalaryRemarks(jobData.salary_remarks);
      setJobPostExpectedIncome(jobData.expected_income);
      setJobPostTreatmentType(jobData.treatment_type);
      setJobPostTreatmentContent(jobData.treatment_content);
      setJobPostWorkTimeType(jobData.work_time_type);
      setJobPostWorkTimeContent(jobData.work_time_content);
      setJobPostRestType(jobData.rest_type);
      setJobPostRestContent(jobData.rest_content);
      setJobPostSpecialContent(jobData.special_content);
      setJobPostEducationContent(jobData.education_content);
      setJobPostQualificationType(jobData.qualification_type);
      setJobPostQualificationOther(jobData.qualification_other);
      setJobPostQualificationContent(jobData.qualification_content);
      setJobPostQualificationWelcome(jobData.qualification_welcome);
      setJobPostProcess(jobData.process);
      setStatus(jobData.allowed);

      // 既存の画像 URL を Upload 用のファイルリストに変換する
      if (jobData.picture && Array.isArray(jobData.picture)) {
        const initialFileList = jobData.picture.map((url, index) => ({
          uid: `existing-${index}`,
          name: `image-${index}`,
          status: "done",
          url: url,
        }));
        setJobPostPicture(initialFileList);
      }
    } catch (error) {
      console.error("Error fetching job post data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const uploadResult = await handleUpload();
      const newUrls = uploadResult.fileUrls || [];
      const uploadUrls = uploadResult.files || [];
      const existingUrls = jobPostPicture
        .filter((p) => !p.originFileObj)
        .map((p) => p.url);
      const allUrls = Array.from(new Set([...newUrls, ...existingUrls]));
      // pictureUrls が存在すればそちら、なければ既存の URL をそのまま利用
      const JobPostData = {
        facility_id: jobPost.facility_id.facility_id,
        customer_id: jobPost.customer_id.customer_id,
        type: jobPostTypeDetail,
        picture: allUrls,
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

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/photo/image`,
        uploadUrls || []
      );

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobPostId}`,
        JobPostData
      );
      if (response.data.error) message.error(response.data.error);
      else message.success("求人を更新しました");
      navigate("/customers/facility");
    } catch (error) {
      console.error("Error updating job post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (status) => {
    try {
      setLoading(true);
      await handleSave();
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobPostId}/${status}`
      );
      if (response.data.error) message.error(response.data.error);
      if (status === "pending") {
        setSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("Error requesting job post status change:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobPostId}`
      );
      if (response.data.error) message.error(response.data.error);
      navigate("/customers/facility");
    } catch (error) {
      console.error("Error deleting job post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "求人登録・編集 | JobJob (ジョブジョブ)";
    getJobPost();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {loading ? <Loading /> : <></>}

      <div className="w-full min-h-screen flex flex-col p-4 bg-white rounded-lg mb-8">
        <h1 className="lg:text-2xl md:text-base text-sm font-bold">求人編集</h1>
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
              maxCount={10}
              name="avatar"
              listType="picture-card"
              fileList={jobPostPicture}
              onPreview={handlePreview}
              onRemove={handleRemove}
              customRequest={({ onSuccess }) => {
                // Do nothing, just call onSuccess to mark it as done
                setTimeout(() => {
                  onSuccess("ok", null);
                }, 0);
              }}
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              openFileDialogOnClick={false} // Prevent opening file dialog on click
            >
              <div
                className="flex items-center justify-center aspect-square w-32 cursor-pointer flex-col rounded-lg border border-dashed bg-light-gray p-3"
                onClick={() => {
                  // Create a file input element
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      getBase64(file).then((base64) => {
                        setCurrentImage(base64);
                        setEditModalVisible(true);
                      });
                    }
                  };
                  input.click();
                }}
              >
                <PlusOutlined />
                <div className="mt-4 text-center">Upload</div>
              </div>
            </Upload>
          </div>
        </div>
        <div className="flex items-start mt-1">
          <div className="flex items-center justify-start gap-1 w-1/5" />
          <div className="flex items-center justify-start gap-2">
            <Button onClick={() => setPhotoSelectModalVisible(true)}>
              写真管理から選択
            </Button>
          </div>
        </div>
        {/* 以下、各入力項目のフォーム */}
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
          <p className="lg:text-sm text-xs w-1/5">教育体制・研修</p>
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
          <button
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            onClick={() => setPreviewModalOpen(true)}
          >
            プレビュー
          </button>
          {status === "draft" && (
            <>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleSave}
              >
                下書き保存
              </button>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={() => handleRequest("pending")}
              >
                求人を申請する
              </button>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleDelete}
              >
                求人を削除する
              </button>
            </>
          )}
          {status === "pending" && (
            <>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleSave}
              >
                下書き保存
              </button>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleDelete}
              >
                求人を削除する
              </button>
            </>
          )}
          {status === "allowed" && (
            <>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={() => handleRequest("ended")}
              >
                求人を終了する
              </button>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleDelete}
              >
                求人を削除する
              </button>
            </>
          )}
          {status === "ended" && (
            <>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={() => handleRequest("pending")}
              >
                求人を申請する
              </button>
              <button
                className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
                onClick={handleDelete}
              >
                求人を削除する
              </button>
            </>
          )}
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

      <JobPostPreview
        open={previewModalOpen}
        onCancel={() => setPreviewModalOpen(false)}
        data={previewData}
      />

      <PhotoSelectModal
        visible={photoSelectModalVisible}
        onCancel={() => setPhotoSelectModalVisible(false)}
        onSelect={(selected) => {
          const formattedPhotos = selected.map((photoUrl, index) => ({
            uid: `existing-${Date.now()}-${Math.random()}`, // 常に新規の一意キーを生成
            name: `Photo ${jobPostPicture.length + index + 1}`,
            url: photoUrl.startsWith("http")
              ? photoUrl
              : `${process.env.REACT_APP_BASE_IMAGE_URL || ""}${photoUrl}`,
            status: "done",
          }));
          // 既存の写真と合わせた枚数チェック
          const totalPhotos = jobPostPicture.length + formattedPhotos.length;
          if (totalPhotos > 10) {
            message.error("最大10枚までしか選択できません");
            return;
          }
          setJobPostPicture((prev) => [...prev, ...formattedPhotos]);
          setPhotoSelectModalVisible(false);
        }}
      />
      {/* モーダルで拡大表示 */}
      <Modal
        visible={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        closeIcon={
          <CloseOutlined
            style={{
              backgroundColor: "#fff",
              padding: "5px",
              borderRadius: "5px",
            }}
          />
        }
      >
        <img
          src={previewImage || "/placeholder.svg"}
          alt="enlarged"
          style={{ width: "100%" }}
        />
      </Modal>

      {/* Image Edit Modal */}
      <ImageEditModal
        visible={editModalVisible}
        image={currentImage}
        onCancel={() => {
          setEditModalVisible(false);
          setCurrentImage(null);
        }}
        onSave={handleEditSave}
      />
    </>
  );
};

export default JobPostEdit;

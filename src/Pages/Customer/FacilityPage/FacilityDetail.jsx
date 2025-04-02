import moment from "moment";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Input, message, Modal, Radio, Select, Upload } from "antd";
import axios from "axios";
import FacilityPreview from "./FacilityPreview";
import JobPostPreview from "./JobPostPreview";

const FacilityDetail = ({ facility, jobPosts, setJobPosts }) => {
  const [companyFacilities, setCompanyFacilites] = useState([]);
  const [selectedCompanyFacility, setSelectedCompanyFacility] = useState("");
  const [selectedJobPosts, setSelectedJobPosts] = useState([]);
  const [selectedJobPostId, setSelectedJobPostId] = useState("");

  const [filteredJobPosts, setFilteredJobPosts] = useState([]);
  const [copyJobPost, setCopyJobPost] = useState(false);
  const [facilityPreviewModal, setFacilityPreviewModal] = useState(false);
  const [jobPostPreviewModal, setJobPostPreviewModal] = useState(false);
  const [jobPostPreviewData, setJobPostPreviewData] = useState();
  const [filterStatus, setFilterStatus] = useState("all");

  const companyFacilitiesOptions = companyFacilities?.map((facility) => ({
    value: facility.facility_id,
    label: facility.name,
  }));

  const selectedJobPostsOptions = selectedJobPosts?.map((jobPost) => ({
    value: jobPost.jobpost_id,
    label: jobPost.sub_title,
  }));

  const getFacilitiesByCompany = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/getByCompany`
    );
    if (response.data.error) return message.error(response.data.message);
    setCompanyFacilites(response.data.facilities);
  };

  const getJobPostsByFacilityId = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/facility/${selectedCompanyFacility}`
    );
    if (response.data.error) return message.error(response.data.message);
    setSelectedJobPosts(response.data.jobposts);
  };

  const handleCopy = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/copy/${selectedJobPostId}`
    );
    if (response.data.error) message.error(response.data.error);
    message.success("求人をコピーしました");
    setCopyJobPost(false);
    setJobPosts([...jobPosts, response.data.jobpost]);
  };

  const onHandleJobPostPreview = (jobPost) => {
    setJobPostPreviewModal(true);
    setJobPostPreviewData(jobPost);
  };

  const onCancelJobPostPreview = () => {
    setJobPostPreviewModal(false);
    setJobPostPreviewData(null);
  };

  useEffect(() => {
    document.title = "施設詳細";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    getFacilitiesByCompany();
  }, [copyJobPost]);

  useEffect(() => {
    selectedCompanyFacility !== "" && getJobPostsByFacilityId();
  }, [selectedCompanyFacility]);

  useEffect(() => {
    if (filterStatus === "all") return setFilteredJobPosts(jobPosts);
    if (filterStatus === "draft")
      return setFilteredJobPosts(
        jobPosts.filter((jobPost) => jobPost.allowed === "draft")
      );
    if (filterStatus === "pending")
      return setFilteredJobPosts(
        jobPosts.filter((jobPost) => jobPost.allowed === "pending")
      );
    if (filterStatus === "allowed")
      return setFilteredJobPosts(
        jobPosts.filter((jobPost) => jobPost.allowed === "allowed")
      );
    if (filterStatus === "ended")
      return setFilteredJobPosts(
        jobPosts.filter((jobPost) => jobPost.allowed === "ended")
      );
  }, [filterStatus, jobPosts]);

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex items-start justify-start gap-4">
          {facility.photo.length === 0 ? (
            <img
              src={"/assets/images/noimage.png"}
              alt={facility.name}
              className="w-1/5 object-cover rounded-lg"
            />
          ) : (
            <img
              src={facility.photo[0]}
              alt={facility.name}
              className="w-1/5 object-cover rounded-lg"
            />
          )}
          <div className="flex flex-col items-start w-4/5">
            <div className="flex justify-between w-full">
              <p className="lg:text-xs text-[0.5rem] py-1 px-2 bg-[#FF2A3B] text-white rounded-lg">
                {facility.allowed === "draft"
                  ? "下書き"
                  : facility.allowed === "pending"
                  ? "掲載申請中"
                  : facility.allowed === "allowed"
                  ? "掲載中"
                  : facility.allowed === "ended"
                  ? "受付終了"
                  : ""}
              </p>
              <p className="lg:text-xs text-[0.5rem] py-1 px-2 rounded-lg">
                <span>
                  <Link
                    to={`/customers/facility/edit/${facility.facility_id}`}
                    className="text-[#FF2A3B] hover:underline duration-300"
                  >
                    編集
                  </Link>
                </span>
                <button
                  className="text-[#FF2A3B] ml-4"
                  onClick={() => setFacilityPreviewModal(true)}
                >
                  プレビュー
                </button>
              </p>
            </div>
            <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
              {facility.name}
            </p>
            <p className="lg:text-sm text-xs text-[#343434]">
              {facility.prefecture} {facility.facility_genre}
            </p>
            <div className="flex items-center justify-start gap-2">
              <p className="text-xs text-[#343434]">
                作成日時: {moment(facility.created_at).format("YYYY/MM/DD")}
              </p>
              <p className="text-xs text-[#343434]">
                更新日時: {moment(facility.updated_at).format("YYYY/MM/DD")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-start mt-2 gap-2">
          <button
            className="lg:text-xs text-[0.55rem] font-bold text-[#343434] hover:underline duration-300"
            onClick={() => setFilterStatus("all")}
          >
            すべて：{jobPosts?.length}件
          </button>
          <button
            className="lg:text-xs text-[0.55rem] font-bold text-[#343434] hover:underline duration-300"
            onClick={() => setFilterStatus("draft")}
          >
            下書き：
            {jobPosts?.filter((jobpost) => jobpost.allowed === "draft")?.length}
            件
          </button>
          <button
            className="lg:text-xs text-[0.55rem] font-bold text-[#343434] hover:underline duration-300"
            onClick={() => setFilterStatus("pending")}
          >
            掲載申請中：
            {
              jobPosts?.filter((jobpost) => jobpost.allowed === "pending")
                ?.length
            }
            件
          </button>
          <button
            className="lg:text-xs text-[0.55rem] font-bold text-[#343434] hover:underline duration-300"
            onClick={() => setFilterStatus("allowed")}
          >
            掲載中：
            {
              jobPosts?.filter((jobpost) => jobpost.allowed === "allowed")
                ?.length
            }
            件
          </button>
          <button
            className="lg:text-xs text-[0.55rem] font-bold text-[#343434] hover:underline duration-300"
            onClick={() => setFilterStatus("ended")}
          >
            受付終了：
            {jobPosts?.filter((jobpost) => jobpost.allowed === "ended")?.length}
            件
          </button>
        </div>
        <div className="flex items-center justify-center w-full gap-4 py-2 mt-2 border-t-[1px] border-[#e7e7e7]">
          <Link
            to={`/customers/jobpost/${facility.facility_id}/add`}
            className={`lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-2 duration-300 ${
              facility.allowed !== "allowed" ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              
            }}
          >
            求人を新規登録
          </Link>
          <button
            className={`lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-2 hover:bg-[#ffe4e4] hover:text-red-500 duration-300 ${
              facility.allowed !== "allowed" ? "cursor-not-allowed" : ""
            }`}
            disabled={facility.allowed !== "allowed"}
            onClick={() => setCopyJobPost(true)}
          >
            求人をコピーして登録
          </button>
        </div>
        <div className="w-full flex flex-col border-t-[1px] border-[#e7e7e7]">
          {filteredJobPosts?.map((jobPost, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-2 p-2"
            >
              <div className="flex flex-col gap-1 w-1/6">
                {jobPost?.picture.length === 0 ? (
                  <img
                    src={"/assets/images/noimage.png"}
                    alt={jobPost?.sub_title}
                    className="w-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={jobPost?.picture[0]}
                    alt={jobPost?.sub_title}
                    className="w-full object-cover rounded-lg"
                  />
                )}
                <p className="lg:text-xs text-[0.5rem] p-2 bg-[#FF2A3B] text-white rounded-lg text-center">
                  {jobPost?.allowed === "draft"
                    ? "下書き"
                    : jobPost?.allowed === "pending"
                    ? "掲載申請中"
                    : jobPost?.allowed === "allowed"
                    ? "掲載中"
                    : jobPost?.allowed === "ended"
                    ? "受付終了"
                    : ""}
                </p>
              </div>
              <div className="flex flex-col gap-1 w-4/5">
                <div className="flex justify-between w-full gap-2">
                  <div className="flex items-center justify-start gap-2">
                    <p className="lg:text-sm text-xs text-[#343434]">職種名:</p>
                    <p className="lg:text-sm text-xs text-[#343434]">
                      {jobPost?.type}
                    </p>
                  </div>
                  <p className="lg:text-xs text-[0.5rem] rounded-lg text-right">
                    <span>
                      <Link
                        to={`/customers/jobpost/edit/${jobPost.jobpost_id}`}
                        className="text-[#FF2A3B] hover:underline duration-300"
                      >
                        編集
                      </Link>
                    </span>
                    <button
                      className="text-[#FF2A3B] ml-4"
                      onClick={() => onHandleJobPostPreview(jobPost)}
                    >
                      プレビュー
                    </button>
                  </p>
                </div>
                <div className="flex justify-start w-full gap-2">
                  <p className="lg:text-sm text-xs text-[#343434]">求人ID:</p>
                  <p className="lg:text-sm text-xs text-[#343434]">
                    {jobPost?.jobpost_id}
                  </p>
                </div>
                <p className="lg:text-sm text-xs font-bold text-[#343434]">
                  {jobPost?.sub_title}
                </p>
                <div className="flex items-center justify-start gap-2">
                  <p className="text-xs text-[#343434]">
                    作成日時: {moment(jobPost?.created_at).format("YYYY/MM/DD")}
                  </p>
                  <p className="text-xs text-[#343434]">
                    更新日時: {moment(jobPost?.updated_at).format("YYYY/MM/DD")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {
        <Modal
          open={newJobPostModal}
          onCancel={() => setNewJobPostModal(false)}
          footer={null}
          width={800}
          className="modal"
        >
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
            <p className="lg:text-sm text-xs w-1/5">
              勤務時間・休憩時間（選択）
            </p>
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
            <button
              className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
              onClick={() => setNewJobPostModal(false)}
            >
              キャンセル
            </button>
            <button
              className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
              onClick={handleSubmit}
            >
              求人を登録する
            </button>
          </div>
        </Modal>
      } */}

      {
        <Modal
          open={copyJobPost}
          onCancel={() => setCopyJobPost(false)}
          footer={null}
          width={800}
          className="modal"
        >
          <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
            求人をコピーして登録
          </p>
          <div className="p-4">
            <p className="lg:text-base text-sm text-[#343434] mt-4">
              コピーする対象の施設と求人を選択して、「コピーして求人作成」ボタンをクリックしてください。
            </p>
            <div className="flex items-center mt-4 px-4">
              <p className="lg:text-sm text-xs w-1/5">施設</p>
              <div className="flex items-center justify-start gap-2 w-3/4">
                <Select
                  placeholder="職種"
                  options={companyFacilitiesOptions}
                  value={selectedCompanyFacility}
                  onChange={(value) => setSelectedCompanyFacility(value)}
                  className="w-full"
                />
              </div>
            </div>
            {selectedCompanyFacility && (
              <div className="flex items-center mt-4 px-4">
                <p className="lg:text-sm text-xs w-1/5">求人</p>
                <div className="flex items-center justify-start gap-2 w-3/4">
                  <Select
                    placeholder="職種"
                    options={selectedJobPostsOptions}
                    value={selectedJobPostId}
                    onChange={(value) => setSelectedJobPostId(value)}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end px-12 mt-4">
              <button
                className={`lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-2 hover:bg-[#ffe4e4] hover:text-red-500 duration-300`}
                onClick={handleCopy}
              >
                登録
              </button>
            </div>
          </div>
        </Modal>
      }
      {facilityPreviewModal && (
        <FacilityPreview
          open={facilityPreviewModal}
          onCancel={() => setFacilityPreviewModal(false)}
          data={facility}
        />
      )}
      {jobPostPreviewModal && (
        <JobPostPreview
          open={jobPostPreviewModal}
          onCancel={() => onCancelJobPostPreview()}
          data={jobPostPreviewData}
        />
      )}
    </>
  );
};

export default FacilityDetail;

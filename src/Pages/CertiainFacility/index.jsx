import { Checkbox, message, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SkeletonGroup from "../../components/SkeletonGroup";
import { useAuth } from "../../context/AuthContext";
import {
  EmploymentType,
  JobType as JobTypes,
  Prefectures,
} from "../../utils/constants/categories";
import {
  getAllEmploymentValues,
  getAllFacilityValues,
  getAllJobTypeValues,
  getAllPrefectureValues,
  getEmploymentTypeKeyByValue,
  getFacilityKeyByValue,
  getJobTypeKeyByValue,
  getJobValueByKey,
  getPrefectureKeyByValue,
} from "../../utils/getFunctions";

const CertaionFacility = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [jobType, setJobType] = useState("");
  const [facility, setFacility] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [pref, setPref] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [hourlySalary, setHourlySalary] = useState("");
  const [jobTypeModal, setJobTypeModal] = useState(false);
  const [type, setType] = useState("1");
  const [prefectureModalOpen, setPrefectureModalOpen] = useState(false);
  const [employmentTypeModalOpen, setEmploymentTypeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onClickPref = (pref) => {
    setPref(pref);
    setPrefectureModalOpen(false);
  };

  const isSelected = (v) => v === type;

  const monthlySalaryOptions = [
    { value: "", label: "指定なし" },
    { value: "180000", label: "18" },
    { value: "200000", label: "20" },
    { value: "250000", label: "25" },
    { value: "300000", label: "30" },
    { value: "1600", label: "40" },
    { value: "500000", label: "50" },
    { value: "600000", label: "60" },
    { value: "700000", label: "70" },
    { value: "800000", label: "80" },
    { value: "900000", label: "90" },
    { value: "1000000", label: "100" },
  ];

  const hourlySalaryOptions = [
    { value: "", label: "指定なし" },
    { value: "800", label: "800" },
    { value: "1000", label: "1000" },
    { value: "1200", label: "1200" },
    { value: "1400", label: "1400" },
    { value: "1600", label: "1600" },
    { value: "1800", label: "1800" },
    { value: "2000", label: "2000" },
    { value: "3000", label: "3000" },
    { value: "4000", label: "4000" },
    { value: "5000", label: "5000" },
  ];

  const getFacilities = async () => {
    setIsLoading(true);

    try {
      const jobTypeString = jobType ? getJobTypeKeyByValue(jobType) : "";
      const facilityString = facility ? getFacilityKeyByValue(facility) : "";
      const prefString = pref ? getPrefectureKeyByValue(pref) : "";
      const employmentTypeString = employmentType
        ? getEmploymentTypeKeyByValue(employmentType)
        : "";

      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/facility/?jobType=${jobTypeString}&facility=${facilityString}&pref=${prefString}&employmentType=${employmentTypeString}`;

      const response = await axios.get(apiUrl);

      if (response.data.error) {
        message.error(response.data.message);
        return;
      }

      setFacilities(response.data.facility);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch facilities.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (facility !== "") {
      const link =
        (jobType !== "" ? `/${jobType}` : "") +
        `/${facility}` +
        (pref !== "" ? `/${pref}` : "") +
        (employmentType !== "" ? `/${employmentType}` : "");

      getFacilities(); // Ensure getFacilities runs before navigating

      // Only navigate if the link is different
      if (window.location.pathname !== link) {
        navigate(link);
      }
    }
  }, [jobType, pref, employmentType, facility]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0"); // Get the current month with leading zero
    document.title = `【${year}年${month}月最新】求人を掲載中の${getFacilityKeyByValue(
      facility
    )} | JobJob (ジョブジョブ)`;
    const jobTypeOrFacility = pathname.split("/")[1];
    if (getAllJobTypeValues().includes(jobTypeOrFacility)) {
      setJobType(jobTypeOrFacility);
      setFacility(pathname.split("/")[2]);
    }
    getAllFacilityValues().includes(jobTypeOrFacility) &&
      setFacility(jobTypeOrFacility);
    jobType !== "" && setFacility(pathname.split("/")[2]);

    const prefOrEmploymentType =
      pathname.split("/")[pathname.split("/").length - 1];

    if (getAllPrefectureValues().includes(prefOrEmploymentType)) {
      setPref(prefOrEmploymentType);
    }
    if (getAllEmploymentValues().includes(prefOrEmploymentType)) {
      setEmploymentType(prefOrEmploymentType);
      pathname.split("/").length === 4 && setPref(pathname.split("/")[2]);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [document.title]);
  return (
    <SkeletonGroup isLoading={isLoading}>
      <div className="flex w-full px-4 bg-[#EFEFEF]">
        <div className="container flex justify-between gap-8">
          <div className="flex flex-col items-start justify-start w-2/3">
            <div className="flex flex-col justify-center bg-white rounded-lg p-4 w-full shadow-xl">
              <p className="text-lg font-bold text-gray-500"></p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
                    {jobType !== "" && getJobTypeKeyByValue(jobType)}
                    求人を募集している
                    <span className="lg:text-2xl md:text-sm font-bold text-[#343434]">
                      {" "}
                      {getFacilityKeyByValue(facility)}一覧
                    </span>
                    <span>
                      {pref !== ""
                        ? `(${getPrefectureKeyByValue(pref)}${
                            employmentType !== ""
                              ? `/${getEmploymentTypeKeyByValue(
                                  employmentType
                                )}`
                              : ""
                          })`
                        : employmentType !== ""
                        ? `(${getEmploymentTypeKeyByValue(employmentType)})`
                        : ""}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center bg-white rounded-lg px-12 py-8 w-full shadow-xl mt-8">
              <div
                className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg hover:px-12 duration-300 cursor-pointer"
                onClick={() => setJobTypeModal(true)}
              >
                <div className="flex items-center justify-between gap-1">
                  <img
                    src="/assets/images/dashboard/mdi_tag-outline.png"
                    alt="map"
                    className="w-5 pt-0.5"
                  />
                  <p className="lg:text-base md:text-sm font-bold text-[#343434]">
                    職種から選択
                  </p>
                </div>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-down"
                  className="w-4"
                />
              </div>
              <div
                className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer"
                onClick={() => setPrefectureModalOpen(true)}
              >
                <div className="flex items-center justify-between gap-1 ">
                  <img
                    src="/assets/images/dashboard/gg_pin.png"
                    alt="map"
                    className="w-5 pt-0.5"
                  />
                  <p className="lg:text-base md:text-sm font-bold text-[#343434]">
                    都道府県から選択
                  </p>
                </div>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-down"
                  className="w-4"
                />
              </div>
              <div
                className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer"
                onClick={() => setEmploymentTypeModalOpen(true)}
              >
                <div className="flex items-center justify-between gap-1 ">
                  <img
                    src="/assets/images/dashboard/material-symbols_check-box-outline.png"
                    alt="map"
                    className="w-5 pt-0.5"
                  />
                  <p className="lg:text-base md:text-sm font-bold text-[#343434]">
                    雇用形態・給与から選択
                  </p>
                </div>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-down"
                  className="w-4"
                />
              </div>
              <div
                className="flex items-center justify-between py-4 px-8 bg-[#F6F6F6] rounded-lg mt-4 hover:px-12 duration-300 cursor-pointer"
                onClick={() => setPrefectureModalOpen(true)}
              >
                <div className="flex items-center justify-between gap-1">
                  <img
                    src="/assets/images/dashboard/material-symbols_check-box-outline.png"
                    alt="map"
                    className="w-5 pt-0.5"
                  />
                  <p className="lg:text-base md:text-sm font-bold text-[#343434]">
                    施設ジャンルを変更
                  </p>
                </div>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-down"
                  className="w-4"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full mt-8 gap-4">
              {facilities?.map((facility, index) => {
                return (
                  <div
                    key={index}
                    className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl hover:scale-[1.02] duration-300"
                  >
                    <div className="flex items-center justify-between w-full">
                      {facility?.photo.length === 0 ? (
                        <img
                          src={"/assets/images/noimage.png"}
                          alt="arrow-down"
                          className="md:w-1/2 rounded-lg aspect-[3/2] object-cover"
                        />
                      ) : (
                        <img
                          src={facility.photo[0]}
                          alt="arrow-down"
                          className="md:w-1/2 rounded-lg aspect-[3/2] object-cover"
                        />
                      )}

                      <div className="flex flex-col items-start justify-start p-4 w-full h-full gap-4">
                        <p className="lg:text-xl md:text-sm font-bold text-[#343434]">
                          {facility.name}
                        </p>
                        <div>
                          <p className="lg:text-sm md:text-xs text-[#343434]">
                            {facility.prefecture}
                            {facility.city}
                            {facility.village}
                            {facility.building}
                          </p>
                          <p className="lg:text-sm md:text-xs text-[#343434]">
                            {facility.access_station}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full gap-4 mt-6">
                      <Link
                        to={`/facility/details/${facility.facility_id}`}
                        className="flex items-center justify-center bg-[#FF6B56] rounded-lg py-2 text-white border-2 border-[#FF6B56] w-full hover:scale-[1.02] duration-300"
                      >
                        <p className="text-sm font-bold text-white">
                          施設の詳細を見る
                        </p>
                      </Link>
                    </div>
                    <div className="w-full p-2">
                      {facility.jobPosts.map((jobPost, index) => {
                        return (
                          <Link
                            key={index}
                            to={`/${getJobValueByKey(jobPost.type)}/details/${
                              jobPost.jobpost_id
                            }`}
                            className="flex items-center justify-between gap-4 border-y-[1px] border-[#e7e7e7] py-2 hover:px-6 duration-300"
                          >
                            <div className="flex gap-2">
                              <span className="text-sm font-bold text-[#FF2A3B]">
                                {jobPost.type}の求人
                              </span>
                              <span className="text-sm text-[#343434]">
                                {jobPost.employment_type[0]}:
                                {jobPost.salary_type} {jobPost.salary_min}円～
                                {jobPost.salary_max}円
                              </span>
                            </div>
                            <img
                              src="/assets/images/dashboard/ep_arrow-right_black.png"
                              alt="arrow-down"
                              className="w-4"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex h-full w-1/3">
            <div className="flex flex-col items-center justify-start h-full w-full">
              <div className="flex items-center justify-center bg-white rounded-lg lg:px-8 md:px-4 py-4 gap-2 w-full shadow-xl">
                <Link
                  to={"/#"}
                  className="lg:text-lg md:text-sm text-xs font-bold text-[#343434]"
                >
                  地図から求人を選択する
                </Link>
                <img
                  src="/assets/images/dashboard/ep_arrow-right_black.png"
                  alt="arrow-right"
                  className="lg:w-4 w-3 pt-0.5"
                />
              </div>
              <img
                src="/assets/images/dashboard/Group 16.png"
                alt="banner"
                className="w-full mt-8"
              />
              <div className="flex items-center justify-start w-full mt-8">
                <p className="lg:text-lg md:text-sm text-xs font-bold text-[#343434]">
                  必ず役立つ仕事術
                </p>
              </div>
              <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 py-6 w-full mt-8 shadow-xl">
                <div className="flex items-center justify-between w-full px-2">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-xs">
                    ぴったりな仕事を探すには
                  </p>
                  <img
                    src="/assets/images/dashboard/ep_arrow-right_black.png"
                    alt="arrow-right"
                    className="lg:w-4 w-3 pt-0.5"
                  />
                </div>
                <div className="flex items-center justify-between w-full px-2 mt-4">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-xs">
                    応募の仕方
                  </p>
                  <img
                    src="/assets/images/dashboard/ep_arrow-right_black.png"
                    alt="arrow-right"
                    className="lg:w-4 w-3 pt-0.5"
                  />
                </div>
                <div className="flex items-center justify-between mt-4 px-2">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-xs">
                    履歴書の書き方
                  </p>
                  <img
                    src="/assets/images/dashboard/ep_arrow-right_black.png"
                    alt="arrow-right"
                    className="lg:w-4 w-3 pt-0.5"
                  />
                </div>
                <div className="flex items-center justify-between w-full px-2 mt-4">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-xs">
                    メッセージの書き方
                  </p>
                  <img
                    src="/assets/images/dashboard/ep_arrow-right_black.png"
                    alt="arrow-right"
                    className="lg:w-4 w-3 pt-0.5"
                  />
                </div>
              </div>
              <div className="flex items-center justify-start w-full mt-8">
                <p className="lg:text-lg md:text-sm text-xs text-[#343434] font-bold">
                  人気のコラムランキング
                </p>
              </div>
              <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 px-2 py-6 w-full mt-8 shadow-xl">
                <div className="flex items-center justify-center gap-2 w-full">
                  <img
                    src="/assets/images/dashboard/Group 17.png"
                    alt="arrow-right"
                  />
                  <p className="lg:text-[0.75rem] md:text-[0.6rem] text-xs font-bold text-[#343434]">
                    失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 w-full mt-4">
                  <img
                    src="/assets/images/dashboard/Group 17_2.png"
                    alt="arrow-right"
                  />
                  <p className="lg:text-[0.75rem] md:text-[0.6rem] text-xs font-bold text-[#343434]">
                    失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 w-full mt-4">
                  <img
                    src="/assets/images/dashboard/Group 17_3.png"
                    alt="arrow-right"
                  />
                  <p className="lg:text-[0.75rem] md:text-[0.6rem] text-xs font-bold text-[#343434]">
                    失業手当はいくら、いつからもらえる？受給条件や申請方法を解説！
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    to={"/#"}
                    className="flex items-center justify-center mt-4 border-2 border-[#FF6B56] rounded-lg py-2 lg:px-16 md:px-8 px-4"
                  >
                    <p className="lg:text-[0.75rem] md:text-[0.6rem] text-xs text-[#FF6B56]">
                      ランキングをもっと見る
                    </p>
                  </Link>
                </div>
              </div>
              {user == null && (
                <>
                  <div className="flex items-center justify-start w-full mt-8">
                    <p className="lg:text-lg md:text-sm text-xs text-[#343434] font-bold">
                      会員登録がまだの方
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-white rounded-lg py-6 w-full mt-8 shadow-xl">
                    <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] pb-2">
                      <p className="lg:text-[1rem] md:text-[0.7rem] text-xs font-bold text-[#999999] number pt-0.5">
                        1.
                      </p>
                      <p className="lg:text-[1rem] md:text-[0.7rem] text-xs text-[#343434]">
                        事務所からスカウトが届く
                      </p>
                    </div>
                    <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] mt-2 pb-2">
                      <p className="lg:text-[1rem] md:text-[0.7rem] text-xs font-bold text-[#999999] number pt-0.5">
                        2.
                      </p>
                      <p className="lg:text-[1rem] md:text-[0.7rem] text-xs text-[#343434]">
                        希望にあった求人が届く
                      </p>
                    </div>
                    <div className="flex items-center justify-start gap-1 border-b-[1.5px] w-2/3 border-b-[#999999] mt-2 pb-2">
                      <p className="lg:text-[1rem] md:text-[0.7rem] text-xs font-bold text-[#999999] number pt-0.5">
                        3.
                      </p>
                      <p className="lg:text-[1rem] md:text-[0.7rem] text-xs text-[#343434]">
                        会員限定機能が利用できる
                      </p>
                    </div>
                    <Link
                      to={"/members/sign_up"}
                      className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-tr from-[#FF1812] to-[#FF5B02] rounded-lg px-6 py-2 hover:scale-105 duration-300 lg:w-full w-[75%]"
                    >
                      <img
                        src="/assets/images/dashboard/mdi_account.png"
                        alt="register"
                        className="pt-0.5"
                      />
                      <p className="lg:text-lg md:text-sm text-xs text-white font-bold">
                        無料で会員登録する
                      </p>
                    </Link>
                  </div>
                </>
              )}
              <div className="flex items-center justify-start w-full mt-8">
                <p className="lg:text-lg md:text-sm text-xs text-[#343434] font-bold">
                  LINEでお問い合わせOK
                </p>
              </div>
              <div className="flex flex-col items-center bg-white rounded-lg px-6 py-6 w-full mt-8 shadow-xl">
                <img
                  src="/assets/images/dashboard/Rectangle 11.png"
                  alt="line"
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-start w-full mt-8">
                <p className="lg:text-lg md:text-sm text-xs text-[#343434] font-bold">
                  JobJob公式SNS
                </p>
              </div>
              <div className="flex flex-col items-center bg-white rounded-lg px-6 py-6 w-full mt-8 shadow-xl">
                <img
                  src="/assets/images/dashboard/Rectangle 11.png"
                  alt="line"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <Modal
          open={jobTypeModal}
          onCancel={() => setJobTypeModal(false)}
          footer={null}
          width={1200}
          className="modal"
        >
          <div className="min-h-80">
            <div className="grid grid-cols-7 w-full px-2">
              <button
                onClick={() => setType("1")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 duration-100 ${
                  isSelected("1") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <p className="text-xs lg:text-base font-bold text-[#343434] duration-300 ml-1">
                  医科
                </p>
              </button>
              <button
                onClick={() => setType("2")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 duration-100 ${
                  isSelected("2") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <p className="text-xs lg:text-base font-bold text-[#343434] duration-300 ml-1">
                  歯科
                </p>
              </button>
              <button
                onClick={() => setType("3")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 duration-100 ${
                  isSelected("3") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <p className="text-xs lg:text-base font-bold text-[#343434] duration-300 ml-1">
                  介護
                </p>
              </button>
              <button
                onClick={() => setType("4")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 duration-100 ${
                  isSelected("4") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <p className="text-xs lg:text-base font-bold text-[#343434] duration-300 ml-1">
                  保育
                </p>
              </button>
              <button
                onClick={() => setType("5")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 duration-100 ${
                  isSelected("5") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <p className="text-xs lg:text-base font-bold text-[#343434] duration-300 ml-1">
                  リハビリ／代替医療
                </p>
              </button>
              <button
                onClick={() => setType("6")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 duration-100 ${
                  isSelected("6") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <p className="text-xs lg:text-base font-bold text-[#343434] duration-300 ml-1">
                  その他
                </p>
              </button>
              <button
                onClick={() => setType("7")}
                className={`col-span-1 flex items-center justify-center hover:border-b-4 border-[#FF2A3B] py-2 duration-100 ${
                  isSelected("7") ? "border-b-4 border-[#FF2A3B]" : ""
                }`}
              >
                <p className="text-xs lg:text-base font-bold text-[#343434] duration-300 ml-1">
                  ヘルスケア／美容
                </p>
              </button>
            </div>
            {type === "1" && (
              <div className="grid grid-cols-3 gap-1 mt-4">
                {Object.keys(JobTypes.医科).map((jobType, index) => (
                  <button
                    key={index}
                    className="col-span-1 text-xs md:text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
                    onClick={() => {
                      setJobType(JobTypes.医科[jobType]);
                      setJobTypeModal(false);
                    }}
                  >
                    {jobType}
                  </button>
                ))}
              </div>
            )}
            {type === "2" && (
              <div className="grid grid-cols-3 gap-1 mt-4">
                {Object.keys(JobTypes.歯科).map((jobType, index) => (
                  <button
                    key={index}
                    className="col-span-1 text-xs md:text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
                    onClick={() => {
                      setJobType(JobTypes.歯科[jobType]);
                      setJobTypeModal(false);
                    }}
                  >
                    {jobType}
                  </button>
                ))}
              </div>
            )}
            {type === "3" && (
              <div className="grid grid-cols-3 gap-1 mt-4">
                {Object.keys(JobTypes.介護).map((jobType, index) => (
                  <button
                    key={index}
                    className="col-span-1 text-xs md:text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
                    onClick={() => setJobType(JobTypes.介護[jobType])}
                  >
                    {jobType}
                  </button>
                ))}
              </div>
            )}
            {type === "4" && (
              <div className="grid grid-cols-3 gap-1 mt-4">
                {Object.keys(JobTypes.保育).map((jobType, index) => (
                  <button
                    key={index}
                    className="col-span-1 text-xs md:text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
                    onClick={() => setJobType(JobTypes.保育[jobType])}
                  >
                    {jobType}
                  </button>
                ))}
              </div>
            )}
            {type === "5" && (
              <div className="grid grid-cols-3 gap-1 mt-4">
                {Object.keys(JobTypes["リハビリ／代替医療"]).map(
                  (jobType, index) => (
                    <button
                      key={index}
                      className="col-span-1 text-xs md:text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
                      onClick={() =>
                        setJobType(JobTypes["リハビリ／代替医療"][jobType])
                      }
                    >
                      {jobType}
                    </button>
                  )
                )}
              </div>
            )}
            {type === "6" && (
              <div className="grid grid-cols-3 gap-1 mt-4">
                {Object.keys(JobTypes.その他).map((jobType, index) => (
                  <button
                    key={index}
                    className="col-span-1 text-xs md:text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
                    onClick={() => setJobType(JobTypes.その他[jobType])}
                  >
                    {jobType}
                  </button>
                ))}
              </div>
            )}
            {type === "7" && (
              <div className="grid grid-cols-3 gap-1 mt-4">
                {Object.keys(JobTypes["ヘルスケア／美容"]).map(
                  (jobType, index) => (
                    <button
                      key={index}
                      className="col-span-1 text-xs md:text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-1 lg:py-[0.5rem] duration-300"
                      onClick={() =>
                        setJobType(JobTypes["ヘルスケア／美容"][jobType])
                      }
                    >
                      {jobType}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </Modal>
      }
      {
        <Modal
          open={prefectureModalOpen}
          onCancel={() => setPrefectureModalOpen(false)}
          footer={null}
          width={1000}
          height={800}
          className="modal"
        >
          <div className="grid grid-cols-7 w-full py-3">
            <div className="col-span-1 flex flex-col justify-start items-center">
              <div className="w-full px-4">
                <p className="lg:text-base md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">
                  関東
                </p>
              </div>
              <div className="flex flex-col w-full px-4">
                {Object.keys(Prefectures.KANTO).map((prefecture, index) => {
                  return (
                    <>
                      <Link
                        key={index}
                        to={
                          (jobType !== "" ? `/${jobType}` : "") +
                          `/${facility}` +
                          `/${Prefectures.KANTO[prefecture]}` +
                          (employmentType !== "" ? `/${employmentType}` : "")
                        }
                        className="md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                        onClick={() =>
                          onClickPref(Prefectures.KANTO[prefecture])
                        }
                      >
                        {prefecture}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-center">
              <div className="w-full px-4">
                <p className="md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">
                  関西
                </p>
              </div>
              <div className="flex flex-col w-full px-4">
                {Object.keys(Prefectures.KANSAI).map((prefecture, index) => {
                  return (
                    <>
                      <Link
                        key={index}
                        to={
                          (jobType !== "" ? `/${jobType}` : "") +
                          `/${facility}` +
                          `/${Prefectures.KANSAI[prefecture]}` +
                          (employmentType !== "" ? `/${employmentType}` : "")
                        }
                        className="md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                        onClick={() =>
                          onClickPref(Prefectures.KANSAI[prefecture])
                        }
                      >
                        {prefecture}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-cente4">
              <p className="md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">
                東海
              </p>
              <div className="flex flex-col w-full px-4">
                {Object.keys(Prefectures.TOKAI).map((prefecture, index) => {
                  return (
                    <>
                      <Link
                        key={index}
                        to={
                          (jobType !== "" ? `/${jobType}` : "") +
                          `/${facility}` +
                          `/${Prefectures.TOKAI[prefecture]}` +
                          (employmentType !== "" ? `/${employmentType}` : "")
                        }
                        className="md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                        onClick={() =>
                          onClickPref(Prefectures.TOKAI[prefecture])
                        }
                      >
                        {prefecture}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-center">
              <div className="w-full px-4">
                <p className="md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">
                  北海道・東北
                </p>
              </div>
              <div className="flex flex-col w-full px-4">
                {Object.keys(Prefectures.HOKKAIDO_TOHOKU).map(
                  (prefecture, index) => {
                    return (
                      <>
                        <Link
                          key={index}
                          to={
                            (jobType !== "" ? `/${jobType}` : "") +
                            `/${facility}` +
                            `/${Prefectures.HOKKAIDO_TOHOKU[prefecture]}` +
                            (employmentType !== "" ? `/${employmentType}` : "")
                          }
                          className="md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                          onClick={() =>
                            onClickPref(Prefectures.HOKKAIDO_TOHOKU[prefecture])
                          }
                        >
                          {prefecture}
                        </Link>
                      </>
                    );
                  }
                )}
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-center">
              <div className="w-full px-4">
                <p className="md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">
                  甲信越・北陸
                </p>
              </div>
              <div className="flex flex-col w-full px-4">
                {Object.keys(Prefectures.KOSHINETSU_HOKURIKU).map(
                  (prefecture, index) => {
                    return (
                      <>
                        <Link
                          key={index}
                          to={
                            (jobType !== "" ? `/${jobType}` : "") +
                            `/${facility}` +
                            `/${Prefectures.KOSHINETSU_HOKURIKU[prefecture]}` +
                            (employmentType !== "" ? `/${employmentType}` : "")
                          }
                          className="md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                          onClick={() =>
                            onClickPref(
                              Prefectures.KOSHINETSU_HOKURIKU[prefecture]
                            )
                          }
                        >
                          {prefecture}
                        </Link>
                      </>
                    );
                  }
                )}
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-center">
              <div className="w-full px-4">
                <p className="md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">
                  中部・近畿
                </p>
              </div>
              <div className="flex flex-col w-full px-4">
                {Object.keys(Prefectures.CHUGOKU_SHIKOKU).map(
                  (prefecture, index) => {
                    return (
                      <>
                        <Link
                          key={index}
                          to={
                            (jobType !== "" ? `/${jobType}` : "") +
                            `/${facility}` +
                            `/${Prefectures.CHUGOKU_SHIKOKU[prefecture]}` +
                            (employmentType !== "" ? `/${employmentType}` : "")
                          }
                          className="md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                          onClick={() =>
                            onClickPref(Prefectures.CHUGOKU_SHIKOKU[prefecture])
                          }
                        >
                          {prefecture}
                        </Link>
                      </>
                    );
                  }
                )}
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-start items-center">
              <div className="w-full px-4">
                <p className="md:text-sm text-xs font-bold text-[#343434] border-b-[1px] border-[#bdbdbd] w-full text-center py-3">
                  九州・沖縄
                </p>
              </div>
              <div className="flex flex-col w-full px-4">
                {Object.keys(Prefectures.KYUSHU_OKINAWA).map(
                  (prefecture, index) => {
                    return (
                      <>
                        <Link
                          key={index}
                          to={
                            (jobType !== "" ? `/${jobType}` : "") +
                            `/${facility}` +
                            `/${Prefectures.KYUSHU_OKINAWA[prefecture]}` +
                            (employmentType !== "" ? `/${employmentType}` : "")
                          }
                          className="md:text-sm text-sm text-[#343434] hover:text-[#FF2A3B] border-b-[1px] border-[#bdbdbd] w-full text-center py-[0.5rem] duration-300"
                          onClick={() =>
                            onClickPref(Prefectures.KYUSHU_OKINAWA[prefecture])
                          }
                        >
                          {prefecture}
                        </Link>
                      </>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </Modal>
      }
      {
        <Modal
          open={employmentTypeModalOpen}
          onCancel={() => setEmploymentTypeModalOpen(false)}
          footer={null}
          width={1000}
          height={800}
          className="modal"
        >
          <div className="w-full">
            <div className="w-full p-6">
              <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">
                雇用形態
              </p>
              <div className="flex items-center justify-start desire gap-4 mt-4">
                {Object.keys(EmploymentType).map((employmentTypeKey, index) => {
                  return (
                    <Checkbox
                      key={index}
                      onChange={() => {
                        setEmploymentType(EmploymentType[employmentTypeKey]);
                        setEmploymentTypeModalOpen(false);
                      }}
                      checked={
                        employmentType === EmploymentType[employmentTypeKey]
                      }
                    >
                      {employmentTypeKey}
                    </Checkbox>
                  );
                })}
              </div>
            </div>
            <div className="w-full p-6">
              <p className="lg:text-base md:text-md text-sm text-[#343434] font-bold">
                給与
              </p>
              <div className="flex items-center justify-start desire gap-2 mt-4">
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
                  月給
                </span>
                <div className="flex items-end w-1/4 gap-2">
                  <Select
                    options={monthlySalaryOptions}
                    onChange={(value) => setMonthlySalary(value)}
                    value={monthlySalary}
                    className="h-10"
                  />
                  <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                    万円以上
                  </span>
                </div>
                <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">
                  時給
                </span>
                <div className="flex items-end w-1/4 gap-2">
                  <Select
                    options={hourlySalaryOptions}
                    onChange={(value) => setHourlySalary(value)}
                    value={hourlySalary}
                    className="h-10"
                  />
                  <span className="lg:text-base md:text-sm text-xs text-[#343434]">
                    円以上
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] lg:px-12 md:px-8 px-2 md:py-2 py-1 rounded-lg my-6">
                検索する
              </button>
            </div>
          </div>
        </Modal>
      }
    </SkeletonGroup>
  );
};

export default CertaionFacility;

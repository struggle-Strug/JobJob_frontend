import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { message } from "antd";
import Loading from "../../../components/Loading";
import { getJobValueByKey } from "../../../utils/getFunctions";
import { Link } from "react-router-dom";

const Applied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState(null); // Store the expanded job ID

  const getAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/applied`
      );
      if (response.data.error) return message.error(response.data.message);
      setAppliedJobs(response.data.jobPosts);
    } catch {
      message.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };
  // const toggleJobDetails = (jobId) => {
  //   setExpandedJobId((prev) => (prev === jobId ? null : jobId)); // Toggle expansion
  // };

  useEffect(() => {
    document.title = "応募済み求人 | JobJob (ジョブジョブ)";
    getAppliedJobs();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
        <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
          応募済みの求人
        </p>
      </div>

      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-4">
        {appliedJobs.length === 0 ? (
          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            応募済みの求人はありません
          </p>
        ) : (
          appliedJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col w-full bg-[#F5F5F5] rounded-lg p-4 shadow-xl mt-4 hover:bg-[#EAEAEA] transition duration-300 cursor-pointer"
            >
              {/* Job Title */}
              <p className="lg:text-lg md:text-md text-sm font-bold text-[#343434] cursor-pointer">
                {job.sub_title}({job.type})
              </p>
              {/* Show details if this job is expanded */}
              <>
                <div className="mt-2 p-2 border-t border-gray-300">
                  <div className="flex flex-row items-start justify-start">
                    <p className="text-sm text-gray-700 w-1/5">
                      <strong>応募日時:</strong>
                    </p>
                    <pre className="text-sm text-gray-700 w-4/5">
                      {moment(job.message.created_at).format(
                        "YYYY/MM/DD HH:mm"
                      )}
                    </pre>
                  </div>
                  <div className="flex flex-row items-start justify-start">
                    <p className="text-sm text-gray-700 w-1/5">
                      <strong>雇用形態:</strong>
                    </p>
                    <pre className="text-sm text-gray-700 w-4/5">
                      {job.employment_type}
                    </pre>
                  </div>
                  <div className="flex flex-row items-start justify-start">
                    <p className="text-sm text-gray-700 w-1/5">
                      <strong>給与:</strong>
                    </p>
                    <pre className="text-sm text-gray-700 w-4/5">
                      {job.salary_min}円 〜 {job.salary_max}円
                    </pre>
                  </div>

                  <div className="flex flex-row items-start justify-start">
                    <p className="text-sm text-gray-700 w-1/5">
                      <strong>仕事内容:</strong>
                    </p>
                    <pre className="text-sm text-gray-700 w-4/5 break-words line-clamp-2">
                      {job.work_content}
                    </pre>
                  </div>
                  <div className="flex flex-row items-start justify-start">
                    <p className="text-sm text-gray-700 w-1/5">
                      <strong>応募要件:</strong>
                    </p>
                    <pre className="text-sm text-gray-700 w-4/5">
                      {job.qualification_content}
                    </pre>
                  </div>
                  <div className="mt-8">
                    <Link
                      to={`/${getJobValueByKey(job.type)}/details/${
                        job.jobpost_id
                      }`}
                      className="bg-[#FF2A3B] text-white px-4 py-2 rounded-lg hover:text-gray-300 duration-300"
                    >
                      詳細を見る
                    </Link>
                  </div>
                </div>
              </>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Applied;

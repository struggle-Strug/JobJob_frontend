"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { getJobTypeKeyByValue } from "../../utils/getFunctions";

const JobPosts = ({
  jobType,
  employmentType,
  monthlySalary,
  hourlySalary,
  feature,
  path,
}) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getJobPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/filter`,
        {
          pref: "",
          muni: "",
          JobType: jobType,
          employmentType: employmentType,
          monthlySalary: monthlySalary,
          hourlySalary: hourlySalary,
          feature: feature,
          page: 1,
        }
      );

      if (response.data?.jobposts) {
        setJobs(response.data.jobposts.slice(0, response.data.jobposts.length));
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Failed to fetch job posts:", error);
      message.error("求人情報の取得に失敗しました");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobPosts();
  }, []);

  // Function to handle job card click
  const handleJobClick = (jobId) => {
    navigate(`/${path}/${jobId}`);
  };

  // Render job cards
  const renderJobCards = () => {
    if (jobs.length === 0) {
      return (
        <div className="w-full py-8 text-center text-gray-500">
          該当する求人が見つかりませんでした
        </div>
      );
    }

    return (
      <>
        <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
          {`${jobType}の新着求人`}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
          {jobs.map((job) => (
            <Link
              key={job._id}
              aria-label={`${job.facility_id?.name}の${job.type}求人(
                ${job.employment_type[0]})`}
              to={`/${path}/${job.jobpost_id}`}
              className="job-card flex flex-col bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                  <img
                    src={
                      job?.picture?.length > 0
                        ? job.picture[0]
                        : "/assets/images/noimage.png"
                    }
                    alt={job.sub_title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-[#343434] line-clamp-2 mb-2">
                    {job.facility_id?.name}の{job.type}求人(
                    {job.employment_type[0]})
                  </h3>

                  <p className="text-xs text-[#343434] line-clamp-2 mb-3">
                    {job.sub_title}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-[#343434]">給与</span>
                      <span className="col-span-2 text-[#343434] line-clamp-1">
                        {job.employment_type[0]} {job.salary_type}{" "}
                        {job.salary_min}
                        円〜{job.salary_max}円
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-[#343434]">仕事内容</span>
                      <div className="col-span-2 text-[#343434] line-clamp-2 whitespace-pre-line">
                        {job.work_content}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-[#343434]">応募要件</span>
                      <div className="col-span-2 text-[#343434] line-clamp-2">
                        {job.qualification_content} {job.qualification_welcome}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      type="default"
                      size="small"
                      className="rounded-lg border-[#afafaf] hover:border-[#343434] hover:text-[#343434]"
                      onClick={() => handleJobClick(job.jobpost_id)}
                    >
                      詳しく見る
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  // Render loading skeleton
  const renderSkeleton = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 bg-white rounded-lg p-3 shadow-md"
          >
            <div className="w-full aspect-video bg-gray-200 rounded-lg animate-pulse"></div>

            <div className="flex-1 flex flex-col">
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-full"></div>

              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-1 mb-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse col-span-2"></div>
                </div>
              ))}

              <div className="mt-4 flex justify-end">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-4 px-4 md:px-8 bg-white rounded-lg shadow-lg mt-8">
      {loading ? renderSkeleton() : renderJobCards()}
    </div>
  );
};

export default JobPosts;

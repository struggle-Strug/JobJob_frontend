"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NearByJobs = ({ jobType, path }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const getJobPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/filter`,
        {
          pref: user?.prefecture,
          muni: user?.municipalities,
          JobType: jobType,
          employmentType: [],
          monthlySalary: "",
          hourlySalary: "",
          feature: [],
          page: 1,
        }
      );

      if (response.data?.jobposts) {
        setJobs(response.data.jobposts.slice(0, 10));
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
  console.log(jobs);

  useEffect(() => {
    getJobPosts();
  }, [user, jobType]);

  // Check if we can scroll left or right
  const checkScrollability = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollability);
      // Initial check
      checkScrollability();

      return () => {
        slider.removeEventListener("scroll", checkScrollability);
      };
    }
  }, [jobs, loading]);

  // Scroll functions
  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector(".job-card")?.offsetWidth + 16; // width + gap
      sliderRef.current.scrollBy({ left: -cardWidth * 2, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector(".job-card")?.offsetWidth + 16; // width + gap
      sliderRef.current.scrollBy({ left: cardWidth * 2, behavior: "smooth" });
    }
  };

  // Function to handle job card click
  const handleJobClick = (jobId) => {
    navigate(`/${path}/details/${jobId}`);
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
      <div className="relative w-full">
        {/* Slider navigation buttons */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Previous jobs"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Next jobs"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {/* Slider container */}
        <div
          ref={sliderRef}
          className="w-full overflow-x-auto pb-4 hide-scrollbar flex gap-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => handleJobClick(job.jobpost_id)}
              className="job-card flex-shrink-0 snap-start w-[280px] md:w-[320px] flex flex-col bg-white rounded-2xl p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative w-full aspect-video mb-3 overflow-hidden rounded-lg">
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

              <h3 className="text-sm font-bold text-[#343434] line-clamp-2 mb-2">
                {job.sub_title}の{job.type}求人({job.employment_type[0]})
              </h3>

              <p className="text-xs text-[#343434] line-clamp-2 mb-3">
                {job.sub_description}
              </p>

              <div className="flex-1 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-bold text-[#343434]">給与</span>
                  <span className="col-span-2 text-[#343434] line-clamp-1">
                    {job.employment_type[0]} {job.salary_type} {job.salary_min}
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
          ))}
        </div>
      </div>
    );
  };

  // Render loading skeleton
  const renderSkeleton = () => {
    return (
      <div className="w-full flex gap-4 overflow-x-hidden">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] md:w-[320px] flex flex-col bg-white rounded-2xl p-3 shadow-md"
          >
            <div className="w-full aspect-video bg-gray-200 rounded-lg animate-pulse mb-3"></div>
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
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-4 py-4 px-4 md:px-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-[#343434] font-bold text-xl md:text-2xl mb-4">
        近くの似ている求人
      </h2>

      {loading ? renderSkeleton() : renderJobCards()}

      {/* Add custom CSS to hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NearByJobs;

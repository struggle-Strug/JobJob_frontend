"use client";

import { Link } from "react-router-dom";
import { Skeleton, message } from "antd";
import { getJobValueByKey } from "../../utils/getFunctions";
import { useEffect, useState } from "react";
import axios from "axios";
import { JobType as jobType } from "../../utils/constants/categories";

/**
 * MeshLink02 Component
 * @param {Object} props
 * @param {string} props.category - The job category to display
 */
const MeshLink02 = ({ category }) => {
  // Internal state management
  const [toggle, setToggle] = useState(false);
  const [jobTypeNumbers, setJobTypeNumbers] = useState({});
  const [isJobTypeNumbersLoading, setIsJobTypeNumbersLoading] = useState(true);

  // Fetch job type numbers
  const getJobTypeNumbers = async () => {
    setIsJobTypeNumbersLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/number`
      );
      if (response.data.error) {
        message.error(response.data.message);
        return;
      }

      // Convert array to object for O(1) lookups
      const numbersObj = {};

      Object.keys(response.data?.JobPostsNumbers).forEach((key) => {
        numbersObj[key] = response.data?.JobPostsNumbers[key];
      });

      setJobTypeNumbers(numbersObj);
    } catch (error) {
      console.error("Error fetching job type numbers:", error);
    } finally {
      setIsJobTypeNumbersLoading(false);
    }
  };
  console.log(jobTypeNumbers);

  // Fetch data on component mount
  useEffect(() => {
    getJobTypeNumbers();
  }, []);

  return (
    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-2 px-2">
      <div className="w-full gap-2">
        <p
          className="text-base text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
          onClick={() => setToggle(!toggle)}
        >
          <span>{category}</span>
          <img
            src={"/assets/images/companytop/ep_arrow-right_red.png"}
            alt="arrow"
            className={`duration-300 ${!toggle ? "rotate-90" : "-rotate-90"}`}
          />
        </p>
      </div>
      <div
        className={`duration-300 overflow-hidden ${
          toggle ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col w-full pt-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
            {Object.keys(jobType[category] || {}).map((job, index) => {
              const count = jobTypeNumbers[job] || 0;

              return (
                <Link
                  aria-label={jobTypeNumbers?.[job]}
                  key={index}
                  to={`/${getJobValueByKey(job)}`}
                  className="col-span-1 flex items-start justify-between w-full lg:text-sm md:text-xs text-[0.6rem] text-[#188CE0] py-2 font-bold px-2 hover:underline duration-300 group"
                >
                  <p>
                    {job}
                    <span className="text-[#343434] text-xs">
                      {isJobTypeNumbersLoading ? (
                        <Skeleton.Button
                          active
                          size="small"
                          style={{
                            width: 30,
                            height: 16,
                            display: "inline-block",
                            marginLeft: 4,
                          }}
                        />
                      ) : (
                        `(${count})`
                      )}
                    </span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeshLink02;

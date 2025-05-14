import { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { getJobTypeValue } from "../../../utils/getFunctions";
import { JobType } from "../../../utils/constants/categories";
import SkeletonGroup from "../../../components/SkeletonGroup";

const Recent = () => {
  const [recents, setRecents] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getJobPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/jobpost/favouriteorrecent`,
        { data: recents }
      );
      if (response.data.error) return message.error(response.data.message);
      setJobPosts(response.data.jobPosts);
    } catch {
      message.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobPosts();
  }, [recents]);

  useEffect(() => {
    const storedRecents = localStorage.getItem("recents");
    if (storedRecents) {
      setRecents(JSON.parse(storedRecents)); // Ensure we parse it as an array
    } else {
      setRecents([]);
      localStorage.setItem("recents", JSON.stringify([]));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <SkeletonGroup isLoading={loading}>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
          <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
            最近見た求人
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {recents?.length === 0 && (
            <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
              最近見た求人はありません
            </p>
          )}
          {jobPosts?.map((jobPost, index) => {
            return (
              <div className="flex rounded-lg w-full h-40">
                {jobPost.picture.length > 0 ? (
                  <img
                    src={jobPost.picture[0]}
                    alt="image"
                    className="w-1/2 object-cover rounded-l-lg"
                  />
                ) : (
                  <img
                    src={"/assets/images/noimage.png"}
                    alt="image"
                    className="w-1/2 object-cover rounded-l-lg"
                  />
                )}
                <div className="flex flex-col bg-white rounded-r-lg p-2 h-full justify-between w-1/2">
                  <div>
                    <p className="text-[0.9rem] font-bold text-[#FF2A3B] break-words line-clamp-1">
                      {jobPost.facility_id.name}の{jobPost.type}求人
                    </p>
                    <p className="text-xs text-[#343434]">
                      {jobPost.sub_title}
                    </p>
                    <p className="text-xs text-[#343434]">{jobPost.type}</p>
                  </div>

                  <div className="flex justify-center gap-4 w-full">
                    <Link
                      to={`/${getJobTypeValue(JobType, jobPost.type)}/apply/${
                        jobPost.jobpost_id
                      }`}
                      className="bg-[#FF2A3B] text-white w-1/2 text-center rounded-lg py-1 hover:shadow-2xl hover:scale-[1.02] duration-300"
                    >
                      応募画面に進む
                    </Link>
                    <Link
                      to={`/${getJobTypeValue(JobType, jobPost.type)}/${
                        jobPost.jobpost_id
                      }`}
                      className="bg-[#e7e7e7] text-[#FF2A3B] w-1/2 text-center rounded-lg py-1 hover:shadow-2xl hover:scale-[1.02] duration-300"
                    >
                      詳細を見る
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SkeletonGroup>
  );
};

export default Recent;

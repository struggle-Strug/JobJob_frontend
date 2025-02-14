import { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { getJobTypeValue } from "../../../utils/getFunctions";
import { JobType } from "../../../utils/constants/categories";

const Favorites = () => {
  const [likes, setLikes] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);

  const getJobPosts = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/favouriteorrecent`,
      { data: likes }
    );
    if (response.data.error) return message.error(response.data.message);
    setJobPosts(response.data.jobPosts);
  };

  useEffect(() => {
    getJobPosts();
  }, [likes]);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes)); // Ensure we parse it as an array
    } else {
      setLikes([]);
      localStorage.setItem("likes", JSON.stringify([]));
    }
  }, []);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
        <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
          気になる求人
        </p>
        <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">
          気になる求人に登録すると、その求人からスカウトが届きやすくなります。募集を休止している求人の場合は、募集再開時にメールにてお知らせをお送りいたします。
        </p>
      </div>
      <div className="mt-4">
        {likes?.length === 0 && (
          <>
            <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
              応募済みの求人はありません
            </p>
            <div className="flex items-center gap-4 bg-[#FAF3E3] rounded-lg p-4 mt-4 w-full">
              <img
                src={"/assets/images/MyPage/favourite.png"}
                alt="気になる求人に登録する"
                className="lg:w-10 md:w-8 w-6"
              />
              <div className="w-full">
                <p className="lg:text-lg md:text-[1rem] text-sm font-bold text-[#343434]">
                  気になる求人に登録する
                </p>
                <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">
                  気になることが事業所に伝わり、通常の応募より内定率が1.7倍高いスカウトが届きやすくなります！
                </p>
              </div>
            </div>
          </>
        )}
        {jobPosts?.map((jobPost, index) => {
          return (
            <div className="flex rounded-lg w-full h-40">
              <img
                src={jobPost.picture}
                alt="image"
                className="w-1/2 object-cover rounded-l-lg"
              />
              <div className="flex flex-col bg-white rounded-r-lg p-2 h-full justify-between">
                <div>
                  <p className="text-[0.9rem] font-bold text-[#FF2A3B] break-words line-clamp-1">
                    {jobPost.facility_id.name}の{jobPost.type}求人
                  </p>
                  <p className="text-xs text-[#343434]">{jobPost.sub_title}</p>
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
                    to={`/${getJobTypeValue(JobType, jobPost.type)}/details/${
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
  );
};

export default Favorites;

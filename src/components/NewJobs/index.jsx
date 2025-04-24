import React from "react";
import { Link } from "react-router-dom";

const NewJobs = () => {
  return (
    <div className="container mt-4 py-4 px-12 bg-white rounded-lg shadow-xl">
      <p className="text-[#343434] font-bold lg:text-2xl md:text-xl">
        なるほど! ジョブジョブ新着記事
      </p>
      <div className="flex justify-center w-full">
        <Link
          to={"/knowhow"}
          className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#188CE0] hover:text-[#343434] lg:px-8 md:px-6 px-4 lg:py-2 py-1 rounded-lg my-2 mt-8"
        >
          なるほど! ジョブジョブをもっと見る
        </Link>
      </div>
    </div>
  );
};

export default NewJobs;

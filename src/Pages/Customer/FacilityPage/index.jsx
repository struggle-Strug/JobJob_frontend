import { message, Pagination } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FacilityDetail from "./FacilityDetail";
import { useAuth } from "../../../context/AuthContext";

const FacilityPage = () => {
  const { customer } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  const [facility, setFacility] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11; // Number of facilities to show per page

  const getFacilities = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/facility`
    );
    setFacilities(response.data.facility);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getJobPosts = useCallback(async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/jobpost/facility/${id}`
    );
    setJobPosts(response.data.jobposts);
  }, []);

  const getFacility = useCallback(async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/facility/${id}`
    );
    setFacility(response.data.facility);
  }, []);

  const onClick = (id) => {
    getJobPosts(id);
    getFacility(id);
  };

  useEffect(() => {
    document.title = "施設・求人管理";
    getFacilities();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const paginatedFacilities = facilities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-4 w-full bg-white rounded-lg shadow-xl min-h-screen">
        <div className="col-span-1 border-r-[1px] border-[#e7e7e7] p-4 flex flex-col">
          <Link
            to={"/customers/facility/add"}
            className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] px-2 lg:py-4 md:py-2 py-1 rounded-lg"
          >
            施設を新規登録
          </Link>
          {paginatedFacilities?.map((facility) => (
            <div
              key={facility._id}
              className="flex w-full justify-start mt-3 gap-4 cursor-pointer hover:bg-[#e9e9e9] rounded-lg p-2 duration-300"
              onClick={() => onClick(facility.facility_id)}
            >
              <img
                src={facility.photo[0]}
                alt={facility.name}
                className="w-1/3 object-cover rounded-lg"
              />
              <p className="lg:text-sm text-xs">{facility.name}</p>
            </div>
          ))}
          {facilities?.length > 11 && (
            <Pagination
              current={currentPage}
              total={facilities?.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              itemRender={(page, type, originalElement) => {
                if (type === "prev") {
                  return <a>&lt;</a>;
                }
                if (type === "next") {
                  return <a>&gt;</a>;
                }
                if (
                  page === 1 ||
                  page === Math.ceil(facilities.length / itemsPerPage)
                ) {
                  return <a>{page}</a>; // Show first and last pages
                }
                if (page >= currentPage - 1 && page <= currentPage + 1) {
                  return <a>{page}</a>; // Show current and neighboring pages
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span>...</span>; // Show "..." around skipped pages
                }
                return null;
              }}
              className="mt-4 w-32 overflow-x-scroll"
            />
          )}
        </div>
        <div className="col-span-3">
          {facility ? (
            <FacilityDetail
              facility={facility}
              jobPosts={jobPosts}
              setJobPosts={setJobPosts}
            />
          ) : (
            <p className="text-left text-lg font-bold text-[#343434] p-4">
              施設を選択してください。
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityPage;

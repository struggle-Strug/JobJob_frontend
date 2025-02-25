import { Link, useLocation } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {
  getAllJobTypeValues,
  getAllPrefectureValues,
  getJobTypeKeyByValue,
  getPrefectureKeyByValue,
} from "../../utils/getFunctions";

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/");

  return (
    <nav className="text-gray-600 text-sm  px-4 py-1 bg-[#EFEFEF]">
      <ul className="flex items-center space-x-2 container bg-white py-1 px-2 rounded-lg border-y-[1px] border-[#e7e7e7]">
        <li>
          <Link
            to="/"
            className="hover:underline hover:text-black flex items-center gap-0.5"
          >
            <IoIosHome />
            <IoIosArrowForward className="w-2" />
          </Link>
        </li>
        {getAllJobTypeValues().includes(pathnames[1]) &&
          pathnames.length === 2 && (
            <li>
              <span className="text-xs text-[#343434]">
                {getJobTypeKeyByValue(pathnames[1])}求人トップ
              </span>
            </li>
          )}
        {getAllJobTypeValues().includes(pathnames[1]) &&
          pathnames.length === 3 &&
          getAllPrefectureValues().includes(pathnames[2]) && (
            <>
              <li>
                <Link
                  to={`/${pathnames[1]}`}
                  className="text-xs text-[#343434] hover:text-black hover:underline duration-300"
                >
                  {getJobTypeKeyByValue(pathnames[1])}の求人
                </Link>
              </li>
              <IoIosArrowForward className="w-2" />

              <li>
                <span className="text-xs text-[#343434]">
                  {getPrefectureKeyByValue(pathnames[2])}の
                  {getJobTypeKeyByValue(pathnames[1])}求人
                </span>
              </li>
            </>
          )}
      </ul>
    </nav>
  );
};

export default BreadCrumb;

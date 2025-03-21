import { Link, useLocation } from "react-router-dom";
import { IoIosHome, IoIosArrowForward } from "react-icons/io";
import {
  getAllJobTypeValues,
  getJobTypeKeyByValue,
  getAllPrefectureValues,
  getPrefectureKeyByValue,
} from "../../utils/getFunctions";

const BreadCrumb = () => {
  const location = useLocation();
  // "modal", "search", "select" などのセグメントは除外する
  const filteredPathnames = location.pathname
  .split("/")
  .filter((segment) => segment && !["modal", "search", "select"].includes(segment));


  return (
    <nav className="text-gray-600 text-sm px-4 py-1 bg-[#EFEFEF]">
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
        {/* 例えば、1つ目のセグメントが求人種別の場合 */}
        {getAllJobTypeValues().includes(filteredPathnames[0])  && (
          <li>
            <span className="text-xs text-[#343434]">
              {getJobTypeKeyByValue(filteredPathnames[0])}求人トップ
            </span>
          </li>
        )}
        {/* 2つ目のセグメントが都道府県の場合 */}
        {getAllJobTypeValues().includes(filteredPathnames[0]) &&
          getAllPrefectureValues().includes(filteredPathnames[1]) && (
            <>
              <li>
                <Link
                  to={`/${filteredPathnames[0]}`}
                  className="text-xs text-[#343434] hover:text-black hover:underline duration-300"
                >
                  {getJobTypeKeyByValue(filteredPathnames[0])}の求人
                </Link>
              </li>
              <IoIosArrowForward className="w-2" />
              <li>
                <span className="text-xs text-[#343434]">
                  {getPrefectureKeyByValue(filteredPathnames[1])}の
                  {getJobTypeKeyByValue(filteredPathnames[0])}求人
                </span>
              </li>
            </>
          )}
        {/* 必要に応じて、他のパス構成にも対応 */}
      </ul>
    </nav>
  );
};

export default BreadCrumb;

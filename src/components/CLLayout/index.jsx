import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CLLayout = () => {
  const { customer } = useAuth();
  return (
    <div>
      {/* Fixed Header Bar */}
      <header className="fixed top-0 left-0 w-full bg-[#343434] text-white shadow-md z-50 px-6 py-4">
        <div className="clcontainer flex justify-between items-center">
          <div className="flex gap-4">
            <Link to={"/company"}>
              <img
                src="/assets/images/companytop/logo_negative_horizontal00_1.png"
                alt="logo"
                className="w-24 hover:scale-105 duration-300"
              />
            </Link>
            <p className="lg:text-base text-sm font-bold">
              {customer?.companyName} | {customer?.email ? customer?.email : ""}
            </p>
          </div>
          <Link to={"#"} className="lg:text-base text-sm font-bold">
            ヘルプ
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <Outlet />
    </div>
  );
};

export default CLLayout;

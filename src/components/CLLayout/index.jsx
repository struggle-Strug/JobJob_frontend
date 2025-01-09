import { Link, Outlet } from "react-router-dom";

const CLLayout = () => {
    return (
      <div>
        {/* Fixed Header Bar */}
        <header className="fixed top-0 left-0 w-full bg-[#343434] text-white shadow-md z-50 px-6 py-4">
            <Link to={"/company"}>
                <img src="/assets/images/companytop/logo_negative_horizontal00 1.png" alt="logo" className='w-24'/>
            </Link>
        </header>
  
        {/* Page Content */}
        <Outlet />
      </div>
    );
  };
  
  export default CLLayout;
  
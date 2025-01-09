import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useAuth } from "../../context/AuthContext";

const CSLayout = () => {
    const {isAuthenticated, user} = useAuth();

    return (
        <>
            <Header user={user} isAuthenticated={isAuthenticated} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default CSLayout;

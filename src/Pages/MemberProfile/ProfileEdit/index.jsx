import { useLocation } from "react-router-dom";
import Basic from "./Basic";

const Edit = () => {
    const { pathname } = useLocation();
    const path = pathname.split('/').pop();
    return (
        <>
            {path === "basic" && 
                <Basic />
            }
        </>
    )
}

export default Edit;
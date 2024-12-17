import { useLocation } from "react-router-dom";
import Basic from "./Basic";
import Education from "./Education";
import WorkHistory from "./WorkHistory";
import Desire from "./Desire";

const Edit = () => {
    const { pathname } = useLocation();
    const path = pathname.split('/').pop();
    return (
        <>
            {path === "basic" && 
                <Basic />
            }
            {path === "education" && 
                <Education />
            }
            {path === "work_history" && 
                <WorkHistory />
            }
            {path === "desire" && 
                <Desire />
            }
        </>
    )
}

export default Edit;
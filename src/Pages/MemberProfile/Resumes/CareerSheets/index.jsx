import { useLocation } from "react-router-dom";
import CareersheetsDetail from "./CareersheetsDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

const Careersheets = () => {
    const { user } = useAuth();
    const [careerSheet, setCareerSheet] = useState(null);
    const {pathname} = useLocation();
    const path = pathname.split('/').pop();
    
    const getCareerSheet = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/career/${path}`);
        setCareerSheet(res.data.careerSheet);
    }

    useEffect(() => {
      (path !== "new") && getCareerSheet()
    },[path]);
    return (
        path == "new" ? <CareersheetsDetail careerSheet={user} path={path}/> : <CareersheetsDetail careerSheet={careerSheet} path={path}/>
    )
}

export default Careersheets;

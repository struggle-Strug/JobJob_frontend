import { useLocation } from "react-router-dom";
import RirekiDetail from "./RirekiDetail";
import { useEffect, useState } from "react";
import axios from "axios";

const Rireki = () => {

    const [rireki, setRireki] = useState(null);
    const {pathname} = useLocation();
    const path = pathname.split('/').pop();
    
    const getRireki = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/rireki/${path}`);
        setRireki(res.data.rireki);
    }

    useEffect(() => {
        getRireki()
    },[]);

    return (
        <RirekiDetail rireki={rireki}/>
    )
}

export default Rireki;
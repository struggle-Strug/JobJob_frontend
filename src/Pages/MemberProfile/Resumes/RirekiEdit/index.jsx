import { useLocation } from "react-router-dom";
import BasicEdit from "./BasicEdit";
import EducationEdit from "./EducationEdit";
import axios from "axios";
import { useEffect, useState } from "react";

const RirekiEdit = () => {
    const [rireki, setRireki] = useState(null);

    const { pathname } = useLocation();
    const path = pathname.split('/').pop();
    const type = pathname.split('/').slice(-2)[0];

    const getRireki = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/rireki/${path}`);
        setRireki(res.data.rireki);
    }
    useEffect(() => {
        getRireki()
    },[]);

      // Show a loading state or null while data is being fetched
    if (!rireki) {
        return <div>読み込み中...</div>;
    }
    return (
        <>
            {type === "basic" && <BasicEdit rireki={rireki}/>}
            {type === "education" && <EducationEdit rireki={rireki}/>}
        </>
    )
}

export default RirekiEdit;
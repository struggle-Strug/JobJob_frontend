import { useLocation } from "react-router-dom";
import BasicEdit from "./BasicEdit";
import EducationEdit from "./EducationEdit";
import axios from "axios";
import { useEffect, useState } from "react";
import WorkHistoryEdit from "./WorkHistoryEdit";
import QualificationEdit from "./QualificationEdit";
import OtherEdit from "./OtherEdit";
import DesireEdit from "./DesireEdit";
import DateEdit from "./DateEdit";
import { useCallback } from "react";

const RirekiEdit = () => {
  const [rireki, setRireki] = useState(null);

  const { pathname } = useLocation();
  const path = pathname.split("/").pop();
  const type = pathname.split("/").slice(-2)[0];

  const getRireki = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/rireki/${path}`
    );
    setRireki(res.data.rireki);
  }, []);
  useEffect(() => {
    getRireki();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Show a loading state or null while data is being fetched
  if (!rireki) {
    return <div>読み込み中...</div>;
  }
  return (
    <>
      {type === "basic" && <BasicEdit rireki={rireki} />}
      {type === "education" && <EducationEdit rireki={rireki} />}
      {type === "work_history" && <WorkHistoryEdit rireki={rireki} />}
      {type === "qualification" && <QualificationEdit rireki={rireki} />}
      {type === "other" && <OtherEdit rireki={rireki} />}
      {type === "desire" && <DesireEdit rireki={rireki} />}
      {type === "date" && <DateEdit rireki={rireki} />}
    </>
  );
};

export default RirekiEdit;

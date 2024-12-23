import { Checkbox, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { getDateOptions } from "../../../../utils/date";
import { Qualifications } from "../../../../utils/constants/categories";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const QualificationEdit = ({rireki}) => {
    const [qualification, setQualification] = useState(
        [{
            qualification: "",
            year: "",
            month: "",
            deleted: false
        }]
    );
    const [isQualificationOtherOpen, setIsQualificationOtherOpen] = useState(false);
    const [qualificationOther, setQualificationOther] = useState([]);
    const [isQualificationOpen, setIsQualificationOpen] = useState(false);


    const { yearsOptions, monthsOptions } = getDateOptions();

    const navigate = useNavigate();

    const qualificationKeys = [
        ...Object.keys(Qualifications.REQUIRED),
        ...Object.keys(Qualifications.OTHERS)
    ];

    const handleQualificationOtherSave = async () => {
        const addedQualifications = qualificationOther.map(qualification => ({qualification: qualification, year: "", month: "", deleted: false}))
        
        setQualification(prev => [...prev, ...addedQualifications])
        setIsQualificationOtherOpen(false)
    }

    // Modified to handle removing qualifications
    const handleQualificationChange = (qualification, checked) => {
        if (!checked) {
            setQualification(prev => 
                prev.map(q => 
                    q.qualification === qualification 
                        ? { ...q, deleted: true }
                        : q
                )
            );
        } else {
            setQualification(prev => 
                prev.map(q => 
                    q.qualification === qualification 
                        ? { ...q, deleted: false }
                        : q
                )
            );
        }
    };

    const updateQualificationDate = (qualification, field, value) => {
        setQualification(prev => 
            prev.map(q => 
                q.qualification === qualification 
                    ? { ...q, [field]: value }
                    : q
            )
        );
    };

    const handleSave = async () => {
        let qualificationData = [];
        if(!isQualificationOpen) {
            qualificationData = [];
            const resData = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rireki/update/qualification/${rireki._id}`, qualificationData);
            if(resData.data.error) return message.error(resData.data.message);
            message.success(resData.data.message);
            navigate(`/members/resumes/rireki/detail/${rireki._id}`);
        }
        const realQualifications = qualification.filter(qualification => !qualification.deleted);
        qualificationData = realQualifications.map(qualification => ({qualification: qualification.qualification, year: qualification.year, month: qualification.month}));
        const resData = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rireki/update/qualification/${rireki._id}`, qualificationData);
        if(resData.data.error) return message.error(resData.data.message);
        message.success(resData.data.message);
        navigate(`/members/resumes/rireki/detail/${rireki._id}`);
    }


    useEffect(() => {
        setQualification(rireki?.qualification.map(qualification => ({ qualification: qualification.qualification, year: qualification.year, month: qualification.month, deleted: false })));
    }, []);

    return (
        <>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">免許・資格</p>
                <div className="flex items-center justify-between w-full mt-2">
                    <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
                <div className="flex items-start justify-start w-full">

                    <div className="flex items-center justify-start gap-1 w-2/5 pt-2">
                        <span className="lg:text-base md:text-sm text-xs text-[#343434]">資格/取得年月</span>
                    </div>
                    <div className="flex flex-col w-3/5">
                        <div className="flex flex-col items-start justify-start w-full">
                            <Checkbox className="lg:text-sm md:text-xs text-xs font-bold w-full bg-[#EFEFEF] rounded-lg text-[#343434] p-2 border-none" checked={isQualificationOpen} onClick={() => setIsQualificationOpen(!isQualificationOpen)}>資格を持っている</Checkbox>
                        </div>
                        <div className="flex flex-col w-full bg-[#EFEFEF] rounded-lg mt-4" style={{display: isQualificationOpen ? "block" : "none"}}>
                            <button className="lg:text-sm md:text-xs text-xs font-bold text-white bg-[#ff9a9a] rounded-lg p-2 border-none mt-4 ml-2" onClick={() => setIsQualificationOtherOpen(!isQualificationOtherOpen)}>上記以外の資格を追加</button>
                            {qualification.map((qualification) => (
                                <div key={qualification.qualification} className="my-4 px-2">
                                    <div className="flex items-center mb-2 qualification">
                                        <Checkbox
                                            checked={!qualification.deleted}
                                            onChange={(e) => handleQualificationChange(qualification.qualification, e.target.checked)}
                                        >
                                            {qualification.qualification}
                                        </Checkbox>
                                    </div>
                                    <div className="flex items-center gap-2 ml-6">
                                        <Select
                                            options={yearsOptions}
                                            value={qualification.year}
                                            onChange={(value) => updateQualificationDate(qualification.qualification, 'year', value)}
                                            className="w-24"
                                            disabled={qualification.deleted}
                                        />
                                        <span>年</span>
                                        <Select
                                            options={monthsOptions}
                                            value={qualification.month}
                                            onChange={(value) => updateQualificationDate(qualification.qualification, 'month', value)}
                                            className="w-24"
                                            disabled={qualification.deleted}
                                        />
                                        <span>月</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-8 gap-4">
                    <Link to={`/members/resumes/rireki/detail/${rireki?._id}`} className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300">もどる</Link>
                    <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={handleSave}>保存する</button>
                </div>
            </div>

            {isQualificationOtherOpen && 
                <Modal
                open={isQualificationOtherOpen}
                onCancel={() => setIsQualificationOtherOpen(false)}
                footer={null}
                width={1000}
                height={800}
                >
                    <div className="flex flex-col items-center w-full">
                        <div className="flex items-center justify-between gap-2 w-full flex-wrap p-4 overflow-scroll h-[40rem] overflow-x-hidden">
                            {qualificationKeys.map((qualificationKey) => (
                                    <Checkbox
                                        key={qualificationKey} // Ensure to provide a unique key
                                        className="lg:text-sm md:text-sm text-xs text-[#000000] w-1/5 px-2 py-2 border-none bg-[#EFEFEF] rounded-lg"
                                        value={qualificationKey} // Set the value prop
                                        disabled={qualification.some(detail => detail.qualification === qualificationKey)}
                                        onChange={(e) => {
                                            const { checked } = e.target; // Get the checked state
                                            if (checked) {
                                                // If checked, add the qualification to the state
                                                setQualificationOther((prev) => [...prev, qualificationKey]);
                                            }
                                        }}
                                    >
                                        {qualificationKey}
                                    </Checkbox>
                            ))}
                        </div>
                        <button className="lg:text-base md:text-sm text-xs text-white bg-[#ff6e7a] hover:bg-[#ff1d30] p-2 rounded-lg w-40 mt-8" onClick={handleQualificationOtherSave}>資格を追加する</button>
                    </div>
                </Modal>
            }
        </>
    )
}

export default QualificationEdit;
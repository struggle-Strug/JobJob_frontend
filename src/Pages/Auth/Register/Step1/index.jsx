import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import { JobType as JobTypes } from "../../../../utils/constants/categories/jobtype";

const Step1 = ({ jobType, setJobType }) => {
    const [toggleMedical, setToggleMedical] = useState(false);
    const [toggleDentist, setToggleDentist] = useState(false);
    const [toggleNursing, setToggleNursing] = useState(false);
    const [toggleChildcare, setToggleChildcare] = useState(false);
    const [toggleRehabilitation, setToggleRehabilitation] = useState(false);
    const [toggleOther, setToggleOther] = useState(false);
    const [toggleHealthcare, setToggleHealthcare] = useState(false);

    const medicalKeys = Object.keys(JobTypes.医科);
    const dentistKeys = Object.keys(JobTypes.歯科);
    const nursingKeys = Object.keys(JobTypes.介護);
    const childcareKeys = Object.keys(JobTypes.保育);
    const rehabilitationKeys = Object.keys(JobTypes["リハビリ／代替医療"]);
    const otherKeys = Object.keys(JobTypes.その他);
    const healthcareKeys = Object.keys(JobTypes["ヘルスケア／美容"]);

    const onChange = (category, values) => {
        setJobType(prevJobType => {
            const otherCategories = prevJobType.filter(job => !Object.keys(JobTypes[category]).includes(job.type));
            const newJobs = values.map(value => ({ type: value, period: "" }));
            return [...otherCategories, ...newJobs];
        });
    };

    const createOptions = (keys) => keys.map((item) => ({
        label: item,
        value: item
    }));

    const medicalOptions = createOptions(medicalKeys);
    const dentistOptions = createOptions(dentistKeys);
    const nursingOptions = createOptions(nursingKeys);
    const childcareOptions = createOptions(childcareKeys);
    const rehabilitationOptions = createOptions(rehabilitationKeys);
    const otherOptions = createOptions(otherKeys);
    const healthcareOptions = createOptions(healthcareKeys);

    const renderCheckboxGroup = (category, options, toggle, setToggle) => (
        <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
                <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                   onClick={() => setToggle(!toggle)}>
                    <span>{category}</span>
                    <img 
                        src={'/assets/images/top/ep_arrow-right_red.png'} 
                        alt="arrow" 
                        className={`duration-300 ${!toggle ? "rotate-90" : "-rotate-90"}`}
                    />
                </p>
            </div>
            <div className={`duration-300 overflow-hidden ${toggle ? "opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="mt-4">
                    <Checkbox.Group
                        options={options}
                        value={jobType.filter(job => Object.keys(JobTypes[category]).includes(job.type)).map(job => job.type)}
                        onChange={(values) => onChange(category, values)}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>希望職種</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    {renderCheckboxGroup("医科", medicalOptions, toggleMedical, setToggleMedical)}
                    {renderCheckboxGroup("歯科", dentistOptions, toggleDentist, setToggleDentist)}
                    {renderCheckboxGroup("介護", nursingOptions, toggleNursing, setToggleNursing)}
                    {renderCheckboxGroup("保育", childcareOptions, toggleChildcare, setToggleChildcare)}
                    {renderCheckboxGroup("リハビリ／代替医療", rehabilitationOptions, toggleRehabilitation, setToggleRehabilitation)}
                    {renderCheckboxGroup("その他", otherOptions, toggleOther, setToggleOther)}
                    {renderCheckboxGroup("ヘルスケア／美容", healthcareOptions, toggleHealthcare, setToggleHealthcare)}
                </div>
            </div>
        </>
    );
};

export default Step1;


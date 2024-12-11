import { useState } from "react";
import { Checkbox } from "antd";
import { JobType as JobTypes } from "../../../../utils/constants/categories/jobtype";

const Step1 = ({setJobType}) => {
    const [toggleMedical, setToggleMedical] = useState(false);
    const [toggleDentist, setToggleDentist] = useState(false);
    const [toggleNursing, setToggleNursing] = useState(false);
    const [toggleChildcare, setToggleChildcare] = useState(false);
    const [toggleRehabilitation, setToggleRehabilitation] = useState(false);
    const [toggleOther, setToggleOther] = useState(false);
    const [toggleHealthcare, setToggleHealthcare] = useState(false);
    const medicalKeys = Object.keys(JobTypes.MEDICAL);
    const dentistKeys = Object.keys(JobTypes.DENTISTRY);
    const nursingKeys = Object.keys(JobTypes.NURSING);
    const childcareKeys = Object.keys(JobTypes.CHILDCARE);
    const rehabilitationKeys = Object.keys(JobTypes.REHABILITATION);
    const otherKeys = Object.keys(JobTypes.OTHER);
    const healthcareKeys = Object.keys(JobTypes.HEALTHCARE);
    const onChange = (value) => {
        setJobType(value)
    }
    const medicalOptions = medicalKeys.map((item) => {
        return {
            label: item,
            value: JobTypes.MEDICAL[item]
        }
    })
    
    const dentistOptions = dentistKeys.map((item) => {
        return {
            label: item,
            value: JobTypes.DENTISTRY[item]
        }
    })
    const nursingOptions = nursingKeys.map((item) => {
        return {
            label: item,
            value: JobTypes.NURSING[item]
        }
    })
    const childcareOptions = childcareKeys.map((item) => {
        return {
            label: item,
            value: JobTypes.CHILDCARE[item]
        }
    })
    const rehabilitationOptions = rehabilitationKeys.map((item) => {
        return {
            label: item,
            value: JobTypes.REHABILITATION[item]
        }
    })
    const otherOptions = otherKeys.map((item) => {
        return {
            label: item,
            value: JobTypes.OTHER[item]
        }
    })
    const healthcareOptions = healthcareKeys.map((item) => {
        return {
            label: item,
            value: JobTypes.HEALTHCARE[item]
        }
    })

    return (
        <>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>希望職種</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleMedical(!toggleMedical)}>
                                <p>
                                    医科
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleMedical ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleMedical ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={medicalOptions}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleDentist(!toggleDentist)}>
                                <p>
                                    歯科
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleDentist ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleDentist ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={dentistOptions}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleNursing(!toggleNursing)}>
                                <p>
                                介護
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleNursing ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleNursing ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={nursingOptions}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleChildcare(!toggleChildcare)}>
                                <p>
                                保育
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleChildcare ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleChildcare ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={childcareOptions}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleRehabilitation(!toggleRehabilitation)}>
                                <p>
                                リハビリ／代替医療
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleRehabilitation ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleRehabilitation ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={rehabilitationOptions}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleOther(!toggleOther)}>
                                <p>
                                その他
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleOther ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleOther ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={otherOptions}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-b-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleHealthcare(!toggleHealthcare)}>
                                <p>
                                    ヘルスケア／美容
                                </p>
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleHealthcare ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleHealthcare ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                <Checkbox.Group
                                    options={healthcareOptions}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step1;

import { Checkbox } from "antd";
import { facilities, paysystems } from "../../../../utils/constants/categories";

const Step4 = ({setFacilityType, setPaymentMethod}) => {
    const facilityKeys = Object.keys(facilities);
    const paysystemsKeys = Object.keys(paysystems);
    const facilityOptions = facilityKeys.map(key => ({
        label: key,
        value: facilities[key]
    }));
    const paysystemsOptions = paysystemsKeys.map(key => key);

    const onChangePaymentMethod = (value) => {
        setPaymentMethod(value);
    }

    const onChangeFacilityType = (value) => {
        setFacilityType(value);
    }
    return (
        <>
            <div className="flex justify-between w-full mt-12">
                    <div className="flex items-start gap-2 justify-end">
                        <p>施設ジャンル</p>
                        <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                    </div>
                    <div className="flex flex-col w-4/5">
                        <div className="flex flex-col px-2">
                            <div className="duration-300 overflow-hidden">
                                <div className="mt-[-0.5rem]">
                                    <Checkbox.Group
                                        options={facilityOptions}
                                        onChange={onChangeFacilityType}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                    <div className="flex items-start gap-2 justify-end">
                        <p>給与体系</p>
                        <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                    </div>
                    <div className="flex flex-col w-4/5">
                        <div className="flex flex-col px-2">
                            <div className="duration-300 overflow-hidden">
                                <div className="flex items-center justify-between mt-[-0.5rem]">
                                    <div className="flex flex-col">
                                        <Checkbox.Group
                                            options={paysystemsOptions}
                                            onChange={onChangePaymentMethod}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Step4;

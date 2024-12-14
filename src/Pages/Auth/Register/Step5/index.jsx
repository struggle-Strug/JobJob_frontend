import { Input, Select } from "antd";
import { getDateOptions } from "../../../../utils/date";

const Step5 = ({setSei, setMei, setHiraganaSei, setHiraganaMei, setGender, setYear, setMonth, setDay}) => {
    const { yearsOptions, monthsOptions, daysOptions } = getDateOptions()
    const onChangeSei = (value) => {
        setSei(value.target.value);
    }
    const onChangeMei = (value) => {
        setMei(value.target.value);
    }
    const onChangeHiraganaSei = (value) => {
        setHiraganaSei(value.target.value);
    }
    const onChangeHiraganaMei = (value) => {
        setHiraganaMei(value.target.value);
    }
    const onChangeGender = (value) => {
        setGender(value);
    }
    const onChangeYear = (value) => {
        setYear(value);
    }
    const onChangeMonth = (value) => {
        setMonth(value);
    }
    const onChangeDay = (value) => {
        setDay(value);
    }

    const genderOptions = [
        { label: "男性", value: "男性" },
        { label: "女性", value: "女性" },
    ]

    return (
        <>
            <div className="flex justify-between w-full mt-12">
                    <div className="flex items-start gap-2 justify-end">
                        <p>氏名</p>
                        <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                    </div>
                    <div className="flex flex-col w-4/5">
                        <div className="flex flex-col px-2">
                            <div className="duration-300 overflow-hidden">
                                <div className="flex justify-start gap-8">
                                    <Input placeholder="姓" className="w-1/3 py-2" onChange={onChangeSei}/>
                                    <Input placeholder="名" className="w-1/3" onChange={onChangeMei}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                    <div className="flex items-start gap-2 justify-end">
                        <p>ふりがな</p>
                        <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                    </div>
                    <div className="flex flex-col w-4/5">
                        <div className="flex flex-col px-2">
                            <div className="duration-300 overflow-hidden">
                                <div className="flex justify-start gap-8">
                                    <Input placeholder="せい" className="w-1/3 py-2" onChange={onChangeHiraganaSei}/>
                                    <Input placeholder="めい" className="w-1/3" onChange={onChangeHiraganaMei}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                    <div className="flex items-start gap-2 justify-end">
                        <p>性別</p>
                        <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                    </div>
                    <div className="flex flex-col w-4/5">
                        <div className="flex flex-col px-2">
                            <div className="duration-300 overflow-hidden">
                                <div className="flex justify-start gap-8">
                                    <Select options={genderOptions} className="w-1/3" onChange={onChangeGender}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                    <div className="flex items-start gap-2 justify-end">
                        <p>生年月日</p>
                        <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                    </div>
                    <div className="flex flex-col w-4/5">
                        <div className="flex flex-col px-2">
                            <div className="duration-300 overflow-hidden">
                                <div className="flex justify-start gap-4 lg:text-sm md:text-xs text-xs">
                                    <Select options={yearsOptions} className="w-1/4" onChange={onChangeYear}/>
                                    年
                                    <Select options={monthsOptions} className="w-1/4" onChange={onChangeMonth}/>
                                    月
                                    <Select options={daysOptions} className="w-1/4" onChange={onChangeDay}/>
                                    日
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Step5;


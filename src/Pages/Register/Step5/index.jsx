import { Input, Select } from "antd";

const Step5 = () => {
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const yearsOptions = years.map(year => ({ label: year, value: year }))
    const monthsOptions = months.map(month => ({ label: month, value: month }))
    const daysOptions = days.map(day => ({ label: day, value: day }))
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
                                    <Input placeholder="姓" className="w-1/3 py-2"/>
                                    <Input placeholder="名" className="w-1/3"/>
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
                                    <Input placeholder="せい" className="w-1/3 py-2"/>
                                    <Input placeholder="めい" className="w-1/3"/>
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
                                <div className="flex justify-start gap-4">
                                    <Select options={yearsOptions} className="w-1/4"/>
                                    年
                                    <Select options={monthsOptions} className="w-1/4"/>
                                    月
                                    <Select options={daysOptions} className="w-1/4"/>
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


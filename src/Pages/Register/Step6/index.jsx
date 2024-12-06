import { Input } from "antd";

const Step6 = () => {
    return (
        <>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>電話番号</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                        <div className="duration-300 overflow-hidden">
                            <div className="flex justify-start gap-4">
                                <Input placeholder="電話番号" className="w-1/4 py-2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>メールアドレス</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                        <div className="duration-300 overflow-hidden">
                            <div className="flex justify-start gap-4">
                                <Input placeholder="メールアドレス" className="w-1/3 py-2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>PASSWORD</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-col px-2">
                        <div className="duration-300 overflow-hidden">
                            <div className="flex justify-start gap-4">
                                <Input placeholder="PASSWORD" className="w-1/3 py-2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Step6;
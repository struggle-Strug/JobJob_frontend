import { PiStethoscope } from "react-icons/pi";
import { LiaToothSolid } from "react-icons/lia";
import { MdWheelchairPickup } from "react-icons/md";
import { FaHandsHoldingChild, FaChildReaching } from "react-icons/fa6";
import { GiHairStrands } from "react-icons/gi";
import { Link } from "react-router-dom";

const Top = () => {
    return (
        <>
            <div className="bg-[#EFEFEF]">
                <section className='max-w-[1100px] mx-auto pt-4 bg-white rounded-lg min-h-80 px-4'>
                    <div className="w-full h-full">

                    </div>
                </section>
                <section className='max-w-[1100px] mx-auto mt-3 px-4 bg-white rounded-md'>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-start px-6 pt-10 text-[#FF2A3B] gap-2">
                            <PiStethoscope   className="h-12 w-12" />
                            <div className="flex flex-col text-[#343434]">
                                <p className="lg:text-xl md:text-lg text-base font-bold">医科</p>
                                <p className="lg:text-sm md:text-xs text-xs">看護師/准看護師・薬剤師・看護助手・臨床検査技師　他13職種</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full pt-6 px-6">
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/dr"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        医師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/ph"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        薬剤師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/nan"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        看護師/准看護師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/mw"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        助産師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/phn"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        保健師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/nuas"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        看護助手<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/nan"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        看護師/准看護師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/mrt"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        診療放射線技師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/clt"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        臨床検査技師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/rdn"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        管理栄養士/栄養士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/cp"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        公認心理師/臨床心理士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/msw"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        医療ソーシャルワーカー<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/rs"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        登録販売者<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/mor"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        医療事務/受付<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/ctc"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        治験コーディネーター<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/sad"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        営業/管理部門/その他<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/diaf"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        調剤事務<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/cdm"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        臨床開発モニター<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/mr"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        MR<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/mrp"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        MS（医薬品卸）<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-start px-6 pt-10 text-[#FF2A3B] gap-2">
                            <LiaToothSolid className="h-12 w-12" />
                            <div className="flex flex-col text-[#343434]">
                                <p className="lg:text-xl md:text-lg text-base font-bold">歯科</p>
                                <p className="lg:text-sm md:text-xs text-xs">歯科医師・歯科衛生士・歯科技工士・歯科助手</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full pt-6 px-6">
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/de"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        歯科医師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/dh"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        歯科衛生士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/dt"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        歯科技工士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link 
                                    to={"/deas"} 
                                    className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group group"
                                    >
                                    <p>
                                        歯科助手<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-start px-6 pt-10 text-[#FF2A3B] gap-2">
                            <MdWheelchairPickup className="h-12 w-12" />
                            <div className="flex flex-col text-[#343434]">
                                <p className="lg:text-xl md:text-lg text-base font-bold">介護</p>
                                <p className="lg:text-sm md:text-xs text-xs">介護職/ヘルパー・生活相談員・サービス提供責任者・ケアマネジャー　他14職種</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full pt-6 px-6">
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/cwh"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        介護職/ヘルパー<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/lc"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        生活相談員<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/cm"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        ケアマネジャー<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/mp"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        管理職（介護）<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/sp"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        サービス提供責任者<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/lsw"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        生活支援員<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/wesc"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        福祉用具専門相談員<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/cdsm"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        児童発達支援管理責任者<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/smm"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        サービス管理責任者<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/cii"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        児童指導員/指導員<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/nan"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        看護師/准看護師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/rdn"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        管理栄養士/栄養士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/ccs"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        調理師/調理スタッフ<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/nctd"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        介護タクシー/ドライバー<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/mor"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        医療事務/受付<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/sado"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        営業/管理部門/その他<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/nca"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        介護事務<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/css"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        相談支援専門員<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-start px-6 pt-10 text-[#FF2A3B] gap-2">
                            <FaHandsHoldingChild className="h-10 w-10" />
                            <div className="flex flex-col text-[#343434]">
                                <p className="lg:text-xl md:text-lg text-base font-bold">保育</p>
                                <p className="lg:text-sm md:text-xs text-xs">保育士・幼稚園教諭・児童発達支援管理責任者・保育補助　他5職種</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full pt-6 px-6">
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/chil"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        保育士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/kt"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        幼稚園教諭<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/ca"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        保育補助<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/cii"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        児童指導員/指導員<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/cdsm"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        児童発達支援管理責任者<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/nan"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        看護師/准看護師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/rdn"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        管理栄養士/栄養士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/ccs"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        調理師/調理スタッフ<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/acsw"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        放課後児童支援員/学童指導員<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-start px-6 pt-10 text-[#FF2A3B] gap-2">
                            <FaChildReaching className="h-10 w-10" />
                            <div className="flex flex-col text-[#343434]">
                                <p className="lg:text-xl md:text-lg text-base font-bold">リハビリ／代替医療</p>
                                <p className="lg:text-sm md:text-xs text-xs">理学療法士・作業療法士・柔道整復師・鍼灸師　他4職種</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full pt-6 px-6">
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/pt"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        理学療法士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/st"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        言語聴覚士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/ot"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        作業療法士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/ort"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        視能訓練士<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/jt"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        柔道整復師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/amst"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        あん摩マッサージ指圧師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/acu"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        鍼灸師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/chir"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        整体師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-start px-6 pt-10 text-[#FF2A3B] gap-2">
                            <GiHairStrands className="h-10 w-10" />
                            <div className="flex flex-col text-[#343434]">
                                <p className="lg:text-xl md:text-lg text-base font-bold">ヘルスケア／美容</p>
                                <p className="lg:text-sm md:text-xs text-xs">美容師・理容師・エステティシャン/セラピスト・インストラクター　他3職種</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full pt-6 px-6 pb-10">
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/hai"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        美容師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/bar"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        理容師<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/naar"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        ネイリスト<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/el"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        アイリスト<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <Link to={"/et"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        エステティシャン/セラピスト<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/bcm"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        美容部員<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                                <Link to={"/ins"} className="col-span-1 flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                    <p>
                                        インストラクター<span className="text-[#343434] text-xs">(123)</span>
                                    </p>
                                    <div className="flex items-center">
                                        <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='max-w-[1100px] mx-auto mt-3 px-10 bg-white rounded-md pt-8 pb-8'>
                    <p className="lg:text-xl md:text-lg text-base font-bold">注目職種を人気エリアから探す</p>
                    <div className="grid grid-cols-5 gap-2">
                        <div className="col-span-1 flex flex-col justify-center items-start">
                            <p className="lg:text-lg md:text-base text-sm w-full font-semibold border-b-[1px] border-[#e7e7e7] py-2">看護師/准看護師</p>
                            <div className="flex flex-col mt-2">
                                <p className="lg:text-base text-xs font-semibold">関東</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/nan/pref1"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">東京都</Link></span>
                                    <span><Link to={"/nan/pref2"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">神奈川県</Link></span>
                                    <span><Link to={"/nan/pref3"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">埼玉県</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">関西</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/nan/pref8"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">大阪府</Link></span>
                                    <span><Link to={"/nan/pref9"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">兵庫県</Link></span>
                                    <span><Link to={"/nan/pref10"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">京都府</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">その他</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/nan/pref14"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">愛知県</Link></span>
                                    <span><Link to={"/nan/pref40"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">福岡県</Link></span>
                                    <span><Link to={"/nan/pref18"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">北海道</Link></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col justify-center items-start">
                            <p className="lg:text-lg md:text-base text-sm w-full font-semibold border-b-[1px] border-[#e7e7e7] py-2">歯科衛生士</p>
                            <div className="flex flex-col mt-2">
                                <p className="lg:text-base text-xs font-semibold">関東</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/dh/pref1"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">東京都</Link></span>
                                    <span><Link to={"/dh/pref2"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">神奈川県</Link></span>
                                    <span><Link to={"/dh/pref3"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">埼玉県</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">関西</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/dh/pref8"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">大阪府</Link></span>
                                    <span><Link to={"/dh/pref9"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">兵庫県</Link></span>
                                    <span><Link to={"/dh/pref10"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">京都府</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">その他</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/dh/pref14"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">愛知県</Link></span>
                                    <span><Link to={"/dh/pref40"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">福岡県</Link></span>
                                    <span><Link to={"/dh/pref18"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">北海道</Link></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col justify-center items-start">
                            <p className="lg:text-lg md:text-base text-sm w-full font-semibold border-b-[1px] border-[#e7e7e7] py-2">介護職/ヘルパー</p>
                            <div className="flex flex-col mt-2">
                                <p className="lg:text-base text-xs font-semibold">関東</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/cwh/pref1"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">東京都</Link></span>
                                    <span><Link to={"/cwh/pref2"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">神奈川県</Link></span>
                                    <span><Link to={"/cwh/pref3"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">埼玉県</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">関西</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/cwh/pref8"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">大阪府</Link></span>
                                    <span><Link to={"/cwh/pref9"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">兵庫県</Link></span>
                                    <span><Link to={"/cwh/pref10"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">京都府</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">その他</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/cwh/pref14"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">愛知県</Link></span>
                                    <span><Link to={"/cwh/pref40"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">福岡県</Link></span>
                                    <span><Link to={"/cwh/pref18"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">北海道</Link></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col justify-center items-start">
                            <p className="lg:text-lg md:text-base text-sm w-full font-semibold border-b-[1px] border-[#e7e7e7] py-2">保育士</p>
                            <div className="flex flex-col mt-2">
                                <p className="lg:text-base text-xs font-semibold">関東</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/chil/pref1"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">東京都</Link></span>
                                    <span><Link to={"/chil/pref2"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">神奈川県</Link></span>
                                    <span><Link to={"/chil/pref3"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">埼玉県</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">関西</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/chil/pref8"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">大阪府</Link></span>
                                    <span><Link to={"/chil/pref9"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">兵庫県</Link></span>
                                    <span><Link to={"/chil/pref10"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">京都府</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">その他</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/chil/pref14"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">愛知県</Link></span>
                                    <span><Link to={"/chil/pref40"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">福岡県</Link></span>
                                    <span><Link to={"/chil/pref18"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">北海道</Link></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col justify-center items-start">
                            <p className="lg:text-lg md:text-base text-sm w-full font-semibold border-b-[1px] border-[#e7e7e7] py-2">理学療法士</p>
                            <div className="flex flex-col mt-2">
                                <p className="lg:text-base text-xs font-semibold">関東</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/pt/pref1"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">東京都</Link></span>
                                    <span><Link to={"/pt/pref2"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">神奈川県</Link></span>
                                    <span><Link to={"/pt/pref3"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">埼玉県</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">関西</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/pt/pref8"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">大阪府</Link></span>
                                    <span><Link to={"/pt/pref9"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">兵庫県</Link></span>
                                    <span><Link to={"/pt/pref10"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">京都府</Link></span>
                                </div>
                                <p className="lg:text-base text-xs font-semibold pt-2">その他</p>
                                <div className="flex items-center justify-start lg:gap-3 gap-1 pt-2">
                                    <span><Link to={"/pt/pref14"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">愛知県</Link></span>
                                    <span><Link to={"/pt/pref40"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">福岡県</Link></span>
                                    <span><Link to={"/pt/pref18"} className="lg:text-sm md:text-xs text-xs font-semibold text-[#FF2A3B] hover:underline">北海道</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='max-w-[1100px] mx-auto mt-3 px-10 bg-white rounded-md pt-8'>
                    <p className="lg:text-xl md:text-lg text-base font-bold">施設ジャンルから探す</p>
                    <div className="grid grid-cols-3 gap-2 pt-4">
                        <div className="col-span-1 flex flex-col">
                            <Link to={"/hospital"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    病院
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                            <Link to={"/relaxation"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    代替医療・リラクゼーション
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                            <Link to={"/nursing-station"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    訪問看護ステーション
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                            <Link to={"/Others"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    その他（企業・学校等）
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className="col-span-1 flex flex-col">
                            <Link to={"/Clinic"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    診療所
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                            <Link to={"/welfare"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    介護・福祉事業所
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                            <Link to={"/nursery"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    保育園・幼稚園
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className="col-span-1 flex flex-col">
                            <Link to={"/dental"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-y-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    歯科診療所・技工所
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                            <Link to={"/pharmacy"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    薬局・ドラッグストア
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                            <Link to={"/Beauty"} className="flex items-center justify-between w-full lg:text-sm md:text-xs text-xs text-[#FF2A3B] border-b-[1px] border-[#e7e7e7] py-2 font-bold px-2 hover:px-6 duration-300 group">
                                <p>
                                    美容・サロン・ジム
                                </p>
                                <div className="flex items-center">
                                    <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className="duration-300 w-4 opacity-0 group-hover:opacity-100"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className='max-w-[1100px] mx-auto mt-3 px-10 bg-white rounded-md pt-8'>
                    <p className="lg:text-xl md:text-lg text-base font-bold">キーワードから探す</p>
                    <div className="flex justify-center w-full">
                        <Link to={"#"} className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] lg:px-12 md:px-8 px-4 lg:py-4 md:py-2 py-1 rounded-lg my-6">キーワードをもっと見る</Link>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Top;
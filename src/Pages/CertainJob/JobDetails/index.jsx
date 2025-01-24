import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Facilities } from "../../../utils/constants/categories/facilities";

const JobDetails = () => {
    const [jobPost, setJobPost] = useState(null);
    const [allFacilityJobPosts, setAllFacilityJobPosts] = useState([]);
    const { pathname } = useLocation();
    const job_type = pathname.split('/')[1];
    const jobpost_id = pathname.split('/')[3];

    const getJobPost = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/jobpost/${jobpost_id}`);
        setJobPost(response.data.jobpost);
    }


    const getFacilityJobPosts = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/jobpost/facility/${jobPost?.facility_id.facility_id}`);
        setAllFacilityJobPosts(response.data.jobposts.filter(jobpost => jobpost.allowed === "allowed"));
    }

    useEffect(() => {
        document.title= "求人詳細"
        getJobPost();
        getFacilityJobPosts();
    }, []);

    return (
        <div className="flex flex-col w-full px-4 bg-[#EFEFEF]">
            <div className="container flex items-start justify-between p-4 bg-white rounded-lg">
                <img src={jobPost?.picture} alt={jobPost?.sub_title} className="aspect-[2/1] object-cover rounded-lg" />
                <div className="flex flex-col items-start justify-between p-4 w-full gap-4 h-full">
                    <p className="lg:text-xl md:text-sm font-bold text-[#343434]">{jobPost?.facility_id.name}<span className="text-sm text-[#343434]">の{jobPost?.type}求人({jobPost?.employment_type})</span></p>
                    <div className="flex flex-col w-full items-center gap-4 mt-6">
                        <Link to={`/${job_type}/apply/${jobPost?.jobpost_id}`} className="flex items-center gap-2 justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-full">
                            <p className="lg:text-base text-sm font-bold text-white">応募画面に進む</p>
                            <div className="bg-white text-center rounded-lg p-1">
                                <p className="text-xs text-[#FF6B56]">
                                    最短1分！
                                    <br />
                                    すぐできます
                                </p>
                            </div>
                        </Link>
                        <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-3 text-white border-2 border-[#FF6B56] w-full hover:bg-[#FF6B56]/20 hover:scale-105 duration-300">
                            <img src="/assets/images/dashboard/Vector.png" alt="eye" className="w-4 pt-0.5" />
                            <p className="lg:text-base text-sm font-bold text-[#FF6B56]">気になる</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="container flex items-start gap-4 justify-between rounded-lg mt-4">
                <div className="flex flex-col w-2/3">
                    <div className="flex flex-col bg-white p-4 rounded-lg">
                        <p className="lg:text-lg font-bold text-sm text-[#343434]">{jobPost?.sub_title}</p>
                        <div dangerouslySetInnerHTML={{ __html: jobPost?.sub_description }} className="p-2 lg:text-base text-sm mt-8 text-[#343434]"/>
                    </div>
                    <div className="flex flex-col bg-white px-4 rounded-lg mt-4">
                        <p className="lg:text-lg text-sm text-[#343434] font-bold py-6 border-b-[1px] border-[#e7e7e7]">募集内容</p>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">募集職種</p>
                            <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">{jobPost?.type}</p>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">仕事内容</p>
                            <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5"><pre>{jobPost?.work_content}</pre></p>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">診療科目・<br />サービス形態  </p>
                            <div className="inline-block items-start justify-start gap-2 w-4/5 py-6">
                                {
                                    jobPost?.service_subject
                                        .concat(jobPost?.service_type)
                                 .map((item, index) => {
                                    return (
                                        <div key={index} className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                            <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">{item}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">給与</p>
                            <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5">{`【${jobPost?.employment_type}】 ${jobPost?.salary_type} ${jobPost?.salary_min}円〜${jobPost?.salary_max}円`}</p>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">給与の備考</p>
                            <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5"><pre>{jobPost?.salary_remarks}</pre></p>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">教育体制・研修</p>
                            <div className="inline-block items-start justify-start gap-2 w-4/5 py-6">
                                {
                                    jobPost?.education_content.map((item, index) => {
                                        return (
                                            <div key={index} className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">{item}</p>
                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">勤務時間</p>
                            <div className="flex flex-col w-4/5 py-6">
                                <div className="inline-block items-start justify-start gap-2">
                                    {
                                        jobPost?.work_time_type.map((item, index) => {
                                            return (
                                                <div key={index} className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                    <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">{item}</p>
                                                </div>
                                            )
                                    })}
                                </div>
                                <p className="lg:text-base text-sm text-[#343434] mt-4"><pre>{jobPost?.work_time_content}</pre></p>
                            </div>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">休日</p>
                            <div className="flex flex-col w-4/5 py-6">
                                <div className="inline-block items-start justify-start gap-2">
                                    {
                                        jobPost?.rest_type.map((item, index) => {
                                            return (
                                                <div key={index} className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                    <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">{item}</p>
                                                </div>
                                            )
                                    })}
                                </div>
                                <p className="lg:text-base text-sm text-[#343434] mt-4"><pre>{jobPost?.rest_content}</pre></p>
                            </div>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">応募要件</p>
                            <div className="flex flex-col w-4/5 py-6">
                                <div className="inline-block items-start justify-start gap-2">
                                    {
                                        jobPost?.qualification_type
                                            .concat(jobPost?.qualification_other)
                                            .map((item, index) => {
                                            return (
                                                <div key={index} className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                    <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">{item}</p>
                                                </div>
                                            )
                                    })}
                                </div>
                                <p className="lg:text-base text-sm text-[#343434] mt-4"><pre>{jobPost?.qualification_content}</pre></p>
                                <p className="lg:text-base text-sm text-[#343434]"><pre>{jobPost?.qualification_welcome}</pre></p>
                            </div>
                        </div>
                        <div className="flex items-start justify-start">
                            <p className="lg:text-base text-sm font-bold text-[#343434] py-6 w-1/5">選考プロセス</p>
                            <p className="lg:text-base text-sm text-[#343434] py-6 w-4/5"><pre>{jobPost?.process}</pre></p>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white p-4 rounded-lg mt-8">
                        <p className="lg:text-lg font-bold text-sm text-[#343434]">写真</p>
                        <div className="flex items-start justify-start gap-2 py-4">
                            <img src={jobPost?.picture} alt="jobpost" className="w-1/3 aspect-[2/1] object-cover rounded-lg" />
                        </div>
                    </div>
                    <div className="flex flex-col bg-white px-4 rounded-lg mt-8">
                        <p className="lg:text-lg font-bold text-sm text-[#343434] border-b-[1px] py-6 border-[#e7e7e7]">事業所情報</p>
                        <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">法人・施設名</p>
                            <Link to={`/facility/${jobPost?.facility_id.facility_id}`} className="lg:text-base text-sm text-[#FF2A3B] hover:underline w-4/5">{jobPost?.facility_id.name}</Link>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">募集職種</p>
                            <div className="flex flex-col items-start, justify-start w-4/5">
                                {
                                    allFacilityJobPosts?.map((jobPost, index) => {
                                        return (
                                            <Link key={index} to={`/facility/${jobPost.facility_id}`} className="lg:text-base text-sm text-[#FF2A3B] hover:underline">{jobPost.type}({jobPost.employment_type})</Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">施設紹介</p>
                            <p className="lg:text-base text-sm text-[#343434] w-4/5">
                                <pre>{jobPost?.facility_id.introduction}</pre>
                            </p>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">アクセス</p>
                            <div className="flex flex-col items-start justify-start w-4/5">
                                <div className="inline-block items-start justify-start gap-2">
                                    {
                                        jobPost?.facility_id.access
                                            .map((item, index) => {
                                            return (
                                                <div key={index} className="inline-block  text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg">
                                                    <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">{item}</p>
                                                </div>
                                            )
                                    })}
                                </div>
                                <p className="lg:text-base text-sm text-[#343434] mt-1">{jobPost?.facility_id.prefecture}{jobPost?.facility_id.city}{jobPost?.facility_id.village}{jobPost?.facility_id.building}</p>
                                <div className="w-full py-4 aspect-square">
                                    <iframe
                                        title="Google Map"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        src={`https://www.google.com/maps?q=${jobPost?.facility_id.prefecture}${jobPost?.facility_id.city}${jobPost?.facility_id.village}${jobPost?.facility_id.building}&output=embed`}
                                    ></iframe>
                                </div>
                                <p className="lg:text-base text-sm text-[#343434] mt-1">{jobPost?.facility_id.access_text}</p>
                                <Link to={`https://www.google.com/maps?q=${encodeURIComponent(`${jobPost?.facility_id.prefecture}${jobPost?.facility_id.city}${jobPost?.facility_id.village}${jobPost?.facility_id.building}`)}`} target="_blank" className="lg:text-base text-sm text-[#FF2A3B] hover:underline mt-1 border-[1px] border-[#FF2A3B] py-1 px-2 rounded-lg">
                                    Google Mapsで見る
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">設立年月日</p>
                            <p className="lg:text-base text-sm text-[#343434] w-4/5">
                                {jobPost?.facility_id.establishment_date.split("-")[0]}年
                                {jobPost?.facility_id.establishment_date.split("-")[1]}日
                            </p>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">施設・サービス形態・診療科目</p>
                            <div className="flex flex-col items-start justify-start w-4/5">
                                <Link to={`/${Facilities[jobPost?.facility_id.facility_genre]}`} className="lg:text-base text-sm text-[#FF2A3B] hover:underline">{jobPost?.facility_id.facility_genre}</Link>
                                <div className="inline-block items-start justify-start gap-2 mt-2">
                                    {
                                        jobPost?.facility_id.service_type.join("、")
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                            <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">営業時間</p>
                            <p className="lg:text-base text-sm text-[#343434] w-4/5">
                                <pre>{jobPost?.facility_id.service_time}</pre>
                            </p>
                        </div>
                        <div className="flex items-start justify-start py-6">
                            <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">休日</p>
                            <p className="lg:text-base text-sm text-[#343434] w-4/5">
                                <pre>{jobPost?.facility_id.rest_day}</pre>
                            </p>
                        </div>
                        <div className="flex items-center justify-between w-full gap-4 px-8 pb-6 my-6">
                            <button className="flex items-center justify-center gap-2 bg-whtie rounded-lg py-4 text-white border-2 border-[#FF6B56] w-full hover:bg-[#FF6B56]/20 hover:scale-105 duration-300">
                                <img src="/assets/images/dashboard/Vector.png" alt="eye" className="w-4 pt-0.5" />
                                <p className="lg:text-base text-sm font-bold text-[#FF6B56]">気になる</p>
                            </button>
                            <Link to={`/${job_type}/apply/${jobPost?.jobpost_id}`} className="flex items-center gap-2 justify-center bg-[#FF6B56] hover:bg-[#FF5B02] hover:scale-105 duration-300 rounded-lg py-2 text-white border-2 border-[#FF6B56] w-full">
                                <p className="lg:text-base text-sm font-bold text-white">応募画面に進む</p>
                                <div className="bg-white text-center rounded-lg p-1">
                                    <p className="text-xs text-[#FF6B56]">
                                        最短1分！
                                        <br />
                                        すぐできます
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/3">

                </div>
            </div>
        </div>
    )
}

export default JobDetails;
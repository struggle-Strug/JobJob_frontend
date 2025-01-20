import { Checkbox, Input, message, Modal, Radio, Select, Upload } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Facilities, Features, JobType, Prefectures } from "../../../utils/constants/categories";
import { getBase64 } from "../../../utils/getBase64";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import FacilityDetail from "./FacilityDetail";
import { useAuth } from "../../../context/AuthContext";

const FacilityPage = () => {
    const { user } = useAuth();
    const [facilities, setFacilities] = useState([]);
    const [facility, setFacility] = useState(null);
    const [isFacilityAddModalOpen, setIsFacilityAddModalOpen] = useState(false);
    const [facilityName, setFacilityName] = useState("");
    const [facilityPostalCode, setFacilityPostalCode] = useState("");
    const [facilityPrefecture, setFacilityPrefecture] = useState("");
    const [facilityCity, setFacilityCity] = useState("");
    const [facilityVillage, setFacilityVillage] = useState("");
    const [facilityBuilding, setFacilityBuilding] = useState("");
    const [facilityPhoto, setFacilityPhoto] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [facilityIntroduction, setFacilityIntroduction] = useState("");
    const [facilityJobType, setFacilityJobType] = useState("");
    const [facilityJobTypeDetail, setFacilityJobTypeDetail] = useState("");
    const [facilityAccess, setFacilityAccess] = useState("");
    const [facilityAccessStation, setFacilityAccessStation] = useState("");
    const [facilityAccessText, setFacilityAccessText] = useState("");
    const [facilityGenre, setFacilityGenre] = useState("");
    const [facilityServiceType, setFacilityServiceType] = useState([]);
    const [facilityEstablishmentDateYear, setFacilityEstablishmentDateYear] = useState("");
    const [facilityEstablishmentDateMonth, setFacilityEstablishmentDateMonth] = useState("");
    const [facilityServiceTime, setFacilityServiceTime] = useState("");
    const [facilityRestDay, setFacilityRestDay] = useState("");
    const [jobPosts, setJobPosts] = useState([]);
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const allPrefectureKeys = [
        ...Object.keys(Prefectures.KANTO),
        ...Object.keys(Prefectures.KANSAI),
        ...Object.keys(Prefectures.TOKAI),
        ...Object.keys(Prefectures.HOKKAIDO_TOHOKU),
        ...Object.keys(Prefectures.KOSHINETSU_HOKURIKU),
        ...Object.keys(Prefectures.CHUGOKU_SHIKOKU),
        ...Object.keys(Prefectures.KYUSHU_OKINAWA),
      ];
      
    const allPrefectureOptions = allPrefectureKeys.map((item) => ({
        label: item,
        value: item,
    }));

    const jobTypesOptions = [
        {
            label: "選択する",
            value: "",
        },
        ...Object.keys(JobType).map(type => ({
            value: type,
            label: type
        }))
    ]

    const jobTypeDetailOptions = (jobType) => {
        return ([
            {
                label: "選択する",
                value: "",
            },
            ...Object.keys(JobType[jobType]).map(type => ({
                value: type,
                label: type
            }))
        ])
    }

    const accessOptions = [
        ...Object.keys(Features.ACCESS).map(station => ({
            value: station,
            label: station
        }))
    ]

    const facilityGenreOptions = [
        ...Object.keys(Facilities).map(genre => ({
            value: genre,
            label: genre
        }))
    ]

    const serviceTypeOptions = [
        ...Object.keys(Features.SERVICE_TYPES).map(type => ({
            value: type,
            label: type
        }))
    ]

    const beforeUpload = () => {
        return false
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        
            setPreviewImage(file.url || file.preview);
            setPreviewOpen(true);
        };

    const handleChange = (info) => {
        let updatedFileList = [...info.fileList];

        // Limit the number of files to 1
        if (updatedFileList.length > 1) {
            updatedFileList = updatedFileList.slice(-1);
        }

        setFacilityPhoto(updatedFileList);

        // Provide feedback on upload status
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleUpload = async () => {
        if (facilityPhoto.length === 0) {
            return;
        }

        const formData = new FormData();
        formData.append('file', facilityPhoto[0].originFileObj); // Use the correct file object

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            message.success('写真アップロード成功!');
            return response.data.fileUrl;
        } catch (error) {
            message.error('写真アップロード失敗');
        }
    };

    const handleSave = async () => {

        const photoUrl = await handleUpload();

        const facilityData = {
            // customer_id: customer._id,
            customer_id: user._id,
            name: facilityName,
            postal_code: facilityPostalCode,
            prefecture: facilityPrefecture,
            city: facilityCity,
            village: facilityVillage,
            building: facilityBuilding,
            photo: photoUrl || facilityPhoto,
            introduction: facilityIntroduction,
            job_type: facilityJobTypeDetail,
            access_station: facilityAccessStation,
            facility_genre: facilityGenre,
            service_type: facilityServiceType,
            establishment_date: facilityEstablishmentDateYear,
            service_time: facilityServiceTime,
            rest_day: facilityRestDay,
        }

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/facility`, facilityData);
        if (response.data.error) message.error(response.data.error);
        setIsFacilityAddModalOpen(false);
        setSuccessModalOpen(true);
        
        setFacilityName("");
        setFacilityPostalCode("");
        setFacilityPrefecture("");
        setFacilityCity("");
        setFacilityVillage("");
        setFacilityBuilding("");
        setFacilityPhoto([]);
        setPreviewImage("");
        setPreviewOpen(false);
        setFacilityIntroduction("");
        setFacilityJobType("");
        setFacilityJobTypeDetail("");
        setFacilityAccess("");
        setFacilityAccessStation("");
        setFacilityAccessText("");
        setFacilityGenre("");
        setFacilityServiceType([]);
        setFacilityEstablishmentDateYear("");
        setFacilityEstablishmentDateMonth("");
        setFacilityServiceTime("");
        setFacilityRestDay("");
        setIsFacilityAddModalOpen(false);
    }

    const getFacilities = useCallback(async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/facility`);
        setFacilities(response.data.facility);
    }, []);

    const getJobPosts = useCallback(async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/jobpost/${id}`);
        setJobPosts(response.data.jobpost);
    }, []);
    
    const getFacility = useCallback(async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/facility/${id}`);
        setFacility(response.data.facility);
    }, []);

    const onClick = (id) => {
        getFacility(id);
        getJobPosts(id);
    }

    useEffect(() => {
        getFacilities();
    }, []);

    return (
        <>
            <div className="w-full h-screen">
                <div className="grid grid-cols-4 w-full bg-white rounded-lg shadow-xl h-screen">
                    <div className="col-span-1 border-r-[1px] border-[#e7e7e7] p-4 flex flex-col">
                        <div className="flex justify-center">
                            <button onClick={() => setIsFacilityAddModalOpen(true)} className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] px-2 lg:py-4 md:py-2 py-1 rounded-lg">
                                施設を新規登録
                            </button>
                        </div>
                        {facilities.map((facility, index) => (
                            <div key={index} className="flex w-full justify-start mt-3 gap-4 cursor-pointer hover:bg-[#e9e9e9] rounded-lg p-2 duration-300" onClick={() => onClick(facility._id)}>
                                <img src={facility.photo} alt={facility.name} className=" w-1/3 object-cover rounded-lg" />
                                <p className="lg:text-sm text-xs">{facility.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-3">
                       {facility ? <FacilityDetail facility={facility} jobPosts={jobPosts} setJobPosts={setJobPosts}/> : (<p className="text-left text-lg font-bold text-[#343434] p-4">施設を選択してください。</p>)}
                    </div>
                </div>
            </div>
            {
                <Modal
                    open={isFacilityAddModalOpen}
                    onCancel={() => setIsFacilityAddModalOpen(false)}
                    footer={null}
                    width={800}
                    className="modal"
                >
                    <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">施設を新規登録</p>
                    <div className="flex items-center mt-4">
                        <p className="lg:text-sm text-xs w-1/5">施設名</p>
                        <Input value={facilityName} onChange={(e) => setFacilityName(e.target.value)} className="w-1/4" />
                    </div>
                    <div className="flex items-center mt-4">
                        <p className="lg:text-sm text-xs w-1/5">郵便番号</p>
                        <Input value={facilityPostalCode} onChange={(e) => setFacilityPostalCode(e.target.value)} className="w-1/4" />
                    </div>
                    <div className="flex items-center mt-4">
                        <p className="lg:text-sm text-xs w-1/5">都道府県</p>
                        <Select options={allPrefectureOptions} onChange={(e) => setFacilityPrefecture(e)} className="w-1/4" />
                    </div>
                    <div className="flex items-center mt-4">
                        <p className="lg:text-sm text-xs w-1/5">市区町村</p>
                        <Select onChange={(e) => setFacilityCity(e)} className="w-1/4" />
                    </div>
                    <div className="flex items-center mt-4">
                        <p className="lg:text-sm text-xs w-1/5">町名・番地</p>
                        <Input value={facilityVillage} onChange={(e) => setFacilityVillage(e.target.value)} className="w-1/4" />
                    </div>
                    <div className="flex items-center mt-4">
                        <p className="lg:text-sm text-xs w-1/5">建物名</p>
                        <Input value={facilityBuilding} onChange={(e) => setFacilityBuilding(e.target.value)} className="w-1/4" />
                    </div>
                    <div className="flex items-start mt-4">
                        <div className="flex items-center justify-start gap-1 w-1/5">
                            <span className="lg:text-sm text-xs text-[#343434]">施設写真</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                fileList={facilityPhoto}
                                onPreview={handlePreview}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                <div className="flex items-center justify-center aspect-square w-32 cursor-pointer flex-col rounded-lg border border-dashed bg-light-gray p-3">
                                    <PlusOutlined />
                                    <div className="mt-4 text-center">Upload</div>
                                </div>
                            </Upload>
                        </div>
                    </div>
                    <div className="flex items-start mt-4 textarea">
                        <p className="lg:text-sm text-xs w-1/5">施設紹介</p>
                        <TextArea value={facilityIntroduction} onChange={(e) => setFacilityIntroduction(e.target.value)} className="w-3/4 h-40" />
                    </div>
                    <div className="flex items-center mt-4">
                        <p className="lg:text-sm text-xs w-1/5">募集職種</p>
                        <div className="flex items-center justify-start gap-2 w-3/4">
                            <Select placeholder="職種" options={jobTypesOptions} value={facilityJobType} onChange={(value) => setFacilityJobType(value)} className="w-1/2"/>
                            {facilityJobType && <Select placeholder="職種" options={jobTypeDetailOptions(facilityJobType)} value={facilityJobTypeDetail} onChange={(value) => setFacilityJobTypeDetail(value)} className="w-1/2"/>}
                        </div>
                    </div>
                    <div className="flex items-start mt-4 desireEmployment">
                        <p className="lg:text-sm text-xs w-1/5">アクセス</p>
                        <div className="flex flex-col w-3/4">
                            <Checkbox.Group options={accessOptions} value={facilityAccess} onChange={(value) => setFacilityAccess(value)} />
                            <Input value={facilityAccessStation} onChange={(e) => setFacilityAccessStation(e.target.value)} className="w-1/2 mt-4" />
                            <Input value={facilityAccessText} onChange={(e) => setFacilityAccessText(e.target.value)} className="w-1/2 mt-4" />
                        </div>
                    </div>
                    <div className="flex items-start mt-4 textarea">
                        <p className="lg:text-sm text-xs w-1/5">施設ジャンル</p>
                        <Radio.Group options={facilityGenreOptions} value={facilityGenre} onChange={(value) => setFacilityGenre(value.target.value)} className="w-4/5" />
                    </div>
                    <div className="flex items-start mt-4 desireEmployment">
                        <p className="lg:text-sm text-xs w-1/5">サービス形態</p>
                        <Checkbox.Group options={serviceTypeOptions} value={facilityServiceType} onChange={(value) => setFacilityServiceType(value)} className="w-4/5" />
                    </div>
                    <div className="flex items-start mt-4 textarea">
                        <p className="lg:text-sm text-xs w-1/5">設立年月日</p>
                        <div className="flex justify-start items-end w-4/5">
                            <Input value={facilityEstablishmentDateYear} onChange={(e) => setFacilityEstablishmentDateYear(e.target.value)} className="w-1/4" />
                            <span className="mx-2">年</span>
                            <Input value={facilityEstablishmentDateMonth} onChange={(e) => setFacilityEstablishmentDateMonth(e.target.value)} className="w-1/4" />
                            <span className="mx-2">月</span>
                        </div>
                    </div>
                    <div className="flex items-start mt-4 textarea">
                        <p className="lg:text-sm text-xs w-1/5">営業時間</p>
                        <Input value={facilityServiceTime} onChange={(e) => setFacilityServiceTime(e.target.value)} className="w-1/2" />
                    </div>
                    <div className="flex items-start mt-4 textarea">
                        <p className="lg:text-sm text-xs w-1/5">休日</p>
                        <Input value={facilityRestDay} onChange={(e) => setFacilityRestDay(e.target.value)} className="w-1/2" />
                    </div>
                    <div className="flex items-center justify-center w-full mt-8 gap-4 border-t-[1px] border-[#e7e7e7] pt-4">
                        <button className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300" onClick={handleSave}>施設を登録する</button>
                    </div>
                </Modal>
            }
            {
                <Modal
                    open={successModalOpen}
                    onCancel={() => setSuccessModalOpen(false)}
                    footer={null}
                    width={600}
                    className="modal"
                >
                    <p className="text-center text-lg font-bold text-[#343434]">施設登録申請を完了しました。</p>
                </Modal>
            }
        </>
    )
}

export default FacilityPage;
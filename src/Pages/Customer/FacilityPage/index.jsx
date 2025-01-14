import { Input, message, Modal, Select, Upload } from "antd";
import { useState } from "react";
import { Prefectures } from "../../../utils/constants/categories";
import { getBase64 } from "../../../utils/getBase64";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const FacilityPage = () => {
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
    const [facilityJobType, setFacilityJobType] = useState([]);
    const [facilityAccessStation, setFacilityAccessStation] = useState("");
    const [facilityFacilityGenre, setFacilityFacilityGenre] = useState("");
    const [facilityServiceType, setFacilityServiceType] = useState("");
    const [facilityEstablishmentDate, setFacilityEstablishmentDate] = useState("");
    const [facilityServiceTime, setFacilityServiceTime] = useState("");
    const [facilityRestDay, setFacilityRestDay] = useState("");

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


    return (
        <>
            <div className="w-full h-screen">
                <div className="grid grid-cols-4 w-full bg-white rounded-lg shadow-xl h-screen">
                    <div className="col-span-1 border-r-[1px] border-[#e7e7e7] p-4">
                        <div className="flex justify-center">
                            <button onClick={() => setIsFacilityAddModalOpen(true)} className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] px-2 lg:py-4 md:py-2 py-1 rounded-lg">
                                施設を新規登録
                            </button>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <p>求人管理</p>
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
                </Modal>
            }
        </>
    )
}

export default FacilityPage;
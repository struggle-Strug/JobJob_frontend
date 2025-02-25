import { useState, useEffect } from "react";
import { Checkbox, Radio } from "antd";
import {
  Features,
  Qualifications,
  EmploymentType,
} from "../../../../utils/constants/categories";

const Step2 = ({
  setEmploymentType,
  setCurrentStatus,
  //   setQualification,
  //   setFeature,
  setErrorMessage,
}) => {
  const [toggleEmployment, setToggleEmployment] = useState(false);
  // const [toggleQualification_required, setToggleQualification_required] = useState(false);
  // const [toggleQualification_other, setToggleQualification_other] = useState(false);
  // const [toggleFeature_1, setToggleFeature_1] = useState(false);
  // const [toggleFeature_2, setToggleFeature_2] = useState(false);
  // const [toggleFeature_3, setToggleFeature_3] = useState(false);
  // const [toggleFeature_4, setToggleFeature_4] = useState(false);
  // const [toggleFeature_5, setToggleFeature_5] = useState(false);
  // const [toggleFeature_6, setToggleFeature_6] = useState(false);
  // const [toggleFeature_7, setToggleFeature_7] = useState(false);
  // const [toggleFeature_8, setToggleFeature_8] = useState(false);

  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
  // const [selectedQualifications, setSelectedQualifications] = useState([]);
  // const [selectedFeatures, setSelectedFeatures] = useState([]);

  const employmentKeys = Object.keys(EmploymentType);
  // const qualificationKeys_required = Object.keys(Qualifications.REQUIRED);
  // const qualificationKeys_other = Object.keys(Qualifications.OTHERS);
  // const featureKeys_1 = Object.keys(Features.HOLIDAY);
  // const featureKeys_2 = Object.keys(Features.WORKING_HOURS);
  // const featureKeys_3 = Object.keys(Features.ACCESS);
  // const featureKeys_4 = Object.keys(Features.DESCRIPTION);
  // const featureKeys_5 = Object.keys(Features.SALARY_BENEFITS_WELFARE);
  // const featureKeys_6 = Object.keys(Features.SERVICE_TYPES);
  // const featureKeys_7 = Object.keys(Features.EDUCATION);
  // const featureKeys_8 = Object.keys(Features.MEDICAL_DEPARTMENT);

  const createOptions = (keys) =>
    keys.map((item) => ({
      label: item,
      value: item,
    }));

  const employmentOptions = createOptions(employmentKeys);
  // const qualificationOptions_required = createOptions(qualificationKeys_required);
  // const qualificationOptions_other = createOptions(qualificationKeys_other);
  // const featureOptions_1 = createOptions(featureKeys_1);
  // const featureOptions_2 = createOptions(featureKeys_2);
  // const featureOptions_3 = createOptions(featureKeys_3);
  // const featureOptions_4 = createOptions(featureKeys_4);
  // const featureOptions_5 = createOptions(featureKeys_5);
  // const featureOptions_6 = createOptions(featureKeys_6);
  // const featureOptions_7 = createOptions(featureKeys_7);
  // const featureOptions_8 = createOptions(featureKeys_8);

  const onChangeEmployment = (values) => {
    setSelectedEmploymentTypes(values);
    setEmploymentType(values);
  };

  // const onChangeQualification = (values, category) => {
  //     const otherCategory = category === 'REQUIRED' ? 'OTHERS' : 'REQUIRED';
  //     const otherValues = selectedQualifications.filter(q => Object.keys(Qualifications[otherCategory]).includes(q));
  //     const newQualifications = [...otherValues, ...values];
  //     setSelectedQualifications(newQualifications);
  //     setQualification(newQualifications);
  // };

  // const onChangeFeature = (values, category) => {
  //     const otherCategories = Object.keys(Features).filter(key => key !== category);
  //     const otherValues = selectedFeatures.filter(f =>
  //         otherCategories.some(cat => Object.keys(Features[cat]).includes(f))
  //     );
  //     const newFeatures = [...otherValues, ...values];
  //     setSelectedFeatures(newFeatures);
  //     setFeature(newFeatures);
  // };

  const renderCheckboxGroup = (
    options,
    onChange,
    selectedValues,
    category = null
  ) => (
    <Checkbox.Group
      options={options}
      value={selectedValues}
      onChange={(values) => onChange(values, category)}
    />
  );

  return (
    <>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>雇用形態</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5">
          <div className="flex flex-col border-t-[0.1rem] border-b-[0.1rem] border-[#a7a3a3] py-4 px-2">
            <div className="w-full gap-2">
              <p
                className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300"
                onClick={() => setToggleEmployment(!toggleEmployment)}
              >
                <span>形態</span>
                <img
                  src={"/assets/images/companytop/ep_arrow-right_red.png"}
                  alt="arrow"
                  className={`duration-300 ${
                    !toggleEmployment ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </p>
            </div>
            <div
              className={`duration-300 overflow-hidden ${
                toggleEmployment ? "opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4">
                {renderCheckboxGroup(
                  employmentOptions,
                  onChangeEmployment,
                  selectedEmploymentTypes
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-12">
        <div className="flex items-start gap-2 justify-end">
          <p>現在の就業状況</p>
          <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
        </div>
        <div className="flex flex-col w-4/5">
          <Radio.Group onChange={(e) => setCurrentStatus(e.target.value)}>
            <Radio value="就業中">就業中</Radio>
            <Radio value="離職中">離職中</Radio>
            <Radio value="在学中">在学中</Radio>
          </Radio.Group>
        </div>
      </div>
      {/* <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>資格</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    <div className="flex flex-col border-t-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleQualification_required(!toggleQualification_required)}>
                                <span>応募要件（資格）</span>
                                <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleQualification_required ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleQualification_required ? "opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                {renderCheckboxGroup(qualificationOptions_required, onChangeQualification, selectedQualifications, 'REQUIRED')}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col border-t-[0.1rem] border-b-[0.1rem] border-[#a7a3a3] py-4 px-2">
                        <div className="w-full gap-2">
                            <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                               onClick={() => setToggleQualification_other(!toggleQualification_other)}>
                                <span>応募要件（その他）</span>
                                <img 
                                    src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${!toggleQualification_other ? "rotate-90" : "-rotate-90"}`}
                                />
                            </p>
                        </div>
                        <div className={`duration-300 overflow-hidden ${toggleQualification_other ? "opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="mt-4">
                                {renderCheckboxGroup(qualificationOptions_other, onChangeQualification, selectedQualifications, 'OTHERS')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full mt-12">
                <div className="flex items-start gap-2 justify-end">
                    <p>特徴</p>
                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                </div>
                <div className="flex flex-col w-4/5">
                    {[
                        { title: '休日', options: featureOptions_1, toggle: toggleFeature_1, setToggle: setToggleFeature_1, category: 'HOLIDAY' },
                        { title: '勤務時間', options: featureOptions_2, toggle: toggleFeature_2, setToggle: setToggleFeature_2, category: 'WORKING_HOURS' },
                        { title: 'アクセス', options: featureOptions_3, toggle: toggleFeature_3, setToggle: setToggleFeature_3, category: 'ACCESS' },
                        { title: '仕事内容', options: featureOptions_4, toggle: toggleFeature_4, setToggle: setToggleFeature_4, category: 'DESCRIPTION' },
                        { title: '給与・待遇・福利厚生', options: featureOptions_5, toggle: toggleFeature_5, setToggle: setToggleFeature_5, category: 'SALARY_BENEFITS_WELFARE' },
                        { title: 'サービス形態', options: featureOptions_6, toggle: toggleFeature_6, setToggle: setToggleFeature_6, category: 'SERVICE_TYPES' },
                        { title: '教育体制・教育', options: featureOptions_7, toggle: toggleFeature_7, setToggle: setToggleFeature_7, category: 'EDUCATION' },
                        { title: '診療科目', options: featureOptions_8, toggle: toggleFeature_8, setToggle: setToggleFeature_8, category: 'MEDICAL_DEPARTMENT' },
                    ].map((feature, index) => (
                        <div key={index} className={`flex flex-col border-t-[0.1rem] ${index === 7 ? 'border-b-[0.1rem]' : ''} border-[#a7a3a3] py-4 px-2`}>
                            <div className="w-full gap-2">
                                <p className="text-lg text-[#FF2A3B] flex items-center justify-between cursor-pointer duration-300" 
                                   onClick={() => feature.setToggle(!feature.toggle)}>
                                    <span>{feature.title}</span>
                                    <img 
                                        src={'/assets/images/companytop/ep_arrow-right_red.png'} 
                                        alt="arrow" 
                                        className={`duration-300 ${!feature.toggle ? "rotate-90" : "-rotate-90"}`}
                                    />
                                </p>
                            </div>
                            <div className={`duration-300 overflow-hidden ${feature.toggle ? "opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="mt-4">
                                    {renderCheckboxGroup(feature.options, onChangeFeature, selectedFeatures, feature.category)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
    </>
  );
};

export default Step2;

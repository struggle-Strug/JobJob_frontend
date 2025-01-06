import { useLocation } from "react-router-dom";
import { getJobTypeKeyByValue } from "../../../utils/getFunctions";
import { useAuth } from "../../../context/AuthContext";
import { Input, Select } from "antd";
import { getDateOptions } from "../../../utils/date";
import { useEffect, useState } from "react";
import { Prefectures } from "../../../utils/constants/categories";

const JobOffer = () => {
    const { user } = useAuth();
    const [sei, setSei] = useState('');
    const [mei, setMei] = useState('');
    const [hiraganaSei, setHiraganaSei] = useState('');
    const [hiraganaMei, setHiraganaMei] = useState('');
    const [gender, setGender] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [prefecture, setPrefecture] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [period, setPeriod] = useState('');
    const [meetingDate, setMeetingDate] = useState([
        {
            date: '', // A date string (e.g., '2025-01-06')
            times: [
            { time: '', minute: '' }, // Each time object
            ],
        },
    ]);

    const {pathname} = useLocation();
    const JobType = pathname.split('/')[1];

    const { yearsOptions, monthsOptions, daysOptions } = getDateOptions();
    const prefecturesOptions = Object.entries(Prefectures).flatMap(([region, prefs]) => 
        Object.entries(prefs).map(([name, value]) => ({ label: name, value: name }))
    );
    const periodOptions = [
        { value: '未経験', label: '未経験' },
        { value: '1年未満', label: '1年未満' },
        { value: '2年未満', label: '2年未満' },
        { value: '3年未満', label: '3年未満' },
        { value: '4年未満', label: '4年未満' },
        { value: '5年未満', label: '5年未満' },
        { value: '6年未満', label: '6年未満' },
        { value: '7年未満', label: '7年未満' },
        { value: '8年未満', label: '8年未満' },
        { value: '9年未満', label: '9年未満' },
        { value: '10年未満', label: '10年未満' },
        { value: '10年以上', label: '10年以上' },
    ];
    
    const genderOptions = [
        { label: "男性", value: "男性" },
        { label: "女性", value: "女性" },
    ]

    const generateDateOptions = () => {
        const today = new Date();
        const dates = [];

        for (let i = 0; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            // Format date: "M月D日 (Day of Week)"
            const month = date.getMonth() + 1; // Months are zero-indexed
            const day = date.getDate();
            const weekDay = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]; // Japanese-style day of the week
            const formattedDate = `${month}月${day}日 (${weekDay})`;

            dates.push(formattedDate);
        }

        return dates;
    };

    const dateOptions = generateDateOptions().map((date) => ({ label: date, value: date }));
    const timeOptions = Array.from({ length: 24 }, (_, i) => ({ label: i, value: i }));
    const minuteOptions = [
        { label: "00", value: "00" },
        { label: "15", value: "15" },
        { label: "30", value: "30" },
        { label: "45", value: "45" },
    ]
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
    const onChangePhoneNumber = (value) => {
        setPhoneNumber(value.target.value);
    }
    const onChangePassword = (value) => {
        setPassword(value.target.value);
    }
    const handleDeleteMeetingDate = (index) => {
        const newMeetingDates = meetingDate.filter((_, i) => i !== index);
        setMeetingDate(newMeetingDates);
    };

    const handleAddMeetingDate = () => {
        setMeetingDate([...meetingDate, {date: '', times: [{time: '', minute: ''}]}]);
    };

    const handleDeleteMeetingTime = (dateIndex, timeIndex) => {
        const newMeetingDates = meetingDate.map((meeting, index) => {
            if (index === dateIndex) {
                return { ...meeting, times: meeting.times.filter((_, i) => i !== timeIndex) };
            }
            return meeting;
        });
        setMeetingDate(newMeetingDates);
    };

    const handleAddMeetingTime = (dateIndex) => {
        const newMeetingDates = meetingDate.map((meeting, index) => {
            if (index === dateIndex) {
                return { ...meeting, times: [...meeting.times, { time: '', minute: '' }] };
            }
            return meeting;
        });
        setMeetingDate(newMeetingDates);
    };


    useEffect(() => {
        if(user !== null) {
            setSei(user?.name.split(' ')[0]);
            setMei(user?.name.split(' ')[1]);
            setHiraganaSei(user?.hiraganaName.split(' ')[0]);
            setHiraganaMei(user?.hiraganaName.split(' ')[1]);
            setGender(user?.gender);
            setYear(user?.birthday.split('-')[0]);
            setMonth(user?.birthday.split('-')[1]);
            setDay(user?.birthday.split('-')[2]);
            setPhoneNumber(user?.phoneNumber);
            setPrefecture(user?.prefecture);
            setEmail(user?.email);
        }
    },[user])
    return (
        <div>
            <div className="flex w-full h-auto px-4 bg-[#EFEFEF]">
                <div className="container flex items-center justify-between gap-8">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex justify-start bg-white rounded-lg px-6 py-6 w-full shadow-xl">
                            <p className="lg:text-lg md:text-base text-sm text-[#343434]"><span className="font-bold">増田クリニック</span>の<span className="font-bold">{getJobTypeKeyByValue(JobType)}求人</span>に応募する</p>
                        </div>
                        <div className="flex flex-col justify-center bg-white rounded-lg px-6 py-6 w-full shadow-xl mt-4">
                            <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">基本情報</p>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>氏名</p>
                                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <div className="flex justify-start gap-8">
                                                <Input placeholder="姓" value={sei} className="w-1/3" onChange={onChangeSei}/>
                                                <Input placeholder="名" value={mei} className="w-1/3" onChange={onChangeMei}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>ふりがな</p>
                                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <div className="flex justify-start gap-8">
                                                <Input placeholder="せい" value={hiraganaSei} className="w-1/3" onChange={onChangeHiraganaSei}/>
                                                <Input placeholder="めい" value={hiraganaMei} className="w-1/3" onChange={onChangeHiraganaMei}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>性別</p>
                                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <div className="flex justify-start gap-8">
                                                <Select options={genderOptions} value={gender} className="w-1/3" onChange={onChangeGender}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>生年月日</p>
                                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <div className="flex justify-start items-end gap-4 lg:text-sm md:text-xs text-xs">
                                                <Select options={yearsOptions} value={year} className="w-1/4" onChange={onChangeYear}/>
                                                年
                                                <Select options={monthsOptions} value={month} className="w-1/4" onChange={onChangeMonth}/>
                                                月
                                                <Select options={daysOptions} value={day} className="w-1/4" onChange={onChangeDay}/>
                                                日
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>電話番号</p>
                                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <div className="flex justify-start gap-4">
                                                <Input placeholder="電話番号" value={phoneNumber} className="w-1/3" onChange={onChangePhoneNumber}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>都道府県</p>
                                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <div className="flex justify-start gap-8">
                                                <Select options={prefecturesOptions} className="w-1/3" value={prefecture ? prefecture : user?.prefecture} onChange={(value) => setPrefecture(value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>メールアドレス</p>
                                    <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <div className="flex justify-start gap-4">
                                                <Input placeholder="example@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-1/3"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {user == null &&
                                <div className="flex justify-between w-full mt-6">
                                    <div className="flex items-start gap-2 justify-end">
                                        <p>PASSWORD</p>
                                        <p className="text-[#FF2A3B] text-sm pt-1">必須</p>
                                    </div>
                                    <div className="flex flex-col w-4/5">
                                        <div className="flex flex-col px-2">
                                            <div className="duration-300 overflow-hidden">
                                                <div className="flex justify-start gap-4">
                                                    <Input type="password" placeholder="PASSWORD" className="w-1/2 py-2" onChange={onChangePassword}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434] mt-6">応募内容</p>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>応募職種</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <p>{getJobTypeKeyByValue(JobType)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>応募職種の経験</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                        <Select
                                            className="w-32"
                                            placeholder="未設定"
                                            value={period || undefined}
                                            onChange={value => setPeriod(value)}
                                            options={periodOptions}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>保有資格・免許</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full mt-6">
                                <div className="flex items-start gap-2 justify-end">
                                    <p>面接希望日</p>
                                </div>
                                <div className="flex flex-col w-4/5">
                                    <div className="flex flex-col px-2">
                                        <div className="duration-300 overflow-hidden">
                                            <p className="lg:text-sm text-xs">日程調整をスムーズにするポイント</p>
                                            <p className="lg:text-sm text-xs">・本日から7日前後の日程を選択する</p>
                                            <p className="lg:text-sm text-xs">・複数の日程を選択する</p>
                                            <p className="lg:text-sm text-xs">※選択した時間から1時間以内を希望時間とします。時間を選択しない場合は「終日可」と伝えます。面接の実施や日程は確定ではありません。</p>
                                            {meetingDate.map((meeting, dateIndex) => {
                                                return (
                                                    <>
                                                        <div className="flex flex-col w-full">
                                                            <div key={dateIndex} className="flex flex-col bg-[#EFEFEF] rounded-lg p-2 mt-4 w-2/5">
                                                                <Select options={dateOptions} placeholder="日程を選択" value={meeting.date} className="w-full"/>
                                                                {meeting.times.map((time, timeIndex) => {
                                                                    return (
                                                                        <>
                                                                            <div key={timeIndex} className="flex mt-4 gap-2 items-center">
                                                                                <Select options={timeOptions} placeholder="時間を選択" value={time.time} className="w-1/3"/>
                                                                                <Select options={minuteOptions} placeholder="分を選択" value={time.minute} className="w-1/3"/>
                                                                                ~
                                                                                <button onClick={() => handleDeleteMeetingTime(dateIndex, timeIndex)} className="text-[#FF2A3B] text-xs">時間を削除</button>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })}
                                                                <button onClick={() => handleAddMeetingTime(dateIndex)} className="text-[#FF2A3B] text-xs mt-2">時間を追加</button>
                                                            </div>
                                                            <button onClick={() => handleDeleteMeetingDate(dateIndex)} className="text-[#FF2A3B] text-xs w-2/5 text-right mt-2">希望日を削除する</button>
                                                            <button onClick={() => handleAddMeetingDate()} className="text-[#FF2A3B] text-xs w-2/5 text-left mt-1">面接希望日を追加する</button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border-t-[1px] border-[#EFEFEF] mt-4 text-center p-4">
                                <button className="lg:text-base md:text-sm text-xs font-bold text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-24 py-3 duration-300">応募する</button>
                                <p className="lg:text-sm md:text-xs text-xs text-[#343434] mt-2">応募が完了すると応募先に質問事項などを自由に送れるようになります。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobOffer;    
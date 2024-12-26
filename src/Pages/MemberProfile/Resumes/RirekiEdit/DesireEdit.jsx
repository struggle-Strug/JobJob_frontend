import { message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DesireEdit = ({rireki}) => {
    const [desire, setDesire] = useState({
        applyReason: "",
        hope: "",
    })

    const [egApplyReasonOpen, setEgApplyReasonOpen] = useState(false)
    const [egHopeOpen, setEgHopeOpen] = useState(false)

    const navigate = useNavigate();

    const handleSave = async () => {
        const resData = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/rireki/update/desire/${rireki?._id}`, desire)
        if(resData.data.error) return message.error(resData.data.message);
        message.success(resData.data.message);
        navigate(`/members/resumes/rireki/detail/${rireki?._id}`);
    }

    useEffect(() => {
        setDesire({
            applyReason: rireki?.desire?.applyReason,
            hope: rireki?.desire?.hope,
        })
    },[])
    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">志望動機・本人希望</p>
                    <p className="lg:text-base md:text-sm text-xs text-[#343434] mt-2">例文を挿入できます</p>
                    <div className="flex items-center justify-between w-full mt-2">
                        <p className="lg:text-sm md:text-xs text-xs text-[#343434]"></p>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 shadow-xl mt-2">
                    <div className="flex items-start justify-center w-full mt-2">
                        <div className="flex items-center justify-start gap-2 w-1/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">志望動機</span>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2 w-4/5 textarea">
                            <TextArea className="w-full h-full" placeholder="例文を挿入できます" value={desire.applyReason} onChange={(e) => setDesire({...desire, applyReason: e.target.value})}/>
                            <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-2 py-1 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={() => setEgApplyReasonOpen(true)}>志望動機の例文を挿入する</button>
                        </div>
                    </div>
                    <div className="flex items-start justify-center w-full mt-4">
                        <div className="flex items-center justify-start gap-2 w-1/5">
                            <span className="lg:text-base md:text-sm text-xs font-bold text-[#343434]">本人希望</span>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-2 w-4/5 textarea">
                            <TextArea className="w-full h-full" placeholder="例文を挿入できます" value={desire.hope} onChange={(e) => setDesire({...desire, hope: e.target.value})}/>
                            <p className="lg:text-sm md:text-xs text-xs text-[#343434]">※特に待遇・職種・勤務時間・その他について希望があれば入力してください。</p>
                            <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-2 py-1 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={() => setEgHopeOpen(true)}>本人希望の例文を挿入する</button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full mt-8 gap-4">
                        <Link to={`/members/resumes/rireki/detail/${rireki?._id}`} className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300">もどる</Link>
                        <button className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300" onClick={handleSave}>保存する</button>
                    </div>
                </div>
            </div>

            <ApplyReasonModal isOpen={egApplyReasonOpen} onClose={() => setEgApplyReasonOpen(false)} desire={desire} setDesire={setDesire} />
            <HopeModal isOpen={egHopeOpen} onClose={() => setEgHopeOpen(false)} desire={desire} setDesire={setDesire} />
        </>

    )
}

const ApplyReasonModal = ({ isOpen, onClose, desire, setDesire }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    const templates = [
        {
            title: "看護師",
            content: "新卒以来、手術室で6年間経験を積んでまいりましたが、看護師としてのスキルを高めるために、総合病院でしっかりと一般医療の経験を積みたいと思い転職を決意いたしました。"+
                     "貴院を志望した理由は、急性期から回復期期、デイサービス、訪問看護まで設備が整っており、業務を通して幅広い技術を身に付けられると思ったからです。"+
                     "手術室で培ったチームワークや緊急時の対応力を活かし、さまざまな疾患に対応できる看護師として長く活躍できるよう頑張りたいと思います。"
        },
        {
            title: "介護職",
            content: "これまで特別養護老人ホームの介護スタッフとして3年勤務し、入居者さまの身体介助を中心におこなってきました。"+
                     "現場経験を積むなかで、入居者さまが幸せに過ごせる環境づくりに一から携わりたいと考え、新規オープンに伴いスタッフを募集されている貴社を志望いたしました。"
        },
        {
            title: "保育士",
            content: "現在の保育園に勤めて5年目になりますが、他の園の保育を知ることで自身の保育観を更に広げたいと考え、転職を決意いたしました。"+
                     "職場では、副主任として保育現場のリーダーを担うほか、運営面のサポートもおこない、日々の保育や行事を通して、保護者さまとの協力体制も築いてきました。"+
                    "子どもたちだけでなく、保護者さまとのコミュニケーションも大切にしている貴園ならば、私の経験を活かすことができると考えて志望いたしました。"
        },
        {
            title: "児童指導員",
            content: "新卒で入職した発達支援センターでは4年目から主任としてマネジメント業務をおこなってきました。有識者を招いた講演会を定期開催し、近隣の福祉施設を巻き込んでの地域間の連携強化にも力を入れています。"+
                     "貴法人では新施設の立ち上げスタッフを募集されているということで、今までの知識・経験を活かしながら、新しいキャリアへの挑戦ができると思い応募させていただきました。"
        },
        {
            title: "医療事務",
            content: "総合病院で医療事務の仕事に3年間従事しました。最初の半年間で受付・会計業務、その後はレセプト業務・カルテ管理をメインにおこないました。また電子カルテへの移行作業にも立会い、スキルの習熟に積極的に努めました。"+
                     "貴院では「事務局のリーダー候補」を募集されていると伺い、さらなるスキルアップを目指せると考え、志望いたしました。"
        },
        {
            title: "歯科衛生士",
            content: "これからは在宅医療の需要が高まると考えていたところ、訪問歯科に特化した貴院の求人を拝見し、応募させていただきました。"+
                     "前職では歯科衛生士業務のほか、受付・会計・レセプト業務なども担当していました。今後は自身の経験を活かして後輩の育成・指導に努めながら、歯科衛生士としても専門性を磨き、更にステップアップしていきたいです。"
        },
        {
            title: "理学療法士",
            content: "新卒から3年間リハビリテーション病院で働いていましたが、理学療法士としてスキルアップするため、さまざまな症例を経験できる総合病院への転職を決意しました。"+
                     "急性期・回復期・在宅医療までを診ることができる貴院ならば、幅広い知識とスキルが身につくと考え、志望いたしました。チームの一員として尽力していきますので、何卒よろしくお願いいたします。"
        },
        {
            title: "作業療法士",
            content: "総合病院で6年間、幼児から高齢者まで幅広い患者様の症例を担当しました。多くの患者様と接する中で、精神障害を抱えた方一人ひとりと向き合い、生活機能を高められる作業療法士になりたいと考えるようになり、精神科病院である貴院を志望しました。また現在は、認定作業療法士の資格取得に向けて準備中です。"+
                     "将来的には副チーム長を務めた経験を活かして、組織力の高いチーム作りにも携わりたいと考えています。"
        },
        {
            title: "整体師・セラピスト",
            content: "現在はベッド数4台の小さな整体院で働いていますが、治療家としてさらなるステップアップをするため、業界でもトップクラスの技術力と知名度を持つ貴社への転職を志望しました。"+
                     "小さな整体院で働いていたため、一人ひとりの症状に合わせた丁寧な施術と接客には自信があります。何卒よろしくお願いいたします。"
        },
        {
            title: "美容師",
            content: "前職ではミドルシニア世代のお客様をターゲットとした美容室で3年間働いていましたが、若い世代の施術も経験したいと考え転職を決めました。"+
                     "原宿で最大級の規模を誇る貴社ならば、多くのスタイルに触れることができ、より一層スキルを磨くことができると考え志望いたしました。"
        },
        {
            title: "エステティシャン",
            content: "ボディメイクに強いエステサロンで約5年間勤務し、副店長の経験があります。今後はお客様のトータルビューティーをサポートするエステティシャンになりたいと考え、フェイシャルを含む全身メンテナンスのメニューが魅力的な貴社を志望いたしました。"+
                     "いずれは前職でチームを率いた経験を活かし、サロン規模の拡大にも挑戦したいと考えています。"
        }
    ];

    const handleSectionClick = (title) => {
        setExpandedSection(expandedSection === title ? null : title);
    };

    const handleInsertTemplate = (content) => {
        // Here you would handle the template insertion
        setDesire({...desire, applyReason: desire.applyReason + content})
        onClose();
    };

    return (
        <Modal
            title="志望動機の例文を挿入"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
            className="modal"
        >
            <div className="max-h-[70vh] overflow-y-auto">
                {templates.map((template) => (
                    <div key={template.title} className="border-b border-gray-200 last:border-b-0">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => handleSectionClick(template.title)}
                        >
                            <h3 className="text-lg font-medium text-gray-900">{template.title}</h3>
                            {expandedSection === template.title ? (
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${"-rotate-90"}`}
                                />
                            ) : (
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${"rotate-90"}`}
                                />
                            )}
                        </div>
                        {expandedSection === template.title && (
                            <div className="p-4 bg-gray-50">
                                <p className="text-gray-700 whitespace-pre-wrap mb-4">
                                    {template.content}
                                </p>
                                <button
                                    onClick={() => handleInsertTemplate(template.content)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    この例文を挿入する
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Modal>
    );
};

const HopeModal = ({ isOpen, onClose, desire, setDesire }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    const templates = [
        {
            title: "希望勤務形態",
            content: "子どもが未就学のため、短時間勤務が可能なパートを希望します。"
        },
        {
            title: "希望勤務地",
            content: "両親の介護のため、○○での勤務を希望します。"
        },
        {
            title: "入社希望時期",
            content: "現職の退職予定が○年○月○日のため、就業は○年○月○日以降を希望します。"
        },
        {
            title: "希望勤務時間",
            content: "子どもの保育園の送迎のため、○時〜○時の勤務を希望します。"
        },
        {
            title: "連絡時の注意点",
            content: "在職中のため、電話での連絡は○時以降でいただけると幸いです。"
        },
        {
            title: "希望がない場合",
            content: "貴社（貴院、貴園、貴法人）の規定に従います。"
        },
    ];

    const handleSectionClick = (title) => {
        setExpandedSection(expandedSection === title ? null : title);
    };

    const handleInsertTemplate = (content) => {
        // Here you would handle the template insertion
        setDesire({...desire, hope: desire.hope + content})
        onClose();
    };

    return (
        <Modal
            title="志望動機の例文を挿入"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
            className="modal"
        >
            <div className="max-h-[70vh] overflow-y-auto">
                {templates.map((template) => (
                    <div key={template.title} className="border-b border-gray-200 last:border-b-0">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => handleSectionClick(template.title)}
                        >
                            <h3 className="text-lg font-medium text-gray-900">{template.title}</h3>
                            {expandedSection === template.title ? (
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${"-rotate-90"}`}
                                />
                            ) : (
                                <img 
                                    src={'/assets/images/top/ep_arrow-right_red.png'} 
                                    alt="arrow" 
                                    className={`duration-300 ${"rotate-90"}`}
                                />
                            )}
                        </div>
                        {expandedSection === template.title && (
                            <div className="p-4 bg-gray-50">
                                <p className="text-gray-700 whitespace-pre-wrap mb-4">
                                    {template.content}
                                </p>
                                <button
                                    onClick={() => handleInsertTemplate(template.content)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    この例文を挿入する
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default DesireEdit;
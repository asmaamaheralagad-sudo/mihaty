import ph1 from "../../image/ph1.png";
import ph2 from "../../image/ph2.png";
import ph3 from "../../image/ph3.png";
import "./AiTool.css";

const aiToolsData = [
  {
    image: ph3,
    title: "اعثر على المنح المناسبة",
    text: "أخبرنا عن تخصصك واهتماماتك، ودع الذكاء الاصطناعي يقترح لك المنح الأكثر توافقاً مع ملفك",
  },
  {
    image: ph1,
    title: "جهّز خطاب دافع",
    text: "أنشئ وطوّر خطاب دافع مخصص للمنحة، يعكس خبراتك وأهدافك بطريقة احترافية.",
  },
  {
    image: ph2,
    title: "أنشئ سيرة ذاتية احترافية",
    text: "تناسب تخصصك وأهدافك، بمساعدة الذكاء الاصطناعي وخلال دقائق",
  },
];

export default function AiTool() {
  return (
    <section className="ai-tools-section">
      <div className="ai-tools-header">
        <h2>أدوات ذكية تجعل تقديمك أسهل</h2>
        <p>استفد من الذكاء الاصطناعي لتصميم أوراقك وزيادة فرصك في القبول بنجاح</p>
      </div>

      <div className="ai-tools-grid">
        {aiToolsData.map((tool, index) => (
          <div className="ai-tool-card" key={index}>
            <div className="ai-tool-icon">
              <img src={tool.image} alt={tool.title} />
            </div>
            <h3>{tool.title}</h3>
            <p>{tool.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
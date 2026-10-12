import React from "react";
import "./HowItWork.css";
import Markups from "../../image/Markups.png";
const steps = [
  {
    id: 1,
    title: "أنشئ ملفك",
    desc: "سجّل بياناتك الأكاديمية واهتماماتك في دقائق. لتكون نقطة انطلاقك نحو الفرص المناسبة.",
    position: "top-right",
  },
  {
    id: 2,
    title: "اكتشف المنح",
    desc: "استعرض المنح والفرص التي تتطابق بدقة مع شروطك وتطلعاتك المهنية.",
    position: "bottom-right",
  },
  {
    id: 3,
    title: "جهّز خطابك",
    desc: "استفد من أدواتنا الذكية لإنشاء خطاب دافع وسيرة ذاتية احترافية تزيد من فرص قبولك.",
    position: "top-left",
  },
  {
    id: 4,
    title: "تابع فرصتك",
    desc: "قدّم بثقة وتابع حالة طلبك خطوة بخطوة حتى الوصول لحلمك الأكاديمي.",
    position: "bottom-left",
  },
];

function HowItWork() {
  return (
    <section className="how-section" id="how">
      <div className="how-header">
        <h2>كيف تعمل منصة بوصلة؟</h2>

        <p>
          نساعدك على الانطلاق من حيث انتهت الجهود السابقة، عبر الاستفادة من أفضل
          التجارب لتقديم خطوات واضحة وبسيطة
        </p>
      </div>

      <div className="how-content">
        {steps.map((step) => (
          <div key={step.id} className={`step-card ${step.position}`}>
            <span className="step-number">{step.id}</span>

            <h3>{step.title}</h3>

            <p>{step.desc}</p>
          </div>
        ))}

        <div className="laptop-wrapper">
          <img src={Markups} alt="Bawsala Platform" />
        </div>
      </div>
    </section>
  );
}

export default HowItWork;

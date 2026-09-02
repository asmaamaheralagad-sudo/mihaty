import React from 'react';
import './HowItWork.css';



const steps = [
  { number: 1, label: 'أنشئ ملفك' },
  { number: 2, label: 'اكتشف المنح' },
  { number: 3, label: 'جهّز طلبك' },
  { number: 4, label: 'تابع فرصك' },
];

function HowItWork() {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-header">
        <h1 className="how-it-works-title">كيف تعمل منحتي؟</h1>
        <p className="how-it-works-subtitle">
          نساعدك على الانتقال من البحث عن الفرصة إلى الاستعداد للتقديم بخطوات بسيطة وواضحة.
        </p>
      </div>

      <div className="how-it-works-container">
        <div className="timeline-steps-wrapper">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className={`timeline-step step-level-${index + 1}`}>
                <span className="step-number">{step.number}</span>
                <div className="step-dot"></div>
                <span className="step-label">{step.label}</span>
              </div>

              {index < steps.length - 1 && (
                <div className={`timeline-connector connector-level-${index + 1}`}></div>
              )}
            </React.Fragment>
          ))}

          <div className="timeline-arrow-head"></div>
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
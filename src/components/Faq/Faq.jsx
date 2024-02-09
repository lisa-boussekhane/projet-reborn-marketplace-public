import './Faq.scss';
import FaqItem from './FaqItem';
import faqData from './faqData';

export default function Faq() {
  return (
    <div className="faq">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((item) => (
        <FaqItem
          key={item.question}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}

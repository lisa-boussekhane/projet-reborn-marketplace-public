import { useState } from 'react';
import './Faq.scss';

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      <div className="faq-item_question">
        <h3 className="question">{question}</h3>
        <button type="button" onClick={toggleAnswer}>
          {isOpen ? '-' : '+'}
        </button>
      </div>
      {isOpen && <p className="answer">{answer}</p>}
    </div>
  );
}

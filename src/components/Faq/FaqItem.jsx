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
        <h3>{question}</h3>
        <div className="buttons-container">
          <button type="button" onClick={toggleAnswer}>
            {isOpen ? ' \u2b9d ' : '\u2b9f'}
          </button>
        </div>
      </div>
      {isOpen && <p className="answer">{answer}</p>}
    </div>
  );
}

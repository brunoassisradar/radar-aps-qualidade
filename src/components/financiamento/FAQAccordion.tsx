import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  return (
    <div className="rounded-lg bg-card p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Perguntas frequentes</h3>
      <Collapse 
        accordion 
        bordered={false}
        className="faq-accordion"
        expandIconPosition="end"
      >
        {items.map((item, index) => (
          <Panel 
            header={<span className="text-sm">{item.question}</span>} 
            key={index}
          >
            <p className="text-sm text-muted-foreground">{item.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

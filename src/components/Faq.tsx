import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/constants';
import type { FaqItem } from '@/types';
import { ChevronDownIcon } from '@/components/Icons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FaqAccordionItem: React.FC<{ item: FaqItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="border-b border-gray-200">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none">
            <span className="text-lg font-semibold text-blue-deep">{item.question}</span>
            <span className={`transform transition-transform duration-300 text-orange-vif ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
            </span>
        </button>
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <p className="p-6 pt-0 text-slate-600">{item.answer}</p>
            </div>
        </div>
    </div>
);


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [ref, isVisible] = useScrollAnimation();

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="Faq" ref={ref} className={`bg-gray-50 py-12 md:py-20 px-6 transition-all duration-1000 ease-out scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-deep">Questions Fréquentes</h2>
                    <div className="mt-4 w-24 h-1 bg-orange-vif mx-auto rounded-full"></div>
                </div>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
                    {FAQ_ITEMS.map((item, index) => (
                        <FaqAccordionItem 
                            key={item.id} 
                            item={item} 
                            isOpen={openIndex === index} 
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
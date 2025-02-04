import React, { useState } from 'react';

interface AccordionProps {
    title: string;
    desc: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, desc }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col border-b border-gray-200 py-4">
            <div className="flex justify-between">
                <b>{title}</b>
                <button className="text-blue-500 text-3xl" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "-" : "+"}</button>
            </div>
            {isOpen && <div>{desc}</div>}
        </div>
    );
};

export default Accordion;
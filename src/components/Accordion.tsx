import React from 'react';

interface AccordionProps {
    index: number;
    title: string;
    desc: string;
    isOpen: boolean[];
    setIsOpen: React.Dispatch<React.SetStateAction<boolean[]>>
}

const Accordion: React.FC<AccordionProps> = ({ index, title, desc, isOpen, setIsOpen }) => {

    const handleAccordionState = () => { 
        const newIsOpen = isOpen.map((_, i) => index === i ? !isOpen[index] : false);
        setIsOpen(newIsOpen);
    };

    return (
        <div className="flex flex-col border-b border-gray-200 py-4">
            <div className="flex justify-between">
                <b>{title}</b>
                <button className="text-blue-500 text-3xl" onClick={handleAccordionState}>{isOpen[index] ? "-" : "+"}</button>
            </div>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out 
                ${isOpen[index] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="py-2">
                    {desc}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
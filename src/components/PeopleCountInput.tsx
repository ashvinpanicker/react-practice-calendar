// import React from 'react';


interface PeopleCountInputProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setPeopleCount: React.Dispatch<React.SetStateAction<number>>
}

// const PeopleCountInput: React.FC<PeopleCountInputProps> = ({ isOpen, setIsOpen, setPeopleCount }) => {
//     const maxPeople = 10;
//     const people = Array.from({ length: maxPeople }, (_, i) => i + 1);


//     return (
//         <div className="flex flex-col border-b border-gray-200 py-4">
//             {isOpen && <div className="flex justify-between">
//                 <b>People</b>
//                 <button className="text-blue-500 text-3xl" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "-" : "+"}</button>
//             </div>}
//             <div
//                 className={`overflow-hidden transition-all duration-300 ease-in-out
//                 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
//             ></div>
//             <div className="py-2">
//                 <select name="people" className="p-2 border rounded" onChange={(e) => setPeopleCount(parseInt(e.target.value))}>
//                     {people.map((person, index) => (
//                         <option key={index} value={person}>{person}</option>
//                     ))}
//                 </select>
//             </div>

//         </div>
//     );
// };

// export default PeopleCountInput;
import React, { useState, useRef } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

const PeopleCountInput: React.FC<PeopleCountInputProps> = ({ isOpen, setIsOpen, setPeopleCount }) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [selectedPeople, setSelectedPeople] = useState<number>(1);
    const maxPeople = 10;
    const people = Array.from({ length: maxPeople }, (_, i) => i + 1);

    const handleSelectPerson = (person: number) => {
        setPeopleCount(person);
        setSelectedPeople(person);
        if (popoverRef.current) {
            const popover = popoverRef.current.closest('[data-headlessui-state]');
            if (popover) {
                const closeButton = popover.querySelector('button');
                closeButton?.click();
            }
        }
        setIsOpen(false);
    };

    return (
        <Popover className="relative">
            <PopoverButton onClick={() => setIsOpen(!isOpen)}>
                {selectedPeople} {selectedPeople === 1 ? 'person' : 'persons'}
            </PopoverButton>
            <PopoverPanel className="absolute z-10 bg-white border rounded shadow-lg p-4 w-64">
                <div className="grid grid-cols-5 gap-2">
                    {people.map((person) => (
                        <PopoverButton
                            key={person}
                            className="w-10 h-10 flex items-center justify-center border rounded cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSelectPerson(person)}
                        >
                            {person}
                        </PopoverButton>
                    ))}
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default PeopleCountInput;

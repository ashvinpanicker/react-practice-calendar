/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useFloating, useDismiss } from '@floating-ui/react';

const GithubFilter = ({
  name,
  data,
  labelKey,
  labelIconKey,
  labelColorKey
}:
  {
    name: string,
    data: object[],
    labelKey: string,
    labelIconKey?: string,
    labelColorKey?: string
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  useDismiss(context);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  }

  const filterItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredItems = data.filter((item: any) => item[labelKey].toLowerCase().includes(value));
    console.log(filteredItems);
    setFilteredData(filteredItems);
  }
  return (
    <div>
      <button className="border px-6 py-3 rounded-md bg-blue-500 text-white" onClick={togglePopover}>{name}</button>
      <div ref={refs.setReference} />
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} className="popover-content shadow-lg p-4 bg-white rounded-md max-h-96 overflow-y-auto max-w-xs border-gray-200 border mt-2">
          <div>
            <input placeholder={`Filter ${name}`} className="border w-full rounded p-1 pl-2" onChange={filterItems} />
          </div>
          {filteredData.length > 0 ? (
            <ul>
              {filteredData.map((item: any) => (
              <li key={item.id} className="flex items-center gap-4 p-1 mb-2 mt-2 hover:bg-gray-100 rounded-md">
                {labelIconKey && (
                <img src={item[labelIconKey] || labelIconKey} alt="icon" className="rounded" style={{ height: 20, width: 20 }} />
                )}
                {labelColorKey && (
                <span className="w-4 h-4 rounded-full border border-black-200" style={{ backgroundColor: `#${item[labelColorKey]}` }} />
                )}
                <span>{item[labelKey]}</span>
              </li>
              ))}
            </ul>
            ) : (
            <div className="text-center text-gray-500 mt-4">No results found</div>
            )}
        </div>
      )}
    </div>
  );
};

export default GithubFilter;
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

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  useDismiss(context);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  }

  console.log(labelIconKey, labelColorKey, labelKey, data);

  return (
    <div>
      <button className="border px-6 py-3 rounded-md bg-blue-500 text-white" onClick={togglePopover}>{name}</button>
      <div ref={refs.setReference} />
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} className="popover-content shadow-lg p-4 bg-white rounded-md max-h-96 overflow-y-auto max-w-xs border-gray-200 border mt-2">
          <div>
            <input placeholder="Search" className="border w-full rounded p-1 pl-2" />
          </div>
          {/* {labelIconKey && (
            <div>
              <img src={labelIconKey} alt="icon" />
            </div>
          )} */}
          <ul>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data.map((item: any) => (
              <li key={item.id} className="flex items-center gap-4 mb-2 mt-2">
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

        </div>
      )}
    </div>
  );
};

export default GithubFilter;
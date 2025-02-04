import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarItem } from '../types';
import { Code2, PartyPopper } from 'lucide-react';

interface CalendarCellProps {
  item: CalendarItem;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({ item }) => {
  if (item.isBreak) {
    return (
      <div className="p-3 sm:p-4 bg-gray-50 h-full flex items-center justify-center">
        <div className="text-gray-400 font-medium text-sm sm:text-base">Break</div>
      </div>
    );
  }

  if (item.isCelebrate) {
    return (
      <div className="p-3 sm:p-4 bg-purple-50 h-full flex items-center justify-center">
        <div className="text-purple-500 font-medium flex items-center gap-2 text-sm sm:text-base">
          <PartyPopper size={20} className="flex-shrink-0" />
          Celebrate
        </div>
      </div>
    );
  }

  if (item.isContinue) {
    return (
      <div className="p-3 sm:p-4 bg-blue-50 h-full flex items-center justify-center">
        <div className="text-blue-500 font-medium italic text-center text-sm sm:text-base">
          Continue yesterday's exercise
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 bg-white h-full flex flex-col">
      <div className="flex items-start sm:items-center justify-between gap-2 mb-3">
        <span className="text-blue-600 font-bold text-lg sm:text-xl">{item.day}.</span>
        {item.category && (
          <span className="text-[10px] sm:text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-medium">
            {item.category}
          </span>
        )}
      </div>
      {item.title && item.path && (
        <Link
          to={item.path}
          className="text-gray-800 hover:text-blue-600 transition-colors flex items-start gap-2 group text-sm sm:text-base"
        >
          <Code2 size={20} className="flex-shrink-0 mt-1" />
          <span className="group-hover:underline">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
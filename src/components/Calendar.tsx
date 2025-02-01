import React from 'react';
import { calendarData } from '../data/calendar';
import { CalendarCell } from './CalendarCell';
import { Code } from 'lucide-react';

export const Calendar: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Code size={28} className="text-blue-600 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">React Practice Calendar</h1>
          </div>
          <a
            href="mailto:calendar@reactpractice.dev"
            className="text-purple-600 hover:text-purple-700 transition-colors text-sm sm:text-base"
          >
            Send your feedback to calendar@reactpractice.dev
          </a>
        </div>

        <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm">
          {calendarData.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 divide-x divide-y divide-blue-200 first:divide-y-0"
            >
              {week.items.map((item, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="min-h-[180px] border-blue-200 first:border-t"
                >
                  <CalendarCell item={item} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm sm:text-base">
          Checkout more exercises at{' '}
          <a
            href="https://reactpractice.dev"
            className="text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            https://reactpractice.dev
          </a>
        </div>
      </div>
    </div>
  );
};
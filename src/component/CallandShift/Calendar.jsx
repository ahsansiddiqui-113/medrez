import React from "react";

const months = [
  { name: "Jan", days: 31, startDay: 1 }, 
  { name: "Feb", days: 29, startDay: 4 }, 
  { name: "Mar", days: 31, startDay: 4 },
  { name: "Apr", days: 30, startDay: 7 },
  { name: "May", days: 31, startDay: 2 },
  { name: "Jun", days: 30, startDay: 5 },
  { name: "Jul", days: 31, startDay: 7 },
  { name: "Aug", days: 31, startDay: 3 },
  { name: "Sep", days: 30, startDay: 6 },
  { name: "Oct", days: 31, startDay: 1 },
  { name: "Nov", days: 30, startDay: 4 },
  { name: "Dec", days: 31, startDay: 6 },
];

const Calendar = () => {
  const generateDays = (daysInMonth, startDay) => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1"></div>); 
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="p-1 text-center rounded bg-green-100 text-sm">
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-2 overflow-y-auto h-[400px]"> 
      <h2 className="text-xl font-bold text-gray-700 text-center">
        Full Year Calendar - 2024
      </h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {months.map((month, index) => (
          <div key={index} className="border p-2 rounded-lg"> 
            <div className="flex items-center space-x-2 text-gray-400 font-semibold">
              <span className="text-lg">{month.name}</span>
              <span className="text-md">24</span>
            </div>

            <div className="grid grid-cols-7 gap-1 mt-1 text-center">
              <div className="text-gray-600 text-sm">S</div> 
              <div className="text-gray-600 text-sm">M</div>
              <div className="text-gray-600 text-sm">T</div>
              <div className="text-gray-600 text-sm">W</div>
              <div className="text-gray-600 text-sm">TH</div>
              <div className="text-gray-600 text-sm">F</div>
              <div className="text-gray-600 text-sm">S</div>

              {generateDays(month.days, month.startDay)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

import React, { useState } from 'react';

const QuickAddModal = ({ onClose, onAdd }) => {
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Quick Add Rotations</h3>

        <div className="mb-4">
          <h4 className="text-sm mb-2">Select Year:</h4>
          <div className="flex gap-2 flex-wrap">
            {['PGY-7', 'PGY-6', 'PGY-5', 'PGY-4', 'PGY-3', 'PGY-2', 'PGY-1', 'Intern', 'Fellow', 'Attending', 'Other'].map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`px-4 py-2 rounded-lg ${selectedYear === year ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-red-500">Close</button>
          <button onClick={() => onAdd(selectedYear)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Add</button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;

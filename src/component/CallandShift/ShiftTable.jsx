import React from "react";

function ShiftTable({ shiftRows, onDeleteShift }) {
  return (
    <div className="mt-5 max-md:max-w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 px-4">Shift Name</th>
            <th className="border-b py-2 px-4">Shift Type</th>
            <th className="border-b py-2 px-4">Date</th>
            <th className="border-b py-2 px-4">Start Time</th>
            <th className="border-b py-2 px-4">End Time</th>
            <th className="border-b py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shiftRows.map((shift) => (
            <tr key={shift._id}>
              <td className="border-b py-2 px-4">{shift.shiftName}</td>
              <td className="border-b py-2 px-4">{shift.shiftType}</td>
              <td className="border-b py-2 px-4">{shift.date}</td>
              <td className="border-b py-2 px-4">{shift.startTime}</td>
              <td className="border-b py-2 px-4">{shift.endTime}</td>
              <td className="border-b py-2 px-4">
                <button
                  className="text-red-600"
                  onClick={() => onDeleteShift(shift._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShiftTable;

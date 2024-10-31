import React, { useState, useEffect } from 'react';

const BlockForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || { blockName: '', startDate: '', endDate: '' });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <input
        type="text"
        name="blockName"
        value={formData.blockName}
        onChange={handleChange}
        placeholder="Block Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded text-sm">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">
          {initialData ? 'Update' : 'Add'} Block
        </button>
      </div>
    </form>
  );
};

export default BlockForm;

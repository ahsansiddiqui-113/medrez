import React, { useState } from 'react';
import Calendar from './CallandShift/Calendar';
import Layout from './Layout';
import { Link } from 'react-router-dom';

const CallShiftSchedule = () => {
  const [blockData, setBlockData] = useState([
    { id: 1, blockName: 'July', startDate: 'July 1, 2024', endDate: 'July 20, 2024' },
    { id: 2, blockName: 'August', startDate: 'August 1, 2024', endDate: 'August 20, 2024' },
    { id: 3, blockName: 'September', startDate: 'September 1, 2024', endDate: 'September 20, 2024' },
    { id: 4, blockName: 'October', startDate: 'October 1, 2024', endDate: 'October 20, 2024' },
  ]);

  const [showOptions, setShowOptions] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState(null);

  const handleEdit = (id) => {
    setEditingBlockId(id);
  };

  const handleSave = (id) => {
    setEditingBlockId(null);
  };

  const handleCancel = () => {
    setEditingBlockId(null);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setBlockData(blockData.map(block =>
      block.id === id ? { ...block, [name]: value } : block
    ));
  };

  const handleRemove = (id) => {
    setBlockData(blockData.filter(block => block.id !== id));
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setEditingBlockId(null);
  };

  const [settings, setShowSetting] = useState(false);
  const [showResidents, setShowResidents] = useState(false);
  const [residents, setResidents] = useState([
    { id: 1, name: 'John Doe', specialty: 'Cardiology', year: 'PGY-3', status: 'Active' },
    { id: 2, name: 'Jane Smith', specialty: 'Neurology', year: 'PGY-2', status: 'Active' },
    { id: 3, name: 'Mike Johnson', specialty: 'Pediatrics', year: 'PGY-1', status: 'Inactive' },
    { id: 4, name: 'Sarah Brown', specialty: 'Surgery', year: 'PGY-4', status: 'Active' },
  ]);

  const [blocks, setBlocks] = useState([
    { id: 1, name: 'Block A', residents: ['John Doe', 'Jane Smith'] },
    { id: 2, name: 'Block B', residents: ['Mike Johnson'] },
    { id: 3, name: 'Block C', residents: [] },
    { id: 4, name: 'Block D', residents: ['Sarah Brown', 'Tom Wilson'] },
  ]);

  const toggleResidents = () => {
    setShowResidents(true);
  };

  const toggleBlocks = () => {
    setShowResidents(false);
  };

  return (
    <Layout>
      <div className="w-full flex flex-col lg:flex-row p-4 bg-gray-100 gap-6 overflow-hidden">
        <div className="lg:w-2/3 w-full bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Call and Shift Schedule</h2>
              <p className="text-sm text-gray-500">
                Monthly <strong>2024 - 2025</strong>
              </p>
            </div>
            <div className="space-x-2">
              <button
                className={`py-1 px-3 rounded text-sm font-bold text-white ${!showResidents ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'
                  }`}
                onClick={toggleBlocks}
              >
                Blocks
              </button>
              <button
                className={`py-1 px-3 rounded text-sm font-bold text-white ${showResidents ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-600'
                  }`}
                onClick={toggleResidents}
              >
                Residents
              </button>
              <Link to="/settingcall">
                <button className="py-1 px-3 rounded text-sm font-bold bg-gray-500 hover:bg-blue-700 text-white">
                  Settings
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            {showResidents ? (
              <div>
                <div className="flex justify-between mb-4">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add Resident
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Auto Include
                  </button>
                </div>
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 border">Resident</th>
                      {Array.from({ length: 12 }, (_, i) => (
                        <th key={i} className="p-4 border">
                          {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {residents.map((resident) => (
                      <tr key={resident.id}>
                        <td className="p-4 border">{resident.name}</td>
                        {Array.from({ length: 12 }, (_, i) => (
                          <td key={i} className="p-4 border text-center">✓</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <div className="flex justify-end mb-4">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add Block
                  </button>
                </div>
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 border">Block Name</th>
                      <th className="p-4 border">Start Date</th>
                      <th className="p-4 border">End Date</th>
                      <th className="p-4 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockData.map((block) => (
                      <tr key={block.id}>
                        <td className="p-4 border">
                          {editingBlockId === block.id ? (
                            <input
                              type="text"
                              name="blockName"
                              value={block.blockName}
                              onChange={(e) => handleInputChange(e, block.id)}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            block.blockName
                          )}
                        </td>
                        <td className="p-4 border">
                          {editingBlockId === block.id ? (
                            <input
                              type="text"
                              name="startDate"
                              value={block.startDate}
                              onChange={(e) => handleInputChange(e, block.id)}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            block.startDate
                          )}
                        </td>
                        <td className="p-4 border">
                          {editingBlockId === block.id ? (
                            <input
                              type="text"
                              name="endDate"
                              value={block.endDate}
                              onChange={(e) => handleInputChange(e, block.id)}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            block.endDate
                          )}
                        </td>
                        <td className="p-4 border">
                          {editingBlockId === block.id ? (
                            <>
                              <button
                                onClick={() => handleSave(block.id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(block.id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleRemove(block.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/4 w-full bg-white p-4 rounded-lg shadow-md">
          <Calendar />
        </div>
      </div>
    </Layout>

  );
};

export default CallShiftSchedule;

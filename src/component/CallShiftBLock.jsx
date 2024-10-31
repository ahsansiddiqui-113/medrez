import React, { useState, useEffect } from "react";
import axios from "axios";
import ShiftTable from "./CallandShift/ShiftTable";
import Modal from "./CallandShift/Modal";
import Layout from '../component/Layout';

function CallShiftBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shiftRows, setShiftRows] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/shifts");
        setShiftRows(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchShifts();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddShiftRow = async (newShift) => {
    try {
      const response = await axios.post("http://localhost:5000/api/shifts", newShift);
      setShiftRows((prevRows) => [...prevRows, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding shift:", error.response.data);
      alert("Failed to add shift. Please try again.");
    }
  };

  const handleDeleteShift = async (shiftId) => {
    try {
      await axios.delete(`http://localhost:5000/api/shifts/${shiftId}`);
      setShiftRows((prevRows) => prevRows.filter((shift) => shift._id !== shiftId));
    } catch (error) {
      console.error("Error deleting shift:", error.response.data);
      alert("Failed to delete shift. Please try again.");
    }
  };

  return (
    <Layout>
      <section className="w-[85%] flex flex-col p-6">
        <h2 className="self-start mt-8 text-xl font-semibold text-slate-900">
          Shift & Calls
        </h2>

        <div className="flex gap-2 mt-5 max-w-full w-[207px]">
          <button
            className="px-5 py-2 my-auto text-sm font-semibold text-white bg-emerald-500 rounded-lg"
            onClick={handleOpenModal}
          >
            Add Row of Shifts
          </button>
        </div>

        {shiftRows.length === 0 ? (
          <div className="text-center mt-10">
            <p>No shifts available. Please add a shift.</p>
          </div>
        ) : (
          <>
            <ShiftTable shiftRows={shiftRows} onDeleteShift={handleDeleteShift} />
          </>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddShiftRow={handleAddShiftRow}
        />
      </section>
    </Layout>
  );
}

export default CallShiftBlock;

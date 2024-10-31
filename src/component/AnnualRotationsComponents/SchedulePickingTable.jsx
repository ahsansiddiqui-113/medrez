import React, { useState, useEffect } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import SelectResidentForm from "./SelectResidentForm";
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import MonthBlock from "./MonthBlock";
import QuickAddModal from "./QuickAddModal";


const SchedulePickingTable = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedResidents, setSelectedResidents] = useState([]);
  const [newResidentName, setNewResidentName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotations, setRotations] = useState([]); 

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleResidentsSelect = (residents) => {
    setSelectedResidents(residents);
    setIsPopupOpen(false);
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Residents Schedule", 14, 22);

    const headers = [["Resident", "Year", "Tallies and Targets"]];
    const data = selectedResidents.map(resident => [resident.name, resident.year, ""]); 

    doc.autoTable({
      startY: 30,
      head: headers,
      body: data,
      theme: 'grid',
      styles: { fontSize: 12 },
    });

    doc.save('residents-schedule.pdf');
  };

  const handleQuickAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleAdd = (selectedYear, residentName) => {
    const newResident = {
      name: residentName,
      year: selectedYear,
    };
  
    setSelectedResidents((prevResidents) => [...prevResidents, newResident]);
    setIsModalOpen(false);  
  };
  

  
  const handlePublish = async () => {
    try {
      const response = await fetch('/api/publish-schedule', {
        method: 'POST', 
        
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          residents: selectedResidents,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Schedule published successfully!');
      } else {
        alert('Failed to publish schedule.');
      }
    } catch (error) {
      console.error('Error publishing schedule:', error);
      alert('An error occurred.');
    }
  };

  const handleQuickAdd = () => {
    if (newResidentName.trim()) {
      const newResident = {
        name: newResidentName,
        year: '2024-2025', 
      };

      setSelectedResidents(prevResidents => [...prevResidents, newResident]);
      setNewResidentName(""); 
    } else {
      alert("Please enter a resident name.");
    }
  };

  const generateMonthlyBlocks = (month) => {
    const [monthName, year] = month.split(' ');
    const daysInMonth = new Date(year, new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1, 0).getDate();
    
    const blocks = [];
    let currentDay = 1;

    while (currentDay <= daysInMonth) {
      const remainingDays = daysInMonth - currentDay + 1;
      const blockLength = remainingDays >= 14 ? 14 : (remainingDays >= 7 ? 7 : remainingDays);
      
      blocks.push({
        setName: blockLength === 14 ? "Two Week Set" : "One Week Set",
        startDate: `${monthName} ${currentDay}`,
        endDate: `${monthName} ${currentDay + blockLength - 1}`
      });

      currentDay += blockLength;
    }

    return blocks;
  };

  const blocks = [
    { setName: "One Week Set", startDate: "July 1", endDate: "July 7" },
    { setName: "One Week Set", startDate: "July 8", endDate: "July 14" },
    { setName: "One Week Set", startDate: "July 15", endDate: "July 21" },
    { setName: "One Week Set", startDate: "July 22", endDate: "July 28" },
    { setName: "Two Week Set", startDate: "August 01", endDate: "August 14" },
  ];

  const months = [
    "July 2024",
    "August 2024",
    "September 2024",
    "October 2024",
    "November 2024",
    "December 2024",
    "January 2025",
    "February 2025",
    "March 2025",
    "April 2025",
    "June 2025",
    "May 2025"
  ];

  const calculatePositionAndWidth = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonthIndex = start.getMonth();
    const endMonthIndex = end.getMonth();

    const startOffset = Math.floor(
      (start - new Date(start.getFullYear(), startMonthIndex, 1)) /
        (1000 * 60 * 60 * 24 * 7)
    );

    const totalWeeks = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7));

    const leftPercentage = (startMonthIndex * 100) / months.length;
    const widthPercentage = (totalWeeks * 100) / months.length;

    return {
      left: `${leftPercentage}%`,
      width: `${widthPercentage}%`,
    };
  };

  useEffect(() => {
    const fetchRotations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rotations');
        const data = await response.json();
        setRotations(data); 
      } catch (error) {
        console.error('Error fetching rotations:', error);
      }
    };

    fetchRotations();
  }, []); 

  return (
    <div className="container mx-auto p-4">
      <div className="ml-10 mt-7">
        <div className="flex gap-4">
          <div>
            <SelectResidentForm onSelect={handleResidentsSelect} onClose={handleClosePopup} />
          </div>
  
          <button onClick={exportToPDF} className="bg-ButtonGrey text-black px-4 py-2 rounded-lg">
            Export to PDF <ExitToAppIcon />
          </button>
  
          <button onClick={handlePublish} className="bg-ButtonGrey text-black px-4 py-2 rounded-lg">
            Publish <UpgradeIcon />
          </button>
  
          <div className="relative">
            <button onClick={handleQuickAddClick} className="bg-ButtonGrey text-black px-4 py-2 rounded-lg">
              Quick Add
            </button>
            
            {isModalOpen && <QuickAddModal onClose={handleModalClose} onAdd={handleAdd} />}
          </div>
        </div>  

        <div className="mt-7">
          <div className="flex">
            <div className="flex w-full">
              <table className="min-w-[30%] border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-200 w-[50%]">
                      Residents
                    </th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-200 w-[50%]">
                      Tallies and Targets
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedResidents.length > 0 ? (
                    selectedResidents.map((resident, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 bg-white text-left h-16 flex flex-col justify-center">
                          <h4 className="text-[18px] font-semibold">{resident.name}</h4>
                          <p>{resident.year}</p>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 bg-white text-center"></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="border border-gray-300 px-4 py-2 bg-white text-center h-[300px]"
                        colSpan="2"
                      >
                        Select Residents First!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      {months.map((month, index) => (
                        <th
                          key={index}
                          className="border border-gray-300 px-4 py-2 min-w-[200px] bg-gray-200"
                        >
                          {month}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedResidents.map((resident, residentIndex) => (
                      <tr key={residentIndex} className="border-b-2">
                        {months.map((month, monthIndex) => (
                          <td key={monthIndex} className="bg-white text-center h-16 relative border-b-2">
                            <MonthBlock blocks={generateMonthlyBlocks(month)} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex w-full">
              <table className="min-w-[30%] border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                      Rotations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rotations.length > 0 ? (
                    rotations.map((rotation, index) => (
                      <tr key={index} className="h-8">
                        <td className="border border-gray-300 px-4 py-1 bg-white text-center">
                          {rotation.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="border border-gray-300 px-4 py-2 bg-white text-center h-[100px]"
                        colSpan="2"
                      >
                        No rotations available!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      {months.map((month, index) => (
                        <th
                          key={index}
                          className="border border-gray-300 px-4 py-2 min-w-[200px] bg-gray-200"
                        >
                          {month}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {months.map((_, index) => (
                        <td
                          key={index}
                          className="px-4 py-2 bg-white text-center h-14"
                        ></td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePickingTable;

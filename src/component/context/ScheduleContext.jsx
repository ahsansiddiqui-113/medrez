import { createContext, useContext, useState } from "react";

// Create context
const ScheduleContext = createContext();

// Custom hook for consuming the context
export const useSchedule = () => useContext(ScheduleContext);

// Provider component
export const ScheduleProvider = ({ children }) => {
  // Maintain separate states for different forms
  const [annualRotationData, setAnnualRotationData] = useState({
    scheduleName: "",
    scheduleYear: "",
  });

  const [shiftScheduleData, setShiftScheduleData] = useState({
    scheduleName: "",
    scheduleYear: "",
  });

  return (
    <ScheduleContext.Provider
      value={{
        annualRotationData,
        setAnnualRotationData,
        shiftScheduleData,
        setShiftScheduleData,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

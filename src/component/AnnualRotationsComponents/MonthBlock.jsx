import { useState } from "react";
import WeekBlock from "./WeekBlock";

const MonthBlock = ({ blocks }) => {
  const [tooltip, setTooltip] = useState({
    setName: "",
    startDate: "",
    endDate: "",
    visible: false,
  });

  const handleHover = (setName, startDate, endDate) => {
    if (setName && startDate && endDate) {
      setTooltip({ setName, startDate, endDate, visible: true });
    } else {
      setTooltip({ ...tooltip, visible: false });
    }
  };

  const weekBlockArray = [];
  let currentIndex = 0;

  while (currentIndex < blocks.length) {
    const block = blocks[currentIndex];
    const spanWeeks = Math.ceil(
      (new Date(block.endDate) - new Date(block.startDate)) /
        (1000 * 60 * 60 * 24 * 7)
    );

    // Ensure that we don't add more than 4 weeks to a month block
    if (weekBlockArray.length + spanWeeks > 4) {
      break;
    }

    weekBlockArray.push(
      <WeekBlock
        key={currentIndex}
        startDate={block.startDate}
        endDate={block.endDate}
        setName={block.setName}
        spanWeeks={spanWeeks}
        onHover={handleHover}
      />
    );

    currentIndex += 1;
  }

  return (
    <div className="month-block">
      {weekBlockArray}
      {tooltip.visible && (
        <div className="tooltip">
          {tooltip.setName}: {tooltip.startDate} - {tooltip.endDate}
        </div>
      )}
    </div>
  );
};

export default MonthBlock;

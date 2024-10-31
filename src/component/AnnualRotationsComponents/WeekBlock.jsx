const WeekBlock = ({ startDate, endDate, setName, spanWeeks, onHover }) => {
  return (
    <div
      className="week-block"
      style={{ width: `${100 * spanWeeks}px` }} 
      onMouseOver={() => onHover(setName, startDate, endDate)}
      onMouseOut={() => onHover(null, null, null)}
    >
    </div>
  );
};

export default WeekBlock;

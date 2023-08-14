import { DateRange } from "react-date-range";

const Datedown = ({ state, handleSubmit }) => {
  return (
    <div className="mt-4 ml-4 dropdown dropdown-hover">
      <div tabIndex="0" className="m-1 text-white btn btn-info">
        select date
      </div>
      <ul tabIndex="0" className="p-2 shadow menu dropdown-content rounded-box">
        <DateRange
          editableDateInputs={true}
          onChange={handleSubmit}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </ul>
    </div>
  );
};

export default Datedown;

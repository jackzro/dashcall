import React from "react";

function DropYear({ register }) {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const getDropList = () => {
    const year = 2022;
    return Array.from(new Array(50), (v, i) => (
      <option key={i} value={`${year + i}/${year + i + 1}`}>
        {year + i}
      </option>
    ));
  };
  return (
    <div className="my-2">
      <select
        {...register("tahun")}
        className="text-black border-2 border-black"
        onChange={handleChange}
      >
        {getDropList()}
      </select>
    </div>
  );
}

export default DropYear;

import { bulan } from "@helpers/format";
import React from "react";

function DropDownBulan({ setBulan }) {
  const handleChange = (e) => {
    setBulan(e.target.value);
  };
  const getDropList = () => {
    return bulan.map((nama) => {
      return (
        <option key={nama} value={nama}>
          {nama}
        </option>
      );
    });
  };
  return (
    <div className="my-2">
      <select
        className="text-black border-2 border-black"
        onChange={handleChange}
      >
        {getDropList()}
      </select>
    </div>
  );
}

export default DropDownBulan;

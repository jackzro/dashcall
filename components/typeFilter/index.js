import { typeFilterMenu } from "@constants/dropdownMenu";
import React from "react";

function TypeFilter({ type, setType }) {
  return (
    <div className="mt-4 ml-4 dropdown dropdown-hover">
      <div tabIndex="0" className="m-1 text-white btn btn-info">
        {type}
      </div>
      <ul
        tabIndex="0"
        className="p-2 bg-black shadow menu dropdown-content rounded-box w-52"
      >
        {typeFilterMenu.map((type) => (
          <li
            key={type.id}
            className="text-white hover:bg-blue-500 hover:rounded-lg"
            onClick={(event) => setType(event.target.text)}
          >
            <a>{type.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TypeFilter;

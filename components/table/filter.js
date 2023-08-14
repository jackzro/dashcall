export function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search:{" "}
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="px-2 py-1 ml-2 text-black"
      />
    </span>
  );
}

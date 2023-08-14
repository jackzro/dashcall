import { useTable, useFilters, usePagination } from "react-table";
import { useMemo } from "react";

const Table = ({ callData, headers }) => {
  const columns = useMemo(() => headers, []);
  const data = useMemo(() => callData, []);

  const tabelInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tabelInstance;
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="p-4">
      <table
        {...getTableProps()}
        className="w-full mt-4 bg-blue-400 border-collapse"
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="p-4"
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="sticky top-0 p-4 text-white bg-blue-600 border-2 border-collapse"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}

                  <div className="mt-2">
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-center border-4">
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={index}
                className="bg-gray-600 border-4"
              >
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    className="px-2 py-2 text-white border-4 border-collapse"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="grid content-center grid-cols-8 gap-1 mt-4 text-black bg-white justify-items-center place-items-center">
        <span className="">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          className="p-2 text-black bg-gray-400 rounded-lg outline-none"
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          className="p-2 text-black bg-gray-400 rounded-lg outline-none"
          disabled={!canNextPage}
        >
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        <span>| Go to page: </span>
        <input
          type="number"
          className="p-1 pl-2 text-black bg-white border-2 border-black rounded-xl"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          style={{ width: "50px" }}
        />
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="p-1 text-white bg-black rounded-xl"
        >
          {[10, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;

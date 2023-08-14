import { ColumnFilter } from "./filter";

export const Columns = [
  {
    Header: "Date",
    accessor: "date",
    disableFilters: true,
  },
  {
    Header: "Duration",
    accessor: "duration",
    disableFilters: true,
  },
];

export const ColumnsBySrc = [
  {
    Header: "Number",
    accessor: "number",
    Filter: ColumnFilter,
  },
  {
    Header: "Duration",
    accessor: "duration",
    disableFilters: true,
  },
];

export const DidNumber = [
  {
    Header: "Number",
    accessor: "callerid",
    Filter: ColumnFilter,
  },
  {
    Header: "Used By",
    accessor: "usedby",
    disableFilters: true,
  },

  {
    Header: "Provider",
    accessor: "providercode",
    disableFilters: true,
  },
];

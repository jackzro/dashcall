export function sortByMonth(arr) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  arr.sort(function (a, b) {
    return months.indexOf(a.bulan) - months.indexOf(b.bulan);
  });
}

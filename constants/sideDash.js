import { AiFillHome, AiFillFileExcel, AiOutlineBarChart } from "react-icons/ai";
import { FcCallback } from "react-icons/fc";
import { HiDocumentReport } from "react-icons/hi";

export const SIDEBAR_MENUS = [
  { title: "Home", pathname: "/", icon: <AiFillHome /> },
  { title: "Month", pathname: "/month", icon: <FcCallback /> },
  // { title: "Outline", pathname: "/outline", icon: <AiOutlineBarChart /> },
  // { title: "Did", pathname: "/did", icon: <FcCallback /> },
];

export const BANK_MENUS = [
  { title: "Home", pathname: "/", icon: <AiFillHome /> },
];

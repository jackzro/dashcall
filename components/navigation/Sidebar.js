import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BANK_MENUS, SIDEBAR_MENUS } from "../../constants/sideDash";
import { SiDoordash } from "react-icons/si";
import { FaBars, FaTimes } from "react-icons/fa";

export const ItemLink = React.memo(({ title, pathname, icon, isActive }) => {
  return (
    <Link className={"text-xs uppercase py-3 block"} href={pathname}>
      <div
        className={`flex justify-start items-center ${
          isActive ? "font-bold" : ""
        }`}
      >
        <span className="flex justify-center w-4 mr-4 text-black md:text-black">
          {icon}
        </span>
        <span
          className={`text-black md:text-black ${
            isActive ? "text-md" : "text-sm"
          }`}
        >
          {title}
        </span>
      </div>
    </Link>
  );
});

export default function Sidebar({ role }) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  const currentPathName = router.pathname;

  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 text-black bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
          <button
            className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <FaBars className="w-10 h-10 text-black xl:w-20 xl:h-20" />
          </button>
          <Link
            className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 whitespace-nowrap"
            href="/"
          >
            <div className="flex items-center justify-center">
              <SiDoordash className="w-10 h-10 text-black xl:w-20 xl:h-20" />
            </div>
          </Link>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <div className="block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 whitespace-nowrap"
                    href="/"
                  >
                    <></>
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FaTimes className="w-10 h-10 text-black" />
                  </button>
                </div>
              </div>
            </div>

            {/* <hr className="my-6 md:min-w-full" /> */}

            <div className="mt-5 mb-5 border-b-8 border-black"></div>

            <ul className="flex flex-col items-center list-none md:flex-col md:min-w-full md:mb-4">
              {role === "admin"
                ? SIDEBAR_MENUS.map(({ title, pathname, icon }) => (
                    <li
                      key={title}
                      className="items-center mb-6 cursor-pointer"
                    >
                      <ItemLink
                        title={title}
                        pathname={pathname}
                        icon={icon}
                        isActive={currentPathName === pathname}
                      />
                    </li>
                  ))
                : BANK_MENUS.map(({ title, pathname, icon }) => (
                    <li
                      key={title}
                      className="items-center mb-6 cursor-pointer"
                    >
                      <ItemLink
                        title={title}
                        pathname={pathname}
                        icon={icon}
                        isActive={currentPathName === pathname}
                      />
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

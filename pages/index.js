import Dropdown from "@components/dropdown";
import Table from "@components/table";
import { clients } from "@constants/dropdownMenu";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import { useState, useContext } from "react";
import { format } from "date-fns";
import Datedown from "@components/datedown";
import {
  useCallDurationByDate,
  useCallDurationBySource,
  useCallDetail,
} from "@services/ippbx";
import Loading from "@components/loading";
import { Columns, ColumnsBySrc } from "@components/table/headers";
import { formatNumber } from "@helpers/format";
import TypeFilter from "@components/typeFilter";
import { AuthContext } from "@context/AuthContext";
import * as xlsx from "xlsx";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [client, setClient] = useState("");
  const [filexlsx, setFilexlsx] = useState([]);
  const [callData, setCallData] = useState([]);
  const [type, setType] = useState("Date");
  const { mutate: postCallDuration } = useCallDurationByDate();
  const { mutate: postCallDurationBySrc } = useCallDurationBySource();
  const { mutate: postCallDetail } = useCallDetail();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(
        `${new Date().getMonth() + 1}/${
          new Date().getDate() + 1
        }/${new Date().getFullYear()}`
      ),
      key: "selection",
    },
  ]);

  const handleSubmit = (item) => {
    setCallData([]);
    const start_date = format(new Date(item.selection.startDate), "yyyy-MM-dd");
    const end_date = format(new Date(item.selection.endDate), "yyyy-MM-dd");
    setState([item.selection]);
    if (type === "Date") {
      postCallDuration(
        {
          name: user.code,
          start_date,
          end_date,
        },
        {
          onSuccess: async (data) => {
            data.map(
              (res) => (res.date = format(new Date(res.date), "yyyy-MM-dd"))
            );
            setCallData(data);
          },
          onError: async (data) => {
            console.log(data);
          },
        }
      );
      postCallDetail(
        {
          name: user.code,
          start_date,
          end_date,
        },
        {
          onSuccess: async (datas) => {
            datas.map((data) => {
              data.calldate = new Date(data.calldate);
            });
            setFilexlsx(datas);
          },
          onError: async (data) => {
            console.log(data);
          },
        }
      );
    } else {
      postCallDurationBySrc(
        {
          name: client,
          start_date,
          end_date,
        },
        {
          onSuccess: async (data) => {
            setCallData(data);
          },
          onError: async (data) => {
            console.log(data);
          },
        }
      );
    }
  };

  const generateFile = () => {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(filexlsx);
    xlsx.utils.book_append_sheet(wb, ws, "MyFile");
    xlsx.writeFile(wb, `reportdetail.xlsx`);
  };

  const renderTotal = () => {
    let total = 0;
    callData.map((item) => (total += Number(item.duration)));
    return (
      <div className="items-center justify-center p-4 mt-6 text-center text-white rounded-lg bg-info">
        <p>Total Duration: {formatNumber(total)}</p>
      </div>
    );
  };

  return (
    <Dashboard title="Dashboard">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex items-center justify-around">
        <div className="flex items-center">
          {/* <Dropdown
            setClient={setClient}
            customer={clients}
            client={client}
            user={user}
          /> */}
          {/* <TypeFilter type={type} setType={setType} /> */}
          <Datedown state={state} handleSubmit={handleSubmit} />

          {filexlsx.length !== 0 && (
            <button
              className="p-2 mt-4 ml-4 text-xl text-white bg-green-500 rounded-md"
              onClick={generateFile}
            >
              Generate Excel Detail
            </button>
          )}
        </div>

        {renderTotal()}
      </div>

      {callData.length !== 0 ? (
        <Table
          callData={callData}
          headers={type === "Date" ? Columns : ColumnsBySrc}
        />
      ) : (
        <Loading />
      )}
    </Dashboard>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const user = JSON.parse(await ctx.req.cookies["nextauth.user"]);

//   // if (!user) {
//   //   return {
//   //     redirect: {
//   //       destination: "/login", //usually the login page
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   return {
//     props: {
//       userdata: user,
//     },
//   };
// };

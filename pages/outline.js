import React, { useState, useEffect, useContext } from "react";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import Dropdown from "@components/dropdown";
import Datedown from "@components/datedown";
import { useCallDurationByDate } from "@services/ippbx";
import { clients } from "@constants/dropdownMenu";
import { ChartArea } from "@components/chart/areaChart";
import { format } from "date-fns";
import Loading from "@components/loading";
import { useCustomer, useCustomerById } from "@services/accumulation";
import { sortByMonth } from "@helpers/func";
import { AuthContext } from "@context/AuthContext";

function Outline() {
  const { user } = useContext(AuthContext);
  const [client, setClient] = useState("");
  const [callData, setCallData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [bulanData, setBulanData] = useState({});
  const { mutate: postCallDuration } = useCallDurationByDate();
  const { data: customers, isLoading } = useCustomer();
  const { mutate: getCustomerById } = useCustomerById();
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

  const handleSubmit = async (item) => {
    setCallData([]);
    const start_date = format(new Date(item.selection.startDate), "yyyy-MM-dd");
    const end_date = format(new Date(item.selection.endDate), "yyyy-MM-dd");
    setState([item.selection]);

    await postCallDuration(
      {
        name: client,
        start_date,
        end_date,
      },
      {
        onSuccess: async (data) => {
          let yAxis = [];
          let xAxis = [];
          await Promise.all(
            data.map((res) => {
              xAxis.push(format(new Date(res.date), "yyyy-MM-dd"));
              yAxis.push(Number(res.duration));
            })
          );
          const chartData = {
            labels: xAxis,
            datasets: [
              {
                fill: true,
                label: `${client} per Date`,
                data: xAxis.map((d, i) => yAxis[i]),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          };

          setChartData(chartData);
          setCallData(data);
        },
        onError: async (err) => {
          console.log(err);
        },
      }
    );

    await getCustomerById(
      {
        id: client,
      },
      {
        onSuccess: async (data) => {
          let yAxis = [];
          let xAxis = [];
          sortByMonth(data.cdrmonths);
          await Promise.all(
            data.cdrmonths.map((res) => {
              xAxis.push(res.bulan);
              yAxis.push(res.totalsec);
            })
          );
          const bulanData = {
            labels: xAxis,
            datasets: [
              {
                fill: true,
                label: `${client} per Months`,
                data: xAxis.map((d, i) => yAxis[i]),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          };
          setBulanData(bulanData);
        },
        onError: async (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <Dashboard title="Outline">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-col items-center justify-around">
        <div>
          {isLoading === false && (
            <Dropdown
              setClient={setClient}
              customer={customers}
              client={client}
              user={user}
            />
          )}
          {client !== "" && (
            <Datedown state={state} handleSubmit={handleSubmit} />
          )}
        </div>
        <div className="w-full h-1/12">
          {callData.length !== 0 ? (
            <div className="w-full">
              <ChartArea chartData={chartData} />
            </div>
          ) : (
            <Loading />
          )}
          {Object.keys(bulanData).length !== 0 && (
            <div className="w-full">
              <ChartArea chartData={bulanData} />
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
}

export default Outline;

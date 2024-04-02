import DropDownBulan from "@components/dropdownbulan";
import Loading from "@components/loading";
import Table from "@components/table";
import { ColumnTable, Columns } from "@components/table/headers";
import { formatNumber } from "@helpers/format";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostCdrMonthByMonth } from "@services/accumulation";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

function Month() {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [boolData, setBoolData] = useState("");
  const [dataIndosat, setDataIndosat] = useState([]);
  const [dataTelkom, setDataTelkom] = useState([]);

  const { mutate: postCdrMonthByMonth } = usePostCdrMonthByMonth();

  const handleSubmit = () => {
    setDataIndosat([]);
    setDataTelkom([]);
    if (bulan === "" || tahun === "") {
      toast.warn("Bulan atau tahun diisi !!!");
    }

    postCdrMonthByMonth(
      {
        bulan,
        tahun,
      },
      {
        onSuccess: (succ) => {
          if (succ.length === 0) {
            setBoolData("Tidak ada data");
            return;
          }
          let res = {};
          succ.map((data) => {
            if (res[data.provider] === undefined) {
              res[data.provider] = [];

              res[data.provider].push(data);
            } else if (res[data.provider] !== undefined) {
              res[data.provider].push(data);
            }
            return;
          });

          if (res["Indosat"].length === 0) {
            setDataIndosat([]);
          } else {
            setDataIndosat(res["Indosat"]);
          }

          if (res["Telkom"].length === 0) {
            setDataTelkom([]);
          } else {
            setDataTelkom(res["Telkom"]);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const renderDataTotal = (data) => {
    let res = 0;

    if (data?.length !== undefined) {
      data.map((sec) => {
        res += sec.totalsec;
      });
      return res;
    }

    return 0;
  };

  const renderTotal = (indosat, telkom) => {
    let res = 0;

    if (indosat !== undefined) {
      indosat.map((sec) => {
        res += sec.totalsec;
      });
    }
    if (telkom !== undefined) {
      telkom.map((sec) => {
        res += sec.totalsec;
      });
    }

    return res;
  };

  return (
    <Dashboard title="Month Report">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex items-center justify-around mb-6">
        <span className="flex items-center">
          <label className="mr-4 text-xl text-black"> Bulan : </label>
          <DropDownBulan setBulan={setBulan} />
        </span>

        <span className="flex items-center">
          <label className="mr-2 text-xl text-black"> Tahun : </label>
          <input
            onChange={(e) => setTahun(e.target.value)}
            type="text"
            placeholder="Tahun"
            className="p-2 text-xl text-black border-2 border-black rounded-lg"
          />
        </span>

        <span>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </span>
      </div>

      {dataIndosat?.length !== 0 || dataTelkom?.length !== 0 ? (
        <div className="">
          <div>
            <span className="text-xl text-black">
              <span className="flex items-center justify-between">
                <span>
                  <label>Telkom : </label>

                  {dataTelkom?.length !== 0 ? (
                    <label>{formatNumber(renderDataTotal(dataTelkom))}</label>
                  ) : null}
                </span>
                <span>
                  <label>Total : </label>
                  <label>
                    {formatNumber(renderTotal(dataIndosat, dataTelkom))}
                  </label>
                </span>
              </span>
            </span>

            {dataTelkom?.length !== 0 ? (
              <Table callData={dataTelkom} headers={ColumnTable} />
            ) : null}
          </div>

          <div>
            <span className="text-xl text-black">
              <label>Indosat : </label>
              <label>
                {dataIndosat?.length !== 0 ? (
                  <label>{formatNumber(renderDataTotal(dataIndosat))}</label>
                ) : null}
              </label>
            </span>

            {dataIndosat?.length !== 0 ? (
              <Table callData={dataIndosat} headers={ColumnTable} />
            ) : null}
          </div>
        </div>
      ) : boolData === "Tidak ada data" ? (
        <p className="flex items-center justify-center pt-10 text-2xl text-red-500">
          {boolData}
        </p>
      ) : (
        <Loading />
      )}
    </Dashboard>
  );
}

export default Month;

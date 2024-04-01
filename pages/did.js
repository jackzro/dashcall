import React, { useContext, useState } from "react";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import Dropdown from "@components/dropdown";
import { clients } from "@constants/dropdownMenu";
import { useDidByClient } from "services/ippbx";
import Table from "@components/table";
import { DidNumber } from "@components/table/headers";
import Loading from "@components/loading";
import { AuthContext } from "@context/AuthContext";
import { useCustomer } from "@services/accumulation";

function Did() {
  const { user } = useContext(AuthContext);
  const [client, setClient] = useState("");
  const [number, setNumber] = useState([]);
  const { mutate: getClientDid, isLoading } = useDidByClient();
  const { data: customers, isLoading: loadingCustomer } = useCustomer();

  const handleSubmit = () => {
    setNumber([]);
    getClientDid(
      {
        name: client,
      },
      {
        onSuccess: (data) => {
          setNumber(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <Dashboard title="Outline">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-col">
        <div className="mb-2">
          <label className="mt-2 text-black">Select Client: </label>
          {loadingCustomer === false && customers.length !== 0 ? (
            <Dropdown
              setClient={setClient}
              customer={customers}
              client={client}
              user={user}
            />
          ) : null}
        </div>
        <button
          className="p-2 text-xl text-white bg-green-500 rounded-xl"
          onClick={handleSubmit}
        >
          Generate
        </button>
      </div>
      {number.length !== 0 ? (
        <Table headers={DidNumber} callData={number} />
      ) : (
        <Loading />
      )}
    </Dashboard>
  );
}

export default Did;

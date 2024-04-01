import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bulan } from "@helpers/format";
import DropYear from "@components/dropyear";
import { usePostCdrMonth } from "@services/accumulation";
// import NumberFormat from "react-number-format";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "25px",
  zIndex: 1000,
  borderRadius: 6,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const schema = yup
  .object({
    name: yup.string().required(),
    total: yup.number().required(),
    bulan: yup.string().required(),
    tahun: yup.string().required(),
    provider: yup.string().required(),
  })
  .required();

const provider = ["Indosat", "Telkom"];

function ModalCdrMonth({ open, onClose, total, client }) {
  const { mutate: postCdrMonth } = usePostCdrMonth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name === undefined ? "" : client,
      total: total === undefined ? "" : total,
    },
  });

  if (!open) return null;

  const onHandleSubmit = (data) => {
    postCdrMonth(data, {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    });

    toast("Berhasil ditambahkan !!! ");
    reset();
    onClose();
  };
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="">
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <label className="text-xl text-black">Client : </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Nama Client"
              className="w-full xl:w-[1000px] text-xl input input-bordered mb-2 mt-2"
              value={client}
              disabled
            />

            <label className="text-xl text-black">Total: </label>
            <input
              {...register("total")}
              type="text"
              placeholder="Total"
              className="w-full xl:w-[1000px] text-xl input input-bordered mb-2 mt-2"
              value={total}
              disabled
            />
            <select
              className="w-full xl:w-[1000px] select select-bordered mb-2"
              {...register("bulan")}
              //   onChange={unitHandler}
            >
              <option value="">Bulan</option>
              {bulan.map((data) => (
                <option value={data} key={data}>
                  {data}
                </option>
              ))}
            </select>

            {errors.bulan && (
              <p className="text-xl text-red-600">{errors.bulan.message}</p>
            )}

            <select
              className="w-full xl:w-[1000px] select select-bordered mb-2"
              {...register("provider")}
              //   onChange={unitHandler}
            >
              <option value="">Provider</option>
              {provider.map((data) => (
                <option value={data} key={data}>
                  {data}
                </option>
              ))}
            </select>

            {errors.provider && (
              <p className="text-xl text-red-600">{errors?.provider.message}</p>
            )}

            <span className="text-black">Tahun : </span>
            {/* <DropYear register={register} />

            {errors.tahun && (
              <p className="text-xl text-red-600">{errors.tahun.message}</p>
            )} */}
            <input
              {...register("tahun")}
              type="text"
              placeholder="Tahun"
              className="w-full xl:w-[1000px] input input-bordered mb-2 mt-2"
            />
            {errors.tahun && (
              <p className="text-xl text-red-600">{errors?.tahun.message}</p>
            )}

            {/* <section className="flex items-center mt-2 mb-10">
              <label className="mr-2 text-black">Total Second : </label>
              <Controller
                control={control}
                name="uangSekolah"
                className="input"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <NumberFormat
                    className="p-2 text-black border-2 border-black rounded-lg"
                    thousandSeparator
                    // {...field}
                    prefix="Rp "
                    onValueChange={(values) => {
                      onChange(values.value);
                      return values.value;
                    }}
                    value={value}
                  />
                )}
              />
            </section> */}

            <div className="flex justify-between">
              <button className="btn btn-success" type="submit">
                Tambah
              </button>
              <button className="btn btn-warning" onClick={onClose}>
                Tutup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalCdrMonth;

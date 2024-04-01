import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { loginRequest } from "@services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { checkAuth } from "@helpers/auth";
import { AuthContext } from "@context/AuthContext";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Signin() {
  const { signIn } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const notifyError = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      toastId: "notifyError",
    });

  const handlerLogin = async (data, e) => {
    e.preventDefault();
    try {
      await signIn(data);
      // router.push("/");
    } catch (error) {
      notifyError("Your username or password is wrong !!!");
    }
    reset("", {
      keepValues: false,
    });
  };

  useEffect(() => {
    if (checkAuth()) {
      router.push("/");
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) return <></>;

  return (
    <div className="flex">
      <div className="hidden md:inline-flex md:rounded-tl-xl md:rounded-bl-xl items-center justify-center bg-white h-[468px] w-[422px]">
        <div className="relative h-72 w-52">
          <Image
            src={require("../../assets/splash.png")}
            layout="fill"
            objectFit="cover"
            unoptimized={true}
          />
        </div>
      </div>

      <div className="flex flex-col items-center bg-white h-[468px] w-[350px] md:rounded-tl-none md:rounded-bl-none rounded-xl p-10">
        <p className="text-2xl font-light">Welcome Back!</p>
        <form onSubmit={handleSubmit(handlerLogin)}>
          <div className="flex border-2 mt-8 rounded-full pl-4 py-4 w-[300px]">
            <input
              {...register("username")}
              type="text"
              className="flex-grow text-sm bg-transparent outline-none"
              placeholder="Username"
            />
          </div>

          {errors.username && (
            <span className="pt-2 pl-6 text-lg text-red-600">
              {errors.username.message}
            </span>
          )}

          <div className="flex border-2 mt-3 rounded-full pl-4 py-4 w-[300px]">
            <input
              {...register("password")}
              type="password"
              className="flex-grow text-sm bg-transparent outline-none"
              placeholder="Password"
            />
          </div>

          {errors.password && (
            <span className="pt-2 pl-6 text-lg text-red-600">
              {errors.password.message}
            </span>
          )}

          {/* <div className="flex items-center self-start mt-4">
          <div className="flex items-center justify-center rounded-md hover:border-4 h-7 w-7">
            <input type="checkbox" className="w-5 h-5" />
          </div>

          <p className="ml-2 text-md font-extralight">Remember Me</p>
        </div> */}

          <div className="pb-5 border-b-2">
            <button
              type="submit"
              className="bg-blue-600 w-[300px] mt-4 rounded-full py-3 text-white hover:bg-blue-800"
            >
              Login
            </button>
          </div>
        </form>

        {/* <p className="mt-4 text-blue-400 cursor-pointer text-md hover:border-b-2 hover:border-blue-500">
          Forgot Password?
        </p> */}
      </div>
    </div>
  );
}

export default Signin;

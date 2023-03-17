import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const addharNumber = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(addharNumber.current.value);
    const resp = await axios.post("http://localhost:5000/", {
      addharNumber: addharNumber.current.value,
    });
    console.log(resp);
    if (resp?.data?.message === "Success") {
      toast.success("Success");
      navigate("/vote", { state: { result: resp.data.result } });
    }
    if (resp?.data?.message === "Already Voted") toast.warn("Already Voted");
    else toast.error("An error occured");
  };

  return (
    <div className="bg-zinc-800 h-screen w-full flex items-center justify-center">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="h-96 w-[30rem] bg-slate-200 rounded-lg shadow-cyan-500 shadow-2xl flex items-center justify-evenly flex-col mx-4">
        <h2 className="text-rose-600 text-4xl font-bold text-center">
          E-Voting BlockChain
        </h2>
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col justify-between h-32 m-4 w-60"
        >
          <div className="flex flex-col relative">
            <label
              htmlFor=""
              className={`absolute pointer-event-none text-slate-400 top-5 text-lg transition-all ease-in-out duration-200 ${
                hover
                  ? "-translate-y-10 translate-x-1 scale-110 text-rose-500 "
                  : ""
              }`}
            >
              Addhar Number
            </label>
            <input
              type="text"
              required={true}
              pattern="^(\d{10}|\d{12})$"
              maxLength={12}
              ref={addharNumber}
              onFocus={() => setHover(true)}
              className="z-10 w-full p-2 h-12 text-lg border-black border-b-2 outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="text-white px-6 py-2 rounded-lg bg-rose-500 shadow-md shadow-rose-400 hover:shadow-rose-400 hover:shadow-lg transition-all delay-100 text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

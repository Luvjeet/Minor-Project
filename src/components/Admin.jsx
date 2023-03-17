import React, { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Admin = () => {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    const resp = await axios.post("http://localhost:5000/admin/login", data);
    if (resp.data.message === "Success") {
      toast.success("Logged In Successfully");
      navigate("/admin/data");
    } else if (resp.data.message === "Error")
      toast.error("Invalid Credentials");
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
      <div className="h-96 w-[30rem] bg-slate-200 rounded-lg shadow-cyan-500 shadow-2xl gap-4 flex items-center flex-col mx-4">
        <h2 className="text-rose-600 text-4xl font-bold text-center mt-6">
          Admin Login
        </h2>
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col justify-between gap-8 h-32 m-4 w-60"
        >
          <div className="flex flex-col relative">
            <label
              htmlFor=""
              className={`absolute pointer-event-none text-slate-400 top-5 text-lg transition-all ease-in-out duration-200 ${
                hover1
                  ? "-translate-y-10 translate-x-1 scale-110 text-rose-500 "
                  : ""
              }`}
            >
              Email
            </label>
            <input
              type="text"
              required={true}
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              minLength="5"
              maxLength="100"
              ref={email}
              onFocus={() => setHover1(true)}
              className="z-10 w-full p-2 h-12 text-lg border-black border-b-2 outline-none bg-transparent"
            />
          </div>
          <div className="flex flex-col relative">
            <label
              htmlFor=""
              className={`absolute pointer-event-none text-slate-400 top-5 text-lg transition-all ease-in-out duration-200 ${
                hover2
                  ? "-translate-y-10 translate-x-1 scale-110 text-rose-500 "
                  : ""
              }`}
            >
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              required={true}
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              maxLength={20}
              minLength={8}
              ref={password}
              onFocus={() => setHover2(true)}
              className="z-10 w-full p-2 h-12 text-lg border-black border-b-2 outline-none bg-transparent"
            />
          </div>
          <span onClick={() => setShowPass(!showPass)}>
            <p>{!showPass ? "Show Password" : "Hide Password"}</p>
          </span>
          <button
            type="submit"
            className="text-white px-6 py-2 rounded-lg bg-rose-500 shadow-md shadow-rose-400 hover:shadow-rose-400 hover:shadow-lg transition-all delay-100 text-lg my-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;

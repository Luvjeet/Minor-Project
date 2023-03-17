import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import loader from "../assets/loader.svg";
import axios from "axios";
import { toast } from "react-toastify";

const Vote = ({ instance, account }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [voteResult, setVoteResult] = useState(true);
  const [vote, setVote] = useState(false);
  const location = useLocation();
  const { result } = location?.state;
  const [parties, setParties] = useState([]);

  const fetchParties = useCallback(async () => {
    const resp = await axios.get("http://localhost:5000/parties");
    if (resp.data.message === "Error") toast.error("No Party");
    else if (resp.data.message === "Success") {
      toast.success("Parties Fetched");
      setParties(resp.data.result);
      console.log(resp.data.result);
    }
  }, [setParties]);

  useEffect(() => {
    fetchParties();
  }, []);

  const handleSubmit = async () => {
    try {
      const currTime = new Date();
      const result = await instance.methods
        .vote(477304606429, 765215083518, Date.parse(currTime))
        // .call();
        .send({
          from: account[0],
          value: Web3.utils.toWei("0.000000675", "ether"),
        });
      console.log(result);
      if (result) {
        const resp = await axios.post("http://localhost:5000/parties/vote", {
          id: selected,
        });
        if (resp.data.message === "Success") {
          toast.success("Voted Successfully");
          setVote(true);
          setTimeout(() => {
            window.open("/", "_self");
            window.close();
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-800 h-screen w-full flex justify-center overflow-hidden">
      {vote ? (
        <div className="flex items-center flex-col justify-center text-center">
          <div>
            <h2 className="text-5xl text-rose-400 mb-4 font-bold">
              Your vote has been casted to{" "}
            </h2>
            <h2 className="text-5xl text-white ">
              {parties.map((part) => (part.id === selected ? part.name : null))}
            </h2>
          </div>
          <div className="mt-20">
            <img src={loader} />
          </div>
          <p className="text-2xl text-cyan-500 mb-4 font-bold text-center">
            This page will automatically close
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col flex-1">
          <h2 className="text-white text-4xl mb-2 text-center">
            Welcome {result.name}
          </h2>
          <p className="text-lg text-white mb-8 ">
            Please select any one from below
          </p>
          <div className="flex w-full flex-col md:flex-row items-center">
            {parties.map((part) => (
              <div
                className={`h-24 w-2/3 
            flex-1 
            m-4 
            rounded-lg 
          shadow-cyan-400
            shadow-md 
            cursor-pointer 
            transition-all 
            flex
            items-center
            duration-200 ease-linear hover:scale-105 hover:shadow-lg hover:shadow-cyan-400
            bg-white
            `}
                onClick={() => setSelected(part.id)}
                key={part.id}
              >
                <div className="h-24 flex w-full justify-around items-center text-lg font-semibold">
                  <div className="h-24">
                    <img
                      src={part.imageUrl}
                      className="h-full w-full object-contain bg-transparent"
                    />
                  </div>
                  {part.name}
                  {selected === part.id && (
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      className="text-green-500 bg-green-500 rounded-full"
                    >
                      <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-white px-12 py-4 rounded-lg bg-rose-500 shadow-lg shadow-rose-400 text-lg mt-10"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Vote;

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Parties = () => {
  const [parties, setParties] = useState([]);

  const fetchParties = useCallback(async () => {
    const resp = await axios.get("http://localhost:5000/parties");
    if (resp.data.message === "Error") toast.error("No Party");
    else if (resp.data.message === "Success") {
      toast.success("Parties Fetched");
      setParties(resp.data.result);
    }
  }, [setParties]);

  useEffect(() => {
    fetchParties();
  }, []);

  return (
    <div className="bg-zinc-800 h-screen w-full flex items-center justify-center">
      <div className="w-[30rem] bg-slate-200 rounded-lg shadow-cyan-500 shadow-2xl gap-4 flex items-center flex-col p-4 text-center">
        <div className="flex justify-between w-full">
          <h2 className="text-xl font-black">Party Logo</h2>
          <h2 className="text-xl font-black">Party Name</h2>
          <h2 className="text-xl font-black">Votes</h2>
        </div>
        {parties.map((p) => (
          <div className="flex justify-between w-full">
            <div className="h-20 w-20">
              <img
                src={p.imageUrl}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div>{p.name}</div>
            <div>{p.vote}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parties;

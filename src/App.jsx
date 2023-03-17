import Login from "./components/Login";
import Vote from "./components/Vote";
import Admin from "./components/Admin";
import Parties from "./components/Parties";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getWeb3 from "./utils/getWeb3";
import Types from "./contracts/Types.json";
import Voting from "./contracts/Voting.json";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [instance, setInstance] = useState({});

  useEffect(() => {
    const init = async () => {
      const Web3 = await getWeb3(setAccounts);
      const accounts = await Web3.eth.requestAccounts();
      const networkId = await Web3.eth.net.getId();

      const VotingAddress = Voting.networks[networkId];
      const VotingInstance = new Web3.eth.Contract(
        Voting.abi,
        VotingAddress.address
      );
      setInstance(VotingInstance);
      // console.log(
      //   VotingInstance.methods
      //     .vote(477304606429, 765215083518, 1672752871000)
      //     .send({ from: account[0] })
      // );
      console.log(VotingAddress);
    };
    init();
  });

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/vote"
          element={<Vote instance={instance} account={accounts} />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/data" element={<Parties />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

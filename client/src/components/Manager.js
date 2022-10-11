import React, { useState, useEffect } from "react";
import "./Manager.css";

const Manager = ({ state }) => {
  const [account, setAccount] = useState("");
  const [cbalance, setCbalance] = useState("");
  const [lwinner, setLwinner] = useState("");

  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      setAccount(accounts[0]);
    };

    state.web3 && getAccount();
  }, [state, state.web3]);

  const contractBalance = async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods
        .getBalance()
        .call({ from: account });
      console.log(balance);
      setCbalance(balance);
    } catch (e) {
      setCbalance("You are not the manager");
    }
  };

  const winner = async () => {
    const { contract } = state;
    try {
      await contract.methods.pickWinner().send({ from: account });
      const lotteryWinner = await contract.methods.winner().call();
      console.log(lotteryWinner);
      setLwinner(lotteryWinner);
    } catch (e) {
      if (e.message.includes("You are not the manager")) {
        setLwinner("You are not the manager");
      } else if (e.message.includes("Players are less than 3")) {
        setLwinner("There are less than 3 players");
      } else {
        setLwinner("No winner yet");
      }
    }
  };

  return (
    <>
      <div className="container1">
        <div className="account">Connected account : {account}</div>
        
        <div className="winner">
          Winner: {lwinner} 
          <div className="winner_btn">
          <button type="button" className="btn btn-primary" id="winner" onClick={winner}>Click for winner</button>
          </div>
        </div>
        <div className="balance">
          Contract Balance: {cbalance}
          <div className="balance_btn">
          <button type="button" id="balance_contract" className="btn btn-primary"  onClick={contractBalance}>Balance</button>
          </div>
         </div>
      </div>
    </>
  );
};

export default Manager;

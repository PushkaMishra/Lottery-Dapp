import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Lottery from "./contracts/Lottery.json";
import "./App.css";
// import "./components/Manager";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";
import Players from "./components/Players";
import Intro from "./components/Intro";

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const [address, setAddress] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Lottery.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setAddress(deployedNetwork.address);
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>

        <Route exact path="/">
            <Intro></Intro>
          </Route>

          <Route path="/manager">
            <Manager state={state}></Manager>
          </Route>

          <Route path="/players">
            <Players state={state} address={address} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

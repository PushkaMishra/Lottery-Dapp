import React, {useEffect,useState} from "react";
// import Web3 from "web3"; 
import "./Player.css";

const Players =({state,address})=>{
 
    const[account,setAccount]=useState("No acccount connected");
    const[registeredPlayers, setRegisteresdPlayers]=useState([]);
     useEffect(()=>{

        const getAccount=async()=>{
        const {web3}=state;
        const accounts= await web3.eth.getAccounts();
        setAccount(accounts[0]);
    }
    state.web3 && getAccount();
},[state,state.web3]);


useEffect(()=>{

 const getPlayers = async()=>{
  
    const {contract}=state;
    const players = await contract.methods.allPlayers().call();
    console.log(players)
    const registeredPlayers = await Promise.all(
    
        players.map((player)=>{
            return player;
        })
     )
     console.log(registeredPlayers);
     setRegisteresdPlayers(registeredPlayers);
 }

      state.contract && getPlayers();
},[state,state.contract]);

return(
<>
<div className="container2">
<div className="paccount">Connected account: {account};
</div> 
<div className="payether">
    Players pay 1 ether on this contract address: {address}   
</div>
<div className="registeredplayers">
Registered Players :
{registeredPlayers.length!==0 && registeredPlayers.map((name)=> <p key={name}>{name}</p>)}    
</div>
</div>
</>
);
};
export default Players;
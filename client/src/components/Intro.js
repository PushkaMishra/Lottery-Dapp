import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css";

const Intro = () => {
  return (
    <>
    <div className="container">
     <div className="heading">
     <h1>You Are</h1>  
     </div>
      <div className="intromanager">
        <Link to="/manager">
          <button className="btn btn-primary" >Manager</button>

        </Link>
      </div>

      <div className="introplayer">
        <Link to="/players">
          <button className="btn btn-primary" >Player</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Intro;

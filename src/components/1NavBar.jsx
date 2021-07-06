import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { time, data } = props;

  const dateFormat = (timeString) => {
    const year = timeString.substring(0, 4);
    const month = timeString.substring(5, 7);
    const day = timeString.substring(9, 10);

    return new Date(year, month - 1, day).toDateString();
  };

  return (
    <div className="NavBar">
      <div className="logo">
        <span> TAXI - HAIBINTOU</span>
      </div>
      <div className="dataTooltip">
        <span> Surcharge: 50%</span>
        <span> Available Taxis: {data?.taxiCount}</span>
        <span>
          Updated: {data?.timeStamp.slice(11, 16)} [{dateFormat(time)}]
        </span>
      </div>
      <div className=" links ">
        <Link to="/Map">
          <span className="links">MAP</span>
        </Link>
        <Link to="/Data">
          <span className="links">DATA</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;

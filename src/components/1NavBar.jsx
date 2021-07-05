import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { time, data } = props;

  const dateFormat = (timeString) => {
  const year = timeString.substring(0,4);
  const month = timeString.substring(5,7);
  const day = timeString.substring(9,10);

  return ( new Date(year, month-1, day).toDateString());
  }

  return (
    <div className = "NavBar">
      <span> Current Surcharge: 50%
      </span>
      <span> Taxis Available: {data?.taxiCount}
      </span>
      <span> Last updated: {data?.timeStamp.slice(11,19)} [{dateFormat(time)}] </span>
      <Link to="/Map">
        <span>Show Map</span>
      </Link>
      <Link to="/Data">
        <span>Show Data</span>
      </Link>
      {/* {data.taxiCoords.map((element, index) => {
        return (
          <li key={index}>
            Taxi {index + 1}: {element[0].toFixed(6)} and{" "}
            {element[1].toFixed(6)}
          </li>
        );
      })} */}
    </div>
  );
};

export default NavBar;
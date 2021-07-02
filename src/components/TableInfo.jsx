import React from "react";

const TableInfo = (props) => {
  const { time, data } = props;
  return (
    <>
      <h1>Date: {time?.slice(0,10)} <br/> Time: {time?.slice(11,19)}</h1>
      <h1> Api retrieved at this timing: {data?.timeStamp} </h1>
      <h1> Current Taxis out there: {data?.taxiCount}</h1>
      {/* {data.taxiCoords.map((element, index) => {
        return (
          <li key={index}>
            Taxi {index + 1}: {element[0].toFixed(6)} and{" "}
            {element[1].toFixed(6)}
          </li>
        );
      })} */}
    </>
  );
};

export default TableInfo;

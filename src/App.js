import "./App.css";
import NavBar from "./components/1NavBar";
import Map from "./components/2Map";
import DataViz from "./components/2DataViz";
import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

function App() {
  const [data, newData] = useState({
    taxiCount: 0,
    timeStamp: "",
    taxiCoords: [],
  });

  const apiDateString = (obj) => {
    let year = obj.getFullYear();
    let month = "" + (obj.getMonth() + 1);
    let day = "" + obj.getDate();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const YMD = [year, month, day].join("-");

    let hour = obj.getHours();
    let minute = "" + obj.getMinutes();
    let second = "" + obj.getSeconds();
    if (minute.length < 2) minute = "0" + minute;
    if (second.length < 2) second = "0" + second;
    const HMS = [hour, minute, second].join(":");

    return YMD + "T" + HMS;
  };

  const [timeNow, setTime] = useState(apiDateString(new Date()));

  const getTaxi = async (dateTime) => {
    const url = `https://api.data.gov.sg/v1/transport/taxi-availability?`;
    // const date_time = apiDateString(dateTime);
    console.log("fetching... at", dateTime);
    const res = await fetch(url + dateTime);
    const json = await res.json();
    const info = json.features[0];
    newData({
      taxiCount: info.properties["taxi_count"],
      timeStamp: info.properties.timestamp,
      taxiCoords: info.geometry.coordinates,
    });
  };

  useEffect(() => {
    getTaxi(timeNow);
    const clockInterval = setInterval(() => {
      setTime(apiDateString(new Date()));
    }, 60000);
    return () => {
      clearInterval(clockInterval);
    };
  }, [timeNow]);

  return (
    <div className="App">
      <NavBar data={data} time={timeNow} />
      <main>
        <Route exact path="/">
          <Redirect to="/Map" />
        </Route>
        <Route path="/Map">
          <Map data={data} />
        </Route>
        <Route path="/Data">
          <DataViz />
        </Route>
      </main>
    </div>
  );
}

export default App;

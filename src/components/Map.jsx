import "../App.css";
import React, {useState,useEffect} from "react";
import { MapContainer, LayersControl, TileLayer, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import TableInfo from "./TableInfo";
import { jawgMap } from "../mapLayouts/Layouts";

const Map = () => {
  const { BaseLayer } = LayersControl
  const [data, newData] = useState({
    taxiCount: 0,
    timeStamp: "",
    taxiCoords: [],
  });
  const [center, setCenter] = useState([1.34000, 103.82000]);

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
    const HMS = [hour, minute, second].join(":")

    return YMD + "T" + HMS
  };

  const [timeNow, setTime] = useState(apiDateString(new Date()));

  const getTaxi = async (dateTime) => {
    const url = `https://api.data.gov.sg/v1/transport/taxi-availability?`;
    // const date_time = apiDateString(dateTime);
    console.log('fetching... at', dateTime)
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
    getTaxi(timeNow)
    setCenter([1.34000, 103.82000])
    const clockInterval = setInterval(() => {
      setTime(apiDateString(new Date()));
    }, 60000);
    const apiFetchInterval = setInterval(() => {
      getTaxi(timeNow);
    }, 60000);
    return () => {
      clearInterval(clockInterval)
      clearInterval(apiFetchInterval)
    };
  }, [timeNow]);
 

  return (
    <div id="mapid">
      <MapContainer
        className="markercluster-map"
        center={center}
        zoom={12}
        maxZoom={18}
        // preferCanvas={true}
      >
        <LayersControl>
          <BaseLayer name="Light Map">
            <TileLayer
              attribution={jawgMap.attribution}
              url={jawgMap.lightUrl + jawgMap.token}
            />
          </BaseLayer>
          <BaseLayer name="Dark Map" checked>
            <TileLayer
              attribution={jawgMap.attribution}
              url={jawgMap.darkUrl + jawgMap.token}
            />
          </BaseLayer>
          {/* <BaseLayer name="Light Map + MRT Lines">
            <TileLayer attribution={oneMap.attribution} url={oneMap.lightUrl} />
          </BaseLayer>
          <BaseLayer name="Dark Map + MRT Lines">
            <TileLayer attribution={oneMap.attribution} url={oneMap.darkUrl} />
          </BaseLayer> */}
        </LayersControl>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
            {data.taxiCoords.map((taxi) => (
            <CircleMarker position={[taxi[1], taxi[0]]}
            center = {[taxi[1], taxi[0]]}
            ></CircleMarker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      -----------------------------------------
      <TableInfo time={timeNow} data={data}/>
    </div>
  );
};

export default Map;

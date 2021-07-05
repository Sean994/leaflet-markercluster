import "../App.css";
import React from "react";
import { MapContainer, LayersControl, TileLayer, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { jawgMap , oneMap } from "../mapLayouts/mapApi";
import MarkerLocate from "./3MapMarker";

const Map = (props) => {
  const {data} = props
  const { BaseLayer } = LayersControl
  const center = [1.34000, 103.82000]
  
  return (
    <div id="mapid">
      <MapContainer
        className="markercluster-map"
        center={center}
        zoom={12}
        maxZoom={18}
        minZoom={11}
        maxBounds={[ [1.15, 103.4] , [1.53, 104.2] ]}
        preferCanvas={true}
        doubleClickZoom={false}
      >
        <MarkerLocate />
        <LayersControl>
          <BaseLayer name="Dark Map" checked>
            <TileLayer
              attribution={jawgMap.attribution}
              url={jawgMap.darkUrl + jawgMap.token}
            />
          </BaseLayer>
          <BaseLayer name="Dark Map + MRT Lines">
            <TileLayer attribution={oneMap.attribution} url={oneMap.darkUrl} />
          </BaseLayer>
          <BaseLayer name="Light Map">
            <TileLayer
              attribution={jawgMap.attribution}
              url={jawgMap.lightUrl + jawgMap.token}
            />
          </BaseLayer> 
        </LayersControl>

     
        <MarkerClusterGroup>
            {data.taxiCoords.map((taxi, index) => (
            <CircleMarker key = {index} position={[taxi[1], taxi[0]]}
            center = {[taxi[1], taxi[0]]}
            ></CircleMarker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      {/* ----------------------------------------- */}
      {/* <TableInfo time={timeNow} data={data}/> */}
    </div>
  );
};

export default Map;

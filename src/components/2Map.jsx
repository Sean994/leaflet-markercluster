import "../App.css";
import React from "react";
import L from 'leaflet';
import {
  MapContainer,
  LayersControl,
  TileLayer,
  Marker,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { jawgMap, oneMap } from "../mapLayouts/mapApi";
import TaxiIcon from "../mapLayouts/taxiIcon.png"
import MarkerLocate from "./3MapMarker";
import TaxiStands from "./3TaxiStand";
import SurchargeBounds from "./3Surcharge";
require('react-leaflet-markercluster/dist/styles.min.css'); 

const Map = (props) => {
  const { data } = props;
  const { BaseLayer , Overlay } = LayersControl;
  const center = [1.34, 103.82];
  const taxiIcon = new L.Icon({
    iconUrl: TaxiIcon,
    iconSize: [25, 25]

});

  return (
    <div id="mapid">
      <MapContainer
        className="markercluster-map"
        center={center}
        zoom={12}
        maxZoom={18}
        minZoom={11}
        maxBounds={[
          [1.15, 103.4],
          [1.53, 104.2],
        ]}
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
          <BaseLayer name="Light Map">
            <TileLayer
              attribution={jawgMap.attribution}
              url={jawgMap.lightUrl + jawgMap.token}
            />
          </BaseLayer>
          <BaseLayer name="Show MRT">
            <TileLayer attribution={oneMap.attribution} url={oneMap.darkUrl} />
          </BaseLayer>
          <Overlay name="Available Taxis" checked>
            <MarkerClusterGroup>
              {data.taxiCoords.map((taxi, index) => (
                <Marker
                  icon={taxiIcon}
                  key={index}
                  position={[taxi[1], taxi[0]]}
                  center={[taxi[1], taxi[0]]}
                ></Marker>
              ))}
            </MarkerClusterGroup>
          </Overlay>
          <TaxiStands />
          <SurchargeBounds />
        </LayersControl>
      </MapContainer>
      {/* ----------------------------------------- */}
      {/* <TableInfo time={timeNow} data={data}/> */}
    </div>
  );
};

export default Map;

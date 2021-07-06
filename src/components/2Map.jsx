import "../App.css";
import React , {useState} from "react";
import L from 'leaflet';
import {
  MapContainer,
  LayersControl,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { defaultMap, jawgMap, oneMap } from "../mapLayouts/mapApi";
import TaxiIcon from "../mapLayouts/taxiIcon.png"
import MarkerLocate from "./3MapMarker";
import TaxiStands from "./3TaxiStand";
import SurchargeBounds from "./3Surcharge";
import { hereApi } from "../mapLayouts/mapApi";
require('react-leaflet-markercluster/dist/styles.min.css'); 

const Map = (props) => {
  const { data } = props;
  const { BaseLayer , Overlay } = LayersControl;
  const [taxiAddress, setTaxiAddress] = useState("")
  const center = [1.34, 103.82];
  const taxiIcon = new L.Icon({
    iconUrl: TaxiIcon,
    iconSize: [30, 30]
});

const reverseGeoCode = async (data) => {
  const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${data[1]}%2C${data[0]}&lang=en-US&apikey=${hereApi.apiKey}`;
  const res = await fetch(url);
  const json = await res.json();
  setTaxiAddress(json?.items?.[0]?.address?.label);
};

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
          <BaseLayer name="Map MRT Lines">
            <TileLayer attribution={oneMap.attribution} url={oneMap.darkUrl} />
          </BaseLayer>

          <BaseLayer name="Default Map">
            <TileLayer attribution={defaultMap.attribution} url={defaultMap.url} />
          </BaseLayer>
          <Overlay name="Available Taxis" checked>
            <MarkerClusterGroup>
              {data.taxiCoords.map((taxi, index) => (
                <Marker
                  icon={taxiIcon}
                  key={index}
                  position={[taxi[1], taxi[0]]}
                  center={[taxi[1], taxi[0]]}
                  eventHandlers={{
                    click: () => {
                      reverseGeoCode(taxi);
                    },
                  }}
                  >
                  <Popup>{taxiAddress}</Popup>
                </Marker>
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

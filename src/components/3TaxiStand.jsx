import React, { useState } from "react";
import L from "leaflet";
import { LayerGroup, LayersControl, Marker, Popup } from "react-leaflet";
import data from "../mapLayouts/standArray";
import StandMarker from "../mapLayouts/taxiStand.png";
import { hereApi } from "../mapLayouts/mapApi";

const TaxiStands = () => {
  const { Overlay } = LayersControl;
  const jsonFeature = data.features;
  const [standAddress, setStandAddress] = useState("");
  const standCoord = jsonFeature.map((data) => {
    return [data.geometry.coordinates[1], data.geometry.coordinates[0]];
  });
  const standIcon = new L.Icon({
    iconUrl: StandMarker,
    iconSize: [35, 35],
  });

  const reverseGeoCode = async (data) => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${data[0]}%2C${data[1]}&lang=en-US&apikey=${hereApi.apiKey}`;
    const res = await fetch(url);
    const json = await res.json();
    setStandAddress(json?.items?.[0]?.address?.label);
  };

  //   console.log(coordArray)
  return (
    <Overlay name="Taxi Stands">
      <LayerGroup>
        {standCoord.map((data, index) => (
          <Marker
            icon={standIcon}
            position={data}
            key={index}
            eventHandlers={{
              click: () => {
                reverseGeoCode(data);
              },
            }}
          >
            <Popup>{standAddress}</Popup>
          </Marker>
        ))}
      </LayerGroup>
    </Overlay>
  );
};

export default TaxiStands;

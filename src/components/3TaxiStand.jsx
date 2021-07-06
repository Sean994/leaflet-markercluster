import L from 'leaflet';
import { LayerGroup ,LayersControl, Marker, Popup } from "react-leaflet";
import data from "../mapLayouts/standArray";
import StandMarker from "../mapLayouts/taxiStand.png"

const TaxiStands = () => {
  const { Overlay } = LayersControl;
  const jsonFeature = data.features
  const standCoord = jsonFeature.map(data => {
    return [ data.geometry.coordinates[1] , data.geometry.coordinates[0] ]
  })
  const standIcon = new L.Icon({
    iconUrl: StandMarker,
    iconSize: [35, 35]

});

//   console.log(coordArray)
  return (
    <Overlay name="Taxi Stands">
        <LayerGroup>
      {standCoord.map((data, index) => (
        <Marker icon={standIcon} position={data} key={index}>
          <Popup>A TaxiStand</Popup>
        </Marker>
      ))}
      </LayerGroup>
    </Overlay>
  );
};

export default TaxiStands;

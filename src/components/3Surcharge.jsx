import { Tooltip } from "react-leaflet";
import { LayerGroup, Polygon, LayersControl } from "react-leaflet";
import surchargeCoords from "../mapLayouts/surchargePoly";

const SurchargeBounds = () => {
  const { Overlay } = LayersControl;


  return (
    <Overlay name="Surcharge Areas">
      <LayerGroup>
        {surchargeCoords.map((data, index) => (
          <Polygon
            pathOptions={{ color: "green" }}
            positions={data.coordinates}
            key={index}
          >
            <Tooltip sticky>
              Surcharge Area: {data.name}
              <br />
              {data.surcharge1}
              <br />
              {data.surcharge2}
            </Tooltip>
          </Polygon>
        ))}
      </LayerGroup>
    </Overlay>
  );
};

export default SurchargeBounds;

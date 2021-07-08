import { Marker, useMapEvents, Tooltip,} from "react-leaflet";
import React, {useEffect, useState, useMemo } from "react";
import { hereApi } from "../mapLayouts/mapApi";

const MarkerLocate = () => {
    const [selectedPosition, setSelectedPosition] = useState([0,0]);
    const [popInfo, setPopInfo] = useState(""); 

    useMapEvents({
        dblclick(e) {                                  
            setSelectedPosition([
                e.latlng.lat,
                e.latlng.lng
            ]);       
        },          
    })
    const eventHandlers = useMemo(
        () => ({
          dragend(e) {
            setSelectedPosition([
                e.target._latlng.lat,
                e.target._latlng.lng
            ]);   
          },
        }),
        [],
      )
    const reverseGeoCode = async() => {
        const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${selectedPosition[0]}%2C${selectedPosition[1]}&lang=en-US&apikey=${hereApi.apiKey}`
        const res = await fetch(url);
        const json = await res.json();
        setPopInfo(json?.items?.[0]?.address?.label)
      }

    useEffect(() => {
     reverseGeoCode()
    },)

    return (
        selectedPosition ? 
            <Marker position={selectedPosition} draggable={true} eventHandlers={eventHandlers}>
              <Tooltip interactive = {true} direction="bottom" offset={[-15, 35]} permanent={true} opacity={0.8}>
              {popInfo}<br/>
              * Drag marker to change marked location
              </Tooltip>
            </Marker>
        : null
    )  
}

export default MarkerLocate


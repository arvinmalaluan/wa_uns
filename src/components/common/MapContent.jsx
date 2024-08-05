import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapContent = ({ values, setSelectedBuilding }) => {
  const [path, setPath] = useState(null);
  const [building, setBuilding] = useState(null);
  const [boundary, setBoundary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buildingsResponse, pathResponse, boundaryResponse] =
          await Promise.all([
            fetch("/buildings.geojson"),
            fetch("/path.geojson"),
            fetch("/boundary.geojson"),
          ]);

        if (!buildingsResponse.ok || !pathResponse.ok || !boundaryResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [buildingsData, pathData, boundaryData] = await Promise.all([
          buildingsResponse.json(),
          pathResponse.json(),
          boundaryResponse.json(),
        ]);

        setBuilding(buildingsData);
        setPath(pathData);
        setBoundary(boundaryData);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchData();
  }, []);

  const convertCoords = (coords) => {
    return [coords[1], coords[0]];
  };

  const handleBuildingClick = (feature, layer) => {
    if (feature.properties) {
      layer.on("click", () => {
        setSelectedBuilding(convertCoords(feature.geometry.coordinates));
      });
    }
  };

  return (
    <MapContainer
      center={[12.396672, 121.986217]}
      zoom={17}
      className="z-0 w-full h-full cursor-grab"
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution='&copy; <a href="https://www.google.com/intl/en-US_US/help/terms_maps.html">Google</a>'
      />
      {values.path && path && (
        <GeoJSON data={path} style={{ color: "magenta" }} />
      )}
      {values.boundary && boundary && (
        <GeoJSON data={boundary} style={{ color: "red", fill: false }} />
      )}
      {values.building && building && (
        <GeoJSON data={building} onEachFeature={handleBuildingClick} />
      )}
    </MapContainer>
  );
};

export default MapContent;

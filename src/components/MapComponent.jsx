import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import buildingsNewData from "@/assets/buildings.v2.json";

function MapComponent({ selected, setSelected, getImage }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/buildings.v2.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((e) => {
        console.error("Error fetching GeoJSON data:", e);
      });
  }, []);

  const onEachBuilding = (building, layer) => {
    layer.on({
      click: () => {
        setSelected(building);
        getImage(building.properties.id);
      },
    });
  };

  const buildingStyle = (feature) => ({
    color:
      selected && feature.properties.id === selected.properties.id
        ? "#ff3333"
        : "#3388ff", // Default color for buildings, red for selected
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  });

  const bounds = [
    [12.3942468, 121.9822767], // Southwest (left-bottom)
    [12.3990827, 121.989699], // Northeast (right-top)
  ];

  return (
    <MapContainer
      center={[12.396345541990913, 121.98787257721719]}
      zoom={17}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      maxBounds={bounds}
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution='&copy; <a href="https://www.google.com/intl/en-US_US/help/terms_maps.html">Google</a>'
      />
      {buildingsNewData && (
        <GeoJSON
          data={buildingsNewData}
          style={buildingStyle}
          onEachFeature={onEachBuilding}
        />
      )}
    </MapContainer>
  );
}

export default MapComponent;

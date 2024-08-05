import MapComponent from "@/components/MapComponent";
import NavigationBar from "@/components/NavigationBar";
import React, { useState } from "react";

const Home = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const getImageURL = (id) => {
    // const imageRef = ref(
    //   storage,
    //   `building_images/${selectedBuilding.properties.id}/`
    // );
    // list(imageRef).then((response) => {
    //   console.log(response);
    // });

    return null;
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <NavigationBar />

      <div className="relative grid w-full h-full bg-gray-100">
        <MapComponent
          selected={selectedBuilding}
          setSelected={setSelectedBuilding}
          getImage={getImageURL}
        />
      </div>
    </div>
  );
};

export default Home;

import CarouselInstance from "@/components/CarouselInstance";
import ShadCN_Input from "@/components/common/ShadCN_Input";
import MapComponent from "@/components/MapComponent";
import NavigationBar from "@/components/NavigationBar";
import { storage } from "@/firebase/config";
import { Separator } from "@radix-ui/react-separator";
import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";

const Building = () => {
  const [image, setImage] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [urlList, setUrlList] = useState([]);

  const uploadImage = () => {
    if (image == null) return;
    if (selectedBuilding == null) return;

    const timestamp = new Date().valueOf();
    const imageRef = ref(
      storage,
      `building_images/${selectedBuilding.properties.id}/${timestamp}`
    );

    uploadBytes(imageRef, image).then(() => {
      console.log("success");
    });
  };

  const getImageURL = async () => {
    const geojsonRef = ref(storage, `geojson/`);
    const array = [];

    const response = await list(geojsonRef);
    for (const item of response.items) {
      const url = await getDownloadURL(item);
      array.push(url);
    }

    console.log(array);
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <NavigationBar />

      <div className="grid h-full grid-cols-3 bg-gray-100">
        <div className="w-full h-[300px] col-span-4 md:h-full md:col-span-2 bg-green-50">
          <MapComponent
            selected={selectedBuilding}
            setSelected={setSelectedBuilding}
            getImage={getImageURL}
          />
        </div>

        <div className="hidden w-full h-full col-span-1 p-4 lg:col-span-1 md:block">
          {selectedBuilding ? (
            <>
              <div className="flex flex-col">
                {urlList ? (
                  <CarouselInstance imageList={urlList} />
                ) : (
                  <p>No Image Found</p>
                )}
                {/* <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                <button
                  className="py-2 mt-2 text-sm border"
                  onClick={uploadImage}
                >
                  Upload
                </button> */}
              </div>

              <p className="my-4 mt-2 text-2xl font-semibold">
                Romano Building of Services
              </p>
              <p className="mb-1">Offered Services</p>
              <ul className="mb-4">
                <li>Service No. 1</li>
                <li>Service No. 2</li>
                <li>Service No. 3</li>
                <li>Service No. 4</li>
                <li>Service No. 5</li>
              </ul>

              <div className="flex gap-2">
                <button className="w-full py-2 text-sm bg-white border">
                  Edit details
                </button>
                <button className="w-full py-2 text-sm bg-white border">
                  Delete Record
                </button>
              </div>
            </>
          ) : (
            <p>Preview not available. Select a building to show details</p>
          )}
        </div>

        <div className="block w-full h-full col-span-4 p-4 lg:col-span-1 md:hidden">
          <img src="" className="h-[300px] bg-gray-300" alt="" />
          <p>Building</p>
          <p>Services</p>
          <p>Distances</p>
          <div className="flex gap-2">
            <button className="w-full py-2 text-sm bg-white border">
              Edit details
            </button>
            <button className="w-full py-2 text-sm bg-white border">
              Delete Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Building;

import CarouselInstance from "@/components/CarouselInstance";
import NavigationBar from "@/components/NavigationBar";
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <NavigationBar />

      <div className="grid h-full grid-cols-4 bg-gray-100">
        <div>
          <p>hello</p>
        </div>
        <div>
          <CarouselInstance />
        </div>
      </div>
    </div>
  );
};

export default About;

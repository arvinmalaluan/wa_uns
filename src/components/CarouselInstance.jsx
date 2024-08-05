import * as React from "react";

import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const CarouselInstance = (props) => {
  return (
    <Carousel>
      <CarouselContent>
        {props.imageList.map((url, index) => {
          return (
            <CarouselItem key={index}>
              <img
                src={url}
                className="h-[300px] object-cover object-center w-full"
                alt=""
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselInstance;

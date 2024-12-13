import Image from "next/image";
import React, { useState } from "react";

function DesignType({selectedDesignType}) {
  const Designs = [
    {
      name: "Modern",
      image: "/modern.jpg",
    },
    {
      name: "Industrial",
      image: "/industrial.jpg",
    },
    {
      name: "Traditional",
      image: "/traditional.jpg",
    },
    {
      name: "Rustic",
      image: "/rustic.png",
    },
    {
      name: "Bohemian",
      image: "/bohemian.png",
    },
  ];

  const [selectedOption,setSelectedOption]=useState();

  return (
    <div className="mt-5">
      <label className="text-gray-500 ">Interior Design Type</label>
      <div className="grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Designs.map((design, index) => (
          <div key={index} onClick={()=>{setSelectedOption(design.name);selectedDesignType(design.name)}}>
            <Image
              src={design.image}
              width={100}
              height={100}
              className={`h-[80px] rounded-md hover:scale-105 transition-all cursor-pointer ${design.name==selectedOption&&'border-2 border-primary rounded-md p-1'}`}/>
            <h2>{design.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignType;

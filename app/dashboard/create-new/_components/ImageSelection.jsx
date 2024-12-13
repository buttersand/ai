"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImageSelection({selectedImage}) {
  const [file, setFile] = useState();
  const onFileSelected = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    selectedImage(event.target.files[0])
  };
  return (
    <div>
      <label>Select Image of your Room</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
        <div className={`p-10 border rounded-xl flex justify-center border-dotted border-primary bg-slate-200 cursor-pointer hover:shadow-lg ${file && 'p-0 bg-white'}`}>
            {!file?<Image src={"/imageUpload.png"} width={100} height={100} />
            :<Image src={URL.createObjectURL(file)}width={300} height={300} 
            className="object-cover w-full h-full"/>}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelection;

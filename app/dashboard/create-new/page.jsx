"use client";
import React, { useContext, useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import AdditionalReq from "./_components/AdditionalReq";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import { Button } from "@/components/ui/button";
import axios  from "axios";
import { storage } from '@/config/firebaseConfig'; 
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useUser } from "@clerk/nextjs";
import CustomLoading from './_components/CustomLoading'
import AiOutputDialog from "../_components/AiOutputDialog";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Users } from "@/config/schema";
import { db } from "@/config/db";
function CreateNew() {
  const [loading,setLoading]=useState(false);
  const {user}=useUser();
  const [aiOutputImage,setAiOutputImage]=useState();
  const [openOutputDialog,setOpenOutputDialog]=useState(false);
  const [formData,setFormData]=useState({});
  const [orgImage,setOrgImage]=useState();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  // const [outputResult,setOutputResult]=useState();
  const onHandleInputChange = (value, fieldName) => {
      setFormData(prev=>({
        ...prev,
        [fieldName]:value
      }))
      console.log(formData);
  }

  const GenerateAiImage=async()=>{
    setLoading(true);
    const rawImageUrl=await SaveRawImageToFirebase();
      const result=await axios.post('/api/redesign-room',{
        imageUrl:rawImageUrl,
        roomType:formData?.roomType,
        designType:formData?.designType,
        additionalReq:formData?.additionalReq,
        userEmail:user?.primaryEmailAddress?.emailAddress
      });
     
      console.log(result.data);
      await updateUserCredits();
      setAiOutputImage(result.data.result);//output image url
      setOpenOutputDialog(true);
     
      setLoading(false);
    }

    const SaveRawImageToFirebase=async()=>{
      const fileName=Date.now()+"_raw.png";
      const imageRef=ref(storage,'room-redesign/'+fileName);
      await uploadBytes(imageRef,formData.image).then(resp=>{
      console.log('File uploaded')
    })

    //upload file image url
    const downloadUrl=await getDownloadURL(imageRef);
    console.log(downloadUrl);
    setOrgImage(downloadUrl);
    return downloadUrl;
    }
/**
 * update the user credits
 * @returns 
 */
    const updateUserCredits=async()=>{
      const result=await db.update(Users).set({
        credits:userDetail?.credits-1
      }).returning({id:Users.id});

      if(result){
       
        setUserDetail(prev=>({
          ...prev,
          credits:userDetail?.credits-1
        }))
        return result[0]?.id
      }
    }

  return (
    <div>
      <h2 className="font-bold text-3xl text-center text-primary">
        Experience the Magic of AI ReModeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style and
        watch as AI Instanly reimagines your environment
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2  mt-10 gap-10">
        {/* Image selection */}
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />
        {/* form Input section */}
        <div>
          {/* Room TYpe */}
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, "roomType")}/>
          {/* design type */}
            <DesignType selectedDesignType={(value) => onHandleInputChange(value, "designType")}/>
          {/* Additional requiremnet textarea(optional) */}
          <AdditionalReq AdditionalReqInput={(value) => onHandleInputChange(value, "addionalReq")}/>
          {/* button to Generate Image */}
          <Button className="w-full mt-5 " onClick={GenerateAiImage}>Generate</Button>
        <p className="text-sm text-gray-400 mb-52">NOTE:1  Credit will use to redesign your room </p>
        </div>
      </div>
      <CustomLoading loading={loading}/>
      <AiOutputDialog openDialog={openOutputDialog} 
      closeDialog={()=>setOpenOutputDialog(false)}
      orgImage={orgImage}
      aiImage={aiOutputImage}/>
    </div>
  );
}

export default CreateNew;

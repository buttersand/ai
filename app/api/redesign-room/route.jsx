import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Replicate from "replicate";
import axios from "axios";
import { storage } from "@/config/firebaseConfig"; 
import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { AiGeneratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/db";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});
export async function POST(req) {
    // const {user}=useUser();
  const { imageUrl, roomType, designType, additionalReq,userEmail } = await req.json();

  //convert image to ai image
  try {
    const input = {
      image: imageUrl,
      prompt: `Transform  ${roomType} into a stunning ${designType} masterpiece. Visualize a harmonious blend of functionality and style, tailored to elevate your space.create a reimagined interior that reflects good taste and modern trends. ${additionalReq} `,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );
    console.log(output)
    

    // const output =
    //   "https://replicate.delivery/xezq/K2Pm6zwd1hKXFdtzpYDhBQJuxhYTP0olYeldZG8CgcJHjy8JA/out.png";
    //convert output url to base64 image
     const  base64Image=await ConvertImageToBase64(output)
    //save base64 to firebase
    const fileName=Date.now()+'.png';
    const storageRef=ref(storage,'room-redesign/'+fileName)
    await uploadString(storageRef,base64Image,'data_url');
    const downloadUrl=await getDownloadURL(storageRef);
    console.log(downloadUrl);
    // return NextResponse.json({'result':downloadUrl});
    //save all to database
    const dbResult=await db.insert(AiGeneratedImage).values({
        roomType:roomType,
        designType:designType,
        orgImage:imageUrl,
        aiImage:downloadUrl,
        userEmail:userEmail
    }).returning({id:AiGeneratedImage.id});
    console.log(dbResult)
    return NextResponse.json({'result':downloadUrl});
    
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}


async function ConvertImageToBase64(imageUrl){
    const resp=await axios.get(imageUrl,{responseType:'arraybuffer'})
    const base64ImageRaw=Buffer.from(resp.data).toString('base64');
    return "data:image/png;base64,"+base64ImageRaw;
}
 

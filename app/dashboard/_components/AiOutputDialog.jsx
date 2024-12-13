import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Button } from "@/components/ui/button";

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevents the click from bubbling up
  };

  return (

    <AlertDialog open={openDialog}>
      <AlertDialogContent  onClick={stopPropagation}>
        <AlertDialogHeader>
          <AlertDialogTitle>Result:</AlertDialogTitle>
        </AlertDialogHeader>
        <div style={{ maxWidth: "100%", overflow: "hidden", margin: "20px 0" }}>
          <ReactBeforeSliderComponent
            firstImage={{
              imageUrl: aiImage,
              style: { maxHeight: "300px", objectFit: "contain", width: "100%" },
            }}
            secondImage={{
              imageUrl: orgImage,
              style: { maxHeight: "300px", objectFit: "contain", width: "100%" },
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <Button onClick={closeDialog}>Close</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;
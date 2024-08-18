import React, { useEffect, useRef, useState } from "react";
import "./UploadImage.css";
const UploadImage = ({
  menuItemDetails,
  setMenuItemDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(menuItemDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
     setMenuItemDetails((prev)=> ({
        ...prev, image: imageURL
     }));
     nextStep();
  };



  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWindow(
      {
        cloudName: "dcrxvzrcp",
        uploadPreset: "vfgmb77d",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
        }
      }
    );
  },[]);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZon"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImage"
        onClick={() => widgetRef.current?.open()}>
          <img src={imageURL} alt="" />
        </div>
      )}

       <Group position="center" mt={"xl"}>
        <Button varient="default" onClick={prevStep}> Back</Button>
        <Button onClick={handleNext} disabled={!imageURL}> Next</Button>
        </Group>

    </div>
  );
};

export default UploadImage;

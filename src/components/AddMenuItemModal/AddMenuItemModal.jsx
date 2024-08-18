import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddMenuItem from "../AddMenuItem/AddMenuItem";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";

const AddMenuItemModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [menuItemDetails, setMenuItemDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      parkings: 0,
    },
    userEmail: user?.email,
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="MenuItem" description="Item">
            <AddMenuItem
              nextStep={nextStep}
              menuItemDetails={menuItemDetails}
              setMenuItemDetails={setMenuItemDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              menuItemDetails={menuItemDetails}
              setMenuItemDetails={setMenuItemDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details">
            <BasicDetails 
             prevStep={prevStep}
             nextStep={nextStep}
             menuItemDetails={menuItemDetails}
             setMenuItemDetails={setMenuItemDetails}/>
          </Stepper.Step>
          <Stepper.Step>

          </Stepper.Step>
          <Facilities 
          prevStep={prevStep}
          nextStep={nextStep}
          menuItemDetails={menuItemDetails}
          setMenuItemDetails={setMenuItemDetails}
          
          />
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddMenuItemModal;

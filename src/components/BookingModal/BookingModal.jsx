import React, { useContext, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext.js";
import { buyItem } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token }, setUserDetails } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("you have ordered your item ", {
      position: "bottom-right",
    });
    setUserDetails((prev)=>({
        ...prev,
        orders:[
            ...prev.orders,{
                id: propertyId, date: dayjs(value).format("DD/MM/YYYY")
            }

        ]
    }))
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => buyItem(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({response}) => toast.error(response.data.message),
    onSettled: ()=> setOpened(false)
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="select your data of visit"
      centered
    >
      <div className="flexColCenter">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Order item
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;

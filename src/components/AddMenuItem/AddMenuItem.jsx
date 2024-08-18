import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";

const AddMenuItem = ({ menuItemDetails, setMenuItemDetails, ne}) => {
  const { getAll } = useCountries();

  const form = useForm({
    initialValues: {
      country: menuItemDetails?.country,
      city: menuItemDetails?.city,
      address: menuItemDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });
  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const {hasErrors} = form.validate()
    if(!hasErrors){
        setMenuItemDetails((prev)=>({...prev, city, address, country}))
        nextStep();
    }
  }

  return (
    <form
    onSubmit={(e) => {
        e.preventDefault();
        handleSubmit()
    }}>
      {/* left side */}
      <div className="flexCenter"
      style={{
        gap: "3rem",
        marginTop: "3rem",
        flexDirection: "row"
      }}>
        {/* input field */}
        <div className="flexColStart">
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="city"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="address"
            {...form.getInputProps("address", { type: "input" })}
          />

        {/* right side */}

        <Group position="center" mt={"xl"}>
        <Button type="submit"> Next Step </Button>
        </Group>
        
        </div>
      </div>
    </form>
  );
};

export default AddMenuItem;

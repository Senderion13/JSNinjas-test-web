import { React, useEffect, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import axios from "axios";
import { Button } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

export default function ImageSelect({ imageList, setImageList }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4400/asset?limit=100`)
      .then(({ data }) => setImages(data));
  }, []);

  const handleImage = (e) => {
    const imageId = e.target.lastChild?.id
      ? e.target.lastChild.id
      : e.target.id;
    if (imageId) {
      const imageToAdd = images.find((image) => image.id === Number(imageId));
      if (imageToAdd) {
        setImageList((prevImageList) => [...prevImageList, imageToAdd]);
      }
    }
  };

  return (
    <>
      <Autocomplete
        onChange={handleImage}
        placeholder="Choose an Image"
        slotProps={{
          input: {
            autoComplete: "new-password", // disable autocomplete and autofill
          },
        }}
        sx={{ width: 320 }}
        options={images}
        getOptionLabel={(option) => {
          return `${option.id}. ${option.description}`;
        }}
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            <ListItemDecorator>
              <img
                width="50"
                srcSet={option.uri}
                src={option.uri}
                alt={option.id}
              />
            </ListItemDecorator>
            <ListItemContent id={option.id} sx={{ fontSize: "sm" }}>
              {option.id}. {option.description}
            </ListItemContent>
          </AutocompleteOption>
        )}
      />
      {imageList?.map((image) => {
        return (
          <div key={image.id} style={{ display: "flex" }}>
            <p style={{ width: "8em" }}>
              {image.id}. {image.description}
            </p>
            <Button
              onClick={() =>
                setImageList(imageList.filter((item) => item.id !== image.id))
              }
            >
              <RemoveCircle />
            </Button>
          </div>
        );
      })}
    </>
  );
}

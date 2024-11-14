import { Grid2, ImageList, ImageListItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function About() {
  const [superhero, setSuperhero] = useState();
  useEffect(() => {
    axios
      .get(
        `http://localhost:4400/superhero/${localStorage.getItem(
          "currentSuperhero"
        )}`
      )
      .then((data) => setSuperhero(data.data));
  }, []);
  return !superhero ? (
    <>loading...</>
  ) : (
    <>
      <ImageList sx={{ width: 800, height: 600 }} cols={3} rowHeight={164}>
        {superhero.assets?.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={item.uri}
              src={item.uri}
              alt={item.description}
              loading="lazy"
              style={{ maxHeight: 290, width: "auto" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <h3>Nickname</h3>
        </Grid2>
        <Grid2 size={8}>
          <h3> {superhero.nickname}</h3>
        </Grid2>
        <Grid2 size={4}>
          <h3>Real name</h3>
        </Grid2>
        <Grid2 size={8}>
          <h3>{superhero.real_name}</h3>
        </Grid2>
        <Grid2 size={4}>
          <h3>Origin description</h3>
        </Grid2>
        <Grid2 size={8}>
          <h3>{superhero.origin_description} </h3>{" "}
        </Grid2>
        <Grid2 size={4}>
          <h3>Superpowers</h3>
        </Grid2>
        <Grid2 size={8}>
          <h3>{superhero.superpowers}</h3>
        </Grid2>
        <Grid2 size={4}>
          <h3>Catch phrase</h3>
        </Grid2>
        <Grid2 size={8}>
          <h3>{superhero.catch_phrase}</h3>
        </Grid2>
      </Grid2>
    </>
  );
}

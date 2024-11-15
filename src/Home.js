import { useEffect, useState } from "react";
import { Paper, Pagination, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:4400/superhero?page=${page}`)
      .then(({ data }) => setData(data));
  }, [page]);
  const navigate = useNavigate();
  return (
    <Paper elevation={3}>
      {data.map((superhero) => {
        return (
          <div
            key={superhero.id}
            style={{ display: "flex" }}
            onClick={(e) => {
              localStorage.setItem(
                "currentSuperhero",
                e.currentTarget.children[0].getAttribute("alt")
              );
              navigate("/about");
            }}
          >
            <img
              src={
                superhero.superhero_assets.length > 0
                  ? superhero.superhero_assets[0].asset.uri
                  : ""
              }
              alt={superhero.id}
              style={{
                marginRight: "3em",
                marginBottom: "6em",
                maxWidth: "12em",
              }}
            />
            <div>
              <h3>nickname: {superhero.nickname}</h3>
              <h3>real_name: {superhero.real_name}</h3>
              <h3> origin_description: {superhero.origin_description} </h3>
              <h3>superpowers: {superhero.superpowers}</h3>
              <h3>catch_phrase: {superhero.catch_phrase}</h3>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "fixed",
          bottom: "2em",
          right: "5em",
          width: "30em",
        }}
      >
        <Pagination
          count={5}
          style={{ marginLeft: "40%" }}
          onChange={(event, value) => {
            setPage(value);
          }}
          value={page}
        />
        <Button
          variant="outlined"
          style={{ position: "fixed", top: "2em", right: "5em", width: "10em" }}
          onClick={() => navigate("/crud")}
        >
          CRUD
        </Button>
      </div>
    </Paper>
  );
}

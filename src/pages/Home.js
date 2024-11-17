import { useEffect, useState } from "react";
import { Paper, Pagination, Button, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [superheroCount, setSuperheroCount] = useState();
  const [superheroOnPageCount, setSuperheroOnPageCount] = useState();

  const openSelectedSuperheroInfo = (e) => {
    localStorage.setItem(
      "currentSuperhero",
      e.currentTarget.children[0].getAttribute("alt")
    );
    navigate("/about");
  };

  useEffect(() => {
    setSuperheroOnPageCount(5);
    axios
      .get(`${process.env.REACT_APP_API_HOST}/superhero?page=${page}`)
      .then(({ data }) => {
        setSuperheroCount(data[1]);
        setData(data[0]);
      });
  }, [page]);
  const navigate = useNavigate();
  return (
    <>
      {data.map((superhero) => {
        return (
          <Paper
            elevation={3}
            style={{
              margin: "1em",
              maxWidth: "40em",
            }}
            key={superhero.id}
          >
            <div
              style={{
                display: "flex",
                marginLeft: "2em",
                justifyItems: "center",
                cursor: "pointer",
              }}
              onClick={openSelectedSuperheroInfo}
            >
              <img
                src={
                  superhero.superheroAssets?.length > 0
                    ? superhero.superheroAssets[0].asset.uri
                    : ""
                }
                alt={superhero.id}
                style={{
                  maxWidth: "12em",
                  marginTop: "2em",
                  marginRight: "2em",
                  marginBottom: "2em",
                  borderRadius: "1em",
                }}
              />
              <div style={{ marginTop: "2em", fontSize: "20px" }}>
                <b>Nickname: </b>
                {superhero.nickname}
                <br />
                <br />
                <b>Real name: </b>
                {superhero.realName}
                <br />
                <br />
                <b>Origin description: </b>
                {superhero.originDescription}
                <br />
                <br />
                <b>Superpowers: </b>
                {superhero.superpowers}
                <br />
                <br />
                <b>Catchphrase: </b>
                {superhero.catchPhrase}
                <br />
                <br />
              </div>
            </div>
            <Divider />
          </Paper>
        );
      })}
      <div
        style={{
          position: "fixed",
          bottom: "2em",
          right: "5em",
          width: "40em",
        }}
      >
        <Pagination
          count={
            superheroCount
              ? Math.ceil(superheroCount / superheroOnPageCount)
              : 0
          }
          style={{ marginLeft: "40%" }}
          onChange={(event, value) => setPage(Number(value))}
          value={page}
        />
        <Button
          variant="outlined"
          style={{ position: "fixed", top: "2em", right: "5em", width: "10em" }}
          onClick={() => navigate("/crud")}
        >
          Edit heroes
        </Button>
      </div>
    </>
  );
}

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageSelect from "./ImageSelect";

export default function UpdateSuperhero() {
  const [id, setId] = useState(1);
  const [nickname, setNickname] = useState("");
  const [realname, setRealname] = useState("");
  const [origin, setOrigin] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [phrase, setPhrase] = useState("");
  const [imageList, setImageList] = useState([]);
  const [oldSuperheroAssets, setOldSuperheroAssets] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4400/superhero/${id}`).then(({ data }) => {
      if (data) {
        setNickname(data.nickname);
        setRealname(data.real_name);
        setOrigin(data.origin_description);
        setSuperpowers(data.superpowers);
        setPhrase(data.catch_phrase);
        setImageList(data.superhero_assets?.map((asset) => asset.asset));
        setOldSuperheroAssets(data.superhero_assets);
      } else {
        setNickname("");
        setRealname("");
        setOrigin("");
        setSuperpowers("");
        setPhrase("");
        setImageList([]);
        setOldSuperheroAssets([]);
      }
    });
  }, [id]);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        Update Superhero
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          type="number"
          value={id}
          label="Id"
          onChange={(e) => setId(+e.target.value)}
        />
        <br />
        <TextField
          value={nickname}
          label="Nickname"
          onChange={(e) => setNickname(e.target.value)}
        />
        <TextField
          label="Real name"
          value={realname}
          onChange={(e) => setRealname(e.target.value)}
        />
        <TextField
          label="Origin description"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <TextField
          label="Superpowers"
          value={superpowers}
          onChange={(e) => setSuperpowers(e.target.value)}
        />
        <TextField
          label="Catch phrase"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
        <div style={{ marginTop: "2em" }}>
          <ImageSelect imageList={imageList} setImageList={setImageList} />
        </div>
      </AccordionDetails>

      <AccordionActions>
        <Button
          onClick={() => {
            oldSuperheroAssets.map((asset) =>
              axios.delete(`http://localhost:4400/superheroAssets/${asset.id}`)
            );
            imageList.map((image) => {
              axios.post(`http://localhost:4400/superheroAssets`, {
                superhero: id,
                asset: image.id,
              });
            });
            axios.patch(`http://localhost:4400/superhero/${id}`, {
              nickname: nickname,
              real_name: realname,
              origin_description: origin,
              superpowers: superpowers,
              catch_phrase: phrase,
            });
            return true;
          }}
        >
          Save
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

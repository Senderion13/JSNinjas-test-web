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
import { toast } from "react-toastify";

export default function UpdateSuperhero() {
  const [id, setId] = useState(1);
  const [nickname, setNickname] = useState("");
  const [realname, setRealname] = useState("");
  const [origin, setOrigin] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [phrase, setPhrase] = useState("");
  const [imageList, setImageList] = useState([]);
  const [oldSuperheroAssets, setOldSuperheroAssets] = useState([]);

  const updateSuperheroData = () => {
    oldSuperheroAssets.map((asset) =>
      axios
        .delete(`${process.env.REACT_APP_API_HOST}/superheroAssets/${asset.id}`)
        .catch((err) => toast("Update hero image error: " + err))
    );
    imageList.map((image) =>
      axios
        .post(`${process.env.REACT_APP_API_HOST}/superheroAssets`, {
          superhero: id,
          asset: image.id,
        })
        .catch((err) => toast("Update hero image error: " + err))
    );
    axios
      .patch(`${process.env.REACT_APP_API_HOST}/superhero/${id}`, {
        nickname: nickname,
        realName: realname,
        originDescription: origin,
        superpowers: superpowers,
        catchPhrase: phrase,
      })
      .catch((err) => toast("Update hero image error: " + err));
    return toast("Hero saved");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/superhero/${id}`)
      .then(({ data }) => {
        if (data) {
          setNickname(data.nickname);
          setRealname(data.realName);
          setOrigin(data.originDescription);
          setSuperpowers(data.superpowers);
          setPhrase(data.catchPhrase);
          setImageList(data.superheroAssets?.map((asset) => asset.asset));
          setOldSuperheroAssets(data.superheroAssets);
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
        <Button onClick={updateSuperheroData}>Save</Button>
      </AccordionActions>
    </Accordion>
  );
}

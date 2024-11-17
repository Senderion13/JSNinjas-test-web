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
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateSuperhero() {
  const [nickname, setNickname] = useState("");
  const [realname, setRealname] = useState("");
  const [origin, setOrigin] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [phrase, setPhrase] = useState("");

  const superheroList = () => {
    axios
      .post(`${process.env.REACT_APP_API_HOST}/superhero`, {
        nickname: nickname,
        realName: realname,
        originDescription: origin,
        superpowers: superpowers,
        catchPhrase: phrase,
      })
      .catch((err) => toast("Can't create superhero: " + err));
    return toast("Hero successfully created");
  };
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        Create Superhero
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>

      <AccordionActions>
        <Button onClick={superheroList}>Save</Button>
      </AccordionActions>
    </Accordion>
  );
}

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

export default function CreateSuperhero() {
  const [nickname, setNickname] = useState("");
  const [realname, setRealname] = useState("");
  const [origin, setOrigin] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [phrase, setPhrase] = useState("");
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
        <Button
          onClick={() =>
            axios.post("http://localhost:4400/superhero", {
              nickname: nickname,
              real_name: realname,
              origin_description: origin,
              superpowers: superpowers,
              catch_phrase: phrase,
            })
          }
        >
          Save
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

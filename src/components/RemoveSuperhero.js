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

export default function RemoveSuperhero() {
  const [id, setId] = useState(0);

  const deleteHeroById = () => {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/superhero/${id}`, { id: id })
      .catch((err) => toast("Can't delete superhero: " + err));
    return toast("Hero successfully deleted");
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        Remove Superhero
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </AccordionDetails>

      <AccordionActions>
        <Button onClick={deleteHeroById}>Save</Button>
      </AccordionActions>
    </Accordion>
  );
}

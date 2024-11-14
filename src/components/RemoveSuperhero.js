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

export default function RemoveSuperhero() {
  const [id, setId] = useState(0);
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
        <Button
          onClick={() =>
            axios.delete(`http://localhost:4400/superhero/${id}`, { id: id })
          }
        >
          Save
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

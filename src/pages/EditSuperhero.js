import React from "react";
import CreateSuperhero from "../components/CreateSuperhero";
import UpdateSuperhero from "../components/UpdateSuperhero";
import RemoveSuperhero from "../components/RemoveSuperhero";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditSuperhero() {
  return (
    <>
      <ToastContainer />
      <CreateSuperhero />
      <UpdateSuperhero />
      <RemoveSuperhero />
    </>
  );
}

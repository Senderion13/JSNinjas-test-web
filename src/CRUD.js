import CreateSuperhero from "./components/CreateSuperhero";
import UpdateSuperhero from "./components/UpdateSuperhero";
import RemoveSuperhero from "./components/RemoveSuperhero";
export default function CRUD() {
  return (
    <>
      <CreateSuperhero />
      <UpdateSuperhero />
      <RemoveSuperhero />
    </>
  );
}

import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [cabinAddingState, setCabinAddingState] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setCabinAddingState(!cabinAddingState)}>Add a cabin</Button>
        {cabinAddingState && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;

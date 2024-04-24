/*import { useState } from "react";
 */
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens={"cabin-form"}>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name={"cabin-form"}>
        <CreateCabinForm/>
      </Modal.Window>

      {/*<Modal.open opens={"cabin-form"}>
        <Button>Add new cabin</Button>
      </Modal.open>
      <Modal.window name={"cabin-form"}>
        <CreateCabinForm />
  </Modal.window>*/}
    </Modal>
  );
}

/*function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add Cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCLoseModal={() => setIsOpenModal(false)}/>
        </Modal>
      )}
    </div>
  );
}*/

export default AddCabin;

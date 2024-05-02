import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import useInsertCabin from "./useInsertCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { insertCabin,isInserting } = useInsertCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function duplicateCabin() {

    insertCabin({
      name: `Copy of ${name}`,
      cabinId,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  const { isDeleting, deleteCabin } = useDeleteCabin();

  if (isDeleting || isInserting) {
    return <Spinner />;
  }

  return (
    <TableRow>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up tp {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={duplicateCabin}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens={"update"}>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens={"delete"}>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name={"update"}>
              <CreateCabinForm cabinToEdit={cabin} onCLoseModal={true} />
            </Modal.Window>

            <Modal.Window name={"delete"}>
              <ConfirmDelete
                resourceName={"cabins"}
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </TableRow>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.node,
};

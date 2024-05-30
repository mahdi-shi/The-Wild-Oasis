import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckingOut } from "../check-in-out/useCheckingOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBookings";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { checkingOut, isCheckingOut } = useCheckingOut();

  if (isLoading) return <Spinner />;
  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} isLoading={isLoading} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            check in
          </Button>
        )}
        <Modal>
          <Modal.Open opens={"deleteBookings"}>
            <Button icon={<HiTrash />} disabled={isDeleting}>
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name={"deleteBookings"}>
            <ConfirmDelete
              resourceName={"booking"}
              onConfirm={() => {
                deleteBooking(bookingId);
              }}
            />
          </Modal.Window>
        </Modal>

        {status === "checked-in" && (
          <Button
            disabled={isCheckingOut}
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              checkingOut(bookingId);
            }}
          >
            check out
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

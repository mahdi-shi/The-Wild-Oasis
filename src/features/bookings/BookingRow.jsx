import PropTypes from "prop-types";
import styled from "styled-components";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { format, isToday } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckingOut } from "../check-in-out/useCheckingOut";
import useDeleteBooking from "./useDeleteBookings";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingID,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guestID: { fullName: guestName, email },
    cabinID: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  const { checkingOut, isCheckingOut } = useCheckingOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingID} />
          <Menus.List id={bookingID}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingID}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingID}`)}
              >
                check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                disabled={isCheckingOut}
                icon={<HiArrowUpOnSquare />}
                onClick={() => {
                  checkingOut(bookingID);
                }}
              >
                check out
              </Menus.Button>
            )}
            <Modal.Open opens={"deleteBookings"}>
              <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name={"deleteBookings"}>
          <ConfirmDelete
            resourceName={"booking"}
            onConfirm={() => {
              deleteBooking(bookingID);
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;

BookingRow.propTypes = {
  booking: PropTypes.node,
};

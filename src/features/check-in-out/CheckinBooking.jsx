//import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Checkbox from "../../ui/Checkbox";
import { useState, useEffect } from "react";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useCheckingIn } from "./useCheckingIn";

//const Box = styled.div`
/* Box */
/*background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;*/

function CheckinBooking() {
  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);

  const { checkin, isCheckingIn } = useCheckingIn();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

  if (isLoading) return <Spinner />;
  const {
    id: bookingId,
    guestID,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(bookingId);
  }

  console.log(confirmPaid, numGuests, hasBreakfast, numNights, guestID);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Checkbox
        checked={confirmPaid}
        onChange={() => setConfirmPaid((confirm) => !confirm)}
        id="confirm"
        disabled={booking.isPaid || isCheckingIn}
      >
        I confirm that {guestID.fullName} has paid the total amount{" "}
        {formatCurrency(totalPrice)}
      </Checkbox>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

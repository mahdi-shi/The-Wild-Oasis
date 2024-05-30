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
import styled from "styled-components";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const { Settings, isLoading: isLoadingSetting } = useSettings();
  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { checkin, isCheckingIn } = useCheckingIn();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

  if (isLoading || isLoadingSetting) return <Spinner />;

  const {
    id: bookingId,
    guestID,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const opotionalBreakfastPrice =
    Settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: opotionalBreakfastPrice,
          totalPrice: totalPrice + opotionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(opotionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={booking.isPaid && isCheckingIn}
        >
          I confirm that {guestID.fullName} has paid the total amount of
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + opotionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                opotionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

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

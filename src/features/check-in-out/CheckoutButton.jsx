import PropTypes from "prop-types";
import Button from "../../ui/Button";
import {useCheckingOut} from "../check-in-out/useCheckingOut";

function CheckoutButton({ bookingId }) {
  const { checkingOut, isCheckingOut } = useCheckingOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkingOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;

CheckoutButton.propTypes = {
  bookingId: PropTypes.node,
};

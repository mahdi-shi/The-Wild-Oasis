import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useBooking() {
  const { bookingID } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking",bookingID],
    queryFn: () => getBooking(bookingID),
    retry: false,
  });

  console.log(booking);

  return { isLoading, booking, error };
}
export default useBooking;

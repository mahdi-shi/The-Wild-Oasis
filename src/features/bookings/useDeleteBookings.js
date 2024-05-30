import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingID) => deleteBookingApi(bookingID),
    onSuccess: () => {
      toast.success("Booking has been deleted"),
        queryClient.invalidateQueries({
          queryKey: ["booking", isDeleting],
        });
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;

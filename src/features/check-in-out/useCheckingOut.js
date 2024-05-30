import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckingOut() {
  const queryClient = useQueryClient();

  const { mutate: checkingOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { checkingOut, isCheckingOut };
}

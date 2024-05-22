import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //Filtering

  const filterOrder = searchParams.get("status");

  const filter =
    !filterOrder || filterOrder === "all"
      ? null
      : { field: "status", value: filterOrder, method: "eq" };

  //Sorting

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  console.log(bookings);

  return { isLoading, bookings, error };
}

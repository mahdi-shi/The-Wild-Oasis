import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();
  const { isLoading: isStaying, stays, confirmedStays } = useRecentStays();

  if (isLoading || isStaying) return <Spinner />;

  console.log(bookings);
  console.log(stays, confirmedStays);

  return <StyledDashboardLayout>Dashbord</StyledDashboardLayout>;
}

export default DashboardLayout;

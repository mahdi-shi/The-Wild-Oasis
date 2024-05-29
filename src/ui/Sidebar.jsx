import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.div`
  background-color: var(--color-grey-0);
  border-right: 2px solid var(--color-grey-100);
  padding: 3.1rem 2.4rem;

  grid-row: 1 / -1;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;

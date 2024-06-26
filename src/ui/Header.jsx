import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
  padding: 2rem 4.8rem;
  border-bottom: 2px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  gap: 2.7rem;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;

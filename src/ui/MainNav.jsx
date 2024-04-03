import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { MdOutlineBedroomParent } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 20px;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to={"/dashboard"}>
            <IoHomeOutline />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/bookings"}>
            <SlNotebook />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/cabins"}>
            <MdOutlineBedroomParent /> <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/account"}>
            <RiAccountCircleLine />
            <span>Account</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/users"}>
            <LuUsers /> <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={"/settings"}>
            <IoSettingsOutline />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;

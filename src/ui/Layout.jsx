import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background:var(--color-grey-0);
  }

  &::-webkit-scrollbar-thumb {
    background:var(--color-grey-200);
  }

  &::-webkit-scrollbar-thumb:hover {
    background:var(--color-grey-50);
  }

  height: 90vh;

  overflow-y: scroll;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100.5%;
  margin-top: -1rem;
`;

const ContainerLayout = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Layout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <StyledMain>
        <ContainerLayout>
          <Outlet />
        </ContainerLayout>
      </StyledMain>
    </StyledAppLayout>
  );
}

export default Layout;

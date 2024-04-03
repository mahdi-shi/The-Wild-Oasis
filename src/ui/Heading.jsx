import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3em;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2em;
      font-weight: 400;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.2em;
      font-weight: 300;
    `}
 
  font-family: sans-serif;
  text-shadow: 0px 10px 10px rgb(0, 0, 0, 0.5);
`;

export default Heading;

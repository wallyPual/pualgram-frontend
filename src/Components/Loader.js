import React from "react";
import styled, { keyframes } from "styled-components";
import { Loading } from "./Icons";

const Animation = keyframes`
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  text-align: center;
  animation: ${Animation} 1s linear infinite;
`;

export default ({ size }) => (
  <Loader>
    <Loading size={size} />
  </Loader>
);

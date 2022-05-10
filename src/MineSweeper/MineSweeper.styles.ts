import styled from "styled-components";
import { Card } from "../common/Styles";
import { getShowBackground, getCellValueColor } from "./utils/cssData";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const HeaderColumn = styled.div`
  max-width: 45%;
  width: 100%;
`;

export const GridContainer = styled.div<{
  gridTemplate: string;
}>`
  display: grid;
  grid-template: ${(props) => props.gridTemplate};
`;

export const GridItem = styled(Card)<{ show: boolean; siblings: number }>`
  width: 32px;
  height: 32px;
  cursor: context-menu;

  ${({ show }) => getShowBackground(show)}

  > span {
    display: block;
    margin-top: 3px;
    font-weight: bold;
    ${({ siblings }) => getCellValueColor(siblings)}
  }
`;

export const Dropdown = styled.select`
  width: 100%;
  max-width: 400px;
  height: 50px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 53%;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  border-width: 4px;
  border-style: solid;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;

  option {
    height: auto;
    width: 100%;
    padding: 40px 20px;
  }
`;

export const OverlayContainer = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  display: ${({ isPlaying }) => (isPlaying ? "none" : "block")};
  width: 100%;
  height: 100%;
  top: -4px;
  left: -4px;
  min-width: 328px;
  min-height: 328px;
  background: var(--overlay-main);
`;

export const OverlayContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: var(--primary-color);

  > img:first-child {
    height: auto;
    width: 80px;
    margin: auto;
  }

  > span:nth-child(2) {
    font-family: "Orbitron", sans-serif;
    font-size: 20px;
    font-weight: bold;
    padding: 8px;
  }

  > button:last-child {
    padding: 10px;
    display: flex;
    background: var(--cell-1-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;

    > img {
      height: 30px;
      width: 30px;
      padding: 0 7px;
    }

    > span {
      align-self: center;
      white-space: nowrap;
      margin: auto 10px;
      font-size: 18px;
      color: var(--primary-color);
    }
  }
`;

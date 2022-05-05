import styled from "styled-components";

export const Card = styled.div<{
  padding?: string;
  isReversed?: boolean;
  styles?: string;
}>`
  width: fit-content;
  height: auto;
  box-sizing: border-box;
  padding: ${({ padding }) => padding || "0"};
  border-width: 4px;
  border-style: solid;
  border-color: ${({ isReversed }) =>
    isReversed
      ? "var(--gray-3) var(--gray-1) var(--gray-1) var(--gray-3)"
      : "var(--gray-1) var(--gray-3) var(--gray-3) var(--gray-1)"};
  background: var(--primary-color);
  ${({ styles }) => (styles ? styles : "")}
`;

export const Timer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
  background: var(--gray-5);
  font-family: "Press Start 2P", cursive;
  line-height: 2.7;
  font-size: 20px;
  color: red;
  float: right;

  > img:not(:last-child) {
    margin-right: 3px;
  }
`;

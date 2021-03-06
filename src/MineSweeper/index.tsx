import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Dropdown, HeaderColumn } from "./MineSweeper.styles";
import { changeLevel, updateStatus, selectLevel } from "./mineSweeper.reducer";
import { Card } from "../common/Styles";
import Board from "./Board";
import Timer from "./Counter";
import { STATUS } from "./constants";

const MineSweeper = () => {
  const level = useSelector(selectLevel);
  const dispatch = useDispatch();

  const handleSelect = (value: string) => {
    dispatch(changeLevel({ level: Number(value) }));
    dispatch(updateStatus(STATUS.PLAYING));
  };

  const gameBordStyle = `
    ${level < 3 ? `
      position: absolute;
      top: 50%; left: 50%;
      transform: translateX(-50%) translateY(-50%);
      ` : ''}
    display: flex;
    flex-direction: column;
    `;

  return (
    <Container>
      <Card padding="21px" styles={gameBordStyle}>
        <Card
          padding="12px"
          styles="display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 12px; width: 100%"
          isReversed
        >
          <HeaderColumn>
            <Dropdown
              onChange={(e) => handleSelect(e.target.value)}
              data-testid="level-test-id"
            >
              <option value={1}>Beginner</option>
              <option value={2}>Intermediate</option>
              <option value={3}>Professional</option>
            </Dropdown>
          </HeaderColumn>
          <HeaderColumn>
            <Timer />
          </HeaderColumn>
        </Card>
        <Board handleSelect={handleSelect} />
      </Card>
    </Container>
  );
};

export default React.memo(MineSweeper);

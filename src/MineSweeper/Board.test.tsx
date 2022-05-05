import { render, screen } from "@testing-library/react";

import Board from "./Board";

jest.mock("./mineSweeper.reducer", () => ({
  getGrid: () => [
    {
      id: "",
      show: true,
      mine: false,
      isPossibleMine: false,
      sibblingsMines: 1,
      point: {
        col: 5,
        row: 5,
      },
    },
  ],
  getGridLevelsConfig: () => ({ rows: 10, cols: 10 }),
  getStatus: () => "playing",
  selectLevel: () => 1
}));

jest.mock("react-redux", () => ({
  useSelector: (fn) => fn(),
  useDispatch: () => jest.fn,
}));

const props = {
  handleSelect: jest.fn,
};

function TestComponent() {
  return <Board {...props} />;
}

test("It should render Board grid", async () => {
  render(<TestComponent />);
  expect(screen.getByText("1")).toBeDefined();
});

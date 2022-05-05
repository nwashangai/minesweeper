import { fireEvent, render, screen } from "@testing-library/react";

import MineSweeper from "./";

const dispatch = jest.fn();
const useDispatch = () => dispatch;

jest.mock("./mineSweeper.reducer", () => ({
  getGrid: () => [
    {
      id: "",
      show: true,
      mine: false,
      isPossibleMine: false,
      sibblingsMines: 3,
      point: {
        col: 5,
        row: 5,
      },
    },
  ],
  getGridLevelsConfig: () => ({ rows: 10, cols: 10 }),
  getStatus: () => "playing",
  selectLevel: () => 1,
  getIsClocking: () => true,
  changeLevel: () => null,
  updateStatus: () => null,
}));

jest.mock("react-redux", () => ({
  useSelector: (fn) => fn(),
  useDispatch,
}));

function TestComponent() {
  return <MineSweeper />;
}

test("It should render MineSweeper", async () => {
  render(<TestComponent />);
  expect(screen.getByText("Beginner")).toBeDefined();
  expect(screen.getByText("Intermediate")).toBeDefined();
  expect(screen.getByText("Professional")).toBeDefined();
  expect(screen.getByText("3")).toBeDefined();
});

test("It should dispatch change level event", async () => {
  render(<TestComponent />);
  fireEvent.change(screen.getByTestId("level-test-id"), {
    target: { value: "1" },
  });
  expect(screen.getByTestId("level-test-id")).toBeDefined();
  expect(useDispatch()).toHaveBeenCalledTimes(2);
});

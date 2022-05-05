import { fireEvent, render, screen } from "@testing-library/react";

import Cell from "./Cell";

const dispatch = jest.fn();

const useDispatch = () => dispatch;

jest.mock("react-redux", () => ({
  useSelector: (fn) => fn(),
  useDispatch,
}));

jest.mock("./mineSweeper.reducer", () => ({
    getStatus: () => 'playing',
    open: () => {}
}));

const data = {
  id: "",
  show: true,
  mine: false,
  isPossibleMine: false,
  sibblingsMines: 1,
  point: {
    col: 5,
    row: 5,
  },
};

test("It should not dispatch open cell event for already opened cell", async () => {
  render(<Cell data={data} />);

  fireEvent.click(screen.getByTestId("cell-test-id"));

  expect(screen.getByTestId("cell-test-id")).toBeDefined();
  expect(useDispatch()).toHaveBeenCalledTimes(0);
});

test("It should dispatch open cell event", async () => {
  data.show = false;
  render(<Cell data={data} />);

  fireEvent.click(screen.getByTestId("cell-test-id"));

  expect(screen.getByTestId("cell-test-id")).toBeDefined();
  expect(useDispatch()).toHaveBeenCalled();
});

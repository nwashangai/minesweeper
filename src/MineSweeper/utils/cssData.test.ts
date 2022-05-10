import { getCellValueColor, getShowBackground } from "./cssData";

test("It should return corresponding css properties open or hidding block", async () => {
  // Assert
  expect(getShowBackground(true)).toBe(
    "background: var(--gray-1); border-width: 2px;"
  );
  expect(getShowBackground(false)).toBe(
    "&:hover { background: var(--overlay); }"
  );
});

test("It should return corresponding css color property for given number", async () => {
  // Assert
  expect(getCellValueColor(1)).toBe("color: var(--cell-1-color);");
  expect(getCellValueColor(2)).toBe("color: var(--cell-2-color);");
  expect(getCellValueColor(3)).toBe("color: var(--cell-3-color);");
  expect(getCellValueColor(4)).toBe("color: var(--cell-4-color);");
  expect(getCellValueColor(5)).toBe("color: var(--cell-5-color);");
});

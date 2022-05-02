import getCellContent from "./getCellContent";

test("It should return empty string", async () => {
  let data = {
    show: false,
    mine: 0,
    isMined: false,
    isQuestion: false,
    siblings: 0,
  };
  const cell = getCellContent(data, (icon) => `<>${icon}</>` as any);

  expect(cell).toBe("");
});
test("It should return 2", async () => {
  let data = {
    show: true,
    mine: 0,
    isMined: false,
    isQuestion: false,
    siblings: 2,
  };
  const cell = getCellContent(data, (icon) => `<>${icon}</>` as any);

  expect(cell).toBe(2);
});

test("It should return 💣", async () => {
  let data = {
    show: true,
    mine: 1,
    isMined: false,
    isQuestion: false,
    siblings: 0
  };
  const cell = getCellContent(data, (icon) => `<>${icon}</>` as any);

  expect(cell).toBe("<>💣</>");
});

test("It should return 🚩", async () => {
  let data = {
    show: false,
    mine: 0,
    isMined: true,
    isQuestion: false,
    siblings: 0,
    status: 'playing'
  };
  const cell = getCellContent(data, (icon) => `<>${icon}</>` as any);

  expect(cell).toBe("<>🚩</>");
});



test("It should return ❓", async () => {
    let data = {
      show: false,
      mine: 0,
      isMined: false,
      isQuestion: true,
      siblings: 0,
      status: 'playing'
    };
    const cell = getCellContent(data, (icon) => `<>${icon}</>` as any);
  
    expect(cell).toBe("<>❓</>");
  });
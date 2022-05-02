import getLevelsConfigFromMap from "./getLevelsConfigFromMap";

test("It should generate map config", async () => {
  const map = `□□□□□□□□□□
    □□□□□□□□□□
    □□□□□□□□□□
    □□□□□□□□□□
    □□□□□□□□□□
    □□□□□□□□□□
    □□□□□□□□□□
    □□□□□□□□□□
    □□□□□□□□□□
    □□□□□□□□□□`;

  const config = getLevelsConfigFromMap(map);
  

  expect(config.cols).toBe(10);
  expect(config.rows).toBe(10);
  expect(config.map.length).toBe(136);
});

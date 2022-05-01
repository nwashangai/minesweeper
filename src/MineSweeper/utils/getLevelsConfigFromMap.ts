const getLevelsConfigFromMap = (map: string) => {
  const twoDimentionalMetrix = map.trim().split("\n");

  return {
    rows: twoDimentionalMetrix.length,
    cols: twoDimentionalMetrix[0].length,
    map: map.trim().replace(/\n/g, ""),
  };
};

export default getLevelsConfigFromMap;

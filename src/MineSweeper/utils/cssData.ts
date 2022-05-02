export const getShowBackground = (isOpen: boolean) => {
  return isOpen
    ? 'background: var(--gray-1); border-width: 2px;'
    : '&:hover { background: var(--overlay); }';
};

export const getCellValueColor = (value: number) => {
  switch (value) {
    case 1:
      return "color: var(--cell-1-color);";
    case 2:
      return "color: var(--cell-2-color);";

    case 3:
      return "color: var(--cell-3-color);";

    default:
      return "color: var(--gray-1);";
  }
};

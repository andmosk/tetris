export const calculatePosition = (
  pointPosition,
  figurePosition = 0,
  squareSize
) => {
  return squareSize * (pointPosition + figurePosition);
};

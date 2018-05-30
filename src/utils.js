export const convert2px = (pointPosition, figurePosition = 0, squareSize) => {
  return squareSize * (pointPosition + figurePosition);
};

export function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

export const getBlocksPosition = blocks => {
  const blocksPosition = [];
  blocks.forEach((row, rowIndex) => {
    row.forEach((block, columnIndex) => {
      if (block) {
        blocksPosition.push({ x: columnIndex, y: rowIndex });
      }
    });
  });
  return blocksPosition;
};

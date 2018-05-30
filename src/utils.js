export const convert2px = (pointPosition, figurePosition = 0, squareSize) => {
  return squareSize * (pointPosition + figurePosition);
};
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
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

export const calcBlockSize = (width, height, gridWidth, gridHeight, offset) => {
  width = offset ? width - offset : width;
  height = height ? height - offset : height;
  const size = Math.floor(width / gridWidth);
  if (size * gridHeight < height) {
    console.log(size);
    return size;
  } else {
    return Math.floor(height / gridHeight);
  }
};

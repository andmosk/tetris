import React, { Fragment } from "react";
import { calculatePosition } from "./utils";
import { Block } from "./Block";

export const Blocks = ({
  blockSize,
  blocks,
  position = { x: 0, y: 0 },
  prefix
}) => {
  const blocksPosition = [];
  blocks.forEach((row, rowIndex) => {
    row.forEach((square, squareIndex) => {
      if (square) {
        blocksPosition.push({ x: squareIndex, y: rowIndex });
      }
    });
  });

  const mappedBlocks = blocksPosition.map((element, index) => {
    return (
      <Block
        key={prefix + index}
        top={calculatePosition(element.y, position.y, blockSize)}
        left={calculatePosition(element.x, position.x, blockSize)}
      >
        {index}
      </Block>
    );
  });
  return <Fragment>{mappedBlocks}</Fragment>;
};

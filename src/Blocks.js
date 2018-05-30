import React, { Fragment } from "react";
import { convert2px, getBlocksPosition } from "./utils";
import { Block } from "./Block";

export const Blocks = ({
  blockSize,
  blocks,
  position = { x: 0, y: 0 },
  prefix
}) => {
  const blocksPosition = getBlocksPosition(blocks);

  const mappedBlocks = blocksPosition.map((element, index) => {
    const top = convert2px(element.y, position.y, blockSize);
    const left = convert2px(element.x, position.x, blockSize);
    return (
      <Block key={prefix + index} top={top} left={left} blockSize={blockSize} />
    );
  });

  return <Fragment>{mappedBlocks}</Fragment>;
};

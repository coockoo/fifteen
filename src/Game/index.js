import shuffle from 'Utils/shuffle';
import swap from 'Utils/swap';

const DIR = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

function getTiles(boardSize) {
  return Array(boardSize ** 2 - 1)
    .fill()
    .map((_, i) => i + 1);
}

function getInitialState() {
  const boardSize = 4;
  const tiles = [...shuffle(getTiles(boardSize)), undefined];
  const emptyIndex = tiles.length - 1;

  return { boardSize, tiles, emptyIndex };
}

function canMove(state, index) {
  const { boardSize, emptyIndex } = state;

  const isInBoard = index >= 0 && index < boardSize ** 2;

  if (!isInBoard) {
    return false;
  }

  const isAboveEmpty = emptyIndex - boardSize === index;
  const isBelowEmpty = emptyIndex + boardSize === index;
  const isLeftToEmpty = emptyIndex % boardSize > 0 && emptyIndex - 1 === index;
  const isRightToEmpty = emptyIndex % boardSize < boardSize - 1 && emptyIndex + 1 === index;

  return isAboveEmpty || isBelowEmpty || isLeftToEmpty || isRightToEmpty;
}

function moveDir(state, dir) {
  let moveIndex = null;

  if (dir === DIR.UP) {
    moveIndex = state.emptyIndex + state.boardSize;
  }
  if (dir === DIR.DOWN) {
    moveIndex = state.emptyIndex - state.boardSize;
  }
  if (dir === DIR.LEFT) {
    moveIndex = state.emptyIndex + 1;
  }
  if (dir === DIR.RIGHT) {
    moveIndex = state.emptyIndex - 1;
  }

  if (!canMove(state, moveIndex)) {
    return state;
  }

  return doMove(state, moveIndex);
}

function moveTile(state, index) {
  if (!canMove(state, index)) {
    return state;
  }
  return doMove(state, index);
}

function doMove(state, index) {
  return {
    ...state,
    tiles: swap(state.tiles, index, state.emptyIndex),
    emptyIndex: index,
  };
}

export default {
  DIR,
  getInitialState,
  moveDir,
  moveTile,
};

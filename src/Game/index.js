import shuffle from 'Utils/shuffle';
import swap from 'Utils/swap';

const DIR = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const EMPTY_TILE = -1;

function getInitialState() {
  const boardSize = 4;
  const tiles = shuffle(
    Array(boardSize ** 2 - 1)
      .fill()
      .map((_, i) => i + 1)
  );

  return {
    boardSize: 4,
    tiles: [...tiles, EMPTY_TILE],
    emptyIndex: tiles.length,
  };
}

function canMove(state, index) {
  return (
    index >= 0 &&
    index < state.tiles.length &&
    (state.emptyIndex - state.boardSize === index ||
      state.emptyIndex + state.boardSize === index ||
      state.emptyIndex - 1 === index ||
      state.emptyIndex + 1 === index)
  );
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

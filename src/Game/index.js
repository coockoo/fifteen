import shuffle from 'Utils/shuffle';

function getInitialState() {
  return {
    boardSize: 4,
    tiles: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1]),
  };
}

function getMoveIndex(state, index) {
  // Left neighbour
  if (index % state.boardSize !== 0 && state.tiles[index - 1] === -1) {
    return index - 1;
  }
  // Right neighbour
  if (index % state.boardSize < state.boardSize - 1 && state.tiles[index + 1] === -1) {
    return index + 1;
  }
  // Top neighbour
  if (index >= state.boardSize && state.tiles[index - state.boardSize] === -1) {
    return index - state.boardSize;
  }
  // Bottom neighbour
  if (
    index < state.boardSize * state.boardSize - state.boardSize &&
    state.tiles[index + state.boardSize] === -1
  ) {
    return index + state.boardSize;
  }
  return null;
}

function swap(arr, indexA, indexB) {
  const valueA = arr[indexA];
  const valueB = arr[indexB];
  return arr.map((value, index) => {
    if (index === indexA) {
      return valueB;
    }
    if (index === indexB) {
      return valueA;
    }
    return value;
  });
}

function moveTile(state, index) {
  const moveIndex = getMoveIndex(state, index);
  if (moveIndex !== null) {
    return {
      ...state,
      tiles: swap(state.tiles, index, moveIndex),
    };
  }
  return state;
}

export default {
  getInitialState,
  moveTile,
};

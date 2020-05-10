import toIndexMap from 'Utils/toIndexMap';

import game from 'Game';

const BOARD_SIZE = 4;

describe('Game', () => {
  describe('#getInitialState()', () => {
    test('should return valid initial state', () => {
      const state = game.getInitialState();
      expect(state).toHaveProperty('boardSize', BOARD_SIZE);
      expect(state).toHaveProperty('tiles');
      expect(state.tiles).toHaveLength(state.boardSize ** 2);
      state.tiles.forEach((tile, index) => {
        if (!tile) {
          expect(index).toEqual(state.boardSize ** 2 - 1);
          expect(state.emptyIndex).toEqual(index);
          return;
        }
        expect(state.tileIndices[tile]).toEqual(index);
      });
    });
  });

  describe('#canMoveTile()', () => {
    test('should return false for another row tile', () => {
      const tiles = [1, 2, 3, undefined, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      const state = {
        boardSize: 4,
        tiles,
        tileIndices: toIndexMap(tiles),
        emptyIndex: 3,
      };
      expect(game.canMoveTile(state, { value: 4 })).toEqual(false);
      expect(game.canMoveTile(state, { value: 3 })).toEqual(true);
      expect(game.canMoveTile(state, { value: 7 })).toEqual(true);
    });
  });

  // TODO: another tests can be added here
});

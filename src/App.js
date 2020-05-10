import React, { StrictMode, useState, useEffect, useCallback } from 'react';
import { hot } from 'react-hot-loader/root';

import game from 'Game';

import Board from 'Components/Board';

const keyCodeDirs = {
  ArrowLeft: game.DIR.LEFT,
  ArrowRight: game.DIR.RIGHT,
  ArrowDown: game.DIR.DOWN,
  ArrowUp: game.DIR.UP,
};

function App() {
  const [state, setState] = useState(game.getInitialState());

  const moveTile = useCallback(
    (index) => {
      setState(game.moveTile(state, index));
    },
    [state]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      const dir = keyCodeDirs[e.code];
      if (dir) {
        setState(game.moveDir(state, dir));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state]);

  // TODO: Add legend about keys

  return (
    <StrictMode>
      <Board tiles={state.tiles} onTileClick={moveTile} />
    </StrictMode>
  );
}

export default hot(App);

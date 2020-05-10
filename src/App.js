import React, { StrictMode, useState, useEffect, useCallback } from 'react';
import { hot } from 'react-hot-loader/root';

import game from 'Game';

import Board from 'Components/Board';

const keyCodeIndices = {
  Digit1: 0,
  Digit2: 1,
  Digit3: 2,
  Digit4: 3,

  KeyQ: 4,
  KeyW: 5,
  KeyE: 6,
  KeyR: 7,

  KeyA: 8,
  KeyS: 9,
  KeyD: 10,
  KeyF: 11,

  KeyZ: 12,
  KeyX: 13,
  KeyC: 14,
  KeyV: 15,
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
    const handleKeyPress = (e) => {
      const index = keyCodeIndices[e.code];
      if (index !== undefined) {
        moveTile(index);
      }
    };

    document.addEventListener('keypress', handleKeyPress, { once: true });
  }, [moveTile]);

  // TODO: Use arrow keys to handle (only one move allowed for each key)
  // TODO: Add legend about keys

  return (
    <StrictMode>
      <Board tiles={state.tiles} onTileClick={moveTile} />
    </StrictMode>
  );
}

export default hot(App);

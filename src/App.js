import React, { StrictMode, useState } from 'react';
import { hot } from 'react-hot-loader/root';

import game from 'Game';

import Board from 'Components/Board';

function App() {
  // TODO: we can add event handler to handle keyboard clicks and map to indices
  // TODO: Add legend about this
  // HOHOHOHOHOH
  const [state, setState] = useState(game.getInitialState());

  const moveTile = (index) => {
    setState(game.moveTile(state, index));
  };
  return (
    <StrictMode>
      <Board tiles={state.tiles} onTileClick={moveTile} />
    </StrictMode>
  );
}

export default hot(App);

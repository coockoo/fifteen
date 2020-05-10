import React, { StrictMode, useState, useEffect, useCallback } from 'react';
import { hot } from 'react-hot-loader/root';

import game from 'Game';

import Board from 'Components/Board';
import Button from 'Components/Button';
import Tile from 'Components/Tile';

import s from 'Styles/app.less';

const keyCodeDirs = {
  ArrowLeft: game.DIR.LEFT,
  ArrowRight: game.DIR.RIGHT,
  ArrowDown: game.DIR.DOWN,
  ArrowUp: game.DIR.UP,
};

function App() {
  const [state, setState] = useState({ tiles: [], boardSize: 0, emptyIndex: 0 });

  const moveTile = useCallback(
    (index) => {
      setState(game.moveTile(state, index));
    },
    [state]
  );

  const shuffle = () => {
    const doShuffle = confirm('Do you really want to shuffle?');
    if (doShuffle) {
      setState(game.getInitialState());
    }
  };

  useEffect(() => {
    setState(game.getInitialState());
  }, []);

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
      <div className={s.board}>
        <Board>
          {state.tiles.map((tile, index) =>
            tile ? (
              <Tile
                key={tile}
                row={Math.floor(index / 4)}
                column={index % 4}
                value={tile}
                onClick={() => moveTile(index)}
                canMove={true}
              />
            ) : null
          )}
        </Board>
      </div>
      <div className={s.sidebar}>
        <Button onClick={shuffle}>Shuffle</Button>
        <p>Tip: Use arrow keys &larr;, &rarr;, &uarr;, &darr; to control board.</p>
      </div>
    </StrictMode>
  );
}

export default hot(App);

import React, { StrictMode, useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import cn from 'classnames';
import { useTransition, animated } from 'react-spring';

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

  const transitions = useTransition(game.getTiles(state), (item) => item.value, {
    from: ({ row, column }) => ({ row, column }),
    enter: ({ row, column }) => ({ row, column }),
    update: ({ row, column }) => ({ row, column }),
  });

  return (
    <StrictMode>
      <div className={s.board}>
        <Board>
          {transitions.map(({ item, props: { row, column }, key }) => (
            <animated.div
              key={key}
              style={{
                position: 'absolute',
                top: row.interpolate((r) => `${r * 4}rem`),
                left: column.interpolate((c) => `${c * 4}rem`),
              }}
            >
              <Tile
                value={item.value}
                onClick={() => setState(game.moveTile(state, item))}
                canMove={game.canMoveTile(state, item)}
              />
            </animated.div>
          ))}
        </Board>
      </div>
      <div className={s.sidebar}>
        <Button onClick={shuffle}>Shuffle</Button>
        <p>Tip: Use arrow keys &uarr;, &darr;, &larr;, &rarr; to control board.</p>
        <h1>
          {game.isWin(state) ? (
            <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
              You won!
            </a>
          ) : (
            <span>&nbsp;</span>
          )}
        </h1>
      </div>
    </StrictMode>
  );
}

export default hot(App);

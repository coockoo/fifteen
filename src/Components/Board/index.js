import React from 'react';

import Tile from 'Components/Tile';

import s from './styles.less';

export default function Board(props) {
  return (
    <div className={s.board}>
      {props.tiles.map((tile, index) => (
        <Tile
          key={tile}
          index={index}
          value={tile}
          onClick={() => props.onTileClick(index)}
          canMove={true}
        />
      ))}
    </div>
  );
}

Board.defaultProps = {
  onTileClick: () => {},
};

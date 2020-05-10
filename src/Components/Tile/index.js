import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Tile(props) {
  // TODO: Add some non-hardcoded stuff
  if (props.value === -1) {
    return null;
  }
  const row = Math.floor(props.index / 4);
  const column = props.index % 4;
  const style = {
    left: `${4 * column}rem`,
    top: `${4 * row}rem`,
  };
  return (
    <div
      className={cn(s.tile, { [s.canMove]: props.canMove })}
      onClick={props.onClick}
      style={style}
    >
      {props.value}
    </div>
  );
}

Tile.defaultProps = {
  onClick: () => {},
};

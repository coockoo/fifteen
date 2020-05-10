import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Tile(props) {
  return (
    <div className={cn(s.tile, { [s.canMove]: props.canMove })} onClick={props.onClick}>
      {props.value}
    </div>
  );
}

Tile.defaultProps = {
  onClick: () => {},
};

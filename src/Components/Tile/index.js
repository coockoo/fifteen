import React, { useEffect } from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Tile(props) {
  useEffect(() => {
    console.log('CREATED', props.value);
  }, [props.value]);

  useEffect(() => {
    console.log('UPDATED', props.value, props.row, props.column);
  }, [props.value, props.column, props.row]);

  return (
    <div
      className={cn(
        s.tile,
        { [s.canMove]: props.canMove },
        s[`col${props.column}`],
        s[`row${props.row}`]
      )}
      onClick={props.onClick}
    >
      {props.value}
    </div>
  );
}

Tile.defaultProps = {
  onClick: () => {},
};

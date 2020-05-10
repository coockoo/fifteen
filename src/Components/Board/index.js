import React from 'react';

import s from './styles.less';

export default function Board(props) {
  return <div className={s.board}>{props.children}</div>;
}

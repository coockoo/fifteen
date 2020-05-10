import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Button(props) {
  const { children, className, ...rest } = props;
  return (
    <button className={cn(className, s.button)} {...rest}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
};

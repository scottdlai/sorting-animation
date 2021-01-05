import React from 'react';
import style from '../util/setting';
import { Bar } from './SortingAnimation';

export interface BodyProps {
  bars: Bar[];
}

const Body = ({ bars }: BodyProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
      }}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{
            height: `${bar.height / 8}em`,
            width: `${32 / bars.length}em`,
            backgroundColor: style[bar.status],
            color: 'white',
            marginRight: `${16 / bars.length}em`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Body;

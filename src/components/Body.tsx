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
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: '18em', // To fix issue with merge sort
      }}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{
            height: `${bar.height / 8}em`,
            width: `${64 / bars.length}em`,
            backgroundColor: style[bar.status],
            color: 'white',
          }}
        ></div>
      ))}
    </div>
  );
};

export default Body;

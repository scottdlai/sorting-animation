import React from 'react';
import useWindowSize from '../hooks/useWindowSize';
import style from '../util/setting';
import { Bar } from './SortingAnimation';

export interface BodyProps {
  bars: Bar[];
}

const Body = ({ bars }: BodyProps) => {
  const { width } = useWindowSize();

  const getBarSize = () => {
    if (width > 1024) {
      return 64 / bars.length;
    } else if (width > 640) {
      return 32 / bars.length;
    }

    return 16 / bars.length;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        height: '18em', // To fix issue with merge sort
      }}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{
            height: `${bar.height / 8}em`,
            width: `${getBarSize()}em`,
            backgroundColor: style[bar.status],
            color: 'white',
          }}
        ></div>
      ))}
    </div>
  );
};

export default Body;

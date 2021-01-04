import { access } from 'fs';
import React, { Reducer, useReducer, useState } from 'react';
import bubbleSort from '../algorithms/bubbleSort';
import random from '../util/random';
import Body from './Body';
import CustomBar from './CustomBar';

type Status = 'unsorted' | 'sorted' | 'pivot' | 'compared' | 'swapped';

export type Action =
  | { name: 'swapping'; i: number; j: number }
  | { name: 'comparing'; i: number; j: number }
  | { name: 'resuming'; indices: number[] }
  | { name: 'pivoting'; index: number }
  | { name: 'resize'; newSize: number };

export interface Bar {
  readonly height: number;
  status: Status;
}

const getRandomBars = (n: number): Bar[] => {
  return Array.from({ length: n }, () => {
    return {
      height: random(16, 128),
      status: 'unsorted',
    };
  });
};

const barsReducer = (prevBars: Bar[], action: Action): Bar[] => {
  if (action.name === 'resize') {
    return getRandomBars(action.newSize);
  }
  if (action.name === 'comparing') {
    const { i, j } = action;
    return prevBars.map((bar, k) => {
      return {
        ...bar,
        status: k === i || k === j ? 'compared' : bar.status,
      };
    });
  }

  if (action.name === 'swapping') {
    const { i, j } = action;
    return prevBars.map((bar, k) => {
      if (k === i) {
        return { ...prevBars[j], status: 'swapped' };
      }

      if (k === j) {
        return { ...prevBars[i], status: 'swapped' };
      }

      return bar;
    });
  }

  if (action.name === 'resuming') {
    const { indices } = action;
    return prevBars.map((bar, k) => {
      return { ...bar, status: indices.includes(k) ? 'unsorted' : bar.status };
    });
  }
  const { index } = action;

  return prevBars.map((bar, k) => {
    return { ...bar, status: index === k ? 'pivot' : bar.status };
  });
};

const SortingAnimation = () => {
  const [isSorting, setIsSorting] = useState(false);
  const [sortAlgo, setSortAlgo] = useState<(bar: Bar[]) => Action[]>(
    bubbleSort
  );
  const [bars, barsDispatch] = useReducer<Reducer<Bar[], Action>>(
    barsReducer,
    getRandomBars(8)
  );

  const resizeBars = (newSize: number) => {
    console.log(newSize);
    barsDispatch({ name: 'resize', newSize });
  };

  const startSorting = () => {
    setIsSorting(true);
    const actions = sortAlgo([...bars]);

    console.log(actions);
    const animations = setInterval(() => {
      if (actions.length === 0) {
        clearInterval(animations);
        setIsSorting(false);
        return;
      }
      barsDispatch(actions[0]);
      actions.shift();
    }, 250);
  };

  return (
    <>
      <CustomBar
        resizeBars={resizeBars}
        isSorting={isSorting}
        startSorting={startSorting}
      />
      <Body bars={bars} />{' '}
    </>
  );
};

export default SortingAnimation;

import React, { Reducer, useEffect, useReducer, useState } from 'react';
import random from '../util/random';
import Body from './Body';
import CustomBar from './CustomBar';

type Status = 'unsorted' | 'sorted' | 'pivot' | 'compared';

export type Action =
  | { name: 'swapping'; i: number; j: number }
  | { name: 'comparing'; i: number; j: number }
  | { name: 'resuming'; indices: number[] }
  | { name: 'pivoting'; index: number }
  | { name: 'resize'; newSize: number }
  | { name: 'sorting'; index: number }
  | { name: 'assigning'; index: number; newBar: Bar };

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
      const newStatus =
        [i, j].includes(k) && bar.status !== 'pivot' ? 'compared' : bar.status;
      return {
        ...bar,
        status: newStatus,
      };
    });
  }

  if (action.name === 'swapping') {
    const { i, j } = action;
    return prevBars.map((bar, k) => {
      if (k === i) {
        return prevBars[j];
      }

      if (k === j) {
        return prevBars[i];
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

  if (action.name === 'assigning') {
    const { index, newBar } = action;
    return prevBars.map((bar, k) => {
      return k === index ? newBar : bar;
    });
  }

  const { index } = action;

  const newStatus = action.name === 'pivoting' ? 'pivot' : 'sorted';

  return prevBars.map((bar, k) => {
    return { ...bar, status: index === k ? newStatus : bar.status };
  });
};

const SortingAnimation = () => {
  const [isSorting, setIsSorting] = useState(false);
  const [animations, setAnimations] = useState<Action[]>([]);
  const [bars, barsDispatch] = useReducer<Reducer<Bar[], Action>>(
    barsReducer,
    []
  );

  const resizeBars = (newSize: number) => {
    setAnimations([]);
    barsDispatch({ name: 'resize', newSize });
  };

  const finishedSorting = () => isSorting && animations.length === 0;

  const isNotInProgress = () => !isSorting && animations.length === 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (finishedSorting()) {
        setIsSorting(false);
        return;
      }

      if (animations.length === 0 || !isSorting) {
        return;
      }

      const [current, ...rest] = animations;
      barsDispatch(current);
      setAnimations(rest);
    }, (8 * 125) / bars.length);

    return () => clearTimeout(timer);
  }, [animations, isSorting]);

  const toggleSorting = (algo: (bars: Bar[]) => Action[]) => {
    if (isNotInProgress()) {
      setAnimations(algo([...bars]));
    }
    setIsSorting(!isSorting);
  };

  return (
    <>
      <CustomBar
        resizeBars={resizeBars}
        isSorting={isSorting}
        toggleSorting={toggleSorting}
      />
      <Body bars={bars} />
    </>
  );
};

export default SortingAnimation;

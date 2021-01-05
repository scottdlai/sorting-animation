import { Action, Bar } from '../components/SortingAnimation';
import swap from '../util/swap';

const partition = (
  bars: Bar[],
  start: number,
  end: number,
  animations: Action[]
): number => {
  // const mid = Math.floor((start + end) / 2);
  const pivot = bars[end];
  animations.push({ name: 'pivoting', index: end });
  let i = start;

  for (let j = start; j <= end; j++) {
    animations.push({ name: 'comparing', i: end, j });
    if (bars[j].height < pivot.height) {
      animations.push({ name: 'swapping', i, j });
      animations.push({ name: 'resuming', indices: [i, j] });
      swap(bars, i, j);
      i += 1;
    } else {
      animations.push({ name: 'resuming', indices: [i, j] });
    }
  }
  animations.push({ name: 'swapping', i, j: end });
  animations.push({ name: 'resuming', indices: [end, i] });
  swap(bars, i, end);
  return i;
};

const quickSortHelper = (
  bars: Bar[],
  start: number,
  end: number,
  animations: Action[]
) => {
  if (start >= end) {
    animations.push({ name: 'sorting', index: start });
    return;
  }
  let partionIndex = partition(bars, start, end, animations);
  animations.push({ name: 'sorting', index: partionIndex });
  quickSortHelper(bars, start, partionIndex - 1, animations);
  quickSortHelper(bars, partionIndex + 1, end, animations);
};

const quickSort = (bars: Bar[]): Action[] => {
  const animations: Action[] = [];
  quickSortHelper(bars, 0, bars.length - 1, animations);
  console.log(bars);
  return animations;
};

export default quickSort;

import { Action, Bar } from '../components/SortingAnimation';

const merge = (
  bars: Bar[],
  start: number,
  mid: number,
  end: number,
  animations: Action[]
) => {
  let l1 = mid - start + 1;
  let l2 = end - (mid + 1) + 1;
  const l: Bar[] = Array.from({ length: l1 }, (_, i) => bars[start + i]);
  const r: Bar[] = Array.from({ length: l2 }, (_, i) => bars[mid + 1 + i]);

  // start index of l
  let i = 0;

  // start index of r
  let j = 0;

  // start index of the merged array
  let k = start;

  while (i < l1 && j < l2) {
    animations.push({ name: 'comparing', i: start + i, j: mid + 1 + j });
    animations.push({ name: 'resuming', indices: [start + i, mid + 1 + j] });
    if (l[i].height < r[j].height) {
      animations.push({ name: 'assigning', index: k, newBar: l[i] });
      bars[k] = l[i];
      i += 1;
    } else {
      animations.push({ name: 'assigning', index: k, newBar: r[j] });
      bars[k] = r[j];
      j += 1;
    }
    k += 1;
  }

  while (i < l1) {
    animations.push({ name: 'assigning', index: k, newBar: l[i] });
    bars[k] = l[i];
    k += 1;
    i += 1;
  }

  while (j < l2) {
    animations.push({ name: 'assigning', index: k, newBar: r[j] });
    bars[k] = r[j];
    k += 1;
    j += 1;
  }
};

const mergeSortHelper = (
  bars: Bar[],
  start: number,
  end: number,
  animations: Action[]
) => {
  if (start >= end) {
    return;
  }
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(bars, start, mid, animations);
  mergeSortHelper(bars, mid + 1, end, animations);
  merge(bars, start, mid, end, animations);
};

const mergeSort = (bars: Bar[]): Action[] => {
  const animations: Action[] = [];
  mergeSortHelper(bars, 0, bars.length - 1, animations);
  for (let k = 0; k < bars.length; k++) {
    animations.push({ name: 'sorting', index: k });
  }
  console.log(animations);
  return animations;
};

export default mergeSort;

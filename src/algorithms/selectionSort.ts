import { Action, Bar } from '../components/SortingAnimation';
import swap from '../util/swap';

const selectionSort = (bars: Bar[]) => {
  const steps: Action[] = [];

  for (let i = 0; i < bars.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < bars.length; j++) {
      steps.push({ name: 'comparing', i: minIndex, j });
      if (bars[minIndex].height > bars[j].height) {
        steps.push({ name: 'resuming', indices: [j, minIndex] });
        minIndex = j;
      } else {
        steps.push({ name: 'resuming', indices: [j] });
      }
    }
    // swap
    steps.push({ name: 'swapping', i, j: minIndex });
    swap(bars, i, minIndex);
    steps.push({ name: 'resuming', indices: [minIndex] });
    // Elements at index `i` is in a correct order.
    steps.push({ name: 'sorting', index: i });
  }
  steps.push({ name: 'sorting', index: bars.length - 1 });
  return steps;
};

export default selectionSort;

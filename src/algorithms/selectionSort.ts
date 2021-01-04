import { Action, Bar } from '../components/SortingAnimation';

const selectionSort = (bars: Bar[]) => {
  const steps: Action[] = [];

  for (let i = 0; i < bars.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < bars.length; j++) {
      steps.push({ name: 'comparing', i: minIndex, j });
      if (bars[minIndex].height > bars[j].height) {
        minIndex = j;
      }
      steps.push({ name: 'resuming', indices: [minIndex, j] });
    }
    // swap
    steps.push({ name: 'swapping', i, j: minIndex });
    steps.push({ name: 'resuming', indices: [i, minIndex] });
  }
  return steps;
};

export default selectionSort;

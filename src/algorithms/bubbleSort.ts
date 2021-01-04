import { Action, Bar } from '../components/SortingAnimation';
import swap from '../util/swap';

const bubbleSort = (bars: Bar[]) => {
  // Steps of sorting algorithm.
  const steps: Action[] = [];
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      // comparing
      steps.push({ name: 'comparing', j, i: j + 1 });
      if (bars[j + 1].height < bars[j].height) {
        // swapping
        steps.push({ name: 'swapping', j, i: j + 1 });
        swap(bars, j, j + 1);
      }
      // resume all the colors
      steps.push({ name: 'resuming', indices: [j, j + 1] });
    }
  }
  console.log(bars.map(({ height }) => height));
  return steps;
};

export default bubbleSort;

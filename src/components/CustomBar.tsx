import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import bubbleSort from '../algorithms/bubbleSort';
import selectionSort from '../algorithms/selectionSort';
import { Action, Bar } from './SortingAnimation';

interface CustomBarProp {
  isSorting: boolean;
  toggleSorting: (algo: (bars: Bar[]) => Action[]) => void;
  resizeBars: (newSize: number) => void;
}

const algos = ['bubble', 'selection'] as const;
type Algo = typeof algos[number];

const getAlgo = (algo: Algo) => {
  if (algo === 'bubble') {
    return bubbleSort;
  } else if (algo === 'selection') {
    return selectionSort;
  }

  return selectionSort;
};

const CustomBar = ({ resizeBars, isSorting, toggleSorting }: CustomBarProp) => {
  const [numberOfBars, setNumberOfBars] = useState(8);
  const [algo, setAlgo] = useState<Algo>('bubble');

  const changeAlgo = (newAlgo: string) => {
    if (newAlgo === 'bubble') {
      setAlgo('bubble');
      return;
    } else if (newAlgo === 'selection') {
      setAlgo('selection');
      return;
    }

    setAlgo('bubble');
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Form.Label>Size: {numberOfBars}</Form.Label>
        <Form.Control
          type='range'
          min={8}
          max={64}
          step={2}
          value={numberOfBars}
          disabled={isSorting}
          onChange={({ target: { value } }) => {
            const newNumberOfBars = Number(value);
            setNumberOfBars(newNumberOfBars);
            resizeBars(newNumberOfBars);
          }}
        />
      </div>
      <DropdownButton
        title={algo}
        onSelect={(algo) => changeAlgo(algo ?? '')}
        disabled={isSorting}
      >
        {algos.map((algo) => (
          <Dropdown.Item key={algo} eventKey={algo}>
            {algo}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Button onClick={() => toggleSorting(getAlgo(algo))}>
        {isSorting ? 'Stop' : 'Sort'}
      </Button>
      <Button
        variant='secondary'
        onClick={() => resizeBars(numberOfBars)}
        disabled={isSorting}
      >
        Regenerate
      </Button>
    </div>
  );
};

export default CustomBar;

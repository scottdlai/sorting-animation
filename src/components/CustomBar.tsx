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

const algos = ['bubble sort', 'selection sort'] as const;
type Algo = typeof algos[number];

const getAlgo = (algo: Algo) => {
  const nameToAlgo = {
    'bubble sort': bubbleSort,
    'selection sort': selectionSort,
  };

  return nameToAlgo[algo];
};

const CustomBar = ({ resizeBars, isSorting, toggleSorting }: CustomBarProp) => {
  const [numberOfBars, setNumberOfBars] = useState(8);
  const [algo, setAlgo] = useState<Algo>('bubble sort');

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
        onSelect={(algo) => setAlgo((algo as Algo) ?? algos[0])}
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

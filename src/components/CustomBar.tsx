import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface CustomBarProp {
  isSorting: boolean;
  startSorting: () => void;
  resizeBars: (newSize: number) => void;
}

const CustomBar = ({ resizeBars, isSorting, startSorting }: CustomBarProp) => {
  const [numberOfBars, setNumberOfBars] = useState(8);
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
      <Button onClick={startSorting} disabled={isSorting}>
        Sort!
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

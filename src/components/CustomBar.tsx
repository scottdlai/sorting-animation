import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Navbar } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import bubbleSort from '../algorithms/bubbleSort';
import mergeSort from '../algorithms/mergeSort';
import quickSort from '../algorithms/quickSort';
import selectionSort from '../algorithms/selectionSort';
import { Action, Bar } from './SortingAnimation';

interface CustomBarProp {
  isSorting: boolean;
  toggleSorting: (algo: (bars: Bar[]) => Action[]) => void;
  resizeBars: (newSize: number) => void;
}

const algos = [
  'Bubble Sort',
  'Selection Sort',
  'Merge Sort',
  'Quick Sort',
] as const;
type Algo = typeof algos[number];

const getAlgo = (algo: Algo) => {
  const sortAlgos = [bubbleSort, selectionSort, mergeSort, quickSort];

  return sortAlgos[algos.indexOf(algo)];
};

const CustomBar = ({ resizeBars, isSorting, toggleSorting }: CustomBarProp) => {
  const [numberOfBars, setNumberOfBars] = useState(32);
  const [algo, setAlgo] = useState<Algo>(algos[0]);

  useEffect(() => resizeBars(numberOfBars), [numberOfBars]);

  return (
    <Navbar expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='https://github.com/scottdlai/sorting-animation'>
        <Github size='2em' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <NavbarCollapse>
        <Form className='mr-2' inline>
          <Form.Control
            as='select'
            value={algo}
            onChange={(algo) => setAlgo(algo.target.value as Algo)}
            disabled={isSorting}
            className='mr-2'
          >
            {algos.map((algo) => (
              <option key={algo}>{algo}</option>
            ))}
          </Form.Control>
        </Form>
        <Form.Control
          type='range'
          min={16}
          max={96}
          step={4}
          value={numberOfBars}
          disabled={isSorting}
          onChange={({ target: { value } }) => {
            setNumberOfBars(Number(value));
          }}
          className='mr-2'
        />
        <ButtonGroup className='mr-2'>
          <Button
            variant='info'
            onClick={() => resizeBars(numberOfBars)}
            disabled={isSorting}
          >
            Regenerate
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant={isSorting ? 'danger' : 'success'}
            onClick={() => toggleSorting(getAlgo(algo))}
          >
            {isSorting ? 'Stop' : 'Sort'}
          </Button>
        </ButtonGroup>
      </NavbarCollapse>
    </Navbar>
  );
};

export default CustomBar;

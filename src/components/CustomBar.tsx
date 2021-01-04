import React, { useState } from 'react';

interface CustomBarProp {
  isSorting: boolean;
  startSorting: () => void;
  resizeBars: (newSize: number) => void;
}

const CustomBar = ({ resizeBars, isSorting, startSorting }: CustomBarProp) => {
  return (
    <div>
      <input
        type='range'
        min={8}
        max={64}
        value={8}
        disabled={isSorting}
        onChange={({ target: { value } }) => resizeBars(Number(value))}
      />
      <button onClick={startSorting}>Sort!</button>
    </div>
  );
};

export default CustomBar;

import React from 'react';

interface StarProps {
  selected: boolean;
  onSelect: () => void;
}

export const Star: React.FC<StarProps> = ({ selected, onSelect }) => (
  <span className='text-3xl' onClick={onSelect} style={{ cursor: 'pointer', color: selected ? 'orange' : 'grey' }}>
    ★
  </span>
);


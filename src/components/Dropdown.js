import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef();

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className='item'
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  return (
    <div ref={ref} className='ui form'>
      <div className='field'>
        <label className='label'>{label ? label : 'Make a selection'}</label>
        <div
          onClick={() => setOpen(!isOpen)}
          className={`ui selection dropdown ${isOpen ? 'visible active' : ''}`}
        >
          <i className='dropdown icon'></i>
          <div className='text'>{selected.label}</div>
          <div className={`menu ${isOpen ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

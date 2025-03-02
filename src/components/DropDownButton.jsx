import { useState, useEffect, useRef } from 'react';
import DropDownCard from './DropDownCard';
import PropTypes from 'prop-types';

const DropDownButton = ({ label, data }) => {
  const [open, setOpen] = useState(false);
  const drop = useRef(null);
  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && open) {
      setOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className="dropdown" ref={drop}>
      <button onClick={() => setOpen(open => !open)}>{label}</button>
      {open && <DropDownCard data={data} setOpen={setOpen} />}
    </div>
  );
};

export default DropDownButton;

DropDownButton.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

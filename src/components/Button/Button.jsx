import React from "react";
import './styles.scss';

const Button = ({ name, onClick }) => {
  const handleClick = () => {
    if (window.confirm("Are you sure you want to save?")) {
      onClick();
    }
  };

  return (
    <button className="button" onClick={handleClick}>
      {name}
    </button>
  );
};

export default Button;
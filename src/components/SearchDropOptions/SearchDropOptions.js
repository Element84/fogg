import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

function SearchDropOptions ({ options = [], onOptionClick }) {
  const [option, setOptions] = useState([]);
  
  useEffect(() => {
    setOptions(option => [...option, options]);
  }, [options]);

  function myFunction() {
    document.getElementById('search-dropdown').classList.toggle('show');
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  if (!Array.isArray(options)) return null;
  const activeOptions = options.filter(
    ({ isVisible = true } = {}) => !!isVisible
  );
  if (activeOptions.length === 0) return null;
  return (
    <div className="dropdown">
      <span onClick={myFunction} className="dropdown-button">{<FaChevronDown />}</span>
      <div id="search-dropdown" className="dropdown-content">
        {activeOptions.map((option, index) => {
          const { label, id, onClick, isChecked, value } = option;
          return (
            <label key={`PanelActions-${index}`}>
              <input type="radio" name="search-radio" value={value} id={id} checked={`${isChecked === true ? 'checked' : ''}`} onChange={(e) => { onClick(e); onOptionClick(e);}} />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

};

export default SearchDropOptions;

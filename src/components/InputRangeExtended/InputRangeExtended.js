import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const InputRangeExtended = (props = {}) => {
  const {
    className = 'custom',
    value,
    minValue,
    maxValue,
    onChange,
    onChangeComplete,
    step = 1,
    metric = 'm',
    onChangeDelay = 1
  } = props;

  const inputRef = useRef(null);
  const rangeRef = useRef(null);
  const onChangeCompleteDelay = onChangeDelay;
  const [rangeValue, setRangeValue] = useState(value);
  const [rangeInputValue, setRangeInputValue] = useState(value);

  const [newRangeValue, setNewRangeValue] = useState(Number( (rangeValue - minValue) * 100 / (maxValue - minValue) ));
  const [rangeStyle, setRangeStyle] = useState({background: 'linear-gradient(to right, #1976D2 0%, #1976D2 ' + newRangeValue + '%, #CFD8DC ' + newRangeValue + '%, #CFD8DC 100%)'});
  const [rangeInputStylePosition, setRangeInputStylePosition] = useState(0 - (newRangeValue * 0.2));
  const [rangeInputStyle, setRangeInputStyle] = useState({left: `calc(${newRangeValue}% + (${rangeInputStylePosition}px))`});
	
  const [minError, updateMinErrorState] = useState(false);
  const [maxError, updateMaxErrorState] = useState(false);
  const [generalError, updateGeneralErrorState] = useState(false);

  useEffect(() => {
    animateRange();
  }, []);

  useEffect(() => {
    if ( maxError === true ) {
      handleRangeInputChange({target : { value: rangeValue }});
    }

    if ( minError === true ) {
      handleRangeInputChange({target : { value: rangeValue }});
    }

    if ( generalError === true ) {
      handleRangeInputChange({target : { value: rangeValue }});
    }
  }, [rangeValue]);

  const animateRange = ()=>{
    const newValue = Number( (rangeValue - minValue) * 100 / (maxValue - minValue) );
    setNewRangeValue(newValue);
		const newPosition = 0 - (newValue * 0.2);
    setRangeInputStylePosition(newPosition);

    const maxRangeLengthPixels = rangeRef.current.offsetWidth;
    const inputLengthPixels = inputRef.current.offsetWidth;
    const overflowBreakpointPixels = maxRangeLengthPixels - inputLengthPixels;
    const thumbHalfWidth = 15;

    const thumbCurrentPositionPixels = (((rangeValue - minValue) / (maxValue - minValue)) * ((maxRangeLengthPixels - thumbHalfWidth) - thumbHalfWidth)) + thumbHalfWidth;

    setRangeInputStyle({left: `${thumbCurrentPositionPixels - thumbHalfWidth}px`});
    if ( thumbCurrentPositionPixels > overflowBreakpointPixels ){
      setRangeInputStyle({left: `${overflowBreakpointPixels}px`});
    }
    setRangeStyle({background: 'linear-gradient(to right, #2196F3 0%, #2196F3 ' + newValue + '%, #CFD8DC ' + newValue + '%, #CFD8DC 100%)'});

    handleOnChange(parseInt(rangeValue));
	};

  const handleErrorChecks = (val) => {
    updateGeneralErrorState(false);
    updateMaxErrorState(false);
    updateMinErrorState(false);

    if (!val) {
      updateGeneralErrorState(true);
      setTimeout(() => {
        updateGeneralErrorState(false)
      }, onChangeCompleteDelay * 1000);
      return true;
    }
    if (val > maxValue) {
      updateMaxErrorState(true);
      setTimeout(() => {
        updateMaxErrorState(false)
      }, onChangeCompleteDelay * 1000);
      return true;
    }
    if (val < minValue) {
      updateMinErrorState(true);
      setTimeout(() => {
        updateMinErrorState(false)
      }, onChangeCompleteDelay * 1000);
      return true;
    }
    return false;
  }

  const handleSetMinus = (current) => {
    if (handleErrorChecks(parseInt(current) - step)) {
      return;
    }
    setRangeValue(parseInt(current) - step);
    setRangeInputValue(parseInt(current) - step);
  };

  const handleSetPlus = (current) => {
    if (handleErrorChecks(parseInt(current) + step)) {
      return;
    }
    setRangeValue(parseInt(current) + step);
    setRangeInputValue(parseInt(current) + step);
  };

  const handleRangeInputChange = (e) => {
    if (handleErrorChecks(e.target.value)) {
      return;
    }
    setRangeInputValue(e.target.value);
    setRangeValue(e.target.value);
    animateRange();
  };

  function handleOnChange (data) {
    if (typeof onChange === 'function') {
      onChange(data);
    }
  }

  function handleOnChangeComplete (data) {
    if (typeof onChangeComplete === 'function') {
      onChangeComplete(data);
    }
  }

  useEffect(() => {
    animateRange();

    let timer = setTimeout(() => handleOnChangeComplete(parseInt(rangeValue)), onChangeCompleteDelay * 1000);
    return () => {
      clearTimeout(timer);
    };
    
  }, [rangeValue, rangeInputValue]);

  return (
    <>
      <div className={`range-wrap ${className}`}>
        <div id="rangeValue" ref={inputRef} style={rangeInputStyle} className={`${minError || maxError || generalError ? "error" : ""}`}>
          <div className="number-input">
            <span 
              className="minus" 
              id="minus"
              onClick={e => { handleSetMinus(rangeValue) }}
            >
              <FaArrowDown />
            </span>
            <input 
              type="number" 
              id="rangeInput" 
              className="rangeInput" 
              name="rangeInput" 
              type="number" 
              min={minValue} 
              max={maxValue} 
              value={rangeInputValue} 
              onChange={e => { handleRangeInputChange(e) }}
            />
            <span 
              className="plus" 
              id="plus" 
              onClick={e => { handleSetPlus(rangeValue) }}
            >
              <FaArrowUp />
            </span>
          </div>
        </div>
        <input 
          id="range" 
          type="range" 
          min={minValue} 
          max={maxValue} 
          value={rangeValue} 
          step={step} 
          onChange={e => { handleRangeInputChange(e) }}
          style={rangeStyle}
          ref={rangeRef}
        />
        <div className="labels">
          <span className="min">{minValue}{metric}</span>
          <span className="max">{maxValue}{metric}</span>
        </div>
        <span className="error">{`${minError ? "Invalid Min Range. Try again!" : ""}`}</span>
        <span className="error">{`${maxError ? "Invalid Max Range. Try again!" : ""}`}</span>
        <span className="error">{`${generalError ? "Invalid Input Value. Try again." : ""}`}</span>
      </div>
    </>
  );

};

InputRangeExtended.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
  step: PropTypes.number,
  metric: PropTypes.string,
  onChangeDelay: PropTypes.number
};

export default InputRangeExtended;

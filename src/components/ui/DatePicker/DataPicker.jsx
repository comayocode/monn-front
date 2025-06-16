// import { useState } from 'react';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import Input from '@/components/ui/Input/Input';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = React.forwardRef(
  (
    {
      value,
      onCalendarClick,
      onChange,
      error,
      label,
      name,
      disabled,
      placeholder,
    },
    ref
  ) => {
    return (
      <Input
        type='calendar'
        variant='calendar'
        ref={ref}
        label={label}
        name={name}
        value={value === '' ? undefined : value}
        onChange={onChange}
        onCalendarClick={onCalendarClick}
        error={error}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
  }
);
CustomInput.displayName = 'CustomInput';
CustomInput.propTypes = {
  value: PropTypes.string,
  onCalendarClick: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

const toValidDate = (val) =>
  val && typeof val === 'string' && val.length === 10 ? new Date(val) : null;

const DatePickerInput = ({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
  min,
  max,
  placeholder,
}) => {
  const datePickerRef = useRef(null);
  const dateValue = toValidDate(value);
  const minDate = toValidDate(min);
  const maxDate = toValidDate(max);
  const handleCalendarClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <ReactDatePicker
      ref={datePickerRef}
      selected={dateValue}
      onChange={(date) => {
        if (!date) return onChange({ target: { name, value: '' } });
        const iso = date.toISOString().slice(0, 10);
        onChange({ target: { name, value: iso } });
      }}
      customInput={
        <CustomInput
          label={label}
          name={name}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          variant='calendar'
          onCalendarClick={handleCalendarClick}
        />
      }
      minDate={minDate}
      maxDate={maxDate}
      dateFormat='yyyy-MM-dd'
      showYearDropdown
      showMonthDropdown
      dropdownMode='select'
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      disabled={disabled}
      placeholderText={placeholder || 'Selecciona una fecha'}
    />
  );
};

DatePickerInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.string,
  max: PropTypes.string,
  placeholder: PropTypes.string,
};

export default DatePickerInput;

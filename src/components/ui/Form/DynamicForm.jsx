import { useState } from 'react';
import PropTypes from 'prop-types';
import CustonSelect from '@/components/ui/Select/CustonSelect';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import DataPicker from '@/components/ui/DatePicker/DataPicker';
import useToast from '@/hooks/useToast';
import { formatFormDates } from '@/utils/formatDate';
import './Form.css';

const DynamicForm = ({
  baseFields,
  getDynamicFields,
  initialValues = {},
  onSubmit,
  submitText,
}) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState(() => {
    const data = {};
    const allFields = [...baseFields, ...getDynamicFields(initialValues)];
    allFields.forEach((f) => {
      if (f.type === 'date' && initialValues[f.name]) {
        // Normaliza a yyyy-MM-dd si viene en otro formato
        const val = initialValues[f.name];
        if (typeof val === 'string' && val.length >= 10) {
          data[f.name] = val.slice(0, 10); // yyyy-MM-dd
        } else if (val instanceof Date) {
          data[f.name] = val.toISOString().slice(0, 10);
        } else {
          data[f.name] = '';
        }
      } else {
        data[f.name] = initialValues[f.name] ?? '';
      }
    });
    return data;
  });
  const [emptyFields, setEmptyFields] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fields = [
    ...baseFields.map((field) => ({
      ...field,
      value: formData[field.name],
      onChange: (e) => handleInputChange(field.name, e.target.value),
    })),
    ...getDynamicFields(formData).map((field) => ({
      ...field,
      value: formData[field.name],
      onChange: (e) => handleInputChange(field.name, e.target.value),
    })),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFields = [...baseFields, ...getDynamicFields(formData)];
    const newEmptyFields = allFields.reduce((acc, field) => {
      if (field.type !== 'checkbox') {
        acc[field.name] = !formData[field.name]?.toString().trim();
      }
      return acc;
    }, {});
    setEmptyFields(newEmptyFields);
    if (Object.values(newEmptyFields).includes(true)) {
      addToast('Por favor, completa todos los campos.', 'error');
      return;
    }
    // Formatear fechas
    const formattedData = formatFormDates(formData, allFields);
    onSubmit(formattedData);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      {fields.map(
        ({
          name,
          label,
          type,
          placeholder,
          options,
          value,
          onChange,
          disabled,
        }) => (
          <div key={name} className='form__group'>
            {type === 'checkbox' ? (
              <Checkbox
                label={label}
                checked={!!value}
                onChange={() => onChange({ target: { value: !value } })}
              />
            ) : type === 'select' ? (
              <CustonSelect
                label={label}
                name={name}
                options={options || []}
                value={value}
                onChange={onChange}
                error={emptyFields[name]}
                disabled={disabled}
              />
            ) : type === 'date' ? (
              <DataPicker
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={emptyFields[name]}
                disabled={disabled}
                placeholder={placeholder}
              />
            ) : (
              <Input
                id={name}
                name={name}
                label={label}
                type={type}
                error={emptyFields[name]}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
              />
            )}
          </div>
        )
      )}
      <Button variant='primary' size='normal' type='submit'>
        {submitText}
      </Button>
    </form>
  );
};

DynamicForm.propTypes = {
  baseFields: PropTypes.array.isRequired,
  getDynamicFields: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default DynamicForm;

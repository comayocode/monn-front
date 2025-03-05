import { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import useToast from '@/hooks/useToast';

const Form = ({ fields, onSubmit, submitText }) => {
  const { addToast } = useToast();
  const [emptyFields, setEmptyFields] = useState(
    Object.fromEntries(fields.map((field) => [field.name, false]))
  );

  const [formData, setFormData] = useState(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }),
      {}
    )
  );

  // 🔹 Estado para controlar la visibilidad de las contraseñas
  const [passwordVisibility, setPasswordVisibility] = useState(
    fields
      .filter((field) => field.variant === 'password')
      .reduce((acc, field) => ({ ...acc, [field.name]: false }), {})
  );

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));

    if (emptyFields[fieldName]) {
        setEmptyFields((prevFields) => ({ ...prevFields, [fieldName]: false }));
    }
};

  // 🔹 Alternar visibilidad de la contraseña
  const togglePasswordVisibility = (name) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmptyFields = fields.reduce((acc, field) => {
      acc[field.name] = !formData[field.name]?.trim();
      return acc;
    }, {});

    setEmptyFields(newEmptyFields);

    if (Object.values(newEmptyFields).includes(true)) {
      addToast('Por favor, completa todos los campos.', 'error');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      {fields.map(({ name, label, type, placeholder, variant }) => (
        <div key={name} className='form__group'>
          <Input
            key={name}
            id={name}
            name={name}
            label={label}
            type={
              variant === 'password' && passwordVisibility[name] ? 'text' : type
            }
            placeholder={placeholder}
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            error={emptyFields[name]}
            variant={variant}
            isPasswordVisible={passwordVisibility[name]}
            onTogglePassword={() => togglePasswordVisibility(name)}
          />
        </div>
      ))}

      <Button variant='primary' size='normal' type='submit'>
        {submitText}
      </Button>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      defaultValue: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
};

export default Form;

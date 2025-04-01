import { memo } from 'react'
import Form from '@/components/ui/Form/Form';
import PropTypes from 'prop-types';

const TwoFactorForm = memo(({ initialValues, onSubmit, submitText }) => {
  console.log(initialValues);
  const twoFactorFields = [
    { name: 'code', label: '', type: 'text', placeholder: '123456' },
    { name: 'rememberDevice', label: 'Recordar este dispositivo', type: 'checkbox' },
  ];

  return <Form fields={twoFactorFields} initialValues={initialValues} onSubmit={onSubmit} submitText={submitText} />;
});

TwoFactorForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

TwoFactorForm.displayName = 'TwoFactorForm';

export default TwoFactorForm;
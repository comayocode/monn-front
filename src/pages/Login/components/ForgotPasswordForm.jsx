import Form from '@/components/ui/Form/Form';
import PropTypes from 'prop-types';

const TwoFactorForm = ({ initialValues, onSubmit, submitText }) => {

  console.log('Renderizando ForgotPasswordForm...')

  const fields = [
    { name: 'email', label: '', type: 'email', placeholder: 'mi.correo@email.com' }
  ];

  return <Form fields={fields} initialValues={initialValues} onSubmit={onSubmit} submitText={submitText} />;
};

TwoFactorForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default TwoFactorForm;
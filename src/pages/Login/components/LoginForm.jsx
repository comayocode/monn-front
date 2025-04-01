import Form from '@/components/ui/Form/Form';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, initialValues, submitText }) => {

  const fields = [
    { name: 'email', label: 'Correo', type: 'email', placeholder: 'mi.correo@email.com' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••••••' },
  ];

  return (
    <Form
      fields={fields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitText={submitText}
    />
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default LoginForm;

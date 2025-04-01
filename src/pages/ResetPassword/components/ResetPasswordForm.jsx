import Form from '@/components/ui/Form/Form';
import PropTypes from 'prop-types';

const ResetPasswordForm = ({ onSubmit, token, initialValues, submitText }) => {

  console.log('Renderizando ResetPasswordForm...')
  const fields = [
    { name: 'password', label: 'Nueva contraseña', type: 'password', placeholder: '••••••••••••' },
    { name: 'confirmPassword', label: 'Confirmar contraseña', type: 'password', placeholder: '••••••••••••' },
  ];

  return (
    <Form
      fields={fields}
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("📩 Enviando valores del formulario:", values);
        onSubmit(values, token);
      }}
      submitText={submitText}
    />
  );
};

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default ResetPasswordForm;

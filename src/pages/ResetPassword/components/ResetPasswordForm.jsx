import Form from '@/components/ui/Form/Form';
import PropTypes from 'prop-types';

const ResetPasswordForm = ({ onSubmit, token, initialValues, submitText, btnMarginTop }) => {

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
      btnMarginTop={btnMarginTop}
    />
  );
};

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  submitText: PropTypes.string.isRequired,
  btnMarginTop: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['15', '20', '25', 'none'])
    ]),
};

export default ResetPasswordForm;

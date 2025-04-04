import Form from '@/components/ui/Form/Form';
import PropTypes from 'prop-types';

const SignUpForm = ({ onSubmit, initialValues, submitText, btnMarginTop, children }) => {

  const fields = [
    { name: 'firstName', label: 'Nombre', type: 'text', placeholder: 'Pepito' },
    { name: 'lastName', label: 'Apellido', type: 'text', placeholder: 'Perez' },
    { name: 'email', label: 'Correo', type: 'email', placeholder: 'mi.correo@email.com' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••••••' },
  ];

  return (
    <Form
      fields={fields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitText={submitText}
      btnMarginTop={btnMarginTop}
    >
      {children}
    </Form>
  );
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  submitText: PropTypes.string.isRequired,
  children: PropTypes.node,
  btnMarginTop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['15', '20', '25', 'none'])
  ]),
};

export default SignUpForm;
import Form from '@/components/ui/Form/Form';
import PropTypes from 'prop-types';

const UserForm = ({ initialValues, onSubmit, submitText }) => {
  const userFields = [
    { name: 'username', label: 'Nombre', type: 'text', placeholder: 'Juan Pérez' },
    { name: 'email', label: 'Correo', type: 'email', placeholder: 'correo@ejemplo.com' },
    { name: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••••••', variant: 'password' },
    { name: 'role', label: 'Rol', type: 'text', placeholder: 'Admin' },
  ];

  return <Form fields={userFields} initialValues={initialValues} onSubmit={onSubmit} submitText={submitText}  />;
};

UserForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default UserForm;
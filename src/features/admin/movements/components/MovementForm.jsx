import Form from '@/components/ui/Form/Form';
import PropTypes from 'prop-types';

const MovementsForm = ({ initialValues, onSubmit, submitText }) => {
  const movementFields = [
    { name: 'type', label: 'Tipo de movimeinto', type: 'text', placeholder: 'INCOME' },
    { name: 'amount', label: 'Monto', type: 'text', placeholder: '12000' },
    { name: 'description', label: 'Descripción', type: 'text', placeholder: 'Ejemplo: Pago de factura' },
  ];

  return <Form fields={movementFields} initialValues={initialValues} onSubmit={onSubmit} submitText={submitText}  />;
};

MovementsForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default MovementsForm;
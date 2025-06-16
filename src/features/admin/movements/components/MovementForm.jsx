import DynamicForm from '@/components/ui/Form/DynamicForm';
import PropTypes from 'prop-types';

const baseFields = [
  {
    name: 'type',
    label: 'Tipo de movimiento',
    type: 'select',
    options: [
      { value: 'INCOME', label: 'Ingreso' },
      { value: 'EXPENSE', label: 'Egreso' },
      { value: 'DEBT', label: 'Deuda' },
      { value: 'LOAN', label: 'Préstamo' },
      { value: 'RECURRENT', label: 'Recurrente' },
    ],
  },
  { name: 'amount', label: 'Monto', type: 'text', placeholder: '12000' },
  {
    name: 'description',
    label: 'Descripción',
    type: 'text',
    placeholder: 'Ejemplo: Pago de factura',
  },
];

function getDynamicFields(formData) {
  const type = formData.type;
  if (type === 'DEBT' || type === 'LOAN') {
    return [
      {
        name: 'counterpartyId',
        label: 'Contraparte',
        type: 'text',
        placeholder: 'ID de contraparte',
      },
      {
        name: 'dueDate',
        label: 'Fecha de vencimiento',
        type: 'date',
        placeholder: '2025-06-15',
      },
    ];
  } else if (type === 'RECURRENT') {
    return [
      {
        name: 'counterpartyId',
        label: 'Contraparte',
        type: 'text',
        placeholder: 'ID de contraparte',
      },
      {
        name: 'startDate',
        label: 'Fecha de inicio',
        type: 'date',
        placeholder: '2025-06-15',
      },
      {
        name: 'dueDate',
        label: 'Fecha de vencimiento',
        type: 'date',
        placeholder: '2025-06-15',
      },
      {
        name: 'frequency',
        label: 'Frecuencia',
        type: 'select',
        options: [
          { value: 'YEARLY', label: 'Anual' },
          { value: 'MONTHLY', label: 'Mensual' },
          { value: 'WEEKLY', label: 'Semanal' },
          { value: 'DAILY', label: 'Diario' },
        ],
      },
    ];
  }
  return [];
}

const MovementsForm = ({ initialValues, onSubmit, submitText }) => {
  return (
    <DynamicForm
      baseFields={baseFields}
      getDynamicFields={getDynamicFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitText={submitText}
    />
  );
};

MovementsForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default MovementsForm;
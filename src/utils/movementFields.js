// Utilidades de campos para formularios de movimientos

export const baseFields = [
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
  },
];

export function getDynamicFields(formData) {
  const type = formData.type;
  if (type === 'DEBT' || type === 'LOAN') {
    return [
      {
        name: 'dueDate',
        label: 'Fecha de vencimiento',
        type: 'date',
        placeholder: '2025-06-15',
      },
      {
        name: 'counterpartyId',
        label: 'ID de Contraparte',
        type: 'text',
        placeholder: 'ID de contraparte',
      },
      {
        name: 'counterpartyName',
        label: 'Contraparte',
        type: 'text',
      },
    ];
  } else if (type === 'RECURRENT') {
    return [
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
        name: 'counterpartyId',
        label: 'ID de Contraparte',
        type: 'text',
        placeholder: 'ID de contraparte',
      },
      {
        name: 'counterpartyName',
        label: 'Contraparte',
        type: 'text',
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

import Table from '@/components/ui/Table/Table';
import PropTypes from 'prop-types';

const MovementsTable = ({ data, onEdit, onDelete, onView }) => {
  const columns = [
    { key: 'createdAt', label: 'Creación' },
    { key: 'amount', label: 'Monto' },
    { key: 'type', label: 'Tipo' },
    { key: 'description', label: 'Descripción', type: 'boolean' },
    { key: 'counterparty.counterpartyName', label: 'Persona' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ];

  // Solo pasar las props si existen
  const tableProps = { data, columns };
  if (onEdit) tableProps.onEdit = onEdit;
  if (onDelete) tableProps.onDelete = onDelete;
  if (onView) tableProps.onView = onView;

  return <Table {...tableProps} />;
};

MovementsTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
};

export default MovementsTable;

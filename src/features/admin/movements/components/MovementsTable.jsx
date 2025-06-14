import Table from '@/components/ui/Table/Table';
import PropTypes from 'prop-types';

const MovementsTable = ({ data, onEdit, onDelete }) => {
  const columns = [
    { key: 'createdAt', label: 'Creación' },
    { key: 'amount', label: 'Monto' },
    { key: 'type', label: 'Tipo' },
    { key: 'description', label: 'Descripción', type: 'boolean' },
    { key: 'counterparty.counterpartyName', label: 'Persona' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' },
  ];

  return (
    <Table data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />
  );
};

MovementsTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MovementsTable;
